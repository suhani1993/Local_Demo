
var DialogUtils = {
		
	CreateNotificationDialog : function(title, bodyText){
		notificationDialog = new NotificationDialog();
		notificationDialog.create(title, bodyText);
		return notificationDialog;
	},

	CreateDialog : function(title, bodySelector,width){
		console.log(width);
		myDialog = new MyDialog();
		myDialog.setWidth(width);
		myDialog.create(title, bodySelector);
		return myDialog;
	},
};

function MyDialog() {
	
	var id = null;
	var width = null;
	var modalDom = null;
	var cancelButtonfunction =null;
	
	this.create = function(title, bodySelector){
		
		var that = this;
		
		if ($(bodySelector).exists()) {
			$(bodySelector).hide();
			
			// set to global variable
			this.id = "myDialog_" + Math.random();
			this.id = this.id.replace('.', '');
			
			$('body').append(this.getDefaultHTML(title));
			$("#" + this.id + " .modal-body").append($(bodySelector));
			$(bodySelector).show();
			
//			$("#" + this.id).modal();
			modalDom = $("#" + this.id).modal({
				"backdrop" : "static",
				"keyboard" : false
					
			});
			
		} else {
			console.info("Modal selector " + bodySelector + " dos not exists.");
		}
			
		$("#" + this.id + " .close").click(function(e){
			that.hide();
			if(that.cancelCallback){
				that.cancelCallback(e);
			}
		});
		
	};
	
	this.setCallback = function(cancelButtonfunction){
		this.cancelCallback = cancelButtonfunction; 
		return this;
	}
	
	this.getId = function() {
		return this.id;
	};
	
	this.setWidth = function(widthp){
		this.width = widthp;
		return this;
	};
	
	this.show = function(){
		var idx = $('.modal:visible').length;
		$(modalDom).find(".modal-dialog").css('z-index', 1040 + (10 * idx));
		
		$("#" + this.id).modal('show');
	};
	
	this.hide = function(){
		$("#" + this.id).modal('hide');
	}; 
	
	this.getDefaultHTML = function(title) {
		
		var style = "";
		if(this.width != null){
			style = "width: "+this.width+"px !important;";
		}
		
		retString =  
		'<div  id="' + this.id + '"  class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
		  '<div class="modal-dialog" style="'+ style +'">'+
		    '<div class="modal-content">'+
		      '<div class="modal-header">'+
		        '<button type="button" class="close" data-dismiss="modal" id="close">'+
					'<span aria-hidden="true">'+
						'&times;'+
					'</span>'+
					'<span class="sr-only">'+
						'Close'+
					'</span>'+
				'</button>'+
		        '<h4 class="modal-title" id="myModalLabel">'+
					title+
				'</h4>'+
		      '</div>'+
		      '<div class="modal-body">'+
		      '</div>'+
		    '</div>'+
		  '</div>'+
		'</div>';
		
		return retString;
	};
	
	return this;
}


function NotificationDialog() {

	this.id = null;
	
	this.okCallback = null;
	this.cancelCallback = null;
	
	this.create = function(title, bodyText){
		
		var that = this;
		
		// set to global variable
		this.id = "notificationDialog_" + Math.random();
		this.id = this.id.replace('.', '');
		
		$('body').append(this.getDefaultHTML(title, bodyText));
		
		$("#" + this.id + " #okButton").click(function(e){
			that.hide();
			if(that.okCallback){
				that.okCallback(e);
			}
		});
		
		$("#" + this.id + " #cancelButton").click(function(e){
			that.hide();
			if(that.cancelCallback){
				that.cancelCallback(e);
			}
		});
		
		return this;
	};
	
	this.setCallback = function(okfunction , cancelfunction){
		this.okCallback = okfunction;
		this.cancelCallback = cancelfunction; 
		return this;
	}
	
	this.show = function(){
		$("#" + this.id).modal('show');
	};
	
	this.hide = function(){
		$("#" + this.id).modal('hide');
	}; 
	
	this.getDefaultHTML = function(title, bodyText) {
		
		retString =  
		'<div  id="' + this.id + '"  class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
		  '<div class="modal-dialog">'+
		    '<div class="modal-content">'+
		      '<div class="modal-header">'+
		        '<button type="button" class="close" data-dismiss="modal">'+
					'<span aria-hidden="true">'+
						'&times;'+
					'</span>'+
					'<span class="sr-only">'+
						'Close'+
					'</span>'+
				'</button>'+
		        '<h4 class="modal-title" id="myModalLabel">'+
					title +
				'</h4>'+
		      '</div>'+
		      '<div class="modal-body">'+
		      	'<p>'+bodyText+'</p>' +
		      '</div>'+
		  	'<div class="modal-footer">'+
				'<button type="button" id="okButton" class="btn btn-default">Ok</button>'+
				'<button type="button" id="cancelButton" class="btn btn-default">Cancel</button>'+
			'</div>'+
		    '</div>'+
		  '</div>'+
		'</div>';
		
		return retString;
	};
}

