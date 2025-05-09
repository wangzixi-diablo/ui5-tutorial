sap.ui.define(["sap/ui/core/mvc/OverrideExecution",
			   "sap/suite/ui/generic/template/lib/TemplateAssembler",
			   "sap/suite/ui/generic/template/ListReport/controller/ControllerImplementation",
			   "sap/suite/ui/generic/template/ListReport/controllerFrameworkExtensions",
			   "sap/suite/ui/generic/template/genericUtilities/testableHelper",
			   "sap/suite/ui/generic/template/listTemplates/filterSettingsPreparationHelper",
			   "sap/suite/ui/generic/template/js/staticChecksHelper",
			   "sap/suite/ui/generic/template/js/preparationHelper",
			   "sap/base/util/deepExtend",
			   "sap/suite/ui/generic/template/genericUtilities/FeError",
			   "sap/suite/ui/generic/template/js/StableIdHelper",
			   "sap/ui/model/Context",
			   "sap/suite/ui/generic/template/js/AnnotationHelper",
			   "sap/base/util/isEmptyObject",
			   "sap/suite/ui/generic/template/ListReport/AnnotationHelper",
			   "sap/insights/CardHelper"
			  ], function(OverrideExecution, TemplateAssembler, ControllerImplementation, controllerFrameworkExtensions, testableHelper, filterSettingsPreparationHelper,
					staticChecksHelper, preparationHelper, deepExtend, FeError, StableIdHelper, Context, AnnotationHelper, isEmptyObject, LRAnnotationHelper, CardHelper) {
	"use strict";

	var	sClassName = "ListReport.Component";
	function getMethods(oComponent, oComponentUtils) {
		var oViewProxy = {};

		return {
			oControllerSpecification: {
				getMethods: ControllerImplementation.getMethods.bind(null, oViewProxy),
				oControllerDefinition: controllerFrameworkExtensions,
				oControllerExtensionDefinition: { // callbacks for controller extensions
					// will be called when the SmartFilterbar has been initialized
					onInitSmartFilterBar: function(oEvent) {},
					// allows extensions to store their specific state. Therefore, the implementing controller extension must call fnSetAppStateData(oControllerExtension, oAppState).
					// oControllerExtension must be the ControllerExtension instance for which the state should be stored. oAppState is the state to be stored.
					// Note that the call is ignored if oAppState is faulty
					provideExtensionAppStateData: function(fnSetAppStateData){},
					// asks extensions to restore their state according to a state which was previously stored.
					// Therefore, the implementing controller extension can call fnGetAppStateData(oControllerExtension) in order to retrieve the state information which has been stored in the current state for this controller extension.
					// undefined will be returned by this function if no state or a faulty state was stored.
					restoreExtensionAppStateData: function(fnGetAppStateData){},
					// gives extensions the possibility to make sure that certain fields will be contained in the select clause of the table binding.
					// This should be used, when custom logic of the extension depends on these fields.
					// For each custom field the extension must call fnEnsureSelectionProperty(oControllerExtension, sFieldname).
					// oControllerExtension must be the ControllerExtension instance which ensures the field to be part of the select clause.
					// sFieldname must specify the field to be selected. Note that this must either be a field of the entity set itself or a field which can be reached via a :1 navigation property.
					// In the second case sFieldname must contain the relative path.
					ensureFieldsForSelect: function(fnEnsureSelectionProperty, sControlId){},
					// allows extension to add filters. They will be combined via AND with all other filters
					// For each filter the extension must call fnAddFilter(oControllerExtension, oFilter)
					// oControllerExtension must be the ControllerExtension instance which adds the filter
					// oFilter must be an instance of sap.ui.model.Filter
					addFilters: function(fnAddFilter, sControlId){}
				}
			},
			oComponentData: { // data defined by component (i.e. not to be overridden by manifest
				templateName: "sap.suite.ui.generic.template.ListReport.view.ListReport",
				designtimePath: "sap/suite/ui/generic/template/designtime/ListReport.designtime"
			},
			init: function() {
				var oTemplatePrivate = oComponent.getModel("_templPriv");
				oTemplatePrivate.setProperty("/listReport", {}); // Note that component properties are not yet available here
            },
			adaptToChildContext: function(sCurrentChildContext) {
				oViewProxy.adaptToChildContext(sCurrentChildContext);
			},
			refreshBinding: function(bUnconditional, mRefreshInfos) {
				oViewProxy.refreshBinding(bUnconditional, mRefreshInfos);
			},
			getItems: function(){
				return oViewProxy.getItems();
			},
			displayNextObject: function(aOrderObjects){
				return oViewProxy.displayNextObject(aOrderObjects);
			},
			/* Returns the list report templating settings in the following structure:
				{
					annotatedActions: {},	// manifest settings for DataFieldForAction command,
					condensedTableLayout: true/false,
					bNewAction: true/false,
					dataLoadSettings: {},
					controlConfigurationSettings: {},
					isIndicatorRequired: true/false,
					isResponsiveTable: true/false,
					isSelflinkRequired: true/false,
					isSemanticallyConnected: true/false,
					multiSelect: true/false,
					outbounds: {},	// manifest outbound navigations
					quickVariantSelectionX: {
						showCounts: true/false,
						variants: {}
					},
					smartVariantManagement: true/false,
					routeConfig: {},
					subPages: {},
					tableSettings: {
						commandExecution: {}	// details of all standard actions with an associated keyboard shortcut
						extensionActions: []	// details of all extension action including its command details
						headerInfo: {}
						inlineDelete: true/false
						mode: "<string>",
						multiEdit: {},	// multiEdit feature settings
						multiSelect: true/false,
						onlyForDelete: true/false,
						selectAll: true/false,
						selectionLimit: <number>,
						type: "<string>",	// table type
						createWithParameterDialog: {}
					}
					targetEntities: {},
					isWorklist: true/false
				}
			*/
			getTemplateSpecificParameters: function(oMetaModel, oSettings, Device, sLeadingEntitySet, oInternalManifest, oModel, oDraftContext) {
				function checkIfSmartChart(sEntitySet, oTabItem) {
					var oEntitySet = oMetaModel.getODataEntitySet(sEntitySet);
					var oEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
					var sAnnotation, sAnnotationPath, oVariant;
					sAnnotationPath = oTabItem.annotationPath;
					oVariant = !!sAnnotationPath && oEntityType[sAnnotationPath];
					if (oVariant && oVariant.PresentationVariant) {
						// oVariant is SelectionPresentationVariant
						if (oVariant.PresentationVariant.Visualizations) {
							sAnnotation =  oVariant.PresentationVariant.Visualizations[0].AnnotationPath;
						} else if (oVariant.PresentationVariant.Path) {
							var sPresentationVariantPath = oVariant.PresentationVariant.Path.split("@")[1];
							var oPresentationVariantAnnotation = sPresentationVariantPath && oEntityType[sPresentationVariantPath];
							sAnnotation =  oPresentationVariantAnnotation.Visualizations[0].AnnotationPath;
						}

					} else if (oVariant && oVariant.Visualizations) {
						// oVariant is PresentationVariant
						sAnnotation =  oVariant.Visualizations[0].AnnotationPath;
					}
					return !!(sAnnotation && sAnnotation.indexOf("com.sap.vocabularies.UI.v1.Chart") > -1);
				}
				function isNewAction(){
					var sBindingPath = "/" + sLeadingEntitySet;
					var newActionContext = new Context(oModel, sBindingPath);
					var sFunctionImportPath = oDraftContext.getODataDraftFunctionImportName(newActionContext, "NewAction");
					return !!sFunctionImportPath;
				}
				function getMultiEditSettings(oVariant, oLrSettings, oEntitySet, oEntityType) {
					var oTableSettings = oVariant ? oVariant.tableSettings : oLrSettings.tableSettings;
					var bMultiEdit = false;
					var sSelectionMode = oTableSettings.mode;
					if (oTableSettings.multiEdit.enabled !== false && oLrSettings.isResponsiveTable && !oLrSettings.isWorklist) {
						bMultiEdit = true;
						if (oEntitySet["Org.OData.Capabilities.V1.UpdateRestrictions"] && oEntitySet["Org.OData.Capabilities.V1.UpdateRestrictions"].Updatable && oEntitySet["Org.OData.Capabilities.V1.UpdateRestrictions"].Updatable.Bool === "false") {
							bMultiEdit = false;
						} else if (sSelectionMode === "None") {
							sSelectionMode = oTableSettings.multiSelect ? "MultiSelect" : "SingleSelectLeft";
						}
						var sMultiEditAnnotation = oTableSettings.multiEdit.annotationPath;
						if (sMultiEditAnnotation) {
							staticChecksHelper.checkErrorforMultiEditDialog(oEntityType, sMultiEditAnnotation);
							var aRecords = oEntityType[sMultiEditAnnotation].Data;
							var aMultiEditFields = aRecords.filter(function (oRecord) {
								var oProperty = oMetaModel.getODataProperty(oEntityType, oRecord.Value.Path);
								if (oProperty) {
									return oRecord.RecordType === "com.sap.vocabularies.UI.v1.DataField" && oProperty["sap:updatable"] !== "false" && (!oRecord["com.sap.vocabularies.UI.v1.Hidden"] || oRecord["com.sap.vocabularies.UI.v1.Hidden"].Bool === "false")
										&& (!oProperty["Org.OData.Core.V1.Immutable"] || oProperty["Org.OData.Core.V1.Immutable"].Bool === "false");
								}
							});
						}
					}
					return {
						"multiEditEnabled": bMultiEdit,
						"selectionMode": sSelectionMode,
						"fields": aMultiEditFields
					};
				}
				/* sTabKey and sTabIdentifier are used in case of multiple views scenario and represents the individual view's key and individual view's
				   identifier respectively, as defined in the manifest. They may or maynot be identical. Originally, these two strings were intended to be
				   identical but it was missed to introduce this check and document it correctly and thus for compatibility reasons, we need to support 
				   scenarios where they could be different. For example:
				   "quickVariantSelectionX": {
				       "variants": {
				           "1": {	=> sTabIdentifier
						       "key": "tab1"	=> sTabKey
						   }
					   }
				   } */
				function fnTableLevelActions(sTabKey, sTabIdentifier) {
					function fnGetStandardActions(sTabKey) {
						/*  Collection of standard actions available on LR. Maps the logical action name to an object containing the relevant properties i.e.
								action => action name corresponding to the standard action
								callbackName => standard button's press event handler used in the command execution
								text => button's text
								id => button's ID
								press => triggers the action defined in the command execution
								enabled => button's enablement
								isStandardAction =>	represents whether the action is a standard action or overridden by the custom action
								
							If a custom action is defined with a valid 'logicalAction', then there could be two cases:

							Case 1: Custom action has an ID
								In this case, the corresponding standard button does not get created and instead an extension button 
								gets created, which takes over some standard functionality, especially the keyboard shortcut and the following properties:
									callbackName, text, enabled and press (if not defined in the manifest)

							Case 2: Custom action does not have an ID
								Here, the corresponding standard button gets created and takes over everything defined explicitly in the manifest. 
								
							In both the cases, isStandardAction is set to false.
							TODO: isStandardAction is only used to set different types of CustomData and OverflowToolbarLayoutData in the respective fragments.
								However, additional CustomData should not harm, and regarding OverflowToolbarLayoutData, importance should always be the default
								(if not defined otherwise) and so, it should be removed and the places where these CustomData are being consumed should be refactored (if required). */
						return {
							Create: {
								action: "Create",
								callbackName: "._templateEventHandlers.addEntry",
								text: oLrSettings.createWithFilters ? "{i18n>CREATE_NEW_OBJECT}" : "{i18n>CREATE_OBJECT}",
								id: StableIdHelper.getStableId({ type: "ListReportAction", subType: "Create", sQuickVariantKey: sTabKey }),
								press: "cmd:Create",
								enabled: true,
								isStandardAction: true
							},
							CreateWithFilters: {
								action: "CreateWithFilters",
								callbackName: "._templateEventHandlers.addEntryWithFilters",
								text: "{i18n>ST_CREATE_WITH_FILTERS}",
								id: StableIdHelper.getStableId({ type: "ListReportAction", subType: "CreateWithFilter", sQuickVariantKey: sTabKey }),
								press: "cmd:CreateWithFilters",
								enabled: "{_templPriv>/generic/bDataAreShownInTable}",
								isStandardAction: true
							},
							Delete: {
								action: "Delete",
								callbackName: "._templateEventHandlers.deleteEntries",
								text: "{i18n>DELETE}",
								id: StableIdHelper.getStableId({ type: "ListReportAction", subType: "Delete", sQuickVariantKey: sTabKey }),
								press: "cmd:Delete",
								enabled: "{_templPriv>/listReport/deleteEnabled}",
								isStandardAction: true
							}
						};
					}

					function fnGetOverriddenStandardAction(oStandardActionToBeOverridden, oExtensionAction) {
						if (isEmptyObject(oStandardActionToBeOverridden)) {
							throw new FeError(sClassName, "Identified an invalid value of 'logicalAction' i.e., '" + oExtensionAction.logicalAction + "' for a custom action in the manifest.");
						}

						return deepExtend({}, oStandardActionToBeOverridden, {
							callbackName: oExtensionAction.press,
							text: oExtensionAction.text,
							id: oExtensionAction.id && AnnotationHelper.getBreakoutActionButtonId(oExtensionAction, oLrSettings.quickVariantSelectionX ? oLrSettings.quickVariantSelectionX.variants[sTabIdentifier] : undefined),
							enabled: AnnotationHelper.getBreakoutActionEnabledKey(oExtensionAction, oLrSettings.quickVariantSelectionX ? oLrSettings.quickVariantSelectionX.variants[sTabIdentifier] : undefined),
							press: "cmd:" + oExtensionAction.logicalAction,
							isStandardAction: false
						});
					}

					function fnGetLineItemQualifier() {
						var oPresentationVariant = oMetaModel.getObject(oEntityType.$path + "/" + LRAnnotationHelper.getRelevantPresentationVariantPath(oEntityType, oLrSettings.annotationPath));
						if (oPresentationVariant && oPresentationVariant.Visualizations) {
							var oLineItemAnnotationPath = oPresentationVariant.Visualizations.find(function (oVisualization) {
								var sPath = "/" + oVisualization.AnnotationPath.slice(1);
								return sPath.indexOf("com.sap.vocabularies.UI.v1.LineItem") > -1;
							});
							if (oLineItemAnnotationPath) {
								return oLineItemAnnotationPath.AnnotationPath.split("#")[1] || "";
							}
						}

						if (oLrSettings.quickVariantSelectionX) {
							var oVariant = oEntityType[oLrSettings.quickVariantSelectionX.variants[sTabIdentifier].annotationPath];
							if (oVariant && oVariant.Visualizations) {
								var sAnnotation = oVariant.Visualizations[0].AnnotationPath;
								if (sAnnotation) {
									if (sAnnotation.indexOf("com.sap.vocabularies.UI.v1.LineItem") > -1) {
										return (oEntityType.$path + "/" + sAnnotation.slice(1)).split("#")[1] || "";
									}
								}
							}

						}
						return "";
					}
					
					var oStandardActions = fnGetStandardActions(sTabKey);
					var oControllerExtensions = oComponentUtils.getControllerExtensions();
					var aExtensionActionsWithoutLogicalAction = [],
						mCustomActionsWithCommand = Object.create(null),
						mAnnotatedActionsWithCommand = Object.create(null),
						mOutboundActionsWithCommand = Object.create(null);
					
					Object.values(oControllerExtensions && oControllerExtensions.Actions || {}).forEach(function (oExtensionAction) {
						if (oExtensionAction.logicalAction) {
							// In case of multiple views, custom action should only override the standard action for the main entity set tab
							if (oLrSettings.quickVariantSelectionX && oLrSettings.quickVariantSelectionX.variants[sTabIdentifier].entitySet && oLrSettings.quickVariantSelectionX.variants[sTabIdentifier].entitySet !== sLeadingEntitySet) {
								return;
							}
							// created a defensive copy of the standard action to make it less susceptible to errors
							oStandardActions[oExtensionAction.logicalAction] = fnGetOverriddenStandardAction(deepExtend({}, oStandardActions[oExtensionAction.logicalAction]), oExtensionAction);
						} else if (!oExtensionAction.global) {
							var oStableIdParameters = oExtensionAction.global ?
								{ type: "Action", subType: "Global", sAction: oExtensionAction.id } :
								{ type: "ListReportAction", subType: "TableExtension", sAction: oExtensionAction.id, sQuickVariantKey: sTabKey };
							var sActionId = StableIdHelper.getStableId(oStableIdParameters);
							if (oExtensionAction.command) {
								mCustomActionsWithCommand[oExtensionAction.id] = {
									id: sActionId,
									action: oExtensionAction.command,
									callbackName: oExtensionAction.press
								};
								oExtensionAction.press = "cmd:" + oExtensionAction.command;
							}
							oExtensionAction.enabled = AnnotationHelper.getBreakoutActionEnabledKey(oExtensionAction, oLrSettings.quickVariantSelectionX ? oLrSettings.quickVariantSelectionX.variants[sTabIdentifier] : undefined);
							oExtensionAction.id = sActionId;
							aExtensionActionsWithoutLogicalAction.push(oExtensionAction);
						}
					});

					// handle keyboard shortcut related manifest settings for actions defined via annotations e.g. DataFieldForAction and DataFieldForIBN
					var sLineItemQualifier = fnGetLineItemQualifier();
					(oEntityType["com.sap.vocabularies.UI.v1.LineItem" + (sLineItemQualifier ? "#" + sLineItemQualifier : "")] || []).forEach(function(oDataField) {
						switch (oDataField.RecordType) {
							case "com.sap.vocabularies.UI.v1.DataFieldForAction":
								var oCommandDetails = oComponentUtils.getToolbarDataFieldForActionCommandDetails(oDataField, oLrSettings, oLrSettings.quickVariantSelectionX ? oLrSettings.quickVariantSelectionX.variants[sTabIdentifier] : undefined);
								if (!isEmptyObject(oCommandDetails)) {
									mAnnotatedActionsWithCommand[oCommandDetails.id] = oCommandDetails;
								}
								break;
							case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
								var oCommandDetails = oComponentUtils.getToolbarDataFieldForIBNCommandDetails(oDataField, oLrSettings, oInternalManifest, oLrSettings.quickVariantSelectionX ? oLrSettings.quickVariantSelectionX.variants[sTabIdentifier] : undefined);
								if (!isEmptyObject(oCommandDetails)) {
									mOutboundActionsWithCommand[oCommandDetails.id] = oCommandDetails;
								}
								break;
							default:
								break;
						}
					});

					return {
						commandExecution: deepExtend(oStandardActions, mCustomActionsWithCommand, mAnnotatedActionsWithCommand, mOutboundActionsWithCommand),
						extensionActions: aExtensionActionsWithoutLogicalAction
					};
				}

				var oLrSettings = deepExtend({}, oSettings);
				oLrSettings.targetEntities = {};
				//Sets the forceLinkRendering at tableSetting level to fecilitate use in templating. targetEntities information to used at runtime to resolve the quickview entity
				function setTargetEntity(oEntitySet) {
					if (!oLrSettings.targetEntities[oEntitySet.entityType]) {
						oLrSettings.targetEntities[oEntitySet.entityType] = preparationHelper.getTargetEntityForQuickView(oMetaModel, oEntitySet);
					}
				}
				
				oLrSettings.bNewAction = oSettings.useNewActionForCreate && isNewAction();
				var oExtensions = oComponentUtils.getControllerExtensions();
				var oExtensionActions = oExtensions && oExtensions.Actions;

				var oLeadingEntitySet = oMetaModel.getODataEntitySet(sLeadingEntitySet);
				var oEntityType = oMetaModel.getODataEntityType(oLeadingEntitySet.entityType);

				// get LineItem by searching for SelectionPresentationVariant without Qualifier
				var oLineItemDefault = preparationHelper.getLineItemFromVariant(oMetaModel, oLeadingEntitySet.entityType);
				var oMultiEditSettings;
				if (oLrSettings.quickVariantSelectionX) {
					// tableSettings for component used as default for variants
					var oDefaultTableSettings = preparationHelper.getNormalizedTableSettings(oMetaModel, oLrSettings, Device, sLeadingEntitySet, oExtensionActions, oLineItemDefault);
					//for multiple variants
					var oVariants = oLrSettings.quickVariantSelectionX.variants || {};
					for (var sKey in oVariants) {
						var sEntitySet = oVariants[sKey].entitySet || sLeadingEntitySet;
						var oEntitySet = oMetaModel.getODataEntitySet(sEntitySet);
						//support for reducing entitySet - Skip if entitySet not present in metadata
						if (!oEntitySet) {
							delete oVariants[sKey];
							continue;
						}

						oVariants[sKey].isSmartChart = checkIfSmartChart(sEntitySet, oVariants[sKey]);
						if (!oVariants[sKey].isSmartChart) {
							// get LineItem for current variant by searching for SelectionPresentationVariant (variant is used as Qualifier)
							var oLineItem = preparationHelper.getLineItemFromVariant(oMetaModel, oMetaModel.getODataEntitySet(sEntitySet).entityType, oVariants[sKey].annotationPath && oVariants[sKey].annotationPath.split("#")[1]);
							oVariants[sKey].tableSettings = oVariants[sKey].tableSettings || oDefaultTableSettings;
							oVariants[sKey].tableSettings = preparationHelper.getNormalizedTableSettings(oMetaModel, oVariants[sKey], Device, sEntitySet, oExtensionActions, oLineItem);
							//default value of selectAll is different for LR/ALP from OP hence it is not calculated in preparationHelper but separately in respective components.
							oVariants[sKey].tableSettings.selectAll = (oVariants[sKey].tableSettings.selectAll === undefined ? false : oVariants[sKey].tableSettings.selectAll);
					
							if (oLrSettings.isResponsiveTable === undefined){
								oLrSettings.isResponsiveTable = oVariants[sKey].tableSettings.type === "ResponsiveTable";
							} else if (oLrSettings.isResponsiveTable !== (oVariants[sKey].tableSettings.type === "ResponsiveTable")) {
								throw new FeError(sClassName, "Variant with key " + sKey + " resulted in invalid Table Type combination. Please check documentation and update manifest.json.");
							}
							var oVariantEntityType = oMetaModel.getODataEntityType(oEntitySet.entityType);
							if (oVariantEntityType && oVariantEntityType.property && oVariants[sKey].tableSettings && oVariants[sKey].tableSettings.createWithParameterDialog) {
								staticChecksHelper.checkErrorforCreateWithDialog(oVariantEntityType, oVariants[sKey].tableSettings);
								oLrSettings.quickVariantSelectionX.variants[sKey].tableSettings.createWithParameterDialog.id = StableIdHelper.getStableId({type: 'ListReportAction', subType: 'CreateWithDialog', sQuickVariantKey: oVariants[sKey].key});
							}
							if (oVariants[sKey].tableSettings.multiEdit) {
								oMultiEditSettings = getMultiEditSettings(oVariants[sKey], oLrSettings, oEntitySet, oEntityType);
								oVariants[sKey].tableSettings.multiEdit.enabled = oMultiEditSettings.multiEditEnabled;
								if (oMultiEditSettings.multiEditEnabled) {
									oVariants[sKey].tableSettings.multiEdit.fields = oMultiEditSettings.fields;
									oVariants[sKey].tableSettings.mode = oMultiEditSettings.selectionMode;
								}
							}
							setTargetEntity(oEntitySet);
							oVariants[sKey].tableSettings = deepExtend(oVariants[sKey].tableSettings, fnTableLevelActions(oVariants[sKey].key, sKey));
						}
					}

					delete oLrSettings.tableSettings;
					//handle where variants contain only charts
					if (oLrSettings.isResponsiveTable === undefined){
						oLrSettings.isResponsiveTable = true;
					}
				} else {
					//for single  variant
					oLrSettings.tableSettings = preparationHelper.getNormalizedTableSettings(oMetaModel, oSettings, Device, sLeadingEntitySet, oExtensionActions, oLineItemDefault);
					//default value of selectAll is different for LR/ALP from OP hence it is not calculated in preparationHelper but separately in respective components.
					oLrSettings.tableSettings.selectAll = (oLrSettings.tableSettings.selectAll === undefined ? false : oLrSettings.tableSettings.selectAll);
					oLrSettings.isResponsiveTable = oLrSettings.tableSettings.type === "ResponsiveTable";
					if (oLrSettings.tableSettings.multiEdit) {
						oMultiEditSettings = getMultiEditSettings(undefined, oLrSettings, oLeadingEntitySet, oEntityType);
						oLrSettings.tableSettings.multiEdit.enabled = oMultiEditSettings.multiEditEnabled;
						if (oMultiEditSettings.multiEditEnabled) {
							oLrSettings.tableSettings.multiEdit.fields = oMultiEditSettings.fields;
							oLrSettings.tableSettings.mode = oMultiEditSettings.selectionMode;
						}
					}
					setTargetEntity(oLeadingEntitySet);
					oLrSettings.tableSettings = deepExtend(oLrSettings.tableSettings, fnTableLevelActions());
				}
				oLrSettings.controlConfigurationSettings = filterSettingsPreparationHelper.getControlConfigurationSettings(oLrSettings, oEntityType, oLeadingEntitySet, oModel);
				var oDateProperties = filterSettingsPreparationHelper.getDatePropertiesSettings(oLrSettings, oEntityType, oLeadingEntitySet, oModel);
				if (oComponent && oComponent.oModels) {
					oComponent.getModel("_templPriv").setProperty("/listReport/datePropertiesSettings", oDateProperties);
					if (!oLrSettings.subPages || oLrSettings.subPages.length === 0) { //LR only app
						oComponent.getModel("_templPriv").setProperty("/listReport/bSupressCardRowNavigation", true);
					} else if (oLrSettings.subPages[0].navigation) { //OP with external navigation via manifest
						oComponent.getModel("_templPriv").setProperty("/listReport/bSupressCardRowNavigation", true);
					}
				}
				if (oEntityType && oEntityType.property && oSettings && oLrSettings && oLrSettings.tableSettings && oLrSettings.tableSettings.createWithParameterDialog) {
					staticChecksHelper.checkErrorforCreateWithDialog(oEntityType, oLrSettings.tableSettings);
					oLrSettings.tableSettings.createWithParameterDialog.id = StableIdHelper.getStableId({type: 'ListReportAction', subType: 'CreateWithDialog'});
				}
				oLrSettings.isSelflinkRequired = true;
				oLrSettings.isIndicatorRequired = true;
				oLrSettings.isSemanticallyConnected = false;
				oLrSettings.bInsightsEnabled = false;
				// If app is running in Microsoft Teams environment then Insight should not execute
				if (oComponent && oComponent.oModels) {
					var oTemplatePrivateGlobal = oComponent.getModel("_templPrivGlobal");
					if (!oTemplatePrivateGlobal.getProperty("/generic/isTeamsModeActive")) {
						CardHelper.getServiceAsync("UIService").then(function(oInstance){
							oLrSettings.bInsightsEnabled = true;
							var oTemplatePrivate = oComponent.getModel("_templPriv");
							oTemplatePrivate.setProperty("/listReport/oInsightsInstance", oInstance);
						}).catch(function(response) {
							oLrSettings.bInsightsEnabled = false;
						});
					}
				}

				return oLrSettings;
			},
			executeAfterInvokeActionFromExtensionAPI: function(oState) {
				oState.oPresentationControlHandler.setEnabledToolbarButtons();
				oState.oPresentationControlHandler.setEnabledFooterButtons();
			},
			getCurrentState: function(){
				return oViewProxy.getCurrentState.apply(null, arguments);
			},
			getInitialState: function(){
				return { permanentState: {} };
			},
			applyState: function(){
				oViewProxy.applyState.apply(null, arguments);
			},
			getStatePreserverSettings: function(){
				/*
				 * Re-apply state even if (inFCL) another component is opened
				 * Originally (for OP/Canvas), this was always given, and they expect the same.
				 * In LR, if the OP is opened in FCL, there is obviously data shown in the table, so the appState also contains this fact. 
				 * When re-applying the appState, this leads to
				 * - selecting the data of LR again (maybe unneeded request leading to performance problem, but maybe also useful in special cases)
				 * - collapsing the header, as the fact whether the header is collapsed is not stored separately in the appState
				 * 
				 * Thus, for the time being, we need to have this configurable. But we should reiterate on this - should we store the fact whether header is expanded 
				 * separately (would probably make sense also when user explicitly expands/collapses header)? And what about performance?
				 * Additional question: Should also the question whether (expanded) header is pinned stored in appState?
				 * 
				 * Setting this to true (or completely removing the configuration option) leads to failing OPA test OPATestsForSegmentedButtonsTest_OP that
				 * starts an FCL app, triggers data selection (without collapsing header!), opens the OP and then uses the search field on the LR (that is not found 
				 * if header is collapsed)
				 */
				return {
					callAlways: false
				};
			}
		};
	}

	testableHelper.testableStatic(getMethods, "Component_getMethods");

	return TemplateAssembler.getTemplateComponent(getMethods,
		"sap.suite.ui.generic.template.ListReport", {
			metadata: {
				library: "sap.suite.ui.generic.template",
				properties: {
					// hide chevron for unauthorized inline external navigation?
					"hideChevronForUnauthorizedExtNav": {
						"type": "boolean",
						"defaultValue": "false"
					},
					treeTable: { // obsolete - use tableSettings.type instead
						type: "boolean",
						defaultValue: false
					},
					gridTable: { // obsolete - use tableSettings.type instead
						type: "boolean",
						defaultValue: false
					},
					tableType: { // obsolete - use tableSettings.type instead
						type: "string",
						defaultValue: undefined
					},
					multiSelect: { // obsolete - use tableSettings.multiSelect instead
						type: "boolean",
						defaultValue: false
					},
					tableSettings: {
						type: "object",
						properties: { 	// Unfortunately, managed object does not provide any specific support for type "object". We use just properties, and define everything below exactly like the properties of the component.
										// Currently, everything here is just for documentation, but has no functionality. In future, a mechanism to fill default values shall be added
							type: { // Defines the type of table to be used. Possible values: ResponsiveTable, GridTable, TreeTable, AnalyticalTable.
								type: "string",
								defaultValue: undefined // If sap:semantics=aggregate, and device is not phone, AnalyticalTable is used by default, otherwise ResponsiveTable
							},
							multiSelect: { // Defines, whether selection of multiple entries is possible. Only relevant, if actions exist.
								type: "boolean",
								defaultValue: false
							},
							inlineDelete: { // Defines whether, if a row can be deleted, this possibility should be provided inline
								type: "boolean",
								defaultValue: false
							},
							selectAll: { // Defines, whether a button to select all entries is available. Only relevant if multiSelect is true.
								type: "boolean",
								defaultValue: false
							},
							addCardtoInsightsHidden: {
								type: "boolean",
								defaultValue: false
							},
							selectionLimit: { // Defines the maximal number of lines to be loaded by a range selection from the backend. Only relevant for table type <> ResponsiveTable, if multiSelect is true, and selectAll is false.
								type: "int",
								defaultValue: 200
							},
							multiEdit: { //Define whether multiple rows can be edited
								type: "object",
								properties: {
									enabled : {
										type: "boolean",
										defaultValue: true
									},
									annotationPath : { //annotation path pointing to FieldGroup
										type: "string"
									},
									ignoredFields : { // Exclude fields from dialog (supported for key user UI adaptation only)
										type: "string",
										defaultValue: ""
									}
								}
							}
						}
					},
					"createWithFilters": "object",
					"condensedTableLayout": "boolean",
					// properties "smartVariantManagement" and "variantManagementHidden" are interpreted differently in worklist then in non-worklist. Currently, this is implemented in xml fragments
					// (SmartTable.fragment and FullscreenPage.fragment). Todo: move this to pre-analysis in templateSpecificPreparation
					// true = one variant for filter bar and table, false = separate variants for filter and table
					// in combination with worklist and variantManagementHidden = false: Show variant management in title (otherwise in table)  
					smartVariantManagement: { 
						type: "boolean",
						defaultValue: false
					},
					hideTableVariantManagement: { // obsolete, and not evaluated (but kept here to keep track) - use combination of smartVariantManagement and variantManagementHidden instead
						type: "boolean",
						defaultValue: false
					},
					// hide Variant Management from SmartFilterBar. Use together with smartVariantManagement to create a ListReport without Variant Management
					// in combination with worklist: don't show any variant management 
					variantManagementHidden: {
						type: "boolean",
						defaultValue: false
					},
					createWithParameterDialog : {
						type: "object",
						properties: {
							fields : {
								type: "object"
							}
						}
					},
					"creationEntitySet": "string",
					"enableTableFilterInPageVariant":{
						"type": "boolean",
						"defaultValue": false
					},
					"useNewActionForCreate":{ //indicates weather newAction property will be used for draft creation
						"type": "boolean",
						"defaultValue": false
					},
					"multiContextActions": "object",
					isWorklist: {
						type: "boolean",
						defaultValue: false
					},
					filterSettings: filterSettingsPreparationHelper.getFilterSettingsMetadata(),
					dataLoadSettings: {
						type: "object",
						properties: {
							loadDataOnAppLaunch: {
								type:"string",
								defaultValue: "ifAnyFilterExist"  //can contain 3 values always/never/ifAnyFilterExist
							}
						}
					},
					quickVariantSelectionX: {
						type: "object",
						properties: { // Currently, everything here is just for documentation, but has no functionality. In future, a mechanism to fill default values shall be added
							showCounts: {
								type: "boolean",
								defaultValue: false
							},
							variants: { // A map -  keys to be defined by the application.
								type: "object",
								mapEntryProperties: { // describes how the entries of the map should look like
									key: {
										type: "string",
										optional: true
									},
									annotationPath: { // annotation path pointing to SelectionPresentationVariant or SelectionVariant
										type: "string"
									},
									entitySet: {
										type: "string",
										optional: true
									},
									tableSettings: {
										type: "object",
										properties: { 	// Unfortunately, managed object does not provide any specific support for type "object". We use just properties, and define everything below exactly like the properties of the component.
														// Currently, everything here is just for documentation, but has no functionality. In future, a mechanism to fill default values shall be added
											type: { // Defines the type of table to be used. Possible values: ResponsiveTable, GridTable, TreeTable, AnalyticalTable.
												type: "string",
												defaultValue: undefined // If sap:semantics=aggregate, and device is not phone, AnalyticalTable is used by default, otherwise ResponsiveTable
											},
											multiSelect: { // Defines, whether selection of multiple entries is possible. Only relevant, if actions exist.
												type: "boolean",
												defaultValue: false
											},
											inlineDelete: { // Defines whether, if a row can be deleted, this possibility should be provided inline
												type: "boolean",
												defaultValue: false
											},
											selectAll: { // Defines, whether a button to select all entries is available. Only relevant for table type <> ResponsiveTable, and if multiSelect is true.
												type: "boolean",
												defaultValue: false
											},
											selectionLimit: { // Defines the maximal number of lines to be loaded by a range selection from the backend. Only relevant for table type <> ResponsiveTable, if multiSelect is true, and selectAll is false.
												type: "int",
												defaultValue: 200
											}
										}
									}
								}
							}
						}
					},
					quickVariantSelection: {
						type: "object",
						properties: { // Currently, everything here is just for documentation, but has no functionality. In future, a mechanism to fill default values shall be added
							showCounts: {
								type: "boolean",
								defaultValue: false
							},
							variants: {
								type: "object",
								mapEntryProperties: {
									key: {
										type: "string",
										optional: true
									},
									annotationPath: { // annotation path pointing to SelectionVariant
										type: "string"
									}
								}
							}
						}
					},
					annotationPath : {
						//This setting allows developer to choose SV from annotation
						type: "string",
						defaultValue: undefined
					},
					editFlow: {
						/*This setting allows developer to determine the edit flow of the app
						this supports three values "direct", "display", "inline"
						direct -> LR table rows will have a pen icon instead of chevron and navigation will be directly to edit mode of OP
						display -> LR table rows will have chevron and navigation will be to the display mode or edit mode of OP based on the record
						inline -> futuristic, and not supported yet.
						*/
						type: "string",
						defaultValue: "display"
						}
				},
				"manifest": "json"
			}
		});
});
