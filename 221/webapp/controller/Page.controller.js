sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/dnd/DragInfo",
	"sap/ui/core/dnd/DropInfo",
	"sap/f/dnd/GridDropInfo",
	"../RevealGrid/RevealGrid",
	"sap/ui/core/library"
], function (Controller, JSONModel, DragInfo, DropInfo, GridDropInfo, RevealGrid, coreLibrary) {
	"use strict";

	// shortcut for sap.ui.core.dnd.DropLayout
	var DropLayout = coreLibrary.dnd.DropLayout;

	// shortcut for sap.ui.core.dnd.DropPosition
	var DropPosition = coreLibrary.dnd.DropPosition;

	return Controller.extend("sap.ui5.walkthrough.controller.Page", {

		onInit: function () {
			this.initData();
			this.attachDragAndDrop();
		},

		initData: function () {
			this.byId("list1").setModel(new JSONModel([
				{ title: "ABAP 2x2", rows: 2, columns: 2 },
				{ title: "Java 3x3", rows: 3, columns: 3 },
				{ title: "JavaScript 2x4", rows: 2, columns: 4 }
			]));

			this.byId("grid1").setModel(new JSONModel([
				{ title: "Python 4x2", rows: 4, columns: 2 },
				{ title: "NodeJs 2x3", rows: 2, columns: 3 },
				{ title: "ChatGPT 2x2", rows: 2, columns: 2 }
			]));
		},

		onRevealGrid: function () {
			RevealGrid.toggle("grid1", this.getView());
		},

		attachDragAndDrop: function () {
			var oList = this.byId("list1");
			oList.addDragDropConfig(new DragInfo({
				sourceAggregation: "items"
			}));

			oList.addDragDropConfig(new DropInfo({
				targetAggregation: "items",
				dropPosition: DropPosition.Between,
				dropLayout: DropLayout.Vertical,
				drop: this.onDrop.bind(this)
			}));

			var oGrid = this.byId("grid1");
			oGrid.addDragDropConfig(new DragInfo({
				sourceAggregation: "items"
			}));

			oGrid.addDragDropConfig(new GridDropInfo({
				targetAggregation: "items",
				dropPosition: DropPosition.Between,
				dropLayout: DropLayout.Horizontal,
				dropIndicatorSize: this.onDropIndicatorSize.bind(this),
				drop: this.onDrop.bind(this)
			}));
		},

		onDropIndicatorSize: function (oDraggedControl) {
			var oBindingContext = oDraggedControl.getBindingContext(),
				oData = oBindingContext.getModel().getProperty(oBindingContext.getPath());

			if (oDraggedControl.isA("sap.m.StandardListItem")) {
				return {
					rows: oData.rows,
					columns: oData.columns
				};
			}
		},

		onDrop: function (oInfo) {
			var oDragged = oInfo.getParameter("draggedControl"),
				oDropped = oInfo.getParameter("droppedControl"),
				sInsertPosition = oInfo.getParameter("dropPosition"),

				oDragContainer = oDragged.getParent(),
				oDropContainer = oInfo.getSource().getParent(),

				oDragModel = oDragContainer.getModel(),
				oDropModel = oDropContainer.getModel(),
				oDragModelData = oDragModel.getData(),
				oDropModelData = oDropModel.getData(),

				iDragPosition = oDragContainer.indexOfItem(oDragged),
				iDropPosition = oDropContainer.indexOfItem(oDropped);

			// remove the item
			var oItem = oDragModelData[iDragPosition];
			oDragModelData.splice(iDragPosition, 1);

			if (oDragModel === oDropModel && iDragPosition < iDropPosition) {
				iDropPosition--;
			}

			if (sInsertPosition === "After") {
				iDropPosition++;
			}

			// insert the control in target aggregation
			oDropModelData.splice(iDropPosition, 0, oItem);

			if (oDragModel !== oDropModel) {
				oDragModel.setData(oDragModelData);
				oDropModel.setData(oDropModelData);
			} else {
				oDropModel.setData(oDropModelData);
			}
			this.byId("grid1").focusItem(iDropPosition);
		}
	});
});