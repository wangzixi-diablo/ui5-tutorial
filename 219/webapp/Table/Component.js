sap.ui.define(['sap/ui/core/UIComponent'],
	function(UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui5.walkthrough.Table.Component", {
		metadata : {
			manifest: "json"
		},

		getTable: function () {
			return this.getRootControl().getContent()[0];
		}
	});
});
