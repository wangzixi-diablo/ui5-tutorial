sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui5/walkthrough/lib/jspdf.min",
    "sap/ui5/walkthrough/lib/marked.min"

], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        onInit: function () {
            this._markdownContent = "";
            this._fileName = "";
            this._pdfDoc = null;
            
            // Initialize file input listener
            this._initFileInput();
        },

        _initFileInput: function () {
            var that = this;
            
            // Wait for DOM to be ready
            setTimeout(function() {
                var fileInput = document.getElementById('fileInput');
                if (fileInput) {
                    fileInput.addEventListener('change', function(event) {
                        that._onFileSelected(event);
                    });
                }
            }, 100);
        },

        _onFileSelected: function (event) {
            var file = event.target.files[0];
            var parseButton = this.byId("parseButton");
            var messageStrip = this.byId("messageStrip");
            
            if (file) {
                if (file.name.toLowerCase().endsWith('.md')) {
                    this._fileName = file.name;
                    parseButton.setEnabled(true);
                    messageStrip.setVisible(false);
                    
                    // Read file content
                    var reader = new FileReader();
                    var that = this;
                    reader.onload = function(e) {
                        that._markdownContent = e.target.result;
                    };
                    reader.readAsText(file);
                } else {
                    messageStrip.setText("Please select a valid .md file");
                    messageStrip.setType("Error");
                    messageStrip.setVisible(true);
                    parseButton.setEnabled(false);
                }
            } else {
                parseButton.setEnabled(false);
                messageStrip.setVisible(false);
            }
        },

        onParseMarkdown: function () {
            if (!this._markdownContent) {
                MessageToast.show("No markdown content to parse");
                return;
            }

            try {
                // Show the splitter
                this.byId("contentSplitter").setVisible(true);
                
                // Display markdown source
                this._displayMarkdownSource();
                
                // Generate and display PDF
                this._generatePDF();
                
                MessageToast.show("Markdown parsed successfully!");
            } catch (error) {
                MessageToast.show("Error parsing markdown: " + error.message);
            }
        },

        _displayMarkdownSource: function () {
            var markdownHtml = "<pre style='white-space: pre-wrap; font-family: monospace; padding: 10px; background-color: #f5f5f5; border-radius: 4px;'>" + 
                              this._escapeHtml(this._markdownContent) + 
                              "</pre>";
            
            this.byId("markdownSource").setContent(markdownHtml);
        },

        _generatePDF: function () {
            try {
                // Convert markdown to HTML using marked.js
                var htmlContent = window.marked.parse(this._markdownContent);
                
                // Create PDF using jsPDF
                var { jsPDF } = window.jspdf;
                var doc = new jsPDF();
                
                // Add content to PDF
                var lines = this._markdownContent.split('\n');
                var yPosition = 20;
                var lineHeight = 7;
                var pageHeight = doc.internal.pageSize.height;
                var inTable = false;
                var tableHeaders = [];
                var tableRows = [];
                
                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    
                    if (yPosition > pageHeight - 20) {
                        doc.addPage();
                        yPosition = 20;
                    }
                    
                    // Handle different markdown elements
                    if (line.startsWith('# ')) {
                        // H1 Header
                        doc.setFontSize(18);
                        doc.setFont(undefined, 'bold');
                        doc.text(line.substring(2), 10, yPosition);
                        yPosition += lineHeight + 5;
                    } else if (line.startsWith('## ')) {
                        // H2 Header
                        doc.setFontSize(16);
                        doc.setFont(undefined, 'bold');
                        doc.text(line.substring(3), 10, yPosition);
                        yPosition += lineHeight + 3;
                    } else if (line.startsWith('### ')) {
                        // H3 Header
                        doc.setFontSize(14);
                        doc.setFont(undefined, 'bold');
                        doc.text(line.substring(4), 10, yPosition);
                        yPosition += lineHeight + 2;
                    } else if (line.startsWith('> ')) {
                        // Blockquote
                        doc.setFontSize(12);
                        doc.setFont(undefined, 'italic');
                        doc.setTextColor(100, 100, 100); // Gray color
                        var quoteText = '" ' + line.substring(2) + ' "';
                        var splitText = doc.splitTextToSize(quoteText, 170);
                        splitText.forEach(function(textLine) {
                            if (yPosition > pageHeight - 20) {
                                doc.addPage();
                                yPosition = 20;
                            }
                            doc.text(textLine, 20, yPosition);
                            yPosition += lineHeight;
                        });
                        doc.setTextColor(0, 0, 0); // Reset to black
                        doc.setFont(undefined, 'normal');
                        yPosition += 3;
                    } else if (line.includes('|') && line.trim().startsWith('|')) {
                        // Table handling
                        if (!inTable) {
                            // First table row (headers)
                            inTable = true;
                            tableHeaders = line.split('|').map(function(cell) {
                                return cell.trim();
                            }).filter(function(cell) {
                                return cell !== '';
                            });
                        } else if (line.includes('---')) {
                            // Table separator line, skip
                            continue;
                        } else {
                            // Table data row
                            var rowData = line.split('|').map(function(cell) {
                                return cell.trim();
                            }).filter(function(cell) {
                                return cell !== '';
                            });
                            tableRows.push(rowData);
                        }
                        
                        // Check if next line is still part of table
                        if (i + 1 >= lines.length || !lines[i + 1].includes('|') || !lines[i + 1].trim().startsWith('|')) {
                            // End of table, render it
                            this._renderTable(doc, tableHeaders, tableRows, yPosition);
                            yPosition += (tableHeaders.length > 0 ? 1 : 0) * lineHeight + tableRows.length * lineHeight + 10;
                            inTable = false;
                            tableHeaders = [];
                            tableRows = [];
                        }
                    } else if (line.trim() === '') {
                        // Empty line
                        yPosition += lineHeight;
                    } else {
                        // Regular text with potential formatting
                        doc.setFontSize(12);
                        doc.setFont(undefined, 'normal');
                        doc.setTextColor(0, 0, 0);
                        
                        if (line.trim()) {
                            // Handle strikethrough and other inline formatting
                            var processedLine = this._processInlineFormatting(line);
                            var splitText = doc.splitTextToSize(processedLine, 180);
                            splitText.forEach(function(textLine) {
                                if (yPosition > pageHeight - 20) {
                                    doc.addPage();
                                    yPosition = 20;
                                }
                                doc.text(textLine, 10, yPosition);
                                yPosition += lineHeight;
                            });
                        } else {
                            yPosition += lineHeight;
                        }
                    }
                }
                
                this._pdfDoc = doc;
                
                // Display PDF preview
                this._displayPDFPreview(htmlContent);
                
                // Enable download button
                this.byId("downloadButton").setEnabled(true);
                
            } catch (error) {
                MessageToast.show("Error generating PDF: " + error.message);
            }
        },

        _renderTable: function(doc, headers, rows, startY) {
            var cellWidth = 60;
            var cellHeight = 8;
            var startX = 10;
            var currentY = startY;
            
            // Render headers
            if (headers.length > 0) {
                doc.setFont(undefined, 'bold');
                doc.setFontSize(10);
                for (var i = 0; i < headers.length; i++) {
                    var x = startX + i * cellWidth;
                    doc.rect(x, currentY, cellWidth, cellHeight);
                    doc.text(headers[i].substring(0, 15), x + 2, currentY + 6); // Truncate long text
                }
                currentY += cellHeight;
            }
            
            // Render rows
            doc.setFont(undefined, 'normal');
            for (var r = 0; r < rows.length; r++) {
                var row = rows[r];
                for (var c = 0; c < row.length && c < headers.length; c++) {
                    var x = startX + c * cellWidth;
                    doc.rect(x, currentY, cellWidth, cellHeight);
                    var cellText = row[c].replace(/\*\*/g, ''); // Remove bold markers
                    doc.text(cellText.substring(0, 15), x + 2, currentY + 6); // Truncate long text
                }
                currentY += cellHeight;
            }
        },

        _processInlineFormatting: function(text) {
            // Remove strikethrough markers and replace with [crossed out: text]
            text = text.replace(/~~([^~]+)~~/g, '[crossed out: $1]');
            
            // Remove bold markers
            text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
            
            // Remove italic markers
            text = text.replace(/\*([^*]+)\*/g, '$1');
            
            return text;
        },

        _displayPDFPreview: function (htmlContent) {
            var previewHtml = "<div style='padding: 20px; background-color: white; border: 1px solid #ddd; border-radius: 4px; font-family: Arial, sans-serif;'>" +
                             "<h4 style='margin-top: 0; color: #666;'>PDF Preview (Rendered Content)</h4>" +
                             htmlContent +
                             "</div>";
            
            this.byId("pdfPreview").setContent(previewHtml);
        },

        onDownloadPDF: function () {
            if (this._pdfDoc) {
                var fileName = this._fileName.replace('.md', '.pdf');
                this._pdfDoc.save(fileName);
                MessageToast.show("PDF downloaded: " + fileName);
            } else {
                MessageToast.show("No PDF to download");
            }
        },

        _escapeHtml: function (text) {
            var map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        }
    });
});