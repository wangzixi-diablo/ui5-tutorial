sap.ui.define([
	'sap/ui/base/Object', 'sap/ui/comp/navpopover/Factory', 'sap/ui/thirdparty/jquery'
], function(BaseObject, Factory, jQuery) {
	"use strict";

	var UShellCrossApplicationNavigationMock = BaseObject.extend("sap.ui5.walkthrough.shellMock.UShellCrossApplicationNavigationMock", {});

	UShellCrossApplicationNavigationMock.getServiceReal = Factory.getService;

	UShellCrossApplicationNavigationMock.mockUShellServices = function(oSetting) {

		Factory.getService = function(sServiceName) {
			switch (sServiceName) {
				case "CrossApplicationNavigation":
					return {
						hrefForExternal: function(oTarget) {
							if (!oTarget || !oTarget.target || !oTarget.target.shellHash) {
								return null;
							}
							return oTarget.target.shellHash;
						},
						getDistinctSemanticObjects: function() {
							var aSemanticObjects = [];
							for ( var sSemanticObject in oSetting) {
								aSemanticObjects.push(sSemanticObject);
							}
							var oDeferred = jQuery.Deferred();
							setTimeout(function() {
								oDeferred.resolve(aSemanticObjects);
							}, 0);
							return oDeferred.promise();
						},
						getLinks: function(aParams) {
							var aLinks = [];
							if (!Array.isArray(aParams)) {
								oSetting[aParams.semanticObject] ? aLinks = oSetting[aParams.semanticObject].links : aLinks = [];
							} else {
								aParams.forEach(function(aParams_) {
									oSetting[aParams_[0].semanticObject] ? aLinks.push([
										oSetting[aParams_[0].semanticObject].links
									]) : aLinks.push([
										[]
									]);
								});
							}
							var oDeferred = jQuery.Deferred();
							setTimeout(function() {
								oDeferred.resolve(aLinks);
							}, 0);
							return oDeferred.promise();
						}
					};
				case "URLParsing":
					return {
						parseShellHash: function(sIntent) {
							var sAction;
							var fnHandler = function(oLink) {
								if (oLink.intent === sIntent) {
									sAction = oLink.action;
									return true;
								}
							};
							for ( var sSemanticObject in oSetting) {
								oSetting[sSemanticObject].links.some(fnHandler);
								if (sAction) {
									return {
										semanticObject: sSemanticObject,
										action: sAction
									};
								}
							}
							return {
								semanticObject: null,
								action: null
							};
						}
					};
				default:
					return UShellCrossApplicationNavigationMock.getServiceReal(sServiceName);
			}
		};
	};
	UShellCrossApplicationNavigationMock.unMockUShellServices = function() {
		Factory.getService = UShellCrossApplicationNavigationMock.getServiceReal;
	};

	return UShellCrossApplicationNavigationMock;
}, /* bExport= */true);
