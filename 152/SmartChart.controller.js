sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/util/MockServer',
	'sap/ui/model/odata/v2/ODataModel',
	'sap/m/MessageToast'
], function (Controller, MockServer, ODataModel, MessageToast) {
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

			this._oModel = new ODataModel("sapuicompsmartchart", true);
			this.getView().setModel(this._oModel);

			//set maxHeight for categoryAxis in order to allow longer labels being fully displayed
			var oSmartChart = this.getView().byId("smartChartGeneral");
			oSmartChart.attachInitialise(function(){
				oSmartChart.getChart().setVizProperties({categoryAxis:{layout:{maxHeight:0.8}}});
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
