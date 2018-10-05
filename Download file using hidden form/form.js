Ext.application({
	name   : 'MyApp',
	launch : function() {
	Ext.create('Ext.container.Container', {
		renderTo: Ext.getBody(),
		height: 400,
		width: 200,
		defaultListenerScope: true,
		referenceHolder: true,
		items: [{
			xtype: 'button',
			text: 'Download',
			listeners: {
			click: 'onClickDownload'
		}
		}],
		onClickDownload: function (button) {
		var exportApiUrl = "http://localhost:8080/SpringMVCBasic/pdf";

		var body = Ext.getBody();
		var frame = body.createChild({
			tag:'iframe',
			cls:'x-hidden',
			id:'hiddenform-iframe',
			name:'iframe',
		});
		Ext.create(Ext.form.Panel).submit({
			clientValidation: false,
			method: 'GET',
	/*
			params: {
				param1: 'test'
			},
			*/
			standardSubmit: true,
			target: 'iframe',
			url: exportApiUrl
		});
	}
	});
}
});