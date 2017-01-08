(function() {
	'use strict';

	angular
		.module("app")
		.component("mainApp",{
			controller:mainAppCtrl,
			// controllerAs:'$ctrl',
			templateUrl:"./app/mainApp.html",
		});//end component

	function mainAppCtrl($http, $q){
		var $ctrl = this;
		
		$ctrl.$onInit = init;
		
		function init(){

			$ctrl.instincts = instincts || [];
			$ctrl.knacks = knacks || [];
			$ctrl.knackMods = knackModifiers || [];

			$ctrl.compile = compile;

			$ctrl.givenName = "Fake Name",

			compile()

			// console.log("init component mainApp", $ctrl);
		}// end init

		function compile(){
			$ctrl.isReady = false;
			return $q(function(resolve, reject){

				$ctrl.givenName = "Fake Name",

				$ctrl.name = getAName().then(function(name){
					// console.info("got a name:", name);
					$ctrl.givenName = name.name + " " + name.surname;
				}).catch(function(error){
					console.error("Could not get a name:", error);
				}).finally(function(){
					$ctrl.isReady = true;
					resolve();
				})

				$ctrl.givenKnackMod = randomItemFromArray($ctrl.knackMods);
				$ctrl.givenInstinct = randomItemFromArray($ctrl.instincts);
				$ctrl.givenKnack = randomItemFromArray($ctrl.knacks);
			})
		}

		function getAName(){
			return $q(function(resolve, reject){
				$http.get('https://uinames.com/api/?region=United%20States').then(function(response){
					resolve(response.data);
					// console.log("nameData", response.data);
				}).catch(reject);
			})
		}

		function randomItemFromArray(array){
			var max = array.length;
			var randomIndex = Math.floor(Math.random() * max);
			return array[randomIndex];
		}

	}//end controller
	
	mainAppCtrl.$inject = ['$http', '$q'];
	
})();//