sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageStrip",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/VBox",
    "sap/m/HBox",
    "sap/ui/core/HTML",
    "sap/ui/core/library"
], function (Controller, MessageToast, MessageStrip, Button, Text, VBox, HBox, HTML, coreLibrary) {
    "use strict";

    var MessageType = coreLibrary.MessageType;

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        
        onInit: function () {
            this.workbook = null;
            this.currentSheet = null;
            this._setupDragAndDrop();
            this._createHiddenFileInput();
        },

        _createHiddenFileInput: function () {
            // 创建隐藏的文件输入元素
            var oFileInput = document.createElement('input');
            oFileInput.type = 'file';
            oFileInput.accept = '.xlsx,.xls,.csv';
            oFileInput.style.display = 'none';
            oFileInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    this._handleFile(e.target.files[0]);
                }
            }.bind(this));
            
            // 将文件输入元素添加到页面
            document.body.appendChild(oFileInput);
            this._hiddenFileInput = oFileInput;
        },

        _setupDragAndDrop: function () {
            var oUploadArea = this.byId("uploadArea");
            var oDomRef = oUploadArea.getDomRef();
            
            if (oDomRef) {
                this._addDragDropListeners(oDomRef);
            } else {
                oUploadArea.addEventDelegate({
                    onAfterRendering: function () {
                        this._addDragDropListeners(oUploadArea.getDomRef());
                    }.bind(this)
                });
            }
        },

        _addDragDropListeners: function (oDomRef) {
            oDomRef.addEventListener('dragover', function (e) {
                e.preventDefault();
                oDomRef.classList.add('dragover');
            });

            oDomRef.addEventListener('dragleave', function (e) {
                e.preventDefault();
                oDomRef.classList.remove('dragover');
            });

            oDomRef.addEventListener('drop', function (e) {
                e.preventDefault();
                oDomRef.classList.remove('dragover');
                var files = e.dataTransfer.files;
                if (files.length > 0) {
                    this._handleFile(files[0]);
                }
            }.bind(this));
        },

        onFileSelect: function () {
            // 使用隐藏的文件输入元素
            if (this._hiddenFileInput) {
                this._hiddenFileInput.click();
            }
        },

        onFileAdded: function (oEvent) {
            var oItem = oEvent.getParameter("item");
            var oFile = oItem.getFileObject();
            this._handleFile(oFile);
        },

        _handleFile: function (oFile) {
            if (!oFile) return;

            // 验证文件类型
            var aValidTypes = ['.xlsx', '.xls', '.csv'];
            var sFileExtension = '.' + oFile.name.split('.').pop().toLowerCase();
            
            if (aValidTypes.indexOf(sFileExtension) === -1) {
                this._showError('请选择有效的Excel文件格式 (.xlsx, .xls, .csv)');
                return;
            }

            // 显示文件信息
            this._showFileInfo(oFile);
            
            // 显示加载状态
            this._showLoading();

            var oReader = new FileReader();
            oReader.onload = function (e) {
                try {
                    var oData = new Uint8Array(e.target.result);
                    this.workbook = XLSX.read(oData, { type: 'array' });
                    this._displayWorkbook();
                } catch (error) {
                    this._showError('文件解析失败：' + error.message);
                }
            }.bind(this);
            oReader.readAsArrayBuffer(oFile);
        },

        _showFileInfo: function (oFile) {
            var oFileInfoPanel = this.byId("fileInfoPanel");
            var oFileInfoContent = this.byId("fileInfoContent");
            
            var fFileSize = (oFile.size / 1024).toFixed(2);
            var sLastModified = new Date(oFile.lastModified).toLocaleString('zh-CN');
            
            oFileInfoContent.destroyItems();
            oFileInfoContent.addItem(new Text({ text: "📄 文件信息：" }).addStyleClass("fileInfoTitle"));
            oFileInfoContent.addItem(new Text({ text: "文件名：" + oFile.name }));
            oFileInfoContent.addItem(new Text({ text: "文件大小：" + fFileSize + " KB" }));
            oFileInfoContent.addItem(new Text({ text: "最后修改：" + sLastModified }));
            
            oFileInfoPanel.setVisible(true);
        },

        _showLoading: function () {
            var oMessageStrip = this.byId("messageStrip");
            oMessageStrip.setText("⏳ 正在解析文件，请稍候...");
            oMessageStrip.setType(MessageType.Information);
            oMessageStrip.setVisible(true);
            
            this.byId("resultsPanel").setVisible(false);
        },

        _showError: function (sMessage) {
            var oMessageStrip = this.byId("messageStrip");
            oMessageStrip.setText("❌ " + sMessage);
            oMessageStrip.setType(MessageType.Error);
            oMessageStrip.setVisible(true);
        },

        _displayWorkbook: function () {
            this.byId("messageStrip").setVisible(false);
            this.byId("resultsPanel").setVisible(true);

            // 显示统计信息
            this._displayStats();

            // 创建工作表标签
            this._createSheetTabs();

            // 显示第一个工作表
            if (this.workbook.SheetNames.length > 0) {
                this._displaySheet(this.workbook.SheetNames[0]);
            }
        },

        _displayStats: function () {
            var oStatsContainer = this.byId("statsContainer");
            var iTotalSheets = this.workbook.SheetNames.length;
            
            var iTotalRows = 0;
            var iTotalCells = 0;
            
            this.workbook.SheetNames.forEach(function (sSheetName) {
                var oWorksheet = this.workbook.Sheets[sSheetName];
                var oRange = XLSX.utils.decode_range(oWorksheet['!ref'] || 'A1');
                var iSheetRows = oRange.e.r + 1;
                var iSheetCols = oRange.e.c + 1;
                iTotalRows += iSheetRows;
                iTotalCells += iSheetRows * iSheetCols;
            }.bind(this));

            oStatsContainer.destroyItems();
            oStatsContainer.addItem(this._createStatItem(iTotalSheets.toString(), "工作表"));
            oStatsContainer.addItem(this._createStatItem(iTotalRows.toString(), "总行数"));
            oStatsContainer.addItem(this._createStatItem(iTotalCells.toString(), "总单元格"));
        },

        _createStatItem: function (sNumber, sLabel) {
            var oVBox = new VBox({
                alignItems: "Center",
                items: [
                    new Text({ text: sNumber }).addStyleClass("statNumber"),
                    new Text({ text: sLabel }).addStyleClass("statLabel")
                ]
            }).addStyleClass("statItem");
            
            return oVBox;
        },

        _createSheetTabs: function () {
            var oSheetTabsContainer = this.byId("sheetTabsContainer");
            oSheetTabsContainer.destroyItems();

            this.workbook.SheetNames.forEach(function (sSheetName, iIndex) {
                var oTab = new Button({
                    text: sSheetName,
                    press: this._onSheetTabPress.bind(this, sSheetName)
                }).addStyleClass("sheetTab");
                
                if (iIndex === 0) {
                    oTab.addStyleClass("active");
                }
                
                oSheetTabsContainer.addItem(oTab);
            }.bind(this));
        },

        _onSheetTabPress: function (sSheetName) {
            // 更新标签状态
            var oSheetTabsContainer = this.byId("sheetTabsContainer");
            oSheetTabsContainer.getItems().forEach(function (oTab) {
                oTab.removeStyleClass("active");
                if (oTab.getText() === sSheetName) {
                    oTab.addStyleClass("active");
                }
            });

            this._displaySheet(sSheetName);
        },

        _displaySheet: function (sSheetName) {
            var oWorksheet = this.workbook.Sheets[sSheetName];
            var oTableContainer = this.byId("tableContainer");
            
            if (!oWorksheet['!ref']) {
                oTableContainer.destroyContent();
                oTableContainer.addContent(new Text({ text: "📋 该工作表为空" }).addStyleClass("emptyMessage"));
                return;
            }

            // 转换为JSON数据
            var aJsonData = XLSX.utils.sheet_to_json(oWorksheet, { 
                header: 1,
                defval: '',
                raw: false
            });

            if (aJsonData.length === 0) {
                oTableContainer.destroyContent();
                oTableContainer.addContent(new Text({ text: "📋 该工作表没有数据" }).addStyleClass("emptyMessage"));
                return;
            }

            // 创建HTML表格
            var sTableHTML = this._createTableHTML(aJsonData);
            
            oTableContainer.destroyContent();
            oTableContainer.addContent(new HTML({
                content: sTableHTML
            }));
            
            this.currentSheet = sSheetName;
        },

        _createTableHTML: function (aJsonData) {
            var sTableHTML = '<table class="excelTable">';
            
            aJsonData.forEach(function (aRow, iRowIndex) {
                var bIsHeader = iRowIndex === 0;
                var sTag = bIsHeader ? 'th' : 'td';
                
                sTableHTML += '<tr>';
                
                // 确保每行都有相同的列数
                var iMaxCols = Math.max.apply(Math, aJsonData.map(function (r) { return r.length; }));
                for (var iColIndex = 0; iColIndex < iMaxCols; iColIndex++) {
                    var sCellValue = aRow[iColIndex] || '';
                    var sDisplayValue = sCellValue.toString().trim() || '&nbsp;';
                    sTableHTML += '<' + sTag + '>' + sDisplayValue + '</' + sTag + '>';
                }
                
                sTableHTML += '</tr>';
            });
            
            sTableHTML += '</table>';
            return sTableHTML;
        },

        onExit: function () {
            // 清理隐藏的文件输入元素
            if (this._hiddenFileInput && this._hiddenFileInput.parentNode) {
                this._hiddenFileInput.parentNode.removeChild(this._hiddenFileInput);
            }
        }
    });
});