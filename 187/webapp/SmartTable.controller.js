sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.SmartTable",{
		onDeselect : function () {
			var oTable = this.getView().byId("jerrytable");
			oTable.removeSelections(true);
	   }
	})
});
