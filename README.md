Introduction
============
Pull to refresh is a very prevalent design pattern in mobile apps. However, when making apps for other devices, developers are often unable to find the analog for new platforms. This is where Elastic comes in, offering a desktop experience consistent with pull to refresh.

![Elastic](images/preview.png)

Usage
=====
Provide a wrapper for your page content; the `body` won't work as the `body` cannot be wrapped
by another element.

```html
<div id="main">
<!--
	contents of website...	
-->
</div>
```

Tell the jQuery plugin how to handle the refreshing of a given wrapper.
```javascript
$("#main").pullToRefresh(function(finishedRefreshCallback) {
	// refresh content... 
	putList();
	
	// ...then tell pullToRefresh to finish
	setTimeout(finishedRefreshCallback, 1e3);
});
```
