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

		formatter: function(sKey) {
			switch (sKey) {
				case 'a':
					return 'Free shipping';
				case 'b':
					return 'Premium shipping';
				case 'c':
					return 'Express shipping';
			}
		},

		createColumnConfig: function() {
			var aCols = [];

			/* 1. Add a simple text column */
			aCols.push({
				label: 'Text',
				type: EdmType.String,
				property: 'SampleString',
				width: 20,
				wrap: true
			});

			/* 2. Add a concatenated text column */
			aCols.push({
				label: 'Concatenated Text',
				type: EdmType.String,
				property: ['Region', 'SampleCurrency'],
				template: '{0} accepts {1}'
			});

			/* 3. Add a simple Integer column */
			aCols.push({
				label: 'Integer',
				type: EdmType.Number,
				property: 'SampleInteger',
				scale: 0
			});

			/* 4. Add a simple Decimal column */
			aCols.push({
				label: 'Decimal',
				type: EdmType.Number,
				property: 'SampleDecimal',
				width: 25
			});

			/* 5. Add a custom Decimal column */
			aCols.push({
				label: 'Decimal (scale=0)',
				type: EdmType.Number,
				property: 'SampleDecimal',
				scale: 0
			});

			/* 6. Add a custom Decimal column */
			aCols.push({
				label: 'Decimal (scale=2)',
				type: EdmType.Number,
				property: 'SampleDecimal',
				scale: 2
			});

			/* 7. Add a custom Decimal column */
			aCols.push({
				label: 'Decimal (delimiter)',
				type: EdmType.Number,
				property: 'SampleDecimal',
				delimiter: true,
				width: 25
			});

			/* 8. Add a custom Decimal column */
			aCols.push({
				label: 'Decimal (UoM)',
				type: EdmType.Number,
				property: 'SampleDecimal',
				scale: 3,
				unit: 'kg'
			});

			/* 9. Add a custom Decimal column */
			aCols.push({
				label: 'Decimal (UoM property)',
				type: EdmType.Number,
				property: 'SampleDecimal',
				scale: 2,
				unitProperty: 'SampleCurrency'
			});

			/* 10. Add a simple Date column */
			aCols.push({
				label: 'Date',
				type: EdmType.Date,
				property: 'SampleDate'
			});

			/* 11. Add an islamic Date column */
			aCols.push({
				label: 'Date (calendar=islamic)',
				type: EdmType.Date,
				property: 'SampleDate',
				calendar: 'Islamic'
			});

			/* 12. Add a japanese Date column */
			aCols.push({
				label: 'Date (calendar=japanese)',
				type: EdmType.Date,
				property: 'SampleDate',
				calendar: 'Japanese'
			});

			/* 13. Add a UTC DateTime column */
			aCols.push({
				label: 'DateTime',
				type: EdmType.DateTime,
				property: 'SampleDate'
			});

			/* 14. Add a local DateTime column */
			aCols.push({
				label: 'Local DateTime',
				type: EdmType.DateTime,
				property: 'SampleDate',
				utc: false,
				width: 32
			});

			/* 15. Add a local DateTime column */
			aCols.push({
				label: 'Fixed Timezone',
				type: EdmType.DateTime,
				property: 'SampleDate',
				timezone: 'America/New_York',
				width: 32
			});

			/* 16. Add a local DateTime column */
			aCols.push({
				label: 'Dynamic Timezone',
				type: EdmType.DateTime,
				property: 'SampleDate',
				timezoneProperty: 'TimezoneID',
				width: 32
			});

			/* 17. Add a simple Time column */
			aCols.push({
				label: 'Time',
				type: EdmType.Time,
				property: 'SampleDate'
			});

			/* 18. Add a custom Date column */
			aCols.push({
				label: 'Date (format)',
				type: EdmType.Date,
				property: 'SampleDate',
				format: 'dd-mm-yyyy h:mm:ss AM/PM',
				width: 25
			});

			/* 19. Add a custom Date column */
			aCols.push({
				label: 'DateString',
				type: EdmType.Date,
				property: 'SampleDateString',
				inputFormat: 'yyyymmdd',
				width: 25
			});

			/* 20. Add a custom Date column */
			aCols.push({
				label: 'Fiscal Date',
				type: EdmType.String,
				property: 'SampleDateString',
				inputFormat: '^([0-9]{4})([0-9]{2})',
				template: '{1}/{0}',
				width: 25,
				textAlign: 'end'
			});

			/* 21. Add a simple Currency column */
			aCols.push({
				label: 'Currency',
				type: EdmType.Currency,
				property: 'SampleDecimal',
				unitProperty: 'SampleCurrency',
				displayUnit: true,
				width: 20
			});

			/* 22. Add a simple Boolean column */
			aCols.push({
				label: 'Boolean',
				type: EdmType.Boolean,
				property: 'SampleBoolean'
			});

			/* 23. Add a custom Boolean column */
			aCols.push({
				label: 'Boolean (custom)',
				type: EdmType.Boolean,
				property: 'SampleBoolean',
				trueValue: 'AVAILABLE',
				falseValue: 'OUT OF STOCK'
			});

			/* 24. Add an Enumeration column */
			aCols.push({
				label: 'Enumeration',
				type: EdmType.Enumeration,
				property: 'SampleEnumeration',
				valueMap: {
					'a': 'Free shipping',
					'b': 'Premium shipping',
					'c': 'Express shipping'
				},
				width: 15,
				textAlign: 'center'
			});

			/* 25. Add a BigNumber column */
			aCols.push({
				label: 'BigNumber',
				type: EdmType.BigNumber,
				property: 'SampleBigNumber',
				delimiter: true,
				width: 25
			});

			/* 26. Add a Percentage column */
			aCols.push({
				label: 'Percentage',
				type: EdmType.Percentage,
				property: 'SampleFraction',
				scale: 3,
				width: 10
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
				workbook: { columns: aCols },
				dataSource: oRowBinding,
				fileName: 'Column formatting sample.xlsx',
				worker: false // We need to disable worker because we are using a Mockserver as OData Service
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
