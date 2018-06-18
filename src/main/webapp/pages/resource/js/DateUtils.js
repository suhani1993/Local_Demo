/*

 pickDate: true,                 //en/disables the date picker
 pickTime: true,                 //en/disables the time picker
 useMinutes: true,               //en/disables the minutes picker
 useSeconds: true,               //en/disables the seconds picker
 useCurrent: true,               //when true, picker will set the value to the current date/time
 minuteStepping:1,               //set the minute stepping
 minDate:`1/1/1900`,             //set a minimum date
 maxDate: ,     				 //set a maximum date (defaults to today +100 years)
 showToday: true,                //shows the today indicator
 language:'en',                  //sets language locale
 defaultDate:"",                 //sets a default date, accepts js dates, strings and moment objects
 disabledDates:[],               //an array of dates that cannot be selected
 enabledDates:[],                //an array of dates that can be selected
 icons = {
 time: 'glyphicon glyphicon-time',
 date: 'glyphicon glyphicon-calendar',
 up:   'glyphicon glyphicon-chevron-up',
 down: 'glyphicon glyphicon-chevron-down'
 }
 useStrict: false,               //use "strict" when validating dates
 sideBySide: false,              //show the date and time picker side by side
 daysOfWeekDisabled:[]           //for example use daysOfWeekDisabled: [0,6] to disable weekends

 */

/**
 * 
 * This is the code to be place where you want a date picker
 * 
 * HTML Code
 * 
 * <div class='date' id='id'> <input type='text' class="form-control" /> <span
 * class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
 * </span> </div>
 * 
 * Respective javascript code
 * 
 * 1> createDateTimePicker
 * 
 * $('#id').datetimepicker(); $("#id").on("dp.change",function (e) { // Date
 * date = e.date; });
 * 
 * 2> createDatePicker
 * 
 * $(selector).datetimepicker({ pickTime : false });
 * 
 * 
 * 3> createTimePicker
 * 
 * $(selector).datetimepicker({ pickDate : false, });
 */
