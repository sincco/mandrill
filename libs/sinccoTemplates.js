/**
 * Funciones para simplificar uso de plantillas
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function ($) {
	// Otiene la plantilla asociada al elemento
	$.fn.getTemplate = function () {
        return $(this).attr('data-template') + '.html';
    }
    // Procesa la plantilla en el elemento asociado
    $.fn.processTemplate = function (data, options) {
        $(this).loadTemplate(
        	$(this).getTemplate(), data, options
        );
    }
})(jQuery);

function initFormats() {
	$.addTemplateFormatter({
	    currency: function (value, template) {
	        switch (template) {
	            case "en":
	                return "&pound;" + value;
	            default:
	                return value;
	        }
	    },
	    tags: function (value, template) {
	        return value.join(", ");
	    },
	    coordinates: function (value) {
	        return value.latitude + ", " + value.longitude;
	    },
	    productLink: function (value) {
	        return "Products/" + value;
	    }
	});
}