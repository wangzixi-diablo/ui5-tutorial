sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/util/MockServer',
	'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
	'sap/ui/model/odata/v2/ODataModel'
], function(Controller, MockServer, exportLibrary, Spreadsheet, ODataModel) {
	'use strict';
	var EdmType = exportLibrary.EdmType;
	return Controller.extend('sap.ui5.walkthrough.Spreadsheet', {
		onInit: function() {
			var oModel, oView, sServiceUrl;

			/* Export requires an absolute path */
			sServiceUrl = "https://fake.host.com/localService/";

			this._oMockServer = new MockServer({
				rootUri: sServiceUrl
			});

			var sPath = sap.ui.require.toUrl('sap/ui5/walkthrough/localService');
			this._oMockServer.simulate(sPath + '/metadata.xml', sPath + '/mockdata');
			this._oMockServer.start();

			oModel = new ODataModel(sServiceUrl);
			oView = this.getView();
			oView.setModel(oModel);
		},

		createColumnConfig: function() {
			var aCols = [];

			aCols.push({
				label: 'Full name',
				property: ['Lastname', 'Firstname'],
				type: EdmType.String,
				template: '{0}, {1}'
			});

			aCols.push({
				label: 'ID',
				type: EdmType.Number,
				property: 'UserID',
				scale: 0
			});

			aCols.push({
				label: 'First Name',
				property: 'Firstname',
				type: EdmType.String
			});

			aCols.push({
				label: 'Last Name',
				property: 'Lastname',
				type: EdmType.String
			});

			aCols.push({
				label: 'Birth Date',
				property: 'Birthdate',
				type: EdmType.Date
			});

			aCols.push({
				label: 'Salary',
				property: 'Salary',
				type: EdmType.Number,
				scale: 2,
				delimiter: true
			});

			aCols.push({
				label: 'Currency',
				property: 'Currency',
				type: EdmType.String
			});

			aCols.push({
				label: 'Active',
				property: 'Active',
				type: EdmType.Boolean,
				trueValue: 'YES',
				falseValue: 'NO'
			});

			return aCols;
		},

		onExport: function() {
			var aCols, oRowBinding, oSettings, oSheet, oTable;

			if (!this._oTable) {
				this._oTable = this.byId('exportTable');
			}

			oTable = this._oTable;
			oRowBinding = oTable.getBinding('items');
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'Table export sample.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},

		onExit: function() {
			this._oMockServer.stop();
		}
	});
});
