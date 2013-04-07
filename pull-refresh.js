$.fn.pullToRefresh = function(refreshCallback) {
	var options = {
		waitBeforeDisplayingRefresh: 6e2,
		waitBeforeAcceptingNew: 1500 
	};
	var refresh = refreshCallback;
	
	var $wrapper = $(this),
		$banner = $wrapper.find(".banner");
	
	$wrapper[0].scrollTop = 100;
	
	var scrollCount = 0;
	var isRefreshing = false;
	
	// set down arrow as banner default state
	$banner.html("&#x21A1;");
	$wrapper.on("mousewheel", function(evt) {
		if(evt.originalEvent.wheelDelta > 0 && $wrapper.scrollTop() <= 100) {				
			// keep track of scroll progress manually
			scrollCount++;
			// ignore scrolls while refreshing
			if( isRefreshing ) return;
			
			$wrapper[0].scrollTop -= scrollCount/1e2;			
			
			if( $wrapper.scrollTop() <= 0 ) {		
				// when refresh has been triggered display up arrow
				isRefreshing = true;
				$banner.html("&#x219F;");
				
				// after a brief delay change to refresh symbol and refresh
				setTimeout(function() {
					$banner.html("&#x21BB;");
					
					// perform refresh action and pass finish callback
					refresh(function() {
						// display down arrow and return scroll position
						$banner.html("&#x21A1;");
						$wrapper[0].scrollTop = 100;
					});
				}, options.waitBeforeDisplayingRefresh);
				
				// delay listening when refreshing
				setTimeout(function() {					
					isRefreshing = false; 										
				}, options.waitBeforeAcceptingNew);
			}
		}
	});
};