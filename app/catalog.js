var baseURL = 'http://magento2.net/';
var baseMedia = baseURL + 'pub/media/catalog/product';
var baseAPI = baseURL + 'index.php/rest/V1/';

angular.module('Catalog', [])
	.controller('ProductsCtrl', function($scope, $http) {
		$scope.$watch('search', function() {
			fetch();
		});
	// Para asociar el input de la vista
    	$scope.search = "";
    // Funcion para obtener los elementos desde la API
		function fetch() {
			if($scope.search.trim().length > 1) {
			// Obtener los productos que tienen un nombre similar al buscado
				$http.get(baseAPI + "products?searchCriteria[filterGroups][0][filters][0][field]=name&searchCriteria[filterGroups][0][filters][0][value]=%" + $scope.search + "%&searchCriteria[filterGroups][0][filters][0][condition_type]=like")
				.then(function(response) {
				// Cada producto tiene un set de atributos...
					angular.forEach(response.data.items, function(item, key){
						var _image = '';
					// ... de los que uno de ellos es la imagen del producto ...
						angular.forEach(item.custom_attributes, function(attr, attrKey){
							if(attr.attribute_code == 'image') {
								_image = attr.value;
							}
						});
					// ... y si la uno al path la puedo regresar a la vista
						item.image = baseMedia + _image;
					})
				// Regreso el arreglo a la variable correspondiente de la vista
					$scope.products = response.data;
				});
			} else {
			// Cuando se quiere buscar por menos de 2 caracteres, regreso 0 elementos (para el if de la vista)
				var response = JSON.parse('{"data":{"total_count":0}}');
				$scope.products = response.data;
			}
		}
	// Seleccionar el texto del input de búsqueda (para hacer otra al hacer el foco en el)
		$scope.select = function() {
			this.setSelectionRange(0, this.value.length);
		}
	});