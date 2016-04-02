// Config section
var $baseURL = "http://magento2.net/";
var $baseMedia = $baseURL + "pub/media/catalog/product";
var $baseAPI = $baseURL + "index.php/rest/V1/";

// Container for Magento2 API operations
var magento = new function() {
	this.get = function(section, params, callback) {
        $.get($baseAPI + section + "?" + this.createSearch(params), function (response) {
            callback(response)
        }, "json");
    };
    // Create search string for get selection
    this.createSearch = function(criteria) {
    	var index = 0;
    	var filters = [];
    	$(criteria.data).each(function() {
    		var filter = [];
    		var _modifier = "";
    		if(this.condition == "like") _modifier = "%";
    		filter.push("searchCriteria[filterGroups][0][filters][" + index + "][field]=" + this.field);
    		filter.push("searchCriteria[filterGroups][0][filters][" + index + "][value]=" + _modifier + this.value + _modifier);
    		filter.push("searchCriteria[filterGroups][0][filters][" + index + "][condition_type]=" + this.condition);
    		filters.push(filter.join("&"));
    		index++;
    	});
    	return filters.join("&");
    };
};