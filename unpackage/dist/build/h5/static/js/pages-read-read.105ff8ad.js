(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-read-read"],{"0df8":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=uni.getSystemInfoSync().statusBarHeight+"px",a={name:"UniStatusBar",data:function(){return{statusBarHeight:i}}};n.default=a},"14bc":function(t,n,e){"use strict";var i,a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.visibleSync?e("v-uni-view",{staticClass:"uni-drawer",class:{"uni-drawer--visible":t.showDrawer}},[e("v-uni-view",{staticClass:"uni-drawer__mask",class:{"uni-drawer__mask--visible":t.showDrawer&&t.mask},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.close.apply(void 0,arguments)}}}),e("v-uni-view",{staticClass:"uni-drawer__content",class:{"uni-drawer--right":t.rightMode,"uni-drawer--left":!t.rightMode,"uni-drawer__content--visible":t.showDrawer}},[t._t("default")],2)],1):t._e()},o=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}))},"198f":function(t,n,e){var i=e("5b7c");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("06dff9f5",i,!0,{sourceMap:!1,shadowMode:!1})},2201:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={name:"UniDrawer",props:{visible:{type:Boolean,default:!1},mode:{type:String,default:""},mask:{type:Boolean,default:!0}},data:function(){return{visibleSync:!1,showDrawer:!1,rightMode:!1,watchTimer:null}},watch:{visible:function(t){t?this.open():this.close()}},created:function(){var t=this;this.visibleSync=this.visible,setTimeout((function(){t.showDrawer=t.visible}),100),this.rightMode="right"===this.mode},methods:{close:function(){this._change("showDrawer","visibleSync",!1)},open:function(){this._change("visibleSync","showDrawer",!0)},_change:function(t,n,e){var i=this;this[t]=e,this.watchTimer&&clearTimeout(this.watchTimer),this.watchTimer=setTimeout((function(){i[n]=e,i.$emit(e?"open":"close")}),e?50:300)}}};n.default=i},2561:function(t,n,e){"use strict";var i={uniStatusBar:e("40aa").default,uniIcons:e("659e").default},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"uni-navbar"},[e("v-uni-view",{staticClass:"uni-navbar__content",class:{"uni-navbar--fixed":t.fixed,"uni-navbar--shadow":t.shadow,"uni-navbar--border":t.border},style:{"background-color":t.backgroundColor}},[t.statusBar?e("uni-status-bar"):t._e(),e("v-uni-view",{staticClass:"uni-navbar__header uni-navbar__content_view",style:{color:t.color,backgroundColor:t.backgroundColor}},[e("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__header-btns-left uni-navbar__content_view",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onClickLeft.apply(void 0,arguments)}}},[t.leftIcon.length?e("v-uni-view",{staticClass:"uni-navbar__content_view"},[e("uni-icons",{attrs:{color:t.color,type:t.leftIcon,size:"24"}})],1):t._e(),t.leftText.length?e("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view",class:{"uni-navbar-btn-icon-left":!t.leftIcon.length}},[e("v-uni-text",{style:{color:t.color,fontSize:"14px"}},[t._v(t._s(t.leftText))])],1):t._e(),t._t("left")],2),e("v-uni-view",{staticClass:"uni-navbar__header-container uni-navbar__content_view"},[t.title.length?e("v-uni-view",{staticClass:"uni-navbar__header-container-inner uni-navbar__content_view"},[e("v-uni-text",{staticClass:"uni-nav-bar-text",style:{color:t.color}},[t._v(t._s(t.title))])],1):t._e(),t._t("default")],2),e("v-uni-view",{staticClass:"uni-navbar__header-btns uni-navbar__content_view",class:t.title.length?"uni-navbar__header-btns-right":"",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onClickRight.apply(void 0,arguments)}}},[t.rightIcon.length?e("v-uni-view",{staticClass:"uni-navbar__content_view"},[e("uni-icons",{attrs:{color:t.color,type:t.rightIcon,size:"24"}})],1):t._e(),t.rightText.length&&!t.rightIcon.length?e("v-uni-view",{staticClass:"uni-navbar-btn-text uni-navbar__content_view"},[e("v-uni-text",{staticClass:"uni-nav-bar-right-text"},[t._v(t._s(t.rightText))])],1):t._e(),t._t("right")],2)],1)],1),t.fixed?e("v-uni-view",{staticClass:"uni-navbar__placeholder"},[t.statusBar?e("uni-status-bar"):t._e(),e("v-uni-view",{staticClass:"uni-navbar__placeholder-view"})],1):t._e()],1)},o=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}))},"2f14":function(t,n,e){"use strict";e.r(n);var i=e("0df8"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},"3be0":function(t,n,e){"use strict";e.r(n);var i=e("cc9c"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},"3e6a":function(t,n,e){"use strict";var i=e("ee27");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("40aa")),o=i(e("659e")),r={name:"UniNavBar",components:{uniStatusBar:a.default,uniIcons:o.default},props:{title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:"#000000"},backgroundColor:{type:String,default:"#FFFFFF"},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[Boolean,String],default:!1},border:{type:[Boolean,String],default:!0}},mounted:function(){uni.report&&""!==this.title&&uni.report("title",this.title)},methods:{onClickLeft:function(){this.$emit("clickLeft")},onClickRight:function(){this.$emit("clickRight")}}};n.default=r},"40aa":function(t,n,e){"use strict";e.r(n);var i=e("966c"),a=e("2f14");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("f531");var r,s=e("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"065c48ef",null,!1,i["a"],r);n["default"]=c.exports},4892:function(t,n,e){var i=e("6d91");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("bccb043e",i,!0,{sourceMap:!1,shadowMode:!1})},4966:function(t,n,e){"use strict";e.r(n);var i=e("14bc"),a=e("fcf4");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("88cf");var r,s=e("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"0057a61d",null,!1,i["a"],r);n["default"]=c.exports},"5ac0":function(t,n,e){"use strict";var i=e("6fbf"),a=e.n(i);a.a},"5b7c":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t/* 抽屉宽度\n */.uni-drawer[data-v-0057a61d]{\ndisplay:block;\nposition:fixed;top:0;left:0;right:0;bottom:0;overflow:hidden;z-index:999}.uni-drawer__content[data-v-0057a61d]{\ndisplay:block;\nposition:absolute;top:0;width:220px;bottom:0;background-color:#fff;-webkit-transition:-webkit-transform .3s ease;transition:-webkit-transform .3s ease;transition:transform .3s ease;transition:transform .3s ease,-webkit-transform .3s ease}.uni-drawer--left[data-v-0057a61d]{left:0;-webkit-transform:translateX(-220px);transform:translateX(-220px)}.uni-drawer--right[data-v-0057a61d]{right:0;-webkit-transform:translateX(220px);transform:translateX(220px)}.uni-drawer__content--visible[data-v-0057a61d]{-webkit-transform:translateX(0);transform:translateX(0)}.uni-drawer__mask[data-v-0057a61d]{\ndisplay:block;\nopacity:0;position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,.4);-webkit-transition:opacity .3s;transition:opacity .3s}.uni-drawer__mask--visible[data-v-0057a61d]{\ndisplay:block;\nopacity:1}",""]),t.exports=n},"64ec":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,".content[data-v-5e1b6c58]{width:98%;margin-left:1%}.nex-btn[data-v-5e1b6c58]{text-align:center;font-size:%?32?%}.txt1[data-v-5e1b6c58]{padding-right:%?30?%}.txt2[data-v-5e1b6c58]{padding-left:%?30?%}",""]),t.exports=n},"6d91":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,".uni-nav-bar-text[data-v-691948cb]{\n\n\nfont-size:%?32?%\n}.uni-nav-bar-right-text[data-v-691948cb]{font-size:%?28?%}.uni-navbar__content[data-v-691948cb]{position:relative;background-color:#fff;overflow:hidden}.uni-navbar__content_view[data-v-691948cb]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row\n\t\t/* background-color: #FFFFFF;\n */}.uni-navbar__header[data-v-691948cb]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;height:44px;line-height:44px;font-size:16px\n\t\t/* background-color: #ffffff;\n */}.uni-navbar__header-btns[data-v-691948cb]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-flex-wrap:nowrap;flex-wrap:nowrap;width:%?120?%;padding:0 6px;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.uni-navbar__header-btns-left[data-v-691948cb]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\nwidth:%?150?%;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.uni-navbar__header-btns-right[data-v-691948cb]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\nwidth:%?150?%;padding-right:%?30?%;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.uni-navbar__header-container[data-v-691948cb]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.uni-navbar__header-container-inner[data-v-691948cb]{\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\n-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?28?%}.uni-navbar__placeholder-view[data-v-691948cb]{height:44px}.uni-navbar--fixed[data-v-691948cb]{position:fixed;z-index:998}.uni-navbar--shadow[data-v-691948cb]{\nbox-shadow:0 1px 6px #ccc\n}.uni-navbar--border[data-v-691948cb]{\n\t\t/* border-bottom-width: 1rpx; */\n\t\t/* border-bottom-style: solid; */\n\t\t/* border-bottom-color: #e5e5e5; */}",""]),t.exports=n},"6fbf":function(t,n,e){var i=e("64ec");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("2c6ee514",i,!0,{sourceMap:!1,shadowMode:!1})},"70f4":function(t,n,e){"use strict";var i=e("4892"),a=e.n(i);a.a},"88cf":function(t,n,e){"use strict";var i=e("198f"),a=e.n(i);a.a},"966c":function(t,n,e){"use strict";var i,a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",{staticClass:"uni-status-bar",style:{height:t.statusBarHeight}},[t._t("default")],2)},o=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}))},"9c41":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,".uni-status-bar[data-v-065c48ef]{width:%?750?%;height:20px\n\t\t/* height: var(--status-bar-height);\n */}",""]),t.exports=n},a5b0:function(t,n,e){"use strict";e.r(n);var i=e("e420"),a=e("3be0");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("5ac0");var r,s=e("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"5e1b6c58",null,!1,i["a"],r);n["default"]=c.exports},b979:function(t,n,e){"use strict";e.r(n);var i=e("2561"),a=e("cdae");for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);e("70f4");var r,s=e("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"691948cb",null,!1,i["a"],r);n["default"]=c.exports},c199:function(t,n,e){var i=e("9c41");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=e("4f06").default;a("1a89763d",i,!0,{sourceMap:!1,shadowMode:!1})},cc9c:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{book_id:"",list:[],content:"",content_id:1,status:!1,page:1,size:20,contentList:[],fontsize:32}},onLoad:function(t){this.book_id=t.bookid,this.content_id=t.con_id},onShow:function(){this.getContent(),this.getList()},methods:{getContents:function(t,n){this.book_id=n,this.content_id=t,this.getContent()},getFontSize:function(){this.fontsize=this.fontsize+2},getContent:function(){var t=this;this.$request("/read/content",{book_id:this.book_id,content_id:this.content_id},"get").then((function(n){console.log(n.content),t.list=n.content,t.content=n.title,console.log(t.content)}))},tanchuang:function(){this.status=!this.status},getList:function(){var t=this;this.$request("/read/list",{book_id:this.book_id,page:this.page,size:this.size},"get").then((function(n){console.log(n.res.data),t.contentList=n.res.data}))},getMoreList:function(){var t=this;this.page=this.page+1,this.$request("/read/list",{book_id:this.book_id,page:this.page,size:this.size},"get").then((function(n){console.log(n.res.data),t.contentList=n.res.data}))},getLastList:function(){var t=this;this.page=this.page-1,this.$request("/read/list",{book_id:this.book_id,page:this.page,size:this.size},"get").then((function(n){console.log(n.res.data),t.contentList=n.res.data}))}}};n.default=i},cdae:function(t,n,e){"use strict";e.r(n);var i=e("3e6a"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a},e420:function(t,n,e){"use strict";var i={uniNavBar:e("b979").default,uniDrawer:e("4966").default},a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("uni-nav-bar",{attrs:{"background-color":"#a2a0a1",fixed:"true","status-bar":"true",color:"white","left-icon":"back","left-text":"返回","right-text":"目录",title:t.content},on:{clickLeft:function(n){arguments[0]=n=t.$handleEvent(n),t.clickLeft.apply(void 0,arguments)},clickRight:function(n){arguments[0]=n=t.$handleEvent(n),t.tanchuang.apply(void 0,arguments)}}}),t._l(t.list,(function(n){return e("v-uni-view",{staticClass:"content",style:{fontSize:t.fontsize+"rpx"}},[e("v-uni-text",{attrs:{space:"ensp"}},[t._v(t._s("   "+n))]),e("br")],1)})),e("uni-drawer",{attrs:{visible:t.status}},[e("v-uni-view",{staticStyle:{padding:"30rpx"}},t._l(t.contentList,(function(n){return e("v-uni-view",{staticClass:"uni-title",staticStyle:{"font-size":"32rpx","padding-bottom":"15rpx"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getContents(n.content_id,n.book_id)}}},[t._v(t._s(n.title))])})),1),e("v-uni-view",{staticClass:"nex-btn"},[e("v-uni-text",{staticClass:"txt1",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.getLastList.apply(void 0,arguments)}}},[t._v("上一章")]),e("v-uni-text",{staticClass:"txt2",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.getMoreList.apply(void 0,arguments)}}},[t._v("下一章")])],1)],1)],2)},o=[];e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return i}))},f531:function(t,n,e){"use strict";var i=e("c199"),a=e.n(i);a.a},fcf4:function(t,n,e){"use strict";e.r(n);var i=e("2201"),a=e.n(i);for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);n["default"]=a.a}}]);