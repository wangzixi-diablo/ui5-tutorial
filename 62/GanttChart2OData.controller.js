sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/MockServer",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/gantt/simple/Relationship",
	"sap/gantt/AdhocLine"
], function (Controller, MockServer, ODataModel, Relationship, AdhocLine) {
	"use strict";

	var oContextMenu = new sap.m.Menu({
		items: [
			new sap.m.MenuItem({
				text: "Delete",
				icon: ""
			}),
			new sap.m.MenuItem({
				text: "Edit Relationship Type",
				items: [
					new sap.m.MenuItem({
						text: "FinishToFinish"
					}),
					new sap.m.MenuItem({
						text: "FinishToStart"
					}),
					new sap.m.MenuItem({
						text: "StartToFinish"
					}),
					new sap.m.MenuItem({
						text: "StartToStart"
					})
				]
			})
		],
		itemSelected: function (oEvent) {
			var oItem = oEvent.getParameter("item");
			var oParent = oItem.getParent();
			var clearIcon = function (oParent) {
				oParent.getItems().forEach(function (oItem) { oItem.setIcon(""); });
			};
			clearIcon(oParent);

			var oShape = oContextMenu.selectedShape;
			var sShapeId = oShape.getShapeId();
			var oDataModel = oShape.getModel("data");
			if (oItem.getText() === "Delete") {
				oDataModel.remove("/Relationships('" + sShapeId + "-1')", {
					refreshAfterChange: false
				});

			} else {
				var sType = sap.gantt.simple.RelationshipType[oItem.getText()];
				oDataModel.setProperty("/Relationships('" + sShapeId + "-1')/RelationType", sType, true);
							}
			oContextMenu.close();
		},
		closed: function(oEvent) {
			var clearIcon = function (oParent) {
				oParent.getItems().forEach(function (oItem) { oItem.setIcon(""); });
			};

			clearIcon(oContextMenu.getItems()[1]);
		}
	});

	return Controller.extend("sap.gantt.sample.GanttChart2OData.GanttChart2OData", {
		onInit: function() {
			var oViewModel = new sap.ui.model.json.JSONModel({
				alert: false
			});
			this.getView().setModel(oViewModel, "oViewModel");
		},

		onAfterRendering: function () {
			var oTableGantt = this.getView().byId("gantt1");
			this.oAlertCheckbox = new sap.m.CheckBox('alert', {
				text: 'Alert',
				enabled: true,
				select: this.onAlertClicked.bind(this)
			});
			oTableGantt.addEventDelegate({onAfterRendering: function() {
				var oGanttOverflowToolbar = oTableGantt.getChartOverflowToolbar();
				if (oGanttOverflowToolbar) {
					oGanttOverflowToolbar.addContent(this.oAlertCheckbox);
				}
			}.bind(this)});
		},

		onShapeDrop: function(oEvent) {
			var oTableGantt = this.getView().byId("gantt1");
			var oDataModel = oTableGantt.getModel("data");
			var oNewDateTime = oEvent.getParameter("newDateTime");
			var oDraggedShapeDates = oEvent.getParameter("draggedShapeDates");
			var sLastDraggedShapeUid = oEvent.getParameter("lastDraggedShapeUid");
			var oOldStartDateTime = oDraggedShapeDates[sLastDraggedShapeUid].time;
			var oOldEndDateTime = oDraggedShapeDates[sLastDraggedShapeUid].endTime;
			var iMoveWidthInMs = oNewDateTime.getTime() - oOldStartDateTime.getTime();
			if (oTableGantt.getGhostAlignment() === sap.gantt.dragdrop.GhostAlignment.End) {
				iMoveWidthInMs = oNewDateTime.getTime() - oOldEndDateTime.getTime();
			}

			var getBindingContextPath = function (sShapeUid) {
				var oParsedUid = sap.gantt.misc.Utility.parseUid(sShapeUid);
				return oParsedUid.shapeDataName;
			};

			Object.keys(oDraggedShapeDates).forEach(function (sShapeUid) {
				var sPath = getBindingContextPath(sShapeUid);
				var oOldDateTime = oDraggedShapeDates[sShapeUid].time;
				var oOldEndDateTime = oDraggedShapeDates[sShapeUid].endTime;
				var oNewDateTime = new Date(oOldDateTime.getTime() + iMoveWidthInMs);
				var oNewEndDateTime = new Date(oOldEndDateTime.getTime() + iMoveWidthInMs);
				oDataModel.setProperty(sPath + "/StartDate", oNewDateTime, true);
				oDataModel.setProperty(sPath + "/EndDate", oNewEndDateTime, true);
			});
		},

		onShapeResize: function(oEvent) {
				var oShape = oEvent.getParameter("shape");
				var aNewTime = oEvent.getParameter("newTime");
				var sBindingPath = oShape.getBindingContext("data").getPath();
				var oTableGantt = this.getView().byId("gantt1");
				var oDataModel = oTableGantt.getModel("data");
				oDataModel.setProperty(sBindingPath + "/StartDate", aNewTime[0], true);
				oDataModel.setProperty(sBindingPath + "/EndDate", aNewTime[1], true);
		},

		onShapeContextMenu: function(oEvent) {
			var oShape = oEvent.getParameter("shape");
			var iPageX = oEvent.getParameter("pageX");
			var iPageY = oEvent.getParameter("pageY");

			if (oShape instanceof Relationship) {
				var sType = oShape.getType();
				oContextMenu.getItems()[1].getItems().filter(function (item) { return item.getText() == sType; })[0].setIcon("sap-icon://accept");
				// oContextMenu.getItems()[1].getItems()[iType].setIcon("sap-icon://accept");
				oContextMenu.selectedShape = oShape;
				var oPlaceHolder = new sap.m.Label();
				var oPopup = new sap.ui.core.Popup(oPlaceHolder, false, true, false);
				var eDock = sap.ui.core.Popup.Dock;
				var sOffset = (iPageX + 1) + " " + (iPageY + 1);
				oPopup.open(0, eDock.BeginTop, eDock.LeftTop, null , sOffset);
				oContextMenu.openBy(oPlaceHolder);
			}
		},
		onShapePress: function(oEvent){
			var oShape = oEvent.getParameter('shape');
			var oGantt = this.getView().byId("gantt1");
			var oContainer = oGantt.getParent();
			if (oShape){
				oContainer.setStatusMessage(oShape.getTitle());
			} else {
				oContainer.setStatusMessage("");
			}
		},

		onShapeConnect: function(oEvent) {
			var oTableGantt = this.getView().byId("gantt1");
			var sFromShapeUid = oEvent.getParameter("fromShapeUid");
			var sToShapeUid = oEvent.getParameter("toShapeUid");
			var iType = oEvent.getParameter("type");

			var fnParseUid = sap.gantt.misc.Utility.parseUid;
			var oDataModel = oTableGantt.getModel("data");

			var oParsedUid = fnParseUid(sFromShapeUid);
			var sShapeId = oParsedUid.shapeId;
			var sRowId = fnParseUid(oParsedUid.rowUid).rowId;
			var mParameters = {
				context: oDataModel.getContext("/ProjectElems('" + sRowId + "')"),
				success: function (oData) {
					oDataModel.read("/ProjectElems('" + sRowId + "')", {
						urlParameters: {
							"$expand": "Relationships"
						}
					});
				},
				refreshAfterChange: false
			};

			var sRelationshipID = "rls-temp-" + new Date().getTime();
			var oNewRelationship = {
				"ObjectID": sRelationshipID + "-1",
				"RelationID": sRelationshipID,
				"ParentObjectID": sRowId,
				"PredecTaskID": sShapeId,
				"SuccTaskID": fnParseUid(sToShapeUid).shapeId,
				"RelationType": iType
			};
			oDataModel.create('/Relationships', oNewRelationship, mParameters);
		// oDataModel.submitChanges();
		},

		handleExpandShape: function (oEvent) {
			var oTableGantt = this.getView().byId("gantt1");
			var oTable = oTableGantt.getTable();
			var aSelectedRows = oTable.getSelectedIndices();
			oTable.expand(aSelectedRows);
		},

		handleCollapseShape: function (oEvent) {
			var oTableGantt = this.getView().byId("gantt1");
			var oTable = oTableGantt.getTable();
			var aSelectedRows = oTable.getSelectedIndices();
			oTable.collapse(aSelectedRows);
		},

		handleAdhocLineTimeChange: function(oEvent) {
			var oTableGantt = this.getView().byId("gantt1");
			oTableGantt.addAdhocLine(new AdhocLine({
				stroke: "#" + (Math.random() * 0xFFFFFF << 0).toString(16),
				strokeWidth: 2,
				strokeDasharray: "5, 1",
				timeStamp: oEvent.getParameter("value"),
				description: "Adhoc line description"
			}));
		},

		checkStatus: function(sStartDate, sEndDate) {
			// get the days difference between the start date and the end date
			var	iDaysDiff = (sEndDate - sStartDate) / (24 * 60 * 60 * 1000),
				bMoreThanFourWeeks = iDaysDiff > (7 * 4);
			return bMoreThanFourWeeks;
		},

		onAlertClicked: function () {
			var bAnimate = sap.ui.getCore().byId("alert").getSelected();
			this.getView().getModel("oViewModel").setProperty("/alert", bAnimate);
		}
	});
});
