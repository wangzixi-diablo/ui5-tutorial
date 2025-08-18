sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(Controller, JSONModel, MessageToast) {
	"use strict";

	var PageController = Controller.extend("sap.ui5.walkthrough.controller.Page", {
		onInit : function (evt) {
			// 初始化空的模型
			var oModel = new JSONModel([]);
			this.getView().setModel(oModel);
			
			// 设置文件输入监听器
			this._setupFileInputListener();
		},

		_setupFileInputListener: function() {
			var that = this;
			// 等待DOM渲染完成后设置监听器
			setTimeout(function() {
				var fileInput = document.getElementById('hiddenFolderInput');
				if (fileInput) {
					fileInput.addEventListener('change', function(e) {
						that._handleFolderSelection(e);
					});
				}
			}, 100);
		},

		onFolderSelect: function() {
			var fileInput = document.getElementById('hiddenFolderInput');
			if (fileInput) {
				fileInput.click();
			}
		},

		_handleFolderSelection: function(event) {
			var files = Array.from(event.target.files);
			
			if (files.length === 0) {
				this.byId("folderPathText").setText("未选择文件夹");
				this.byId("statsText").setVisible(false);
				return;
			}
			
			try {
				// 显示选择的文件夹路径
				var folderPath = files[0].webkitRelativePath.split('/')[0];
				this.byId("folderPathText").setText("已选择: " + folderPath);
				
				// 构建文件树
				var fileTree = this._buildFileTree(files);
				
				// 转换为SAP UI5树格式
				var treeData = this._convertToTreeData(fileTree);
				
				// 更新模型
				this.getView().getModel().setData(treeData);
				
				// 展开第一层
				this.byId("Tree").expandToLevel(1);
				
				// 显示统计信息
				this._showStats(files);
				
				MessageToast.show("文件夹加载成功！");
			} catch (error) {
				MessageToast.show("处理文件时出错: " + error.message);
			}
		},

		_buildFileTree: function(files) {
			var tree = {};
			
			files.forEach(function(file) {
				var pathParts = file.webkitRelativePath.split('/');
				var currentLevel = tree;
				
				pathParts.forEach(function(part, index) {
					if (!currentLevel[part]) {
						currentLevel[part] = {
							name: part,
							type: index === pathParts.length - 1 ? 'file' : 'folder',
							children: {},
							file: index === pathParts.length - 1 ? file : null,
							path: pathParts.slice(0, index + 1).join('/')
						};
					}
					currentLevel = currentLevel[part].children;
				});
			});
			
			return tree;
		},

		_convertToTreeData: function(tree) {
			var that = this;
			var result = [];
			
			var sortedKeys = Object.keys(tree).sort(function(a, b) {
				var nodeA = tree[a];
				var nodeB = tree[b];
				
				// 文件夹在前，然后按字母顺序
				if (nodeA.type !== nodeB.type) {
					return nodeA.type === 'folder' ? -1 : 1;
				}
				return nodeA.name.localeCompare(nodeB.name);
			});
			
			sortedKeys.forEach(function(key) {
				var node = tree[key];
				var treeItem = {
					text: node.name,
					ref: node.type === 'folder' ? 'sap-icon://folder-full' : that._getFileIcon(node.name)
				};
				
				// 递归处理子节点
				var childKeys = Object.keys(node.children);
				if (childKeys.length > 0) {
					treeItem.nodes = that._convertToTreeData(node.children);
				}
				
				result.push(treeItem);
			});
			
			return result;
		},

		_getFileIcon: function(fileName) {
			var extension = fileName.split('.').pop().toLowerCase();
			
			switch (extension) {
				case 'txt':
				case 'md':
					return 'sap-icon://attachment-text-file';
				case 'jpg':
				case 'jpeg':
				case 'png':
				case 'gif':
					return 'sap-icon://attachment-photo';
				case 'mp4':
				case 'avi':
				case 'mov':
					return 'sap-icon://attachment-video';
				case 'mp3':
				case 'wav':
					return 'sap-icon://attachment-audio';
				case 'zip':
				case 'rar':
				case '7z':
					return 'sap-icon://attachment-zip-file';
				case 'html':
				case 'htm':
					return 'sap-icon://attachment-html';
				case 'pdf':
					return 'sap-icon://pdf-attachment';
				case 'js':
				case 'css':
				case 'json':
				case 'xml':
					return 'sap-icon://source-code';
				default:
					return 'sap-icon://document';
			}
		},

		_formatFileSize: function(bytes) {
			if (bytes === 0) return '0 B';
			var k = 1024;
			var sizes = ['B', 'KB', 'MB', 'GB'];
			var i = Math.floor(Math.log(bytes) / Math.log(k));
			return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
		},

		_showStats: function(files) {
			var totalFiles = files.length;
			var totalSize = files.reduce(function(sum, file) {
				return sum + file.size;
			}, 0);
			var folders = new Set();
			
			files.forEach(function(file) {
				var pathParts = file.webkitRelativePath.split('/');
				for (var i = 0; i < pathParts.length - 1; i++) {
					folders.add(pathParts.slice(0, i + 1).join('/'));
				}
			});
			
			var statsText = "统计信息: " + totalFiles + " 个文件，" + 
			               folders.size + " 个文件夹，总大小: " + 
			               this._formatFileSize(totalSize);
			               
			this.byId("statsText").setText(statsText);
			this.byId("statsText").setVisible(true);
		},

		onExpandMultiPress : function(evt) {
			var oTree = this.byId("Tree"),
				aSelectedItems = oTree.getSelectedItems(),
				aSelectedIndices = [];

			for (var i = 0; i < aSelectedItems.length; i++) {
				aSelectedIndices.push(oTree.indexOfItem(aSelectedItems[i]));
			}

			oTree.expand(aSelectedIndices);
		},

		onCollapseMultiPress : function(evt) {
			var oTree = this.byId("Tree"),
			aSelectedItems = oTree.getSelectedItems(),
			aSelectedIndices = [];

			for (var i = 0; i < aSelectedItems.length; i++) {
				aSelectedIndices.push(oTree.indexOfItem(aSelectedItems[i]));
			}

			oTree.collapse(aSelectedIndices);
		},

		onSelectionFinish: function(oEvent) {
			var aSelectedItems = oEvent.getParameter("selectedItems");
			var oTree = this.byId("Tree");
			var aSticky = aSelectedItems.map(function(oItem) {
				return oItem.getKey();
			});

			oTree.setSticky(aSticky);
		},

		onToggleInfoToolbar: function(oEvent) {
			var oTree = this.byId("Tree");
			oTree.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
		}
	});
	return PageController;
});
