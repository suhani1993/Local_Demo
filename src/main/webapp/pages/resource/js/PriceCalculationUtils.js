/**
 * PriceCalculationUtils for calculate different rates for item.
 */

var PriceCalculationUtils = {
	
	/**
	 * 
	 * Calculate special rate.
	 * 
	 * @param specialHourRates
	 * @param date
	 * @param normalRate
	 * @return
	 * 
	 *         Amount after applying special rates & discount rate.
	 */
	getAmountWithSpecilRate : function(specialHourRates, date, normalRate) {
		
		var specialRate = this.countSpecialRate(specialHourRates, date, normalRate);
		
		normalRate = parseFloat(normalRate);
		specialRate = parseFloat(specialRate);
		
		var finalAmount = Math.round((normalRate + specialRate) * 100.0) / 100.0;
		
		finalAmount =  Math.round(finalAmount * 100.0) / 100.0;
		
		return finalAmount;
	},

	/**
	 * Calculate special rate for a time & rate, according to given Special Hour
	 * Rate details.
	 * 
	 * @param specialHourRate
	 * @return
	 * 
	 *         Additional special hour rate to be apply on normal rate.
	 */
	countSpecialRate : function(specialHourRates, date, normalRate){
		var specialRate = 0;
		
		var specialHourRate = this.getSpecialHourRateForDate(specialHourRates, date);
		
		if (!MyUtils.getIsEmpty(specialHourRate) && this.isBetweenTime(specialHourRate, date)) {
			if (specialHourRate.specialHourRateType == "Percent") {
				specialRate = (parseFloat(normalRate) * specialHourRate.specialHoursRate) / 100;
			} else {
				specialRate = specialHourRate.specialHoursRate;
			}
		}
		
		return specialRate;
	},
	
	/**
	 * Get the special Hour Rate detail. If date is null, calculate as of
	 * current time.
	 * 
	 * @param specialHourRates
	 * @param date
	 * @return
	 * 
	 *         Object of the special hour rate for given time.
	 */
	getSpecialHourRateForDate : function (specialHourRates, date){

		var specialHourRate = null;
		// Get today date
		var today = new Date();
		if (!MyUtils.getIsEmpty(date)) {
			today.setTime(date);
		}
		
		// get current day of week (getDay() counts from Monday. so that use +1)
		var day = parseInt(today.getDay()) + 1;
		
		if (!MyUtils.getIsEmpty(specialHourRates)) {
			$.each(specialHourRates, function(key, specialHourRate1) {
				if (specialHourRate1.day == day) {
					specialHourRate = specialHourRate1; 
				}
			});
		}
		return specialHourRate;
	},
	
	/**
	 * Check if given special rate is applicable for date. If date is null,
	 * calculate as of current time.
	 * 
	 * @param specialHourRate
	 * @param expenseDate
	 * @return
	 */
	isBetweenTime : function (specialHourRate, date){
		if (MyUtils.getIsEmpty(date)) {
			date = new Date();
		}
		
		var expenseTimeInMinutes = (date.getHours() * 60) + date.getMinutes();
		
		if(!MyUtils.getIsEmpty(specialHourRate)){
			if (specialHourRate.specialHourStart < specialHourRate.specialHourEnd) {
				return (expenseTimeInMinutes >= specialHourRate.specialHourStart) && (expenseTimeInMinutes <= specialHourRate.specialHourEnd);
			} else {
				return !(expenseTimeInMinutes > specialHourRate.specialHourEnd) && (expenseTimeInMinutes < specialHourRate.specialHourStart);
			}
		}
	}
	
};
