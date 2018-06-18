/**
 * 
 */
var MyUtils = {

	/**
	 * Set focus on the given selector if it is focusable. If selector is not
	 * focusable, it will look for input elements inside selector and select
	 * first input element that can be focused. If selector is not provided set
	 * focus on the first input element that is focusable. This method should
	 * called after page is loaded.
	 * 
	 * To select an input element Ex : Textfield with id = "textfield" :
	 * MyUtils.focusInput("#textfield");
	 * 
	 * To select first input element from div Ex : DIV with id = "container" :
	 * MyUtils.focusInput("#container");
	 * 
	 * To select first input element of perticular class (say "input-class") Ex :
	 * MyUtils.focusInput(".input-class");
	 * 
	 * To select first input from page: Ex : MyUtils.focusInput();
	 * 
	 */
	focusInput : function(selector) {

		// if selector exists
		if (selector) {
			// if found select first focusable selector
			if ($(selector + ":input:enabled:visible:first").length != 0) {
				// console.log("1 Element being focused : "+ selector +" : "+
				// $(selector));
				// console.log($(selector));
				// console.log($(selector +
				// ":input:enabled:visible:first").length);
				$(selector + ":input:enabled:visible:first").focus();
			} else {// else select first focusable input inside given selector
				// console.log("2 Element being focused : "+ $(selector + "
				// input:enabled:visible:first").attr("id"));
				$(selector + " input:enabled:visible:first").focus();
			}
		} else { // else select first focusable input
			// console.log("3 Element being focused : "+
			// ":input:enabled:visible:first" +" : "+
			// $(":input:enabled:visible:first").attr("id"));
			$(":input:enabled:visible:first").focus();
		}
	},

	/**
	 * check var is null , undefined , empty return : boolen
	 * 
	 */
	getIsEmpty : function(val) {

		if (val === undefined) {
			return true;
		} else if (val == null) {
			return true;
		} else if ($.isArray(val)) {
			return val.length <= 0;
		} else if (typeof val == "number" || val instanceof Number) {
			return false;
		} else if (typeof val == "string" || val instanceof String) {
			return (val.trim() == "");
		} else if (val instanceof Date) {
			return false;
		} else {
			return $.isEmptyObject(val);
		}

		// console.log(typeof val);
		// return (val !== undefined && val != null && val.length <= 0) ? true :
		// false;

	},
	
	/**
	 * check var is null , undefined , empty return : boolen
	 * 
	 */
	getDefaultVal : function(val) {
		if(this.getIsEmpty(val)) {
			return "-";
		} 
		return val;
	},
	
	getAgeInMonthsFromDOB : function(date) {
		
		var now = new Date();
		var yearNow = now.getFullYear(); // Out Date Picker Is Support Upto 1900
		var monthNow = now.getMonth();
		//console.log("yearNow : " + yearNow);
		//console.log("monthNow : " + monthNow);
		
		var dob = new Date(date);
		var yearDob = dob.getFullYear();
		var monthDob = dob.getMonth();
		
		//var dob = new Date();
		//dob.setFullYear(1998, 12, 28);
		//var yearDob = dob.getFullYear();
		//var monthDob = dob.getMonth();
		//console.log("yearDob : " + yearDob);
		//console.log("monthDob : " + monthDob);
		var ageInMonthsFromDOB = yearNow * 12 + monthNow - (yearDob * 12 + monthDob);
		return ageInMonthsFromDOB;
	},
	
	getAgeFromDOB : function(date) {
		/*var now = new Date();
		var yearNow = now.getFullYear();
		
		var dob = new Date(date);
		var yearDob = dob.getFullYear();
		
		return yearNow - yearDob;*/
		
		var days = MyUtils.getAgeInDaysFromDOB(date);
		return days/365;
		
	},
	
	/**
	 * Get Age in days from Date of birth
	 * 
	 * @param date
	 *            date
	 * @return age in days
	 */
	getAgeInDaysFromDOB : function(date) {
		var nowDate = new Date();
		var dobDate = new Date(date);
		var ageInMonthsFromDOB = (nowDate - dobDate) / (1000 * 60 * 60 * 24);
		return ageInMonthsFromDOB;
	},

	/**
	 * get Age In days and month according to birth data that are passed into
	 * argument
	 */
	getAgeInDayMonthsAndYearsFromDOB : function getAge(dateString) {

		var now = new Date();
		var yearNow = now.getYear(); // Out Date Picker Is Support Upto 1900
		var monthNow = now.getMonth();
		var dateNow = now.getDate();
		
		var dob = new Date(dateString);
		var yearDob = dob.getYear();
		var monthDob = dob.getMonth();
		var dateDob = dob.getDate();
		
		var age = {};
		var monthAge=0;
		var dateAge=0;

	  // Invalid When Date Of Birth Is Greater Than Current Date
		if (now > dateString) {
			yearAge = yearNow - yearDob;
			
			if (monthNow >= monthDob)
				monthAge = monthNow - monthDob;
			else {
				yearAge--;
				monthAge = 12 + monthNow - monthDob;
			}
			
			if (dateNow >= dateDob)
				dateAge = dateNow - dateDob;
			else {
				monthAge--;
				dateAge = 31 + dateNow - dateDob;
				if (monthAge < 0) {
					monthAge = 11;
					yearAge--;
				}
			 }
			
			age = {
				years : yearAge,
				months : monthAge,
				days : dateAge
			};

			if (age.years == 0) {
				return age.months + "m " + age.days + "d";
			} else {
				return age.years + "y " + age.months + "m";
			}
		} else {
			return "InValid";
		}
	},
	
	getStringFromBoolean : function(bool) {
		if (bool) {
			return "Yes";
		} else {
			return "No";
		}
	},

	getStringValue : function(string) {
		if (string == "" || typeof string == 'undefined') {
			return "-";
		} else {
			return string;
		}
	},

	getStingOrEmpty : function(string) {
		if (string == null || string == 'undefined') {
			return "";
		}
		return string;
	},

	getDoubleOnly : function(val) {

		var id = $(val).attr('id');

		$(val).bind(
				"keypress",
				function(evt) {

					var charCode = (evt.which) ? evt.which : event.keyCode;

					if (charCode == 46) {
						var inputValue = document.getElementById(id).value;

						if (inputValue.length > 0) {

							if (inputValue == '.') {
								return false;
							}

							if (inputValue.indexOf('.') > 0) {
								return false;
							} else {
								return true;
							}

						} else {
							return false;
						}

					}
					if (charCode != 46 && charCode > 31
							&& (charCode < 48 || charCode > 57)) {
						return false;
					}
					return true;

				});
		$(val).bind("paste", function(e) {
			return false;
		});
		$(val).bind("drop", function(e) {
			return false;
		});
	},

	getIntegerOnly : function(val) {
		var specialKeys = new Array();
		specialKeys.push(8);

		$(val).bind(
				"keypress",
				function(e) {
					var keyCode = e.which ? e.which : e.keyCode;
					var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys
							.indexOf(keyCode) != -1);
					return ret;
				});
		$(val).bind("paste", function(e) {
			return false;
		});
		$(val).bind("drop", function(e) {
			return false;
		});
	},
	getIntegerOnlyWithLimit : function(val,limit) {
		var specialKeys = new Array();
		specialKeys.push(8);

		$(val).bind(
				"keypress",
				function(e) {
					var keyCode = e.which ? e.which : e.keyCode;
					var ret = ((keyCode >= 48 && keyCode <= 57 && ($(val).val().length < limit) || specialKeys
							.indexOf(keyCode) != -1) );
					return ret;
				});
		$(val).bind("paste", function(e) {
			return false;
		});
		$(val).bind("drop", function(e) {
			return false;
		});
	},
	getDoubleFromValue:function(doubleValue){
		if(this.getIsEmpty(doubleValue)) {
			return 0.0;
		} 
		return doubleValue;
	},

	// Get Sorted List
	getSortedDropDown : function(selector) {
		$('#' + selector).html(
				$('#' + selector + ' option').sort(function(x, y) {
					return $(x).val() < $(y).val() ? -1 : 1;
				}));
		$('#' + selector).get(0).selectedIndex = 0;
	},
	
	checkFirstValue : function(string){
		string = string.startsWith(",") ? string.substring(1) : string;
		string = string.startsWith(" ,") ? string.substring(2) : string;
		string = string.startsWith("  ,") ? string.substring(3) : string;
		return string;
	},
	
	checkLastValue : function(string){
		string = string.endsWith(",") ? string.substring(string.length-1) : string;
		string = string.endsWith(" ,") ? string.substring(string.length-2) : string;
		string = string.endsWith(", ") ? string.substring(0,string.length-2) : string;
		return string;
	},
	
	quoteReplacement : function(string){
		if ((string.indexOf('\\') == -1) && (string.indexOf('$') == -1))
            return string;
        var sb = "";
        for (var i=0; i < string.length; i++) {
            var c = string.charAt(i);
            if (c == '\\' || c == '$') {
            	sb += '\\';
            }
            sb += c;
        }
        return sb;
	},
	
	getAutogeneratedStringForNormalByGender : function (reportTest, patientGender, patientBirthDate) {
		
		//console.log(" ******** AutogeneratedStringForNormalByGender ********** " + reportTest.name);
		
		var normalObject = reportTest.testData;
		return MyUtils.getAutogeneratedStringForFormulaByGender(normalObject, patientGender, patientBirthDate);
//		var autogeneratedString = "";
//		//console.log(" patientGender :: " + patientGender);
//		//console.log(" reportTest ::  " + JSON.stringify(reportTest));
//		
//		if (!MyUtils.getIsEmpty(reportTest.testData)) {
//			var normalObject = reportTest.testData;
//			if(normalObject["all"]){
//				normalByGender = normalObject["all"];
//			}else{
//				normalByGender = normalObject[patientGender];
//			}
//			
//			//console.log(" normalByGender ::  " + JSON.stringify(normalByGender));	
//			
//			if (!MyUtils.getIsEmpty(normalByGender)) {
//				$.each(normalByGender, function(key, object) {
//					if (!MyUtils.getIsEmpty(object)) {
//						var value = object["displayNormalForm"];
//						//console.log(" >>>>> <<<<<< "  + value); 
//						if (!MyUtils.getIsEmpty(value)) {
//							autogeneratedString += value;
//							autogeneratedString += "\n";
//						}
//					}
//				});
//			}
//		}
//		//console.log("  autogeneratedString ::: " + autogeneratedString);
//		return autogeneratedString;
	},
	
	getAutogeneratedStringForFormulaByGender : function (normalObject, patientGender, patientBirthDate) {
		var autogeneratedString = "";
		//console.log(" ******** getAutogeneratedStringForFormulaByGender ********** ");
		//console.log(" patientGender :: " + patientGender);
		//console.log(" reportTest ::  " + JSON.stringify(reportTest));
		
		if (!MyUtils.getIsEmpty(normalObject)) {
			if(normalObject["all"]){
				normalByGender = normalObject["all"];
			}else{
				normalByGender = normalObject[patientGender];
			}
			
			//console.log(" normalByGender ::  " + JSON.stringify(normalByGender));	
			
			if (!MyUtils.getIsEmpty(normalByGender)) {
				$.each(normalByGender, function(key, object) {
					if (!MyUtils.getIsEmpty(object)) {
						var value = object["displayNormalForm"];
						//console.log(" >>>>> value <<<<<< "  + value); 
						if (!MyUtils.getIsEmpty(value) && MyUtils.isAgeGroupValid(object, patientBirthDate)) {
							autogeneratedString += value;
							//autogeneratedString += "\n";
							return false;
						}
					}
				});
			}
		}
		//console.log("  autogeneratedString ::: " + autogeneratedString);
		return autogeneratedString;
	},
	
	
	getAutogeneratedStringForNormalByGender_language : function (reportTest, patientGender, patientBirthDate) {
		var normalObject = reportTest.testData;
		return MyUtils.getAutogeneratedStringForFormulaByGender_language(normalObject, patientGender, patientBirthDate);
	},
	
	
	getAutogeneratedStringForFormulaByGender_language : function (normalObject, patientGender, patientBirthDate) {
		var autogeneratedString = [];
		//console.log(" ******** getAutogeneratedStringForFormulaByGender ********** ");
		//console.log(" patientGender :: " + patientGender);
		//console.log(" reportTest ::  " + JSON.stringify(reportTest));
		
		if (!MyUtils.getIsEmpty(normalObject)) {
			if(normalObject["all"]){
				normalByGender = normalObject["all"];
			}else{
				normalByGender = normalObject[patientGender];
			}
			
			//console.log(" normalByGender ::  " + JSON.stringify(normalByGender));	
			
			if (!MyUtils.getIsEmpty(normalByGender)) {
				$.each(normalByGender, function(key, object) {
					if (!MyUtils.getIsEmpty(object)) {
						var value = object["displayNormalForm_language"];
						//console.log(" >>>>> value <<<<<< "  + value); 
						if (!MyUtils.getIsEmpty(value) && MyUtils.isAgeGroupValid(object, patientBirthDate)) {
							autogeneratedString = value;
							return false;
						}
					}
				});
			}
		}
		//console.log("  autogeneratedString ::: " + autogeneratedString);
		return autogeneratedString;
	},
	
	isAgeGroupValid : function(normalByAge, patientBirthDate){
		var isValidAge = false;
		//var normalByAge = {};
//		for (var i = 0; i < normalByGender.length; i++) {
//			normalByAge = normalByGender[i];
			if(normalByAge["group_by_age"]){
				var age1 = parseFloat(normalByAge["age1"]);
				//console.log(" age1 :-- " + age1);
				var age2 = parseFloat(normalByAge["age2"]);
				//console.log(" age2 :-- " + age2);
				var age_unit = normalByAge["age_unit"];
				//console.log(" age_unit :-- " + age_unit);
				
				var compareBy = parseFloat(-1);
				
				switch (age_unit) {
				
					case "month": {
						compareBy = MyUtils.getAgeInMonthsFromDOB(patientBirthDate);
						break;
					}
					
					case "year": {
						compareBy = MyUtils.getAgeFromDOB(patientBirthDate);
						break;
					}
					
					case "day": {
						compareBy = MyUtils.getAgeInDaysFromDOB(patientBirthDate);
						
						break;
					}
					
					default: {
						break;
					}
					
				}
				
				if (((age1 == 0 && age1 <= compareBy) || (age1 < compareBy)) && compareBy <= age2) {
					//console.log(" >> Match...!!!");
					isValidAge = true;
					return true;
				}
				
			} else {
				isValidAge = true;
			}
//		}
		return isValidAge;
	}, 
	
	
	getDisplayNormalFormValue : function (normalObject, patientGender, patientBirthDate){
		
		var displayNormalFormValue = "";
		
		if (!MyUtils.getIsEmpty(normalObject)) {
			
			if(normalObject["all"]){
				normalByGender = normalObject["all"];
			}else{
				normalByGender = normalObject[patientGender];
				displayNormalFormValue = "${normalRange_" + normalObject.code + "}";
			}
			
			if (!MyUtils.getIsEmpty(normalByGender)) {
				$.each(normalByGender, function(key, object) {
					if (!MyUtils.getIsEmpty(object)) {
						var value = object["displayNormalForm"];
						//console.log(" >>>>> <<<<<< "  + value); 
//						if (!MyUtils.getIsEmpty(value)) {
//							displayNormalFormValue += value;
//							displayNormalFormValue += "\n";
//						}
						
						if (!MyUtils.getIsEmpty(value) && MyUtils.isAgeGroupValid(object, patientBirthDate)) {
							displayNormalFormValue += value;
							//autogeneratedString += "\n";
							return false;
						}
					}
				});
			}
		}
		return displayNormalFormValue;
	},
	
	getDecimalRoundOffUptoDigit : function (value, digit) {
		return Math.round(value * Math.pow(10.0, digit)) / Math.pow(10.0, digit);
	},
	
	getUuid : function() {
		
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
		}
		  
		return s4()+s4()+s4();
	},
	
	getHeadOfUnitFromList : function (headOfUnitList, unitId) {
		var matched = false;
		if(!this.getIsEmpty(headOfUnitList)) {
			$.each(headOfUnitList, function(key, value) {
				if(!matched){
					if(value == unitId){
						matched = true;
					}
				}
			});
		}
		
		return matched;
	},
	
  getMonthCountFromStartingMonth : function(startingMonth){
		if(startingMonth == "Jan"){
			return 0;
		}else if(startingMonth == "Feb"){
			return 1;
		}else if(startingMonth == "Mar"){
			return 2;
		}else if(startingMonth == "Apr"){
			return 3;
		}else if(startingMonth == "May"){
			return 4;
		}else if(startingMonth == "Jun"){
			return 5;
		}else if(startingMonth == "Jul"){
			return 6;
		}else if(startingMonth == "Aug"){
			return 7;
		}else if(startingMonth == "Sep"){
			return 8;
		}else if(startingMonth == "Oct"){
			return 9;
		}else if(startingMonth == "Nov"){
			return 10;
		}else if(startingMonth == "Dec"){
			return 11;
		}
	},
	
	getMonthNameFromStartingMonth : function(startingMonthCount){
		if(startingMonthCount == 0){
			return "Jan";
		}else if(startingMonthCount == 1){
			return "Feb";
		}else if(startingMonthCount == 2){
			return "Mar";
		}else if(startingMonthCount == 3){
			return "Apr";
		}else if(startingMonthCount == 4){
			return "May";
		}else if(startingMonthCount == 5){
			return "Jun";
		}else if(startingMonthCount == 6){
			return "Jul";
		}else if(startingMonthCount == 7){
			return "Aug";
		}else if(startingMonthCount == 8){
			return "Sep";
		}else if(startingMonthCount == 9){
			return "Oct";
		}else if(startingMonthCount == 10){
			return "Nov";
		}else if(startingMonthCount == 11){
			return "Dec";
		}
	},
	
	getElementBorder : function(dynamicDataObject) {
		var borderTop = 0;
		var borderRight = 0;
		var borderBottom = 0;
		var borderLeft = 0;
		
		var elementBorder = dynamicDataObject.elementBorder;
		if(!this.getIsEmpty(elementBorder)) {
		
			if(!this.getIsEmpty(elementBorder.borderTop)) {
				borderTop = elementBorder.borderTop;
			}
			
			if(!this.getIsEmpty(elementBorder.borderRight)) {
				borderRight = elementBorder.borderRight;
			}
			
			if(!this.getIsEmpty(elementBorder.borderBottom)) {
				borderBottom = elementBorder.borderBottom;
			}
			
			if(!this.getIsEmpty(elementBorder.borderLeft)) {
				borderLeft = elementBorder.borderLeft;
			}
			
		}
		
		var borderStyle = "border-top:"+borderTop+"px solid black;"
						  +"border-right:"+borderRight+"px solid black;"
						  +"border-bottom:"+borderBottom+"px solid black;"
						  +"border-left:"+borderLeft+"px solid black;";
		return borderStyle;
	}
}
