sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/m/MessageBox',
	'sap/ui/comp/navpopover/LinkData',
	'sap/ui/core/util/MockServer',
	'sap/ui/core/Title',
	'sap/ui/layout/form/SimpleForm',
	'sap/m/Image',
	'sap/m/Text',
	'sap/m/FlexItemData',
	'sap/ui/model/odata/v2/ODataModel',
	'sap/m/MessageToast'
], function (Controller, MessageBox, LinkData, MockServer, Title, SimpleForm, Image, Text, FlexItemData, ODataModel, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.SmartChart", {

		onInit: function () {

			var oMockServer = new MockServer({
				rootUri: "sapuicompsmartchart/"
			});
			this._oMockServer = oMockServer;
			oMockServer.simulate("mockserver/metadata.xml",{
				sMockdataBaseUrl:"mockserver/ProductCollection.json"
			});
			oMockServer.start();

			// create and set ODATA Model
			this._oModel = new ODataModel("sapuicompsmartchart", true);
			this.getView().setModel(this._oModel);

			//set maxHeight for categoryAxis in order to allow longer labels being fully displayed
			var oSmartChart = this.getView().byId("smartChartGeneral");
			oSmartChart.attachInitialise(function(){
				oSmartChart.getChart().setVizProperties({categoryAxis:{layout:{maxHeight:0.8}}});
			});
		},

		onNavigationTargetsObtained: function (oEvent) {
			var oParameters = oEvent.getParameters();
			var oSemanticAttributes = oParameters.semanticAttributes;

			oParameters.show("Supplier", new LinkData({
				text: "Homepage",
				href: "http://www.sap.com",
				target: "_blank"
			}), [
					new LinkData({
						text: "Go to shopping cart"
					})
				], new SimpleForm({
					maxContainerCols: 1,
					content: [
						new Title({
							text: "Product description"
						}), new Image({
							src: "test-resources/sap/ui/documentation/sdk/images/HT-1052.jpg", // oSemanticAttributes.ProductPicUrl,
							densityAware: false,
							width: "50px",
							height: "50px",
							layoutData: new FlexItemData({
								growFactor: 1
							})
						}), new Text({
							text: oSemanticAttributes.Description
						})
					]
				}));
		},

		onNavigate: function (oEvent) {
			var oParameters = oEvent.getParameters();
			if (oParameters.text === "Homepage") {
				return;
			}
			MessageBox.show(oParameters.text + " has been pressed", {
				icon: MessageBox.Icon.INFORMATION,
				title: "SmartChart demo",
				actions: [
					MessageBox.Action.OK
				]
			});
		},

		onUiStateChange: function(oEvent) {
			MessageToast.show("UI state changed for SmartChart with id - " + oEvent.getSource().getId());
		},

		applyUIState: function() {
			var oSmartChart = this.getView().byId("smartChartGeneral"),
				oUiState = oSmartChart.getUiState(),
				oPresentationVariant = oUiState.getPresentationVariant();

			oPresentationVariant.SortOrder = [{
				Property: "Name",
				Descending: false
			}];

			oUiState.setPresentationVariant(oPresentationVariant);
			oSmartChart.setUiState(oUiState);
		},

		onExit: function () {
			this._oMockServer.stop();
			this._oModel.destroy();
		}
	});
});