var DateUtils = {

	DATE_FORMAT : "DD/MM/YYYY",
	TIME_FORMAT : "hh:mm a",
	TIME_24FORMAT : "HH:mm",
	DATE_TIME_FORMAT : "DD-MM-YYYY h:mm",
	DATE_TIME_24FORMAT : "DD-MM-YYYY HH:mm",
	DATE_TIME_24FORMAT_MONTH : "DD-MMM-YYYY HH:mm",
	DATE_FORMAT_MONTH : "DD/MMM/YYYY",
	DATE_FORMAT_MONTH_DASH : "DD-MMM-YYYY",
	ONLY_MONTH : "MMM",
	MONTH_YEAR : "MMM/YYYY",
	serverClientTimeDiff : 0,
	DATE_FORMAT_TEMP : "YYYY-MM-DD ",
	/*
	 * Creates date picker at given selector. Selector is compulsory, format is
	 * mendatory.
	 */
	/*
	 * createDatePicker : function(selector, format) {
	 * console.info("createDatePicker(" + selector + ")");
	 * 
	 * if ($(selector).exists()) { // this.setDefaultHTML(selector, format); //
	 * create date picker $(selector).datetimepicker({ pickTime : false, }); }
	 * else { console.info("Date picker selector " + selector + " dos not
	 * exists.") } },
	 * 
	 * Creates date and time picker at given selector. Selector is compulsory,
	 * format is mendatory.
	 * 
	 * createDateTimePicker : function(selector, format) {
	 * console.info("createDateTimePicker(" + selector + ")");
	 * 
	 * if ($(selector).exists()) { // this.setDefaultHTML(selector, format); //
	 * create date time picker $(selector).datetimepicker(); } else {
	 * console.info("Date time picker selector " + selector + " dos not
	 * exists.") } },
	 * 
	 * Creates time picker at given selector. Selector is compulsory, format is
	 * mendatory.
	 * 
	 * createTimePicker : function(selector, format) {
	 * console.info("createTimePicker(" + selector + ")");
	 * 
	 * if ($(selector).exists()) { // this.setDefaultHTML(selector, format); //
	 * create date time picker $(selector).datetimepicker({ pickDate : false,
	 * }); } else { console.info("Time picker selector " + selector + " dos not
	 * exists.") } },
	 */

	/*
	 * Prepate date and time picker HTML at given selector. Selector is
	 * compulsory, format is mendatory.
	 */
	/*
	 * setDefaultHTML : function(selector, format) { if
	 * (!$(selector).hasClass("input-group")) {
	 * $(selector).addClass("input-group"); } if (!$(selector).hasClass("date")) {
	 * $(selector).addClass("date"); }
	 * 
	 * $(selector).html(this.getDefaultHTML(format)); },
	 */

	/*
	 * Default HTML required for date and time picker
	 * 
	 * getDefaultHTML : function(format) {
	 * 
	 * if (format) { return "<input type='text' class='form-control'
	 * data-date-format=" + format + "/><span class='input-group-addon'><span
	 * class='glyphicon glyphicon-calendar'></span> </span>"; } return "<input
	 * type='text' class='form-control'/><span class='input-group-addon'><span
	 * class='glyphicon glyphicon-calendar'></span> </span>"; },
	 *//*
		 * converts number of milliseconds since January 1, 1970 in to date
		 * object.
		 */

	/* Converts Date object or date in milli-seconds to default format of date */
	defaultFormat : function(date) {
	   	
		if(isNaN(date)){
			return "";
		}
	   	
		return this.format(this.DATE_FORMAT, date);
	},
	
	defaultFormatTemp : function(date) {
	   	
		if(isNaN(date)){
			return "";
		}
	   	
		return this.format(this.DATE_FORMAT_TEMP, date);
	},
	
	defaultFormatMonth : function(date) {
		if(isNaN(date)){
			return "";
		}
		return this.format(this.DATE_FORMAT_MONTH, date);
	},
	

	/* Converts Date object or date in milli-seconds to default format of time */
	defaultTimeFormat : function(date) {
		return this.format(this.TIME_FORMAT, date);
	},
	
	/* Converts Date object or 24 hout time Format*/
	default24TimeFormat : function(date) {
		return this.format(this.TIME_24FORMAT, date);
	},

	/*
	 * Converts Date object or date in milli-seconds to default format of date
	 * and time
	 */
	defaultDateTimeFormat : function(date) {
		return this.format(this.DATE_TIME_24FORMAT, date);
	},
	
	/*
	 * Converts Date object or date in milli-seconds to 24 Hour format of date
	 * and time
	 */
	defaultDateTimeBy24HoursFormat : function(date) {
		return this.format(this.DATE_TIME_24FORMAT, date);
	},
	
	/*
	 * Converts Date object or date in milli-seconds to 24 Hour format of date with Month Format
	 * and time
	 */
	defaultDateTimeBy24HoursWithMonthFormat : function(date) {
		return this.format(this.DATE_TIME_24FORMAT_MONTH, date);
	},
	
	defaultDateTimeDashFormat : function(date) {
		return this.format(this.DATE_FORMAT_MONTH_DASH, date);
	},
	
	defaultOnlyMonthFormat : function(date) {
		return this.format(this.ONLY_MONTH, date);
	},
	
	defaultMonthYearFormat : function(date) {
		return this.format(this.MONTH_YEAR, date);
	},

	/*
	 * Converts Date object or date in milli-seconds, according to given
	 * parameters : SRC : http://momentjs.com/docs/#/displaying/format/
	 */
	format : function(dateFormat, date) {
	   	
		if (date instanceof Date) {
			date = date.getTime();
		}
	   	
		return moment(date).format(dateFormat);
	},
	
	getServerDateInLong : function() {
		return new Date().getTime() + getServerTimeDifference();
	},
	
	getServerDate : function() {
		return new Date(this.getServerDateInLong());
	},
	
//	DateUtils.getServerDateInLong();
//	DateUtils.getServerDate();

}
