(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{478:function(e,t,n){var content=n(524);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(104).default)("7c24a868",content,!0,{sourceMap:!1})},520:function(e,t,n){e.exports=n.p+"img/1.d39eb45.jpg"},521:function(e,t,n){e.exports=n.p+"img/2.f14c91f.jpg"},522:function(e,t,n){e.exports=n.p+"img/3.9b37692.jpg"},523:function(e,t,n){"use strict";n(478)},524:function(e,t,n){var o=n(103)(!1);o.push([e.i,".v-data-table[data-v-ac6210fa]  td,.v-data-table[data-v-ac6210fa]  th{height:28px!important}",""]),e.exports=o},640:function(e,t,n){"use strict";n.r(t);n(64);var o=n(8),r=n(21),c=n(24),l=n(13),f=n(32),v=(n(39),n(282));function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=Object(l.a)(e);if(t){var r=Object(l.a)(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return Object(c.a)(this,n)}}var m=function(e,t,n,desc){var o,r=arguments.length,c=r<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(f.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(c=(r<3?o(c):r>3?o(t,n,c):o(t,n))||c);return r>3&&c&&Object.defineProperty(t,n,c),c},h=function(e){Object(r.a)(c,e);var t=d(c);function c(){var e;return Object(o.a)(this,c),(e=t.apply(this,arguments)).images=[{src:n(520),height:"60vh"},{src:n(521),height:"60vh"},{src:n(522),height:"35vh"}],e.items=["tab.sword","tab.claymore","tab.polearm","tab.bow","tab.catalyst","general.name","general.comment","general.rank","general.level","bonus.atk","general.second"],e.model=0,e}return c}(v.Vue),_=h=m([Object(v.Component)({name:"HowtoWeapon"})],h),w=(n(523),n(105)),y=n(153),j=n.n(y),x=n(466),O=n(464),R=n(398),C=n(408),V=n(501),k=n(399),$=n(375),component=Object(w.a)(_,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-row",[n("v-carousel",{staticClass:"pa-2",attrs:{height:e.images[e.model].height,continuous:!1},model:{value:e.model,callback:function(t){e.model=t},expression:"model"}},e._l(e.images,(function(image,i){return n("v-carousel-item",{key:i},[n("v-img",e._b({attrs:{contain:""}},"v-img",image,!1))],1)})),1)],1),e._v(" "),n("v-row",[0===e.model?n("v-col",{staticClass:"v-card__text"},[e._v(e._s(e.$t("howto.weapon.p1")))]):e._e(),e._v(" "),1===e.model?n("v-col",{staticClass:"v-card__text"},[e._v(e._s(e.$t("howto.weapon.p2")))]):e._e(),e._v(" "),2===e.model?n("v-col",[n("v-simple-table",{attrs:{dense:"","fixed-header":""}},[n("tbody",e._l(e.items,(function(t,i){return n("tr",{key:i},[n("th",[e._v(e._s(e.$t(t)))]),e._v(" "),n("td",[e._v(e._s(e.$t("howto.weapon.list"+i)))])])})),0)])],1):e._e()],1)],1)}),[],!1,null,"ac6210fa",null);t.default=component.exports;j()(component,{VCarousel:x.a,VCarouselItem:O.a,VCol:R.a,VContainer:C.a,VImg:V.a,VRow:k.a,VSimpleTable:$.a})}}]);