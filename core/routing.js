/*
 * Routing initialized
 * =============================================================
 * */
(function ($) {
	var routes = {},
		defaultRoute = '/desktop';

	routes['/desktop'] = {
		url: '#/desktop',
		templateUrl: 'app/desktop/desktop.html?v=' + Math.random(),
		cache: false,
	};

	// Default route redirect
	routes['/'] = {
		url: '#/',
		templateUrl: 'app/desktop/desktop.html?v=' + Math.random(),
		cache: false,
	};

	routes['/404'] = {
		url: '#/404',
		templateUrl: '404.html',
		cache: false,
	};

	// Components Showcase Module
	routes['/components'] = {
		url: '#/components',
		templateUrl: 'app/components/index.html?v=' + Math.random(),
		cache: false
	};

	$.router.setData(routes).setDefault(defaultRoute);

	$.when($.ready).then(function () {
		$.router.run('.my-app', '/desktop');
		console.log('Router initialized, navigating to /desktop');
	});

})(jQuery);
