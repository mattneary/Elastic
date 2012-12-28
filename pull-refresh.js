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
	
	$banner.html("&#x21A1;");
	$wrapper.on("mousewheel", function(evt) {
		if(evt.originalEvent.wheelDelta > 0 && $wrapper.scrollTop() <= 100) {				
			scrollCount++;
			if( isRefreshing ) return;			// don't handle scrolls when refreshing			
			
			$wrapper[0].scrollTop -= scrollCount/1e2;			
			
			if( $wrapper.scrollTop() <= 0 ) {		
				isRefreshing = true;
				$banner.html("&#x219F;");		// Up arrow								
				
				setTimeout(function() {
					$banner.html("&#x21BB;");	// Refreshing symbol					
					
					refresh(function() {
						$banner.html("&#x21A1;");	// Down arrow
						$wrapper[0].scrollTop = 100;
					});
				}, options.waitBeforeDisplayingRefresh);
				setTimeout(function() {					
					isRefreshing = false; 										
				}, options.waitBeforeAcceptingNew);
			}
		}
	});
};