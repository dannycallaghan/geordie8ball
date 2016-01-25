(function () {

	'use strict';

	var app = angular.module('Geordie8Ball', ['ionic']);

	app.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	});

	app.directive('eightBall', eightBall);

	function eightBall (geordieService, $timeout) {
		return {
			restrict: 'E',
			controllerAs: 'ball',
			bindToController: true,
			controller: controller,
			template:	'<div class="shadow"></div>' +
						'<div class="epos" ng-click="ball.predict()">' +
						'	<div class="eball">' +
						'		<div class="egrad"></div>' +
						'  		<div class="ewin"><div>' +
						'  		<div class="triangle"></div>' +
						'  		<div class="textbox">{{ball.prediction}}</div>' +
						'	</div>' +
						'</div>'
		};

		function controller ($element) {

			var ball = angular.element($element.children()[1]).children();
			
			this.prediction = '';
			this.predict = predict;

			function predict () {
				var _this = this;
				this.prediction = '';
				ball.removeClass('predict');
				$timeout(function () {
					_this.prediction = geordieService.getPrediction();
					ball.addClass('predict');
				}, 750);
			}

		}
	}

	app.factory('geordieService', geordieService);

	function geordieService () {

		var predictionList = [

			"Nee man",
			"Haddaway & sh*te",
			"Are yee daft?",
			"Divven' count on it",
			"Give ower",

			"Aye",
			"Wey aye, man",
			"Aye, canny that like",
			"Aye, me ma said",
			"Bobby dazzla",
			"Propa",
			"Purely belta",

			"Howay man",
			"Calm doon",
			"Dee as yer telt",
			"Divven' knaa",
			"Are yee a worky ticket?",
			"Divven' be nebby",
			"Divven' ask me, I'm mortal",
			"Gan on the hoy"

		];

		function getPrediction () {
			return predictionList[Math.floor(Math.random() * predictionList.length)];
		}

		return {
			getPrediction: getPrediction
		};

	}


})();
