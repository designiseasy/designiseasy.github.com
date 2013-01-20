/*
 Create and manage a DOM event delegator.

 @version 0.1.1
 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
 FastClick: polyfill to remove click delays on browsers with touch UIs.

 @version 0.5.1
 @codingstandard ftlabs-jsv2
 @copyright The Financial Times Limited [All Rights Reserved]
 @license MIT License (see LICENSE.txt)
*/
function Delegate(a){var b=this;"string"===typeof a&&(a=document.querySelector(a));if(!a||!a.addEventListener)throw new TypeError("Root node not specified");this.root=a;this.listenerMap={};this.handle=function(a){Delegate.prototype.handle.call(b,a)}}Delegate.tagsCaseSensitive=null;Delegate.prototype.captureForType=function(a){return"error"===a};
Delegate.prototype.on=function(a,b,c,d){var e,f,g,h=this;if(!a)throw new TypeError("Invalid event type: "+a);if(!b)throw new TypeError("Invalid selector: "+b);if(-1!==a.indexOf(" "))return a.split(" ").forEach(function(a){h.on(a,b,c,d)}),this;void 0===d&&(d=null);if("function"!==typeof c)throw new TypeError("Handler must be a type of Function");e=this.root;f=this.listenerMap;f[a]||(e.addEventListener(a,this.handle,this.captureForType(a)),f[a]=[]);/^[a-z]+$/i.test(b)?(null===Delegate.tagsCaseSensitive&&
(Delegate.tagsCaseSensitive="i"===document.createElement("i").tagName),g=Delegate.tagsCaseSensitive?b:b.toUpperCase(),e=this.matchesTag):/^#[a-z0-9\-_]+$/i.test(b)?(g=b.slice(1),e=this.matchesId):(g=b,e=this.matches);f[a].push({selector:b,eventData:d,handler:c,matcher:e,matcherParam:g});return this};
Delegate.prototype.off=function(a,b,c){var d,e,f,g=this;d=this.listenerMap;if(!a){for(e in d)d.hasOwnProperty(e)&&this.off(e,b,c);return this}f=d[a];if(!f||!f.length)return this;if(-1!==a.indexOf(" "))return a.split(" ").forEach(function(a){g.off(a,b,c)}),this;for(d=f.length-1;0<=d;d--)e=f[d],(!b||b===e.selector)&&(!c||c===e.handler)&&f.splice(d,1);f.length||(delete f[a],this.root.removeEventListener(a,this.handle,this.captureForType(a)));return this};
Delegate.prototype.handle=function(a){var b,c,d,e,f,g,h;if(!0!==a.ftLabsDelegateIgnore){h=a.target;h.nodeType===Node.TEXT_NODE&&(h=h.parentNode);d=this.root;g=this.listenerMap[a.type];for(c=g.length;h&&c;){for(b=0;b<c;b++){e=g[b];if(!e)break;e.matcher.call(h,e.matcherParam,h)&&(f=this.fire(a,h,e));if(!1===f){a.ftLabsDelegateIgnore=!0;return}}if(h===d)break;c=g.length;h=h.parentElement}}};
Delegate.prototype.fire=function(a,b,c){var d;null!==c.eventData?(d=a.data,a.data=c.eventData,b=c.handler.call(b,a,b),a.data=d):b=c.handler.call(b,a,b);return b};Delegate.prototype.matches=function(a){return a.matchesSelector||a.webkitMatchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector}(HTMLElement.prototype);Delegate.prototype.matchesTag=function(a,b){return a===b.tagName};Delegate.prototype.matchesId=function(a,b){return a===b.id};
"undefined"!==typeof define&&define.amd&&define(function(){return Delegate});"undefined"!==typeof module&&module.exports&&(module.exports=function(a){return new Delegate(a)},module.exports.Delegate=Delegate);
function FastClick(a){var b,c=this;this.trackingClick=!1;this.trackingClickStart=0;this.targetElement=null;this.lastTouchIdentifier=this.touchStartY=this.touchStartX=0;this.layer=a;if(!a||!a.nodeType)throw new TypeError("Layer must be a document node");this.onClick=function(){FastClick.prototype.onClick.apply(c,arguments)};this.onTouchStart=function(){FastClick.prototype.onTouchStart.apply(c,arguments)};this.onTouchMove=function(){FastClick.prototype.onTouchMove.apply(c,arguments)};this.onTouchEnd=
function(){FastClick.prototype.onTouchEnd.apply(c,arguments)};this.onTouchCancel=function(){FastClick.prototype.onTouchCancel.apply(c,arguments)};"undefined"!==typeof window.ontouchstart&&(a.addEventListener("click",this.onClick,!0),a.addEventListener("touchstart",this.onTouchStart,!1),a.addEventListener("touchmove",this.onTouchMove,!1),a.addEventListener("touchend",this.onTouchEnd,!1),a.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(a.removeEventListener=
function(b,c,f){var g=Node.prototype.removeEventListener;"click"===b?g.call(a,b,c.hijacked||c,f):g.call(a,b,c,f)},a.addEventListener=function(b,c,f){var g=Node.prototype.addEventListener;"click"===b?g.call(a,b,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),f):g.call(a,b,c,f)}),"function"===typeof a.onclick&&(b=a.onclick,a.addEventListener("click",function(a){b(a)},!1),a.onclick=null))}FastClick.prototype.deviceIsAndroid=0<navigator.userAgent.indexOf("Android");
FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&/OS 4_\d(_\d)?/.test(navigator.userAgent);FastClick.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case "label":case "video":return!0;default:return/\bneedsclick\b/.test(a.className)}};
FastClick.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case "textarea":case "select":return!0;case "input":switch(a.type){case "button":case "checkbox":case "file":case "image":case "radio":case "submit":return!1}return!0;default:return/\bneedsfocus\b/.test(a.className)}};
FastClick.prototype.sendClick=function(a,b){var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur();d=b.changedTouches[0];c=document.createEvent("MouseEvents");c.initMouseEvent("click",!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null);c.forwardedTouchEvent=!0;a.dispatchEvent(c)};FastClick.prototype.focus=function(a){var b;this.deviceIsIOS&&a.setSelectionRange?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()};
FastClick.prototype.updateScrollParent=function(a){var b,c;b=a.fastClickScrollParent;if(!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c;a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)};FastClick.prototype.getTargetElementFromEventTarget=function(a){return a.nodeType===Node.TEXT_NODE?a.parentNode:a};
FastClick.prototype.onTouchStart=function(a){var b,c;b=this.getTargetElementFromEventTarget(a.target);c=a.targetTouches[0];if(this.deviceIsIOS){if(window.getSelection().rangeCount)return!0;if(!this.deviceIsIOS4){if(c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier;this.updateScrollParent(b)}}this.trackingClick=!0;this.trackingClickStart=a.timeStamp;this.targetElement=b;this.touchStartX=c.pageX;this.touchStartY=c.pageY;200>a.timeStamp-this.lastClickTime&&
a.preventDefault();return!0};FastClick.prototype.touchHasMoved=function(a){a=a.targetTouches[0];return 10<Math.abs(a.pageX-this.touchStartX)||10<Math.abs(a.pageY-this.touchStartY)?!0:!1};FastClick.prototype.onTouchMove=function(a){if(!this.trackingClick)return!0;if(this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))this.trackingClick=!1,this.targetElement=null;return!0};
FastClick.prototype.findControl=function(a){return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")};
FastClick.prototype.onTouchEnd=function(a){var b,c,d=this.targetElement;if(!this.trackingClick)return!0;if(200>a.timeStamp-this.lastClickTime)return this.cancelNextClick=!0;this.lastClickTime=a.timeStamp;b=this.trackingClickStart;this.trackingClick=!1;this.trackingClickStart=0;c=d.tagName.toLowerCase();if("label"===c){if(b=this.findControl(d)){this.focus(d);if(this.deviceIsAndroid)return!1;d=b}}else if(this.needsFocus(d)){if(100<a.timeStamp-b||this.deviceIsIOS&&window.top!==window&&"input"===c)return this.targetElement=
null,!1;this.focus(d);if(!this.deviceIsIOS4||"select"!==c)this.targetElement=null,a.preventDefault();return!1}if(this.deviceIsIOS&&!this.deviceIsIOS4&&(b=d.fastClickScrollParent)&&b.fastClickLastScrollTop!==b.scrollTop)return!0;this.needsClick(d)||(a.preventDefault(),this.sendClick(d,a));return!1};FastClick.prototype.onTouchCancel=function(){this.trackingClick=!1;this.targetElement=null};
FastClick.prototype.onClick=function(a){var b;if(!this.targetElement||a.forwardedTouchEvent)return!0;b=this.targetElement;this.targetElement=null;return this.trackingClick?(this.trackingClick=!1,!0):!a.cancelable||"submit"===a.target.type&&0===a.detail?!0:!this.needsClick(b)||this.cancelNextClick?(this.cancelNextClick=!1,a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0};
FastClick.prototype.destroy=function(){var a=this.layer;a.removeEventListener("click",this.onClick,!0);a.removeEventListener("touchstart",this.onTouchStart,!1);a.removeEventListener("touchmove",this.onTouchMove,!1);a.removeEventListener("touchend",this.onTouchEnd,!1);a.removeEventListener("touchcancel",this.onTouchCancel,!1)};"undefined"!==typeof define&&define.amd&&define(function(){return FastClick});
"undefined"!==typeof module&&module.exports&&(module.exports=function(a){return new FastClick(a)},module.exports.FastClick=FastClick);
(function(a){var b=a.document,c,d,e;c=function(a,b){req=new XMLHttpRequest;req.addEventListener("readystatechange",function(){4===req.readyState&&(200===req.status||304===req.status)&&b(req.responseText)},!1);req.open("GET",a,!1);req.send()};d=function(a){var c=b.getElementById("main"),d=document.implementation.createHTMLDocument(b.title);d.body.innerHTML=a;c.innerHTML=d.getElementById("main").innerHTML};e=function(c){a.history.pushState({},b.title,c)};delegate=new Delegate(b.body);delegate.on("click",
"a",function(b,g){var h=a.location,j=h.protocol+"//"+h.host;if(h.href===g.href)b.preventDefault();else{if(0!==g.href.indexOf(j))return!0;b.preventDefault();c(g.pathname,function(a){d(a);e(g.pathname)})}});a.addEventListener("popstate",function(){c(a.location.pathname,function(a){d(a)})},!1);a.addEventListener("load",function(){new FastClick(b.body)},!1)})(this);
