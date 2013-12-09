/**
 * Synchronize.js
 * Version 1.0.0
 *
 * Copyright 2013 Denis Meyer
 */
!function(n){function e(n,e,t){return!isNaN(n)&&!isNaN(e)&&!isNaN(t)&&t>=e?n>=e&&t>=n:!1}function t(e){return e?o()?videojs(e):n("#"+e):void 0}function r(n){return n?o()?videojs(n):t(n).get(0):void 0}function o(){return!("undefined"==typeof videojs)}function u(n){return o()&&n?n.Q:n}function i(n){return n?(r(n).play(),!0):!1}function f(n){return n?(o()?r(n).volume(0):r(n).muted=!0,void 0):void 0}function s(n){return n?r(n).pause():!1}function a(n){return n?o()?r(n).paused():r(n).paused:!1}function c(n){return n?o()?r(n).duration():r(n).duration:-1}function d(n){return n?o()?r(n).currentTime():r(n).currentTime:-1}function g(n,e){var t=c(n);return n&&-1!=t&&!isNaN(e)&&e>=0&&t>=e?(o()?r(n).currentTime(e):r(n).currentTime=e,!0):(g(n,t),!1)}function l(n){return n?o()?r(n).buffered():r(n).buffered:void 0}function m(){for(var t,r=d(b),o=0;o<P.length;++o)P[o]!=b&&(t=d(P[o]),-1==r||-1==t||e(t,r-E,r)||(n(document).trigger("sjs:synchronizing",[r,P[o]]),g(P[o],r)&&i(P[o])))}function v(){if(N()){var e=t(b);e.on("play",function(){n(document).trigger("sjs:masterPlay",[d(b)]),q=!1,V||(V=!0,h());for(var e=0;e<P.length;++e)P[e]!=b&&(t(P[e]).on("play",function(){f(P[e])}),i(P[e]))}),e.on("pause",function(){n(document).trigger("sjs:masterPause",[d(b)]),q=!S&&L&&!0,S=S?!S:S;for(var e=0;e<P.length;++e)P[e]!=b&&(s(P[e]),m())}),e.on("ended",function(){n(document).trigger("sjs:masterEnded",[c(b)]),q=!0;for(var e=0;e<P.length;++e)P[e]!=b&&(m(),s(P[e]))}),e.on("timeupdate",function(){n(document).trigger("sjs:masterTimeupdate",[d(b)]),q=!0;var e=Date.now();if(e-C>k||a(b)){C=e;for(var t,r=0;r<P.length;++r)P[r]!=b&&(f(P[r]),t=a(P[r]),m(),(t||a(b))&&s(P[r]))}})}else for(var r=0;r<P.length;++r)s(P[r])}function h(){I=window.setInterval(function(){for(var t=!0,r=(d(b),0);r<P.length;++r){var o=l(P[r]);if(o){var u=c(P[r]),f=d(P[r])+x,a=!1;for(j=0;j<o.length&&!a;++j)f=f>=u?u:f,e(f,o.start(j),o.end(j))&&(a=!0);t=t&&a}}if(t)L&&!q?(L=!1,i(b),q=!1,n(document).trigger("sjs:bufferedAndAutoplaying",[])):L&&(L=!1,n(document).trigger("sjs:bufferedButNotAutoplaying",[]));else{L=!0,S=!0;for(var r=0;r<P.length;++r)s(P[r]);q=!1,n(document).trigger("sjs:buffering",[])}},D)}function p(e){A=e<P.length?e:0,b=P[A],n(document).trigger("sjs:masterSet",[b])}function y(n,e){n&&e&&t(n).on("loadeddata",function(){e()})}function N(){if(o()){for(var n=0;n<P.length;++n)if(!z[P[n]])return!1;return!0}return B==P.length}function w(){for(var n=0;n<P.length;++n)s(P[n]);Q=!0}function T(){for(var n=0;n<P.length;++n)s(P[n]);Q=!1}var b,I,P=[],R={},z={},A=0,B=0,C=0,k=2e3,E=1,Q=!1,V=!1,D=1e3,L=!1,S=!1,q=!1,x=1.5;n.synchronizeVideos=function(e){A=e;for(var r=!0,f=1;f<arguments.length;++f)r=r&&arguments[f]&&n("#"+arguments[f]).length,r?(P[P.length]=arguments[f],R[P[f-1]]=!1,z[P[f-1]]=!1):n(document).trigger("sjs:invalidId",[arguments[f]]);if(r&&P.length>1)if(o())for(var f=0;f<P.length;++f){n(document).trigger("sjs:idRegistered",[P[f]]);var a=e;t(P[f]).on("play",w),t(P[f]).on("pause",T),t(P[f]).ready(function(){var e=u(this);R[e]=!0,y(e,function(){if(z[e]=!0,n(document).trigger("sjs:playerLoaded",[e]),N()){p(a);for(var r=0;r<P.length;++r)t(P[r]).off("play",w),t(P[r]).off("pause",T);v(),Q&&i(b),n(document).trigger("sjs:allPlayersReady",[])}})})}else for(var f=0;f<P.length;++f){n(document).trigger("sjs:idRegistered",[P[f]]);var a=e;t(P[f]).on("play",w),t(P[f]).on("pause",T),t(P[f]).ready(function(){if(++B,N()){p(a);for(var e=0;e<P.length;++e)t(P[e]).off("play",w),t(P[e]).off("pause",T);v(),Q&&i(b),n(document).trigger("sjs:allPlayersReady",[])}})}else n(document).trigger("sjs:notEnoughVideos",[]);n(document).on("sjs:play",function(){N()&&i(b)}),n(document).on("sjs:pause",function(){N()&&s(b)}),n(document).on("sjs:setCurrentTime",function(n,e){N()&&g(b,e)}),n(document).on("sjs:synchronize",function(){N()&&m()}),n(document).on("sjs:startBufferChecker",function(){V||(window.clearInterval(I),V=!0,h())}),n(document).on("sjs:stopBufferChecker",function(){window.clearInterval(I),V=!1})}}(jQuery);