(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-book_self-book_self"],{"29f0":function(t,n,e){"use strict";e.r(n);var o=e("86c0"),u=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=u.a},"34be":function(t,n,e){"use strict";e.r(n);var o=e("b3fe"),u=e("29f0");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);var r,c=e("f0c5"),f=Object(c["a"])(u["default"],o["b"],o["c"],!1,null,"715cbfa0",null,!1,o["a"],r);n["default"]=f.exports},"86c0":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{list:[]}},onLoad:function(){this.getMyBook()},methods:{getMyBook:function(){var t=this;this.$request("/collect/getbookself",{},"post").then((function(n){console.log(n),t.list=n}))}}};n.default=o},b3fe:function(t,n,e){"use strict";var o,u=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("v-uni-view",{staticClass:"list"},t._l(t.list,(function(t,n){return e("v-uni-view",{key:n},[e("v-uni-image",{attrs:{src:t.book.main_img_url,mode:""}})],1)})),1)],1)},i=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}))}}]);