(function(root) {
	EasingFunctions = {
		linear: function (t) { return t },
		easeInQuad: function (t) { return t*t },
		easeOutQuad: function (t) { return t*(2-t) },
		easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
		easeInCubic: function (t) { return t*t*t },
		easeOutCubic: function (t) { return (--t)*t*t+1 },
		easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
		easeInQuart: function (t) { return t*t*t*t },
		easeOutQuart: function (t) { return 1-(--t)*t*t*t },
		easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
		easeInQuint: function (t) { return t*t*t*t*t },
		easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
		easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
	};

	var requestAnimationFrame = 
		window.requestAnimationFrame || 
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || 
		window.msRequestAnimationFrame || 
		function(callback) {
			return window.setTimeout.call(window, callback, 40);
		};

	function animatePath(path, opts) {

		function draw(){
			var progress = (new Date()) - start;
			if (progress <= opts.duration) {
				var t = opts.easing(progress / opts.duration);
				path.setAttribute('stroke-dasharray', (len * t) + ',' + (len * (1 - t)));
				requestAnimationFrame(draw);
			}
		}

		var len 	= path.getTotalLength(), 
			start 	= new Date();
		
		requestAnimationFrame(draw);
	}

	root.animatePaths = function(opts) {
		opts = opts || {};

		// default values
		var order 		= opts.order 		|| 'parallel',
			paths 		= opts.paths 		|| [],
			duration 	= opts.duration 	|| 3000,
			easing 		= opts.easing 		|| 'linear';

		switch (order) {
			case 'parallel':
				for (var i = 0; i < paths.length; i++) {
					animatePath(paths[i], {
						duration: duration,
						easing: EasingFunctions[easing]
					});
				}
				break;
			case 'sequential':
				break;
			default:
				console.error('Invalid order: ' + order);
		}

	};
})(window);