/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _googleMaps = __webpack_require__(1);

	var _googleMaps2 = _interopRequireDefault(_googleMaps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapsShibuys = document.querySelector('.maps-shibuya'),
	    mapsEbis = document.querySelector('.maps-ebis');
	var shibuya = { lat: 35.6581, lng: 139.701742 },
	    ebisu = { lat: 35.647156, lng: 139.709739 },
	    hikawa = { lat: 35.653678, lng: 139.709073 },
	    polyLineOptions = {
	  strokeColor: "#ff0000"
	},
	    request = {
	  destination: hikawa,
	  origin: shibuya,
	  travelMode: 'WALKING'
	},
	    ebsRequest = {
	  destination: hikawa,
	  origin: ebisu,
	  travelMode: 'WALKING'
	},
	    shibuysPos = {
	  one: { lat: 35.657827, lng: 139.703561 },
	  two: { lat: 35.657468, lng: 139.703943 },
	  three: { lat: 35.653516, lng: 139.708636 }
	};
	_googleMaps2.default.KEY = 'AIzaSyD5ORJ_eDyRcjYyhAb5YOD3c1AHhKoMKzE';

	_googleMaps2.default.load(function (google) {
	  var map = new google.maps.Map(mapsShibuys, {
	    center: shibuya,
	    scrollwheel: false,
	    zoom: 15
	  });
	  var directionsDisplay = new google.maps.DirectionsRenderer({
	    map: map
	  });
	  var directionsService = new google.maps.DirectionsService();
	  directionsService.route(request, function (response, status) {
	    if (status == 'OK') {
	      // Display the route on the map.
	      directionsDisplay.polylineOptions = polyLineOptions;
	      directionsDisplay.setDirections(response);
	    }
	  });

	  var ebsMaps = new google.maps.Map(mapsEbis, {
	    center: ebisu,
	    scrollwheel: false,
	    zoom: 15
	  });
	  var directionsDisplayEbs = new google.maps.DirectionsRenderer({
	    map: ebsMaps
	  });
	  var directionsServiceEbs = new google.maps.DirectionsService();
	  directionsServiceEbs.route(ebsRequest, function (response, status) {
	    if (status == 'OK') {
	      directionsDisplayEbs.polylineOptions = polyLineOptions;
	      directionsDisplayEbs.setDirections(response);
	    }
	  });

	  new google.maps.StreetViewPanorama(document.querySelector('.maps-shibuya__01'), {
	    position: shibuysPos.one,
	    pov: {
	      heading: 300,
	      pitch: 0
	    }
	  });
	  new google.maps.StreetViewPanorama(document.querySelector('.maps-shibuya__02'), {
	    position: shibuysPos.two,
	    pov: {
	      heading: 130,
	      pitch: 0
	    }
	  });
	  new google.maps.StreetViewPanorama(document.querySelector('.maps-shibuya__03'), {
	    position: shibuysPos.three,
	    pov: {
	      heading: 130,
	      pitch: 0
	    }
	  });
	  new google.maps.StreetViewPanorama(document.querySelector('.maps-shibuya__04'), {
	    position: hikawa,
	    pov: {
	      heading: 130,
	      pitch: 0
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {

		if (root === null) {
			throw new Error('Google-maps package can be used only in browser');
		}

		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.GoogleMapsLoader = factory();
		}

	})(typeof window !== 'undefined' ? window : null, function() {


		'use strict';


		var googleVersion = '3.18';

		var script = null;

		var google = null;

		var loading = false;

		var callbacks = [];

		var onLoadEvents = [];

		var originalCreateLoaderMethod = null;


		var GoogleMapsLoader = {};


		GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

		GoogleMapsLoader.KEY = null;

		GoogleMapsLoader.LIBRARIES = [];

		GoogleMapsLoader.CLIENT = null;

		GoogleMapsLoader.CHANNEL = null;

		GoogleMapsLoader.LANGUAGE = null;

		GoogleMapsLoader.REGION = null;

		GoogleMapsLoader.VERSION = googleVersion;

		GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


		GoogleMapsLoader._googleMockApiObject = {};


		GoogleMapsLoader.load = function(fn) {
			if (google === null) {
				if (loading === true) {
					if (fn) {
						callbacks.push(fn);
					}
				} else {
					loading = true;

					window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
						ready(fn);
					};

					GoogleMapsLoader.createLoader();
				}
			} else if (fn) {
				fn(google);
			}
		};


		GoogleMapsLoader.createLoader = function() {
			script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = GoogleMapsLoader.createUrl();

			document.body.appendChild(script);
		};


		GoogleMapsLoader.isLoaded = function() {
			return google !== null;
		};


		GoogleMapsLoader.createUrl = function() {
			var url = GoogleMapsLoader.URL;

			url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

			if (GoogleMapsLoader.KEY) {
				url += '&key=' + GoogleMapsLoader.KEY;
			}

			if (GoogleMapsLoader.LIBRARIES.length > 0) {
				url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
			}

			if (GoogleMapsLoader.CLIENT) {
				url += '&client=' + GoogleMapsLoader.CLIENT + '&v=' + GoogleMapsLoader.VERSION;
			}

			if (GoogleMapsLoader.CHANNEL) {
				url += '&channel=' + GoogleMapsLoader.CHANNEL;
			}

			if (GoogleMapsLoader.LANGUAGE) {
				url += '&language=' + GoogleMapsLoader.LANGUAGE;
			}

			if (GoogleMapsLoader.REGION) {
				url += '&region=' + GoogleMapsLoader.REGION;
			}

			return url;
		};


		GoogleMapsLoader.release = function(fn) {
			var release = function() {
				GoogleMapsLoader.KEY = null;
				GoogleMapsLoader.LIBRARIES = [];
				GoogleMapsLoader.CLIENT = null;
				GoogleMapsLoader.CHANNEL = null;
				GoogleMapsLoader.LANGUAGE = null;
				GoogleMapsLoader.REGION = null;
				GoogleMapsLoader.VERSION = googleVersion;

				google = null;
				loading = false;
				callbacks = [];
				onLoadEvents = [];

				if (typeof window.google !== 'undefined') {
					delete window.google;
				}

				if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
					delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
				}

				if (originalCreateLoaderMethod !== null) {
					GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
					originalCreateLoaderMethod = null;
				}

				if (script !== null) {
					script.parentElement.removeChild(script);
					script = null;
				}

				if (fn) {
					fn();
				}
			};

			if (loading) {
				GoogleMapsLoader.load(function() {
					release();
				});
			} else {
				release();
			}
		};


		GoogleMapsLoader.onLoad = function(fn) {
			onLoadEvents.push(fn);
		};


		GoogleMapsLoader.makeMock = function() {
			originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

			GoogleMapsLoader.createLoader = function() {
				window.google = GoogleMapsLoader._googleMockApiObject;
				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
			};
		};


		var ready = function(fn) {
			var i;

			loading = false;

			if (google === null) {
				google = window.google;
			}

			for (i = 0; i < onLoadEvents.length; i++) {
				onLoadEvents[i](google);
			}

			if (fn) {
				fn(google);
			}

			for (i = 0; i < callbacks.length; i++) {
				callbacks[i](google);
			}

			callbacks = [];
		};


		return GoogleMapsLoader;

	});


/***/ }
/******/ ]);