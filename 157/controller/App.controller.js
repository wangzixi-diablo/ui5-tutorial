sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/vk/ContentResource",
	"sap/m/MessageToast"
], function(Controller, JSONModel, ContentResource, MessageToast) {
	"use strict";

	var handleEmptyUrl = function(view) {
		var oBundle = view.getModel("i18n").getResourceBundle();
		var msg = oBundle.getText("missingUrl");
		MessageToast.show(msg);
	};

	var loadModelIntoViewer = function(viewer, remoteUrl, sourceType, localFile) {
		// what is currently loaded in the view is destroyed
		viewer.destroyContentResources();

		var source = remoteUrl || localFile;

		if (source) {
			// content of viewer is replaced with new data
			var contentResource = new ContentResource({
				source: source,
				sourceType: sourceType,
				sourceId: "abc"
			});

			// content: chosen path. content added to the view
			viewer.addContentResource(contentResource);
		}
	};

	return Controller.extend("sap.ui5.walkthrough.controller.App", {

	onInit: function() {
		var sourceData = {
			localFile: undefined,
				remoteUrl: undefined
			};
			var model = new JSONModel();
			model.setData(sourceData);
			this.getView().setModel(model, "source");
		},

		onPressLoadRemoteModel: function(event) {
			var view = this.getView();
			var sourceData = view.getModel("source").oData;
			var viewer = view.byId("viewer");
			if (sourceData.remoteUrl) {
				loadModelIntoViewer(viewer, sourceData.remoteUrl, "vds");
			} else {
				handleEmptyUrl(view);
			}
		},

		onPressLoadRemoteImage: function(event) {
			var view = this.getView();
			var sourceData = view.getModel("source").oData;
			var viewer = view.byId("viewer");
			if (sourceData.remoteUrl) {
				loadModelIntoViewer(viewer, sourceData.remoteUrl, "jpg");
			} else {
				handleEmptyUrl(view);
			}
		},

		onPressLoadSampleFile: function(event) {
			var view = this.getView();
			var viewer = view.byId("viewer");
			loadModelIntoViewer(viewer, "models/cooper.vds", "vds");
		},

		onChangeFileUploader: function(event) {
			var view = this.getView();
			var viewer = view.byId("viewer");
			var localFile = event.getParameter("files")[0];
			// if user selects a local file
			if (localFile) {
				var fileName = localFile.name;
				var index = fileName.lastIndexOf(".");
				if (index >= 0 && index < fileName.length - 1) {
					var sourceType = fileName.substr(index + 1);
					loadModelIntoViewer(viewer, null, sourceType, localFile);
				}
			}
		}
	});
});
