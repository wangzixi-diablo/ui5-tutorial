sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/ObjectListItem",
	"sap/m/ObjectAttribute"
], function(Controller, ObjectListItem, ObjectAttribute) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onPress: function() {
			var oList = this.byId("list");
			oList.bindItems({
				path: "/Meetups",
				parameters: {
					custom: {
						first: "3"
					}
				},
				template: new ObjectListItem({
					title: "{Title}",
					number: {
						path: 'EventDate',
						type: 'sap.ui.model.type.DateTime',
						formatOptions: {
							style: 'medium'
						}
					},
					attributes: [
						new ObjectAttribute({
							text: "{Description}"
						})
					]
				})
			});
		}
	});
});