Ext.application({
	name   : 'MyApp',
	launch : function() {
	Ext.create('Ext.container.Container', {
		renderTo: Ext.getBody(),
		requires: [
		           'MyApp.Util'
		           ],
		height: 400,
		width: 200,
		defaultListenerScope: true,
		referenceHolder: true,
		layout: {
		type: 'vbox'
	},
		items: [{
			xtype: 'button',
			text: 'Download',
			listeners: {
			click: 'onClickDownload'
		}
		}],

		onClickDownload: function (button) {
		var zip = new JSZip();
	/*			
		// --allow-file-access-from-files
		//  Error : Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
		var promise = $.get("file:///C:/Users/uh9r5/Documents/test.txt");
		zip.file("file.txt", promise);	
	*/

		for (var i = 0; i < 5; i++) {
			var txt = 'hello';
			zip.file("file" + i + ".txt", txt);
		}

		zip.generateAsync({
			type: "base64"
		}).then(function(content) {
			window.location.href = "data:application/zip;base64," + content;
		});       
	}
	});
}
});