(function() {
	var options = {
		waitBeforeDisplayingRefresh: 600,
		waitBeforeAcceptingNew: 1500,
		beginInteraction: "&#x219F;",
		beginRefresh: "&#x21BB;",
		finishInteraction: "&#x21A1;"
	};	
	var scrollCount = 0;
	var isRefreshing = false;
	$.fn.elastic = function(refreshCallback) {		
		var refresh = refreshCallback;
		
		var $wrapper = $(this),
			$banner = $wrapper.find(".banner");
		
		$wrapper[0].scrollTop = 100;				
		
		// set down arrow as banner default state
		$banner.html(options.finishInteraction);
		$wrapper.on("mousewheel", handleScroll.bind({}, refresh, $wrapper, $banner));
	};
	var handleScroll = function(refresh, $wrapper, $banner, evt) {
		if(evt.originalEvent.wheelDelta > 0 && $wrapper.scrollTop() <= 100) {				
			// keep track of scroll progress manually
			scrollCount++;
			// ignore scrolls while refreshing
			if( isRefreshing ) return;
			
			$wrapper[0].scrollTop -= scrollCount/1e2;			
			
			if( $wrapper.scrollTop() <= 0 ) {		
				// when refresh has been triggered display up arrow
				isRefreshing = true;
				$banner.html(options.beginInteraction);
				
				// after a brief delay change to refresh symbol and refresh
				setTimeout(function() {
					$banner.html(options.beginRefresh);
					
					// perform refresh action and pass finish callback
					refresh(function() {
						// display down arrow and return scroll position
						$banner.html(options.finishInteraction);
						$wrapper[0].scrollTop = 100;
					});
				}, options.waitBeforeDisplayingRefresh);
				
				// delay listening when refreshing
				setTimeout(function() {					
					isRefreshing = false; 										
				}, options.waitBeforeAcceptingNew);
			}
		}
	};
}());	