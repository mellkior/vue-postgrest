(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{245:function(e,t,r){},285:function(e,t,r){"use strict";var n=r(245);r.n(n).a},288:function(e,t,r){"use strict";r.r(t);r(269),r(31),r(17),r(270);var n=r(282),s=r(283),a=r(284);function i(e){return["and","or","not.and","not.or"].includes(e)}function o(e,t,r=""){var n;return(t=null===(n=t)||void 0===n?void 0:n.toString())?`${e}${t}${r}`:""}var p=new WeakMap;class c extends URL{constructor(e,t,r={}){super(e.replace(/\/$/,"")+"/"+t.replace(/^\//,""),window.location.href),Object(n.a)(this,"subQueries",{}),p.set(this,{writable:!0,value:void 0}),Object(a.a)(this,p,e);const{columns:s,select:i,order:o,limit:c,offset:l,on_conflict:u,...d}=r;u&&this.searchParams.append("on_conflict",u),s&&this.searchParams.append("columns",s),this._appendSelect(i),this._appendOrder(o),this._appendLimit(c),this._appendOffset(l),this._appendConditions(d),this._appendSubQueryParams(this)}_appendSubQueryParams(e,t=""){for(let[r,n]of Object.entries(e.subQueries)){r=o(""+t,r);for(const[e,t]of n.searchParams.entries())["columns","select"].includes(e)||this.searchParams.append(`${r}.${e}`,t);this._appendSubQueryParams(n,r)}}_appendSelect(e){"object"!=typeof e||Array.isArray(e)?e&&this.searchParams.append("select",e.toString()):this.searchParams.append("select",this._parseSelectObject(e))}_parseSelectObject(e,t=[]){return Object.entries(e).map(([e,r])=>{if(!r)return;if(null==r?void 0:r.select){const t=e.split(":",1)[0].split("!",1)[0],n=new c(Object(s.a)(this,p),t,r);return this.subQueries[t]=n,`${e}(${n.searchParams.get("select")})`}let n,a="",i="",l=[];if(e.includes(":")?[a,n]=e.split(":"):n=e,"string"==typeof r)i=r;else if("object"==typeof r){let e;if(({"::":i,...e}=r),l=this._parseSelectObject(e,[...t,n]),l.length>0&&!a&&!i)return l}return[o("",a,":")+[...t,n].join("->")+o("::",i),l]}).flat(2).filter(Boolean).join(",")}_appendOrder(e){Array.isArray(e)?this.searchParams.append("order",e.map(e=>Array.isArray(e)?e.join("."):e).join(",")):"object"==typeof e?this.searchParams.append("order",Object.entries(e).map(([e,t])=>t&&"string"==typeof t?`${e}.${t}`:e).join(",")):e&&this.searchParams.append("order",e)}_appendLimit(e){e&&this.searchParams.append("limit",e)}_appendOffset(e){e&&this.searchParams.append("offset",e)}_appendConditions(e){for(const{key:t,value:r}of this._parseConditions(e))this.searchParams.append(t,r)}_parseConditions(e,t=""){return Object.entries(e).map(([e,r])=>{var n;if(void 0===r)return;const s=e.split(":");if(i(e=null!==(n=s[1])&&void 0!==n?n:s[0])){if(!r||"object"!=typeof r||Array.isArray(r))throw new Error("no object for logical operator");if(t)throw new Error("logical operators can't be nested with json operators");return{key:e,value:`(${this._parseConditions(r).map(({key:e,value:t})=>i(e)?`${e}${t}`:`${e}.${t}`).join(",")})`}}{const[n,...s]=e.split(".");let a;switch(s[s.length-1]){case"in":a=this._valueToString(r,"()");break;case void 0:if(r&&"object"==typeof r)return this._parseConditions(r,o("",t,"->")+n);default:a=this._valueToString(r)}return{key:o("",t,"string"==typeof r?"->>":"->")+n,value:[...s,a].join(".")}}}).flat().filter(Boolean)}_valueToString(e,t="{}"){if(null===e)return"null";if("boolean"==typeof e)return e.toString();if(Array.isArray(e))return t.charAt(0)+e.map(e=>this._valueToString(e)).join(",")+t.charAt(1);if("object"==typeof e){const{lower:t,includeLower:r=!0,upper:n,includeUpper:s=!1}=e;return(r?"[":"(")+t+","+n+(s?"]":")")}return r=(r=e).toString(),[",",".",":","(",")"].find(e=>r.includes(e))||["null","true","false"].includes(r)?`"${r}"`:r;var r}}var l=c,u={props:{content:String},data:()=>({code:void 0}),computed:{query(){if(this.code){const e=Function(`"use strict";${this.code};return query`)();return decodeURIComponent(new l("/","",e).search)}}},mounted(){this.code=this.$refs.wrap.innerText}},d=(r(285),r(9)),f=Object(d.a)(u,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{ref:"wrap",staticClass:"slot-wrapper"},[e._t("default")],2),e._v(" "),r("div",{staticClass:"language-none output-wrapper"},[r("pre",{staticClass:"language-none"},[e._v("      "),r("code",[e._v("\n        "),r("span",[e._v(e._s(e.query))]),e._v("\n      ")]),e._v("\n    ")])])])}),[],!1,null,"6fd32615",null);t.default=f.exports}}]);