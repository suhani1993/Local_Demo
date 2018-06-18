blockUtils = {

	/*
	 * This function block a part of HTML page.
	 * 
	 * selector : Selector string for the UI that needs to be block.
	 * msgHtml : Html string that will show up over blocked UI. Pass null if you don't need anything over.
	 * blockCallback : Callback that will called as block event occurs.
	 * unblockCallback : Callback that will called as un-block event occurs.
	 * 
	 */
		
	block : function(selector, msgHtml, blockCallback, unblockCallback) {
		
		var that = this ;
		
		if (selector) {
			$(selector).block({
				timeout : 0,
				ignoreIfBlocked : true,
				onBlock : that.blockCallback,
				onUnblock : that.unblockCallback,
				message : msgHtml,
				css : {
					backgroundColor: 'transparent', 
					color: 'transparent',
					borderColor : 'transparent'
				},
			});
		}
	},
	
	/*
	 * This function un-block a part of HTML page.
	 * 
	 * selector : Selector string for the UI that needs to be un block.
	 * 
	 */
	unblock : function(selector) {
		
		console.log("Selector :: "+selector);
		
		if (selector) {
			$(selector).unblock();
		}
	},
};