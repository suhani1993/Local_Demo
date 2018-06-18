/**
 * 
 * To use this add your notifications and it will appear in header
 * 
 * Show info message
 * NotifUtils.add(response.message, NotifUtils.INFO);
 * 
 * Show success message
 * NotifUtils.add(response.message, NotifUtils.SUCCESS);
 * 
 * Show warning message
 * NotifUtils.add(response.message, NotifUtils.WARN);
 * 
 * Show error message
 * NotifUtils.add(response.message, NotifUtils.ERROR);
 * 
 * 
 * */


var NotifUtils = {

	ERROR : 'alert-danger',
	WARN : 'alert-warning',
	INFO : 'alert-info',
	SUCCESS : 'alert-success',

	id : 'SYSTEM-TOOLS-ALERT-MESSAGE-CONTAINER',
	showing : false,
	
	index : 0,
	lastTimeOut : null,

	messageArray : [],

	init : function() {
		if (!$('#' + this.id).exists()) {
			$('body')
					.append(
							'<div id="'
									+ this.id
									+ '" style="position: fixed; top:1%; right: 5%; left :5%; z-index: 5000;"></div>');
		}
	},

	add : function(message, type) {
		
		this.init();
	
		if(NotifUtils.lastTimeOut != null){
			console.log("---clearing---");
			clearTimeout(NotifUtils.lastTimeOut);
			$('#' + NotifUtils.id + " .alert").hide();
			$('#' + NotifUtils.id + " .alert").alert('close');
		}
		
		var html = this.getDefaultHTML(message, type, true);

		$('#' + this.id).append(html);
		$('#' + NotifUtils.id + " .alert:first").alert();
		
		NotifUtils.lastTimeOut = setTimeout(function() {
			$('#' + NotifUtils.id + " .alert:first").alert('close');
		}, 3000);
		
		// if(!this.showing){
		// NotifUtils.showing = true;
		// this.showTime();
		//		}		
	},

	hide : function(selector) {
		if ($(selector).exists()) {
			$(selector).alert('close');
		} else {
			console.info("Alert selector " + selector + " dos not exists.")
		}
	},
	/*
	 * Default HTML required for date and time picker
	 */
	getDefaultHTML : function(message, typeClass, addCloseButton) {

		var retString = "";

		retString += '<div id="'+ (NotifUtils.index++) +'" class="alert ' + typeClass + ' fade in" style="max-width : 600px; margin : auto;">';
		if (addCloseButton) {
			retString += ' <button data-dismiss="alert" class="close">X</button> ';
		}
		retString += ' <i class="fa-fw fa ' + NotifUtils._getIcon(typeClass)
				+ '"></i> <strong>'+ NotifUtils._getMessageType(typeClass) +' : </strong> ' + message + '</div>';

		return retString;
	},

	_getIcon : function(type) {
		switch (type) {
		case NotifUtils.SUCCESS:
			return "fa-check";
			break;
		case NotifUtils.ERROR:
			return "fa-times";
			break;
		case NotifUtils.INFO:
			return "fa-info";
			break;
		case NotifUtils.WARN:
			return "fa-warning";
			break;

		default:
			break;
		}
	},
	
	_getMessageType : function(type) {
		switch (type) {
		case NotifUtils.SUCCESS:
			return "Success";
			break;
		case NotifUtils.ERROR:
			return "Error";
			break;
		case NotifUtils.INFO:
			return "Info";
			break;
		case NotifUtils.WARN:
			return "Warning";
			break;

		default:
			break;
		}
	},
}
