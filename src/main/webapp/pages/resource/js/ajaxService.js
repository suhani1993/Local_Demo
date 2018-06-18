/**
 * How to make a service call
 *  
 *
 *  Put below code to ur page and change url , data and implement code for success and failure button
 *  
  <script src="${contextResourcePath}/js/service.js" ></script>
	<script type="text/javascript">
		$(document).ready(function() {
			serviceObj = new service();
			serviceObj.request("user/login", {
				"userId" : "ad001",
				"password" : "12356"
			}, function() {
				console.log("Things for success function...");
			}, function() {
				console.log("Things for failure function...");
			});

		});
 * 
 * var serviceObj = new ajaxService();
	serviceObj.url("<%=CommonURL.UserURL.WebLogin.get()%>")
					.data(user)
					.successCallback( function(response) {
			        		console.log("Things for success function...");
			        })
			        .failureCallback(function(response) {
			        	console.log("Things for failure function...");
			        })
		        .call();
 * 
 * */

$(function() {
	
	$(document).ajaxStart(function(){
		$('#ajaxProgressBar').show();
	});
	
	$(document).ajaxComplete(function(){
		$('#ajaxProgressBar').hide();
	});
	
});

function ajaxService() {
	
	var that = this;
	
	//host = "http://localhost:9191/hmis/";
	var host = contextPath;

//	var ajaxTokenId = token_id;

	var urlObj = null;
	var dataObj = null;
	var typeObj = "POST";

	var successCallbackObj = null;
	var failureCallbackObj = null;
	var ajaxCompletedCallbackObj = null;
	
	var blockUIObj = null;
	
	this.url = function(url){
		this.urlObj = url;
		return this;
	};
	
	this.type = function(type){
		this.typeObj = type;
		return this;
	};
	
	this.data = function(data){
		this.dataObj = data;
		return this;
	};
	
	this.successCallback = function(successCallback){
		this.successCallbackObj = successCallback;
		return this;
	};
	
	this.failureCallback = function(failureCallback){
		this.failureCallbackObj = failureCallback;
		return this;
	};
	
	this.ajaxCompletedCallback = function(ajaxCompletedCallback){
		this.ajaxCompletedCallbackObj = ajaxCompletedCallback;
		return this;
	};
	
	this.setBlockUI = function(ui) {
		this.blockUIObj = ui;
		return this;
	};
	
	this.call = function(){
		_request();
		return this;
	};
	
	var _request = function() {
		
		if(that.blockUIObj){
			blockUtils.block(that.blockUIObj, 
							"<img src='"+contextResourcePath+"/images/ajax-loader.gif'/>", 
							function(){console.log("BLOCK CALL BACK");}, 
							function(){console.log("UN BLOCK CALL BACK");});
		}
		var headersData = {'Content-Type' : 'application/json' };
		
		try{
			if(ajaxTokenId){
				headersData['token_id'] = ajaxTokenId;
			}
		}catch(e){
			
		}
		
		$.ajax({
			type : that.typeObj || "POST",
			dataType : "json",
			url : host + that.urlObj,
			data : JSON.stringify(that.dataObj),
			headers : headersData
		})
	
		.then(function(data, status, jqxhr){
		    if (data.code == "750"){
		    	jqxhr.status = 750 ;
		    	return $.Deferred().reject(jqxhr , data.message , "");
		    }else {
			    return $.Deferred().resolve(data, status, jqxhr);
		    }
		  })
		  
		.done(function(data, textStatus, jqXHR) {

			console.log("Success Respoand :: " + data.type );
			console.log(data);

			if (data.type == "success") {
				if (that.successCallbackObj) {
					that.successCallbackObj(data);
				}
			} else if (data.type == "error") {
				if (that.failureCallbackObj) {
					that.failureCallbackObj(data);
				}
			}

		})
		
		.fail(function( jqXHR, textStatus, errorThrown) {
			
			console.log("Error Respoand :: ");
			console.log(jqXHR);
			
			var errorMessage = "";
			var okfunction = null;
			
			if(jqXHR.status == 750) { // relogin popup
				errorMessage = "Your session is no longer valid. Click here to Ok button for goto login page";
				okfunction = function(){
					window.location.href = contextPath + "/";
				}
				DialogUtils.CreateNotificationDialog("Error", errorMessage).setCallback(okfunction, null).show();
			} else if (jqXHR.status == 0){ //Network error 
				errorMessage = "Network error";
			} else {
				errorMessage = "Some Error occurred please contact admin";
				DialogUtils.CreateNotificationDialog("Error", errorMessage).setCallback(okfunction, null).show();
			}
			//DialogUtils.CreateNotificationDialog("Error", errorMessage).setCallback(okfunction, null).show();
		})
		
		.always(function() {
			console.log("completed with success or error callback arguments");
			if(that.blockUIObj){
				blockUtils.unblock(that.blockUIObj);
			}
			
			if (that.ajaxCompletedCallbackObj) {
				that.ajaxCompletedCallbackObj();
			}
		});
	
	};
	

	/**
	 * Not use this function
	 */
	this.request = function(url, data, successCallback, failureCallback , ajaxCompletedCallback) {
		
		if(this.blockUIObjObj){
			blockUtils.block(this.blockUIObj, 
							"<img src='"+contextResourcePath+"/images/ajax-loader.gif'/>", 
							function(){console.log("BLOCK CALL BACK");}, 
							function(){console.log("UN BLOCK CALL BACK");});
		}
		
		this.successCallbackObj = successCallback;
		this.failureCallbackObj = failureCallback;
		this.ajaxCompletedCallbackObj = ajaxCompletedCallback;
		
		var headersData = {'Content-Type' : 'application/json' };
		
		try{
			ajaxTokenId = java.token_id;
			headersData['token_id'] = ajaxTokenId;
		}catch(e){
			
		}
		
		$.ajax({
			type : "POST",
			dataType : "json",
			url : host + url,
			data : JSON.stringify(data),
			headers : headersData
		})
		
		.then(function(data, status, jqxhr){
		    if (data.code == "750"){
		    	jqxhr.status = 750 ;
		    	return $.Deferred().reject(jqxhr , data.message , "");
		    }else {
			    return $.Deferred().resolve(data, status, jqxhr);
		    }
		  })
		  
		.done(function(data, textStatus, jqXHR) {

			console.log("Success Respoand :: " + data.type );
			console.log(data);

			if (data.type == "success") {
				if (that.successCallbackObj) {
					that.successCallbackObj(data);
				}
			} else if (data.type == "error") {
				if (that.failureCallbackObj) {
					that.failureCallbackObj(data);
				}
			}

		})
		
		.fail(function( jqXHR, textStatus, errorThrown) {
			
			console.log("Error Respoand :: ");
			console.log(jqXHR);
			
			var errorMessage = "";
			var okfunction = null;
			
			if(jqXHR.status == 750){ // relogin popup
				errorMessage = " Your session is no longer valid. Click here to Ok button for goto login page";
				okfunction = function(){
					window.location.href = contextPath + "/";
				}
			}else if(jqXHR.status == 0){ //Network error 
				errorMessage = "Network error";
			}else{
				errorMessage = "Some Error occurred please contact admin"
			}
			
			DialogUtils.CreateNotificationDialog("Error", errorMessage).setCallback(okfunction, null).show();
		})
		
		.always(function() {
			console.log("completed with success or error callback arguments");
			if(that.blockUIObj){
				blockUtils.unblock(that.blockUIObj);
			}
			
			if (that.ajaxCompletedCallbackObj) {
				that.ajaxCompletedCallbackObj();
			}
		});
	
	};
	
	
	return this;
}