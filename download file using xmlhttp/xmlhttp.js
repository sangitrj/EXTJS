Ext.define('MyApp.Util', {
	singleton: true,
	isValidResponse: false,
	downloadFile: function (url, requestBody, method, fileName) {
	var me = this;
	var xmlhttp = new XMLHttpRequest();   
	//xmlhttp.withCredentials = true;
	xmlhttp.open(method, url);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.responseType = "blob";
	xmlhttp.onerror = function (response) {
		alert(response);
	};
	xmlhttp.onload = function (response) {
		if (xmlhttp.readyState === xmlhttp.DONE && xmlhttp.status === 200) {
			var blob = xmlhttp.response;
			var isPDFDownload = false;
			if ( blob.type === 'application/zip') {
				isPDFDownload = true;
			}
			if ((blob.type !== 'application/zip') || isPDFDownload) {
				if (window.navigator.msSaveOrOpenBlob) {
					window.navigator.msSaveOrOpenBlob(blob, fileName);
				}
				else {
					var link = document.createElement('a');
					link.href = window.URL.createObjectURL(blob);
					link.download = fileName;
					document.body.appendChild(link);
					link.click();
				}
			}
		}
	};
	xmlhttp.onloadend = function () {
		alert("LOADED");
	};
	if (requestBody !== '')
		xmlhttp.send(JSON.stringify(requestBody));
	else
		xmlhttp.send();
},
});

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
				/*	var body = {
						param1 : 'test'
					};
					*/
                    MyApp.Util.downloadFile('http://localhost:8080/SpringMVCBasic/pdf', '', 'GET','test.zip');
              
            }
        });
    }
});