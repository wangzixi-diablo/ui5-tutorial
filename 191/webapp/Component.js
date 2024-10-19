sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/core/util/MockServer',
	'sap/ui/comp/navpopover/FakeFlpConnector',
	'sap/ui/comp/navpopover/SemanticObjectController',
	"sap/ui/model/odata/v2/ODataModel"
], function(
	UIComponent,
	MockServer,
	FakeFlpConnector,
	SemanticObjectController,
	ODataModel
) {
	"use strict";

	var Component = UIComponent.extend("sap.ui5.walkthrough.Component", {
		metadata: {
			manifest: "json"
		},

		init: function() {
			SemanticObjectController.destroyDistinctSemanticObjects();
			FakeFlpConnector.disableFakeConnector();

			FakeFlpConnector.enableFakeConnector({
				'demokit_smartlink_example_01_SemanticObjectName': {
					links: [
						{
							action: "displayFactSheet",
							intent: "?demokit_smartlink_example_01_SemanticObjectName#/sample/sap.ui.comp.sample.smartlink.factSheetPage/preview",
							text: "FactSheet of Name"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_01#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'A'",
							tags: [
								"superiorAction"
							]
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_02#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'B'"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_03#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'C'"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_04#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'D'"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_05#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'E'"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_06#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'F'"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_07#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'G'"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_08#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'H'"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_09#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'I'"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_10#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'J'"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectName_11#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Specific Details of Name 'K'"
						}
					]
				},
				'demokit_smartlink_example_01_SemanticObjectPrice': {
					links: [
						{
							action: "displayFactSheet",
							intent: "?demokit_smartlink_example_01_SemanticObjectPrice01#/sample/sap.ui.comp.sample.smartlink.factSheetPage/preview",
							text: "FactSheet of Price"
						}, {
							action: "anyAction",
							intent: "?demokit_smartlink_example_01_SemanticObjectPrice02#/sample/sap.ui.comp.sample.smartlink.productPage/preview",
							text: "Show Price",
							tags: [
								"superiorAction"
							]
						}
					]
				}
			});

			this.oMockServer = new MockServer({
				rootUri: "jerrysmartlinkdemo/"
			});

			var sPath = sap.ui.require.toUrl("sap/ui5/walkthrough/mockserver");
			this.oMockServer.simulate(sPath + "/metadata.xml", {
				sMockdataBaseUrl: sPath,
				bGenerateMissingMockData: true
			});
			this.oMockServer.start();

			this.oModel = new ODataModel("jerrysmartlinkdemo", true);
			this.setModel(this.oModel);

			UIComponent.prototype.init.apply(this, arguments);
		},

		exit: function() {
			FakeFlpConnector.disableFakeConnector();
			this.oMockServer.stop();
			this.oModel.destroy();
		}
	});
	return Component;
});
