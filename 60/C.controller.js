sap.ui.define([
				"sap/ui/model/json/JSONModel",
				"sap/ui/Device"
               ],function(JSONModel, Device) {
	"use strict";
	var oModel;
	sap.ui.controller("sap.ui5.walkthrough.C", {
		onInit : function () 
		{
			oModel = new sap.ui.model.json.JSONModel("./Data.json");
			this.getView().setModel(oModel);

			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel, "device");
		 },
		 
		 onSelectionChange : function (oEvt) 
		 {
			var oList = oEvt.getSource();
			var aItems = oList.getSelectedItems();
			for(var j = 0;j < 3;j ++){
				var locJson = oModel.getProperty("/Spots/"+j+"/tooltip"); 
				var flagScaled = false;
				for(var i = 0;i < aItems.length; i++){
				var locList = aItems[i].getTitle();
					if(locList == locJson){
						if(oModel.getProperty("/Spots/"+j+"/scale") == "1;1;1"){
							oModel.setProperty("/Spots/"+j+"/scale","2;2;2");
							flagScaled = true;
						}
						else if(oModel.getProperty("/Spots/"+j+"/scale") == "2;2;2"){
							flagScaled = true;
						}
					}
					continue;
				}
				if(!flagScaled){
					if(oModel.getProperty("/Spots/"+j+"/scale") == "2;2;2"){
						oModel.setProperty("/Spots/"+j+"/scale","1;1;1");
					}
				}
			}
		}
	});
}, /* bExport= */ true);
