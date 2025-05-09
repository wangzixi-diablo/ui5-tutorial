sap.ui.define(["sap/suite/ui/generic/template/genericUtilities/FeError", "sap/base/util/deepExtend", "sap/suite/ui/generic/template/listTemplates/semanticDateRangeTypeHelper"], function (FeError, deepExtend, semanticDateRangeTypeHelper) {
	"use strict";
	var	sClassName = "listTemplates.filterSettingsPreparationHelper";

	function getFilterSettingsMetadata() {
		return {
			type: "object",
			properties: {
				dateSettings: semanticDateRangeTypeHelper.getDateSettingsMetadata(),
				historySettings: {
					type: "object",
					properties: {
						historyEnabled: {
							type: "string",
							defaultValue: "auto" // allowed values: enabled, disabled, auto
						},
						fields: { // Map - keys are property names (of EntitySet used for SFB) 
							type: "object",
							mapEntryProperties: {
								historyEnabled: {
									type: "string" // allowed values: enabled, disabled, auto
								}
							}
						}
					}
				}
			}
		};
	}
		
	function getSelectionFields(oPageSettings, oLeadingEntityType){
		return oLeadingEntityType["com.sap.vocabularies.UI.v1.SelectionFields"] && oLeadingEntityType["com.sap.vocabularies.UI.v1.SelectionFields"].map(function(oSelectionField, i) {
			return {
				key: oSelectionField.PropertyPath.replace('/', '.'),
				groupId: "_BASIC",
				index: 10 * (i + 1),
				visibleInAdvancedArea: true
			};
		});
	}
	
	function getHistoryEnabled(oHistorySettings, sPropertyName){
		var oRelevantSettings = oHistorySettings && oHistorySettings.fields && oHistorySettings.fields[sPropertyName] || oHistorySettings;
		switch (oRelevantSettings && oRelevantSettings.historyEnabled) {
		case "enabled":
			return true;
		case "disabled":
			return false;
		case "auto":
			return undefined;
		case undefined:
			return undefined;
		default:
			throw new FeError(sClassName, "Invalid value " + oRelevantSettings.historyEnabled + " for setting historyEnabled");
		}
	}

	function getHistoryEnablement(oPageSettings, oLeadingEntityType){
		return oLeadingEntityType.property.map(function(oProperty){
			return {
				key: oProperty.name,
				historyEnabled: getHistoryEnabled(oPageSettings.filterSettings && oPageSettings.filterSettings.historySettings, oProperty.name)
			};
		}).filter(function(oSetting){
			return oSetting.historyEnabled !== undefined;
		});
	}
	
	// creates an object out of an array 
	// entries should have one property used as unique key
	// result has properties per entry (if key is unique)
	// if key is not unique: last one wins
	// if key is missing for one entry: corresponding result property would be named "undefined"
	function fnArrayToMap(sKeyProperty, aArray){
		var mResult = {};
		if (Array.isArray(aArray)) {
			aArray.forEach(function(oEntry){
				mResult[oEntry[sKeyProperty]] = oEntry;
			});
		}
		return mResult;
	}

	// To control filters in SFB, controlConfiguration is used. There are different reasons to control filters, which lead to different disjoint properties
	// to be provided. Only common property is "key" to identify the filter field - but only one controlConfiguration should be provided per key.
	// This method provides all (combined) properties for controlConfiguration, using specific methods (per reason) to provide the needed properties

	function getControlConfigurationSettings(oPageSettings, oLeadingEntityType, oLeadingEntitySet, oModel){
		// Array of getter methods for the specific reasons, sharing the same interface: function(oPageSettings, oLeadingEntityType) returning an array of objects with a property "key"
		// that defines the filter field and other (disjoint) properties to be set to the controlConfiguration
		var aSpecificGetters = [getSelectionFields, semanticDateRangeTypeHelper.getDateRangeFieldSettings, getHistoryEnablement];

		// call all getters and transform their result to maps (key = filter field) to be able to merge them using deepExtend
		var aFieldMaps = aSpecificGetters.map(function(fnGetter){
			return fnArrayToMap("key", fnGetter.call(null, oPageSettings, oLeadingEntityType, oLeadingEntitySet, oModel));
		});

		// merge maps provided for different reasons to one map (containing only one entry per filter field) to be returned
		return deepExtend.apply(null, [{}].concat(aFieldMaps));
	}

	function getDatePropertiesSettings(oPageSettings, oLeadingEntityType, oLeadingEntitySet, oModel){
		return semanticDateRangeTypeHelper.getSettingsForDateProperties(oPageSettings, oLeadingEntityType, oLeadingEntitySet, oModel);
	}

	function fnMergeControlConfiguration(aConfigurations) {
		var aUniqueIds = [];
		var aCustomConfigurations = [];
		aConfigurations.forEach(function(oConfiguration) {
			if (aUniqueIds.includes(oConfiguration.mProperties.key)) { // We assume Custom Configurations will always be at the end of the array
				aCustomConfigurations.push(oConfiguration);
			} else {
				aUniqueIds.push(oConfiguration.mProperties.key);
			}
		});
		aCustomConfigurations.forEach(function(oConfiguration) {
			for (var i = 0; i < aConfigurations.length; i++) {
				if (aConfigurations[i].mProperties.key === oConfiguration.mProperties.key && aConfigurations[i].sId != oConfiguration.sId) {
					aConfigurations[i].mProperties = Object.assign(aConfigurations[i].mProperties, oConfiguration.mProperties);
				}
			}
		});
	}

	return {
		getFilterSettingsMetadata: getFilterSettingsMetadata,
		getControlConfigurationSettings: getControlConfigurationSettings,
		fnMergeControlConfiguration: fnMergeControlConfiguration,
		getDatePropertiesSettings: getDatePropertiesSettings
	};
});
