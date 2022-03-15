绝大部分代码都在文件夹 51 内。

51\barcode\platforms\android\app\src\main\assets\www\index.html:

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Barcode Scanner Button</title>
	<script type="text/javascript" charset="utf-8" src="cordova.js"></script>
	<script id="sap-ui-bootstrap"
		src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js"
		data-sap-ui-theme="sap_fiori_3"
		data-sap-ui-resourceroots='{
			"sap.ui5.walkthrough": "./"
		}'
		data-sap-ui-compatVersion="edge"
		data-sap-ui-async="true"
		data-sap-ui-frameOptions="trusted"
		data-sap-ui-oninit="module:sap/ui/core/ComponentSupport">
	</script>

	<style>
		html, body { height: 100%; }
	</style>
</head>

<body class="sapUiBody sapUiSizeCozy" id="content">
	<div data-sap-ui-component
		data-name="sap.ui5.walkthrough"
		data-height="100%"
		data-id="container"
		data-settings='{"id" : "sap.ui5.walkthrough"}'
		style="height: 100%">
	</div>
</body>
</html>
```

