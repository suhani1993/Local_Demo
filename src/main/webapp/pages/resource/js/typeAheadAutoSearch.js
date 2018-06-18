/**
 * Get Autosearch With Object
 */

function typeAheadAutoSearch() {

	this.elementId = "";
	this.map = {};
	this.keyForMap = null;

	this.autoSearchWithObject = function(htmlselector, url, keyForAutoSearch, keyForMap) {
		var that = this;
		$('#' + htmlselector)
				.typeahead(
						{
							source : function(query, process) {
								var serviceObj = new ajaxService();
								serviceObj.url(url)
										  .data(that.getAutoSearchObject(keyForAutoSearch,$('#' + htmlselector).val()))
										  .successCallback(function(response) {
												console.log("Things for success function...");
												return process(that.getProcessList(response.data,keyForMap));
											})
										  .failureCallback(function(response) {
											 NotifUtils.add(response.message,NotifUtils.ERROR);
											 console.log("Things for failure function...");
										  }).call();
							},
							updater : function(item) {
								if (that.map.hasOwnProperty(item)) {
									var data = that.map[item];
									that.elementId = data.id;
								}
								return item;
							}
						});

	};

	this.autoSearchWithOutObject = function(htmlselector, url, key) {
		var that = this;
		$('#' + htmlselector)
				.typeahead(
						{
							source : function(query, process) {
								var serviceObj = new ajaxService();
								serviceObj
										.url(url)
										.data(that.getAutoSearchObject(key, $('#' + htmlselector).val()))
										.successCallback(function(response) {
											console.log("Things for success function...");
											return process(response.data);
										})
										.failureCallback(function(response) {
											NotifUtils.add(response.message,NotifUtils.ERROR);
											console.log("Things for failure function...");
										}).call();
							},
						});
	};

	this.getProcessList = function(obj, keyForMap) {
		var that = this;
		var nameList = [];
		$.each(obj, function(key, value) {
			
			nameList.push(value[keyForMap]);
			that.map[value[keyForMap]] = value;
		});
		return nameList;
	};

	this.getAutoSearchObject = function(elementKey, elementValue) {
		var autoSearch = new Object();
		autoSearch.key = elementKey;
		autoSearch.value = elementValue;
		return autoSearch;
	};
}
