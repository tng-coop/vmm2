var eo=Object.defineProperty;var io=(e,t,i)=>t in e?eo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var J=(e,t,i)=>io(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Gt=globalThis,Te=Gt.ShadowRoot&&(Gt.ShadyCSS===void 0||Gt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Oe=Symbol(),Ke=new WeakMap;let _i=class{constructor(t,i,o){if(this._$cssResult$=!0,o!==Oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(Te&&t===void 0){const o=i!==void 0&&i.length===1;o&&(t=Ke.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&Ke.set(i,t))}return t}toString(){return this.cssText}};const oo=e=>new _i(typeof e=="string"?e:e+"",void 0,Oe),I=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((o,s,n)=>o+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[n+1],e[0]);return new _i(i,e,Oe)},so=(e,t)=>{if(Te)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const o=document.createElement("style"),s=Gt.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=i.cssText,e.appendChild(o)}},Xe=Te?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const o of t.cssRules)i+=o.cssText;return oo(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:no,defineProperty:ro,getOwnPropertyDescriptor:ao,getOwnPropertyNames:lo,getOwnPropertySymbols:co,getPrototypeOf:uo}=Object,rt=globalThis,Ge=rt.trustedTypes,ho=Ge?Ge.emptyScript:"",de=rt.reactiveElementPolyfillSupport,It=(e,t)=>e,Qt={toAttribute(e,t){switch(t){case Boolean:e=e?ho:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},Me=(e,t)=>!no(e,t),Ze={attribute:!0,type:String,converter:Qt,reflect:!1,hasChanged:Me};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),rt.litPropertyMetadata??(rt.litPropertyMetadata=new WeakMap);class xt extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Ze){if(i.state&&(i.attribute=!1),this._$Ei(),this.elementProperties.set(t,i),!i.noAccessor){const o=Symbol(),s=this.getPropertyDescriptor(t,o,i);s!==void 0&&ro(this.prototype,t,s)}}static getPropertyDescriptor(t,i,o){const{get:s,set:n}=ao(this.prototype,t)??{get(){return this[i]},set(r){this[i]=r}};return{get(){return s==null?void 0:s.call(this)},set(r){const a=s==null?void 0:s.call(this);n.call(this,r),this.requestUpdate(t,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Ze}static _$Ei(){if(this.hasOwnProperty(It("elementProperties")))return;const t=uo(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(It("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(It("properties"))){const i=this.properties,o=[...lo(i),...co(i)];for(const s of o)this.createProperty(s,i[s])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[o,s]of i)this.elementProperties.set(o,s)}this._$Eh=new Map;for(const[i,o]of this.elementProperties){const s=this._$Eu(i,o);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const o=new Set(t.flat(1/0).reverse());for(const s of o)i.unshift(Xe(s))}else t!==void 0&&i.push(Xe(t));return i}static _$Eu(t,i){const o=i.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(i=>i(this))}addController(t){var i;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)==null||i.call(t))}removeController(t){var i;(i=this._$EO)==null||i.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const o of i.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return so(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(i=>{var o;return(o=i.hostConnected)==null?void 0:o.call(i)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(i=>{var o;return(o=i.hostDisconnected)==null?void 0:o.call(i)})}attributeChangedCallback(t,i,o){this._$AK(t,o)}_$EC(t,i){var n;const o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(s!==void 0&&o.reflect===!0){const r=(((n=o.converter)==null?void 0:n.toAttribute)!==void 0?o.converter:Qt).toAttribute(i,o.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,i){var n;const o=this.constructor,s=o._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const r=o.getPropertyOptions(s),a=typeof r.converter=="function"?{fromAttribute:r.converter}:((n=r.converter)==null?void 0:n.fromAttribute)!==void 0?r.converter:Qt;this._$Em=s,this[s]=a.fromAttribute(i,r.type),this._$Em=null}}requestUpdate(t,i,o){if(t!==void 0){if(o??(o=this.constructor.getPropertyOptions(t)),!(o.hasChanged??Me)(this[t],i))return;this.P(t,i,o)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,i,o){this._$AL.has(t)||this._$AL.set(t,i),o.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,r]of s)r.wrapped!==!0||this._$AL.has(n)||this[n]===void 0||this.P(n,this[n],r)}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(o=this._$EO)==null||o.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(i)):this._$EU()}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(i)}willUpdate(t){}_$AE(t){var i;(i=this._$EO)==null||i.forEach(o=>{var s;return(s=o.hostUpdated)==null?void 0:s.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(i=>this._$EC(i,this[i]))),this._$EU()}updated(t){}firstUpdated(t){}}xt.elementStyles=[],xt.shadowRootOptions={mode:"open"},xt[It("elementProperties")]=new Map,xt[It("finalized")]=new Map,de==null||de({ReactiveElement:xt}),(rt.reactiveElementVersions??(rt.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dt=globalThis,te=Dt.trustedTypes,Je=te?te.createPolicy("lit-html",{createHTML:e=>e}):void 0,ki="$lit$",nt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ci="?"+nt,po=`<${Ci}>`,pt=document,Bt=()=>pt.createComment(""),Vt=e=>e===null||typeof e!="object"&&typeof e!="function",ze=Array.isArray,fo=e=>ze(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",he=`[ 	
\f\r]`,Rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qe=/-->/g,ti=/>/g,ut=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ei=/'/g,ii=/"/g,Ai=/^(?:script|style|textarea|title)$/i,mo=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),y=mo(1),ft=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),oi=new WeakMap,ht=pt.createTreeWalker(pt,129);function Ei(e,t){if(!ze(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Je!==void 0?Je.createHTML(t):t}const bo=(e,t)=>{const i=e.length-1,o=[];let s,n=t===2?"<svg>":t===3?"<math>":"",r=Rt;for(let a=0;a<i;a++){const l=e[a];let c,u,d=-1,m=0;for(;m<l.length&&(r.lastIndex=m,u=r.exec(l),u!==null);)m=r.lastIndex,r===Rt?u[1]==="!--"?r=Qe:u[1]!==void 0?r=ti:u[2]!==void 0?(Ai.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=ut):u[3]!==void 0&&(r=ut):r===ut?u[0]===">"?(r=s??Rt,d=-1):u[1]===void 0?d=-2:(d=r.lastIndex-u[2].length,c=u[1],r=u[3]===void 0?ut:u[3]==='"'?ii:ei):r===ii||r===ei?r=ut:r===Qe||r===ti?r=Rt:(r=ut,s=void 0);const p=r===ut&&e[a+1].startsWith("/>")?" ":"";n+=r===Rt?l+po:d>=0?(o.push(c),l.slice(0,d)+ki+l.slice(d)+nt+p):l+nt+(d===-2?a:p)}return[Ei(e,n+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]};class Ft{constructor({strings:t,_$litType$:i},o){let s;this.parts=[];let n=0,r=0;const a=t.length-1,l=this.parts,[c,u]=bo(t,i);if(this.el=Ft.createElement(c,o),ht.currentNode=this.el.content,i===2||i===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=ht.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(ki)){const m=u[r++],p=s.getAttribute(d).split(nt),b=/([.?@])?(.*)/.exec(m);l.push({type:1,index:n,name:b[2],strings:p,ctor:b[1]==="."?vo:b[1]==="?"?yo:b[1]==="@"?wo:ne}),s.removeAttribute(d)}else d.startsWith(nt)&&(l.push({type:6,index:n}),s.removeAttribute(d));if(Ai.test(s.tagName)){const d=s.textContent.split(nt),m=d.length-1;if(m>0){s.textContent=te?te.emptyScript:"";for(let p=0;p<m;p++)s.append(d[p],Bt()),ht.nextNode(),l.push({type:2,index:++n});s.append(d[m],Bt())}}}else if(s.nodeType===8)if(s.data===Ci)l.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(nt,d+1))!==-1;)l.push({type:7,index:n}),d+=nt.length-1}n++}}static createElement(t,i){const o=pt.createElement("template");return o.innerHTML=t,o}}function kt(e,t,i=e,o){var r,a;if(t===ft)return t;let s=o!==void 0?(r=i._$Co)==null?void 0:r[o]:i._$Cl;const n=Vt(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),n===void 0?s=void 0:(s=new n(e),s._$AT(e,i,o)),o!==void 0?(i._$Co??(i._$Co=[]))[o]=s:i._$Cl=s),s!==void 0&&(t=kt(e,s._$AS(e,t.values),s,o)),t}class go{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:o}=this._$AD,s=((t==null?void 0:t.creationScope)??pt).importNode(i,!0);ht.currentNode=s;let n=ht.nextNode(),r=0,a=0,l=o[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new qt(n,n.nextSibling,this,t):l.type===1?c=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(c=new xo(n,this,t)),this._$AV.push(c),l=o[++a]}r!==(l==null?void 0:l.index)&&(n=ht.nextNode(),r++)}return ht.currentNode=pt,s}p(t){let i=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,i),i+=o.strings.length-2):o._$AI(t[i])),i++}}class qt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,i,o,s){this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=o,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=kt(this,t,i),Vt(t)?t===E||t==null||t===""?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==ft&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):fo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==E&&Vt(this._$AH)?this._$AA.nextSibling.data=t:this.T(pt.createTextNode(t)),this._$AH=t}$(t){var n;const{values:i,_$litType$:o}=t,s=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=Ft.createElement(Ei(o.h,o.h[0]),this.options)),o);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(i);else{const r=new go(s,this),a=r.u(this.options);r.p(i),this.T(a),this._$AH=r}}_$AC(t){let i=oi.get(t.strings);return i===void 0&&oi.set(t.strings,i=new Ft(t)),i}k(t){ze(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let o,s=0;for(const n of t)s===i.length?i.push(o=new qt(this.O(Bt()),this.O(Bt()),this,this.options)):o=i[s],o._$AI(n),s++;s<i.length&&(this._$AR(o&&o._$AB.nextSibling,s),i.length=s)}_$AR(t=this._$AA.nextSibling,i){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,i);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var i;this._$AM===void 0&&(this._$Cv=t,(i=this._$AP)==null||i.call(this,t))}}class ne{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,o,s,n){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=i,this._$AM=s,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=E}_$AI(t,i=this,o,s){const n=this.strings;let r=!1;if(n===void 0)t=kt(this,t,i,0),r=!Vt(t)||t!==this._$AH&&t!==ft,r&&(this._$AH=t);else{const a=t;let l,c;for(t=n[0],l=0;l<n.length-1;l++)c=kt(this,a[o+l],i,l),c===ft&&(c=this._$AH[l]),r||(r=!Vt(c)||c!==this._$AH[l]),c===E?t=E:t!==E&&(t+=(c??"")+n[l+1]),this._$AH[l]=c}r&&!s&&this.j(t)}j(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class vo extends ne{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===E?void 0:t}}class yo extends ne{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==E)}}class wo extends ne{constructor(t,i,o,s,n){super(t,i,o,s,n),this.type=5}_$AI(t,i=this){if((t=kt(this,t,i,0)??E)===ft)return;const o=this._$AH,s=t===E&&o!==E||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==E&&(o===E||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,t):this._$AH.handleEvent(t)}}class xo{constructor(t,i,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){kt(this,t)}}const pe=Dt.litHtmlPolyfillSupport;pe==null||pe(Ft,qt),(Dt.litHtmlVersions??(Dt.litHtmlVersions=[])).push("3.2.1");const Mt=(e,t,i)=>{const o=(i==null?void 0:i.renderBefore)??t;let s=o._$litPart$;if(s===void 0){const n=(i==null?void 0:i.renderBefore)??null;o._$litPart$=s=new qt(t.insertBefore(Bt(),n),n,void 0,i??{})}return s._$AI(e),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Q=class extends xt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const t=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=t.firstChild),t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return ft}};var $i;Q._$litElement$=!0,Q.finalized=!0,($i=globalThis.litElementHydrateSupport)==null||$i.call(globalThis,{LitElement:Q});const fe=globalThis.litElementPolyfillSupport;fe==null||fe({LitElement:Q});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");var $o=I`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;const $e=new Set,$t=new Map;let dt,Ie="ltr",De="en";const Si=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Si){const e=new MutationObserver(Pi);Ie=document.documentElement.dir||"ltr",De=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Ri(...e){e.map(t=>{const i=t.$code.toLowerCase();$t.has(i)?$t.set(i,Object.assign(Object.assign({},$t.get(i)),t)):$t.set(i,t),dt||(dt=t)}),Pi()}function Pi(){Si&&(Ie=document.documentElement.dir||"ltr",De=document.documentElement.lang||navigator.language),[...$e.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}let _o=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){$e.add(this.host)}hostDisconnected(){$e.delete(this.host)}dir(){return`${this.host.dir||Ie}`.toLowerCase()}lang(){return`${this.host.lang||De}`.toLowerCase()}getTranslationData(t){var i,o;const s=new Intl.Locale(t.replace(/_/g,"-")),n=s==null?void 0:s.language.toLowerCase(),r=(o=(i=s==null?void 0:s.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&o!==void 0?o:"",a=$t.get(`${n}-${r}`),l=$t.get(n);return{locale:s,language:n,region:r,primary:a,secondary:l}}exists(t,i){var o;const{primary:s,secondary:n}=this.getTranslationData((o=i.lang)!==null&&o!==void 0?o:this.lang());return i=Object.assign({includeFallback:!1},i),!!(s&&s[t]||n&&n[t]||i.includeFallback&&dt&&dt[t])}term(t,...i){const{primary:o,secondary:s}=this.getTranslationData(this.lang());let n;if(o&&o[t])n=o[t];else if(s&&s[t])n=s[t];else if(dt&&dt[t])n=dt[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof n=="function"?n(...i):n}date(t,i){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),i).format(t)}number(t,i){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),i).format(t)}relativeTime(t,i,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,i)}};var Li={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};Ri(Li);var ko=Li,Wt=class extends _o{};Ri(ko);var gt=I`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,Ti=Object.defineProperty,Co=Object.defineProperties,Ao=Object.getOwnPropertyDescriptor,Eo=Object.getOwnPropertyDescriptors,si=Object.getOwnPropertySymbols,So=Object.prototype.hasOwnProperty,Ro=Object.prototype.propertyIsEnumerable,Oi=e=>{throw TypeError(e)},ni=(e,t,i)=>t in e?Ti(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,vt=(e,t)=>{for(var i in t||(t={}))So.call(t,i)&&ni(e,i,t[i]);if(si)for(var i of si(t))Ro.call(t,i)&&ni(e,i,t[i]);return e},re=(e,t)=>Co(e,Eo(t)),h=(e,t,i,o)=>{for(var s=o>1?void 0:o?Ao(t,i):t,n=e.length-1,r;n>=0;n--)(r=e[n])&&(s=(o?r(t,i,s):r(s))||s);return o&&s&&Ti(t,i,s),s},Mi=(e,t,i)=>t.has(e)||Oi("Cannot "+i),Po=(e,t,i)=>(Mi(e,t,"read from private field"),t.get(e)),Lo=(e,t,i)=>t.has(e)?Oi("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),To=(e,t,i,o)=>(Mi(e,t,"write to private field"),t.set(e,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oo={attribute:!0,type:String,converter:Qt,reflect:!1,hasChanged:Me},Mo=(e=Oo,t,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),n.set(i.name,e),o==="accessor"){const{name:r}=i;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(r,l,e)},init(a){return a!==void 0&&this.P(r,void 0,e),a}}}if(o==="setter"){const{name:r}=i;return function(a){const l=this[r];t.call(this,a),this.requestUpdate(r,l,e)}}throw Error("Unsupported decorator location: "+o)};function f(e){return(t,i)=>typeof i=="object"?Mo(e,t,i):((o,s,n)=>{const r=s.hasOwnProperty(n);return s.constructor.createProperty(n,r?{...o,wrapped:!0}:o),r?Object.getOwnPropertyDescriptor(s,n):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ne(e){return f({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zo=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function tt(e,t){return(i,o,s)=>{const n=r=>{var a;return((a=r.renderRoot)==null?void 0:a.querySelector(e))??null};return zo(i,o,{get(){return n(this)}})}}var Zt,F=class extends Q{constructor(){super(),Lo(this,Zt,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t)})}emit(e,t){const i=new CustomEvent(e,vt({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(i),i}static define(e,t=this,i={}){const o=customElements.get(e);if(!o){try{customElements.define(e,t,i)}catch{customElements.define(e,class extends t{},i)}return}let s=" (unknown version)",n=s;"version"in t&&t.version&&(s=" v"+t.version),"version"in o&&o.version&&(n=" v"+o.version),!(s&&n&&s===n)&&console.warn(`Attempted to register <${e}>${s}, but <${e}>${n} has already been registered.`)}attributeChangedCallback(e,t,i){Po(this,Zt)||(this.constructor.elementProperties.forEach((o,s)=>{o.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s])}),To(this,Zt,!0)),super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&this[i]==null&&(this[i]=t)})}};Zt=new WeakMap;F.version="2.20.0";F.dependencies={};h([f()],F.prototype,"dir",2);h([f()],F.prototype,"lang",2);var Be=class extends F{constructor(){super(...arguments),this.localize=new Wt(this)}render(){return y`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};Be.styles=[gt,$o];var Pt=new WeakMap,Lt=new WeakMap,Tt=new WeakMap,me=new WeakSet,Yt=new WeakMap,Io=class{constructor(e,t){this.handleFormData=i=>{const o=this.options.disabled(this.host),s=this.options.name(this.host),n=this.options.value(this.host),r=this.host.tagName.toLowerCase()==="sl-button";this.host.isConnected&&!o&&!r&&typeof s=="string"&&s.length>0&&typeof n<"u"&&(Array.isArray(n)?n.forEach(a=>{i.formData.append(s,a.toString())}):i.formData.append(s,n.toString()))},this.handleFormSubmit=i=>{var o;const s=this.options.disabled(this.host),n=this.options.reportValidity;this.form&&!this.form.noValidate&&((o=Pt.get(this.form))==null||o.forEach(r=>{this.setUserInteracted(r,!0)})),this.form&&!this.form.noValidate&&!s&&!n(this.host)&&(i.preventDefault(),i.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),Yt.set(this.host,[])},this.handleInteraction=i=>{const o=Yt.get(this.host);o.includes(i.type)||o.push(i.type),o.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const o of i)if(typeof o.checkValidity=="function"&&!o.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const i=this.form.querySelectorAll("*");for(const o of i)if(typeof o.reportValidity=="function"&&!o.reportValidity())return!1}return!0},(this.host=e).addController(this),this.options=vt({form:i=>{const o=i.form;if(o){const n=i.getRootNode().querySelector(`#${o}`);if(n)return n}return i.closest("form")},name:i=>i.name,value:i=>i.value,defaultValue:i=>i.defaultValue,disabled:i=>{var o;return(o=i.disabled)!=null?o:!1},reportValidity:i=>typeof i.reportValidity=="function"?i.reportValidity():!0,checkValidity:i=>typeof i.checkValidity=="function"?i.checkValidity():!0,setValue:(i,o)=>i.value=o,assumeInteractionOn:["sl-input"]},t)}hostConnected(){const e=this.options.form(this.host);e&&this.attachForm(e),Yt.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Yt.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction)})}hostUpdated(){const e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(e){e?(this.form=e,Pt.has(this.form)?Pt.get(this.form).add(this.host):Pt.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),Lt.has(this.form)||(Lt.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),Tt.has(this.form)||(Tt.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const e=Pt.get(this.form);e&&(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),Lt.has(this.form)&&(this.form.reportValidity=Lt.get(this.form),Lt.delete(this.form)),Tt.has(this.form)&&(this.form.checkValidity=Tt.get(this.form),Tt.delete(this.form)),this.form=void 0))}setUserInteracted(e,t){t?me.add(e):me.delete(e),e.requestUpdate()}doAction(e,t){if(this.form){const i=document.createElement("button");i.type=e,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",t&&(i.name=t.name,i.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(o=>{t.hasAttribute(o)&&i.setAttribute(o,t.getAttribute(o))})),this.form.append(i),i.click(),i.remove()}}getForm(){var e;return(e=this.form)!=null?e:null}reset(e){this.doAction("reset",e)}submit(e){this.doAction("submit",e)}setValidity(e){const t=this.host,i=!!me.has(t),o=!!t.required;t.toggleAttribute("data-required",o),t.toggleAttribute("data-optional",!o),t.toggleAttribute("data-invalid",!e),t.toggleAttribute("data-valid",e),t.toggleAttribute("data-user-invalid",!e&&i),t.toggleAttribute("data-user-valid",e&&i)}updateValidity(){const e=this.host;this.setValidity(e.validity.valid)}emitInvalidEvent(e){const t=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||e==null||e.preventDefault()}},Ve=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(re(vt({},Ve),{valid:!1,valueMissing:!0}));Object.freeze(re(vt({},Ve),{valid:!1,customError:!0}));var Do=I`
  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-input-border-color);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host([data-sl-button-group__button--first]:not([data-sl-button-group__button--last])) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host([data-sl-button-group__button--inner]) .button {
    border-radius: 0;
  }

  :host([data-sl-button-group__button--last]:not([data-sl-button-group__button--first])) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host([data-sl-button-group__button]:not([data-sl-button-group__button--first])) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      [data-sl-button-group__button]:not(
          [data-sl-button-group__button--first],
          [data-sl-button-group__button--radio],
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host([data-sl-button-group__button--hover]) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host([data-sl-button-group__button--focus]),
  :host([data-sl-button-group__button][checked]) {
    z-index: 2;
  }
`,zi=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=i=>{const o=i.target;(this.slotNames.includes("[default]")&&!o.name||o.name&&this.slotNames.includes(o.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===e.ELEMENT_NODE){const t=e;if(t.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function No(e){if(!e)return"";const t=e.assignedNodes({flatten:!0});let i="";return[...t].forEach(o=>{o.nodeType===Node.TEXT_NODE&&(i+=o.textContent)}),i}var _e="";function ri(e){_e=e}function Bo(e=""){if(!_e){const t=[...document.getElementsByTagName("script")],i=t.find(o=>o.hasAttribute("data-shoelace"));if(i)ri(i.getAttribute("data-shoelace"));else{const o=t.find(n=>/shoelace(\.min)?\.js($|\?)/.test(n.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(n.src));let s="";o&&(s=o.getAttribute("src")),ri(s.split("/").slice(0,-1).join("/"))}}return _e.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}var Vo={name:"default",resolver:e=>Bo(`assets/icons/${e}.svg`)},Fo=Vo,ai={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},Uo={name:"system",resolver:e=>e in ai?`data:image/svg+xml,${encodeURIComponent(ai[e])}`:""},Ho=Uo,qo=[Fo,Ho],ke=[];function Wo(e){ke.push(e)}function jo(e){ke=ke.filter(t=>t!==e)}function li(e){return qo.find(t=>t.name===e)}var Yo=I`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function yt(e,t){const i=vt({waitUntilFirstUpdate:!1},t);return(o,s)=>{const{update:n}=o,r=Array.isArray(e)?e:[e];o.update=function(a){r.forEach(l=>{const c=l;if(a.has(c)){const u=a.get(c),d=this[c];u!==d&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[s](u,d)}}),n.call(this,a)}}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ko=(e,t)=>(e==null?void 0:e._$litType$)!==void 0,Xo=e=>e.strings===void 0;var Ot=Symbol(),Kt=Symbol(),be,ge=new Map,K=class extends F{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(e,t){var i;let o;if(t!=null&&t.spriteSheet)return this.svg=y`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,this.svg;try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?Ot:Kt}catch{return Kt}try{const s=document.createElement("div");s.innerHTML=await o.text();const n=s.firstElementChild;if(((i=n==null?void 0:n.tagName)==null?void 0:i.toLowerCase())!=="svg")return Ot;be||(be=new DOMParser);const a=be.parseFromString(n.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):Ot}catch{return Ot}}connectedCallback(){super.connectedCallback(),Wo(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),jo(this)}getIconSource(){const e=li(this.library);return this.name&&e?{url:e.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var e;const{url:t,fromLibrary:i}=this.getIconSource(),o=i?li(this.library):void 0;if(!t){this.svg=null;return}let s=ge.get(t);if(s||(s=this.resolveIcon(t,o),ge.set(t,s)),!this.initialRender)return;const n=await s;if(n===Kt&&ge.delete(t),t===this.getIconSource().url){if(Ko(n)){if(this.svg=n,o){await this.updateComplete;const r=this.shadowRoot.querySelector("[part='svg']");typeof o.mutator=="function"&&r&&o.mutator(r)}return}switch(n){case Kt:case Ot:this.svg=null,this.emit("sl-error");break;default:this.svg=n.cloneNode(!0),(e=o==null?void 0:o.mutator)==null||e.call(o,this.svg),this.emit("sl-load")}}}render(){return this.svg}};K.styles=[gt,Yo];h([Ne()],K.prototype,"svg",2);h([f({reflect:!0})],K.prototype,"name",2);h([f()],K.prototype,"src",2);h([f()],K.prototype,"label",2);h([f({reflect:!0})],K.prototype,"library",2);h([yt("label")],K.prototype,"handleLabelChange",1);h([yt(["name","src","library"])],K.prototype,"setIcon",1);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ii={ATTRIBUTE:1,CHILD:2},Di=e=>(...t)=>({_$litDirective$:e,values:t});let Ni=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,o){this._$Ct=t,this._$AM=i,this._$Ci=o}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut=Di(class extends Ni{constructor(e){var t;if(super(e),e.type!==Ii.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var o,s;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in t)t[n]&&!((o=this.nt)!=null&&o.has(n))&&this.st.add(n);return this.render(t)}const i=e.element.classList;for(const n of this.st)n in t||(i.remove(n),this.st.delete(n));for(const n in t){const r=!!t[n];r===this.st.has(n)||(s=this.nt)!=null&&s.has(n)||(r?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return ft}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bi=Symbol.for(""),Go=e=>{if((e==null?void 0:e.r)===Bi)return e==null?void 0:e._$litStatic$},ci=(e,...t)=>({_$litStatic$:t.reduce((i,o,s)=>i+(n=>{if(n._$litStatic$!==void 0)return n._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${n}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(o)+e[s+1],e[0]),r:Bi}),ui=new Map,Zo=e=>(t,...i)=>{const o=i.length;let s,n;const r=[],a=[];let l,c=0,u=!1;for(;c<o;){for(l=t[c];c<o&&(n=i[c],(s=Go(n))!==void 0);)l+=s+t[++c],u=!0;c!==o&&a.push(n),r.push(l),c++}if(c===o&&r.push(t[o]),u){const d=r.join("$$lit$$");(t=ui.get(d))===void 0&&(r.raw=r,ui.set(d,t=r)),i=a}return e(t,...i)},ve=Zo(y);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W=e=>e??E;var x=class extends F{constructor(){super(...arguments),this.formControlController=new Io(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new zi(this,"[default]","prefix","suffix"),this.localize=new Wt(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:Ve}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(e){this.isButton()&&(this.button.setCustomValidity(e),this.formControlController.updateValidity())}render(){const e=this.isLink(),t=e?ci`a`:ci`button`;return ve`
      <${t}
        part="base"
        class=${Ut({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${W(e?void 0:this.disabled)}
        type=${W(e?void 0:this.type)}
        title=${this.title}
        name=${W(e?void 0:this.name)}
        value=${W(e?void 0:this.value)}
        href=${W(e&&!this.disabled?this.href:void 0)}
        target=${W(e?this.target:void 0)}
        download=${W(e?this.download:void 0)}
        rel=${W(e?this.rel:void 0)}
        role=${W(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?ve` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?ve`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${t}>
    `}};x.styles=[gt,Do];x.dependencies={"sl-icon":K,"sl-spinner":Be};h([tt(".button")],x.prototype,"button",2);h([Ne()],x.prototype,"hasFocus",2);h([Ne()],x.prototype,"invalid",2);h([f()],x.prototype,"title",2);h([f({reflect:!0})],x.prototype,"variant",2);h([f({reflect:!0})],x.prototype,"size",2);h([f({type:Boolean,reflect:!0})],x.prototype,"caret",2);h([f({type:Boolean,reflect:!0})],x.prototype,"disabled",2);h([f({type:Boolean,reflect:!0})],x.prototype,"loading",2);h([f({type:Boolean,reflect:!0})],x.prototype,"outline",2);h([f({type:Boolean,reflect:!0})],x.prototype,"pill",2);h([f({type:Boolean,reflect:!0})],x.prototype,"circle",2);h([f()],x.prototype,"type",2);h([f()],x.prototype,"name",2);h([f()],x.prototype,"value",2);h([f()],x.prototype,"href",2);h([f()],x.prototype,"target",2);h([f()],x.prototype,"rel",2);h([f()],x.prototype,"download",2);h([f()],x.prototype,"form",2);h([f({attribute:"formaction"})],x.prototype,"formAction",2);h([f({attribute:"formenctype"})],x.prototype,"formEnctype",2);h([f({attribute:"formmethod"})],x.prototype,"formMethod",2);h([f({attribute:"formnovalidate",type:Boolean})],x.prototype,"formNoValidate",2);h([f({attribute:"formtarget"})],x.prototype,"formTarget",2);h([yt("disabled",{waitUntilFirstUpdate:!0})],x.prototype,"handleDisabledChange",1);x.define("sl-button");var Jo=I`
  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`,di=new WeakMap;function Vi(e){let t=di.get(e);return t||(t=window.getComputedStyle(e,null),di.set(e,t)),t}function Qo(e){if(typeof e.checkVisibility=="function")return e.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const t=Vi(e);return t.visibility!=="hidden"&&t.display!=="none"}function ts(e){const t=Vi(e),{overflowY:i,overflowX:o}=t;return i==="scroll"||o==="scroll"?!0:i!=="auto"||o!=="auto"?!1:e.scrollHeight>e.clientHeight&&i==="auto"||e.scrollWidth>e.clientWidth&&o==="auto"}function es(e){const t=e.tagName.toLowerCase(),i=Number(e.getAttribute("tabindex"));if(e.hasAttribute("tabindex")&&(isNaN(i)||i<=-1)||e.hasAttribute("disabled")||e.closest("[inert]"))return!1;if(t==="input"&&e.getAttribute("type")==="radio"){const n=e.getRootNode(),r=`input[type='radio'][name="${e.getAttribute("name")}"]`,a=n.querySelector(`${r}:checked`);return a?a===e:n.querySelector(r)===e}return Qo(e)?(t==="audio"||t==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(t)?!0:ts(e):!1}function is(e){var t,i;const o=ss(e),s=(t=o[0])!=null?t:null,n=(i=o[o.length-1])!=null?i:null;return{start:s,end:n}}function os(e,t){var i;return((i=e.getRootNode({composed:!0}))==null?void 0:i.host)!==t}function ss(e){const t=new WeakMap,i=[];function o(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||t.has(s))return;t.set(s,!0),!i.includes(s)&&es(s)&&i.push(s),s instanceof HTMLSlotElement&&os(s,e)&&s.assignedElements({flatten:!0}).forEach(n=>{o(n)}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&o(s.shadowRoot)}for(const n of s.children)o(n)}return o(e),i.sort((s,n)=>{const r=Number(s.getAttribute("tabindex"))||0;return(Number(n.getAttribute("tabindex"))||0)-r})}var ns=I`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }
`;const at=Math.min,O=Math.max,ee=Math.round,Xt=Math.floor,j=e=>({x:e,y:e}),rs={left:"right",right:"left",bottom:"top",top:"bottom"},as={start:"end",end:"start"};function Ce(e,t,i){return O(e,at(t,i))}function At(e,t){return typeof e=="function"?e(t):e}function lt(e){return e.split("-")[0]}function Et(e){return e.split("-")[1]}function Fi(e){return e==="x"?"y":"x"}function Fe(e){return e==="y"?"height":"width"}function mt(e){return["top","bottom"].includes(lt(e))?"y":"x"}function Ue(e){return Fi(mt(e))}function ls(e,t,i){i===void 0&&(i=!1);const o=Et(e),s=Ue(e),n=Fe(s);let r=s==="x"?o===(i?"end":"start")?"right":"left":o==="start"?"bottom":"top";return t.reference[n]>t.floating[n]&&(r=ie(r)),[r,ie(r)]}function cs(e){const t=ie(e);return[Ae(e),t,Ae(t)]}function Ae(e){return e.replace(/start|end/g,t=>as[t])}function us(e,t,i){const o=["left","right"],s=["right","left"],n=["top","bottom"],r=["bottom","top"];switch(e){case"top":case"bottom":return i?t?s:o:t?o:s;case"left":case"right":return t?n:r;default:return[]}}function ds(e,t,i,o){const s=Et(e);let n=us(lt(e),i==="start",o);return s&&(n=n.map(r=>r+"-"+s),t&&(n=n.concat(n.map(Ae)))),n}function ie(e){return e.replace(/left|right|bottom|top/g,t=>rs[t])}function hs(e){return{top:0,right:0,bottom:0,left:0,...e}}function Ui(e){return typeof e!="number"?hs(e):{top:e,right:e,bottom:e,left:e}}function oe(e){const{x:t,y:i,width:o,height:s}=e;return{width:o,height:s,top:i,left:t,right:t+o,bottom:i+s,x:t,y:i}}function hi(e,t,i){let{reference:o,floating:s}=e;const n=mt(t),r=Ue(t),a=Fe(r),l=lt(t),c=n==="y",u=o.x+o.width/2-s.width/2,d=o.y+o.height/2-s.height/2,m=o[a]/2-s[a]/2;let p;switch(l){case"top":p={x:u,y:o.y-s.height};break;case"bottom":p={x:u,y:o.y+o.height};break;case"right":p={x:o.x+o.width,y:d};break;case"left":p={x:o.x-s.width,y:d};break;default:p={x:o.x,y:o.y}}switch(Et(t)){case"start":p[r]-=m*(i&&c?-1:1);break;case"end":p[r]+=m*(i&&c?-1:1);break}return p}const ps=async(e,t,i)=>{const{placement:o="bottom",strategy:s="absolute",middleware:n=[],platform:r}=i,a=n.filter(Boolean),l=await(r.isRTL==null?void 0:r.isRTL(t));let c=await r.getElementRects({reference:e,floating:t,strategy:s}),{x:u,y:d}=hi(c,o,l),m=o,p={},b=0;for(let g=0;g<a.length;g++){const{name:w,fn:v}=a[g],{x:$,y:C,data:S,reset:A}=await v({x:u,y:d,initialPlacement:o,placement:m,strategy:s,middlewareData:p,rects:c,platform:r,elements:{reference:e,floating:t}});u=$??u,d=C??d,p={...p,[w]:{...p[w],...S}},A&&b<=50&&(b++,typeof A=="object"&&(A.placement&&(m=A.placement),A.rects&&(c=A.rects===!0?await r.getElementRects({reference:e,floating:t,strategy:s}):A.rects),{x:u,y:d}=hi(c,m,l)),g=-1)}return{x:u,y:d,placement:m,strategy:s,middlewareData:p}};async function He(e,t){var i;t===void 0&&(t={});const{x:o,y:s,platform:n,rects:r,elements:a,strategy:l}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:m=!1,padding:p=0}=At(t,e),b=Ui(p),w=a[m?d==="floating"?"reference":"floating":d],v=oe(await n.getClippingRect({element:(i=await(n.isElement==null?void 0:n.isElement(w)))==null||i?w:w.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(a.floating)),boundary:c,rootBoundary:u,strategy:l})),$=d==="floating"?{x:o,y:s,width:r.floating.width,height:r.floating.height}:r.reference,C=await(n.getOffsetParent==null?void 0:n.getOffsetParent(a.floating)),S=await(n.isElement==null?void 0:n.isElement(C))?await(n.getScale==null?void 0:n.getScale(C))||{x:1,y:1}:{x:1,y:1},A=oe(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:$,offsetParent:C,strategy:l}):$);return{top:(v.top-A.top+b.top)/S.y,bottom:(A.bottom-v.bottom+b.bottom)/S.y,left:(v.left-A.left+b.left)/S.x,right:(A.right-v.right+b.right)/S.x}}const fs=e=>({name:"arrow",options:e,async fn(t){const{x:i,y:o,placement:s,rects:n,platform:r,elements:a,middlewareData:l}=t,{element:c,padding:u=0}=At(e,t)||{};if(c==null)return{};const d=Ui(u),m={x:i,y:o},p=Ue(s),b=Fe(p),g=await r.getDimensions(c),w=p==="y",v=w?"top":"left",$=w?"bottom":"right",C=w?"clientHeight":"clientWidth",S=n.reference[b]+n.reference[p]-m[p]-n.floating[b],A=m[p]-n.reference[p],D=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c));let R=D?D[C]:0;(!R||!await(r.isElement==null?void 0:r.isElement(D)))&&(R=a.floating[C]||n.floating[b]);const G=S/2-A/2,U=R/2-g[b]/2-1,N=at(d[v],U),et=at(d[$],U),H=N,it=R-g[b]-et,L=R/2-g[b]/2+G,wt=Ce(H,L,it),Z=!l.arrow&&Et(s)!=null&&L!==wt&&n.reference[b]/2-(L<H?N:et)-g[b]/2<0,q=Z?L<H?L-H:L-it:0;return{[p]:m[p]+q,data:{[p]:wt,centerOffset:L-wt-q,...Z&&{alignmentOffset:q}},reset:Z}}}),ms=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var i,o;const{placement:s,middlewareData:n,rects:r,initialPlacement:a,platform:l,elements:c}=t,{mainAxis:u=!0,crossAxis:d=!0,fallbackPlacements:m,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:b="none",flipAlignment:g=!0,...w}=At(e,t);if((i=n.arrow)!=null&&i.alignmentOffset)return{};const v=lt(s),$=mt(a),C=lt(a)===a,S=await(l.isRTL==null?void 0:l.isRTL(c.floating)),A=m||(C||!g?[ie(a)]:cs(a)),D=b!=="none";!m&&D&&A.push(...ds(a,g,b,S));const R=[a,...A],G=await He(t,w),U=[];let N=((o=n.flip)==null?void 0:o.overflows)||[];if(u&&U.push(G[v]),d){const L=ls(s,r,S);U.push(G[L[0]],G[L[1]])}if(N=[...N,{placement:s,overflows:U}],!U.every(L=>L<=0)){var et,H;const L=(((et=n.flip)==null?void 0:et.index)||0)+1,wt=R[L];if(wt)return{data:{index:L,overflows:N},reset:{placement:wt}};let Z=(H=N.filter(q=>q.overflows[0]<=0).sort((q,ot)=>q.overflows[1]-ot.overflows[1])[0])==null?void 0:H.placement;if(!Z)switch(p){case"bestFit":{var it;const q=(it=N.filter(ot=>{if(D){const st=mt(ot.placement);return st===$||st==="y"}return!0}).map(ot=>[ot.placement,ot.overflows.filter(st=>st>0).reduce((st,to)=>st+to,0)]).sort((ot,st)=>ot[1]-st[1])[0])==null?void 0:it[0];q&&(Z=q);break}case"initialPlacement":Z=a;break}if(s!==Z)return{reset:{placement:Z}}}return{}}}};async function bs(e,t){const{placement:i,platform:o,elements:s}=e,n=await(o.isRTL==null?void 0:o.isRTL(s.floating)),r=lt(i),a=Et(i),l=mt(i)==="y",c=["left","top"].includes(r)?-1:1,u=n&&l?-1:1,d=At(t,e);let{mainAxis:m,crossAxis:p,alignmentAxis:b}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return a&&typeof b=="number"&&(p=a==="end"?b*-1:b),l?{x:p*u,y:m*c}:{x:m*c,y:p*u}}const gs=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var i,o;const{x:s,y:n,placement:r,middlewareData:a}=t,l=await bs(t,e);return r===((i=a.offset)==null?void 0:i.placement)&&(o=a.arrow)!=null&&o.alignmentOffset?{}:{x:s+l.x,y:n+l.y,data:{...l,placement:r}}}}},vs=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:i,y:o,placement:s}=t,{mainAxis:n=!0,crossAxis:r=!1,limiter:a={fn:w=>{let{x:v,y:$}=w;return{x:v,y:$}}},...l}=At(e,t),c={x:i,y:o},u=await He(t,l),d=mt(lt(s)),m=Fi(d);let p=c[m],b=c[d];if(n){const w=m==="y"?"top":"left",v=m==="y"?"bottom":"right",$=p+u[w],C=p-u[v];p=Ce($,p,C)}if(r){const w=d==="y"?"top":"left",v=d==="y"?"bottom":"right",$=b+u[w],C=b-u[v];b=Ce($,b,C)}const g=a.fn({...t,[m]:p,[d]:b});return{...g,data:{x:g.x-i,y:g.y-o,enabled:{[m]:n,[d]:r}}}}}},ys=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var i,o;const{placement:s,rects:n,platform:r,elements:a}=t,{apply:l=()=>{},...c}=At(e,t),u=await He(t,c),d=lt(s),m=Et(s),p=mt(s)==="y",{width:b,height:g}=n.floating;let w,v;d==="top"||d==="bottom"?(w=d,v=m===(await(r.isRTL==null?void 0:r.isRTL(a.floating))?"start":"end")?"left":"right"):(v=d,w=m==="end"?"top":"bottom");const $=g-u.top-u.bottom,C=b-u.left-u.right,S=at(g-u[w],$),A=at(b-u[v],C),D=!t.middlewareData.shift;let R=S,G=A;if((i=t.middlewareData.shift)!=null&&i.enabled.x&&(G=C),(o=t.middlewareData.shift)!=null&&o.enabled.y&&(R=$),D&&!m){const N=O(u.left,0),et=O(u.right,0),H=O(u.top,0),it=O(u.bottom,0);p?G=b-2*(N!==0||et!==0?N+et:O(u.left,u.right)):R=g-2*(H!==0||it!==0?H+it:O(u.top,u.bottom))}await l({...t,availableWidth:G,availableHeight:R});const U=await r.getDimensions(a.floating);return b!==U.width||g!==U.height?{reset:{rects:!0}}:{}}}};function ae(){return typeof window<"u"}function St(e){return Hi(e)?(e.nodeName||"").toLowerCase():"#document"}function M(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function X(e){var t;return(t=(Hi(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Hi(e){return ae()?e instanceof Node||e instanceof M(e).Node:!1}function B(e){return ae()?e instanceof Element||e instanceof M(e).Element:!1}function Y(e){return ae()?e instanceof HTMLElement||e instanceof M(e).HTMLElement:!1}function pi(e){return!ae()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof M(e).ShadowRoot}function jt(e){const{overflow:t,overflowX:i,overflowY:o,display:s}=V(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+i)&&!["inline","contents"].includes(s)}function ws(e){return["table","td","th"].includes(St(e))}function le(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch{return!1}})}function ce(e){const t=qe(),i=B(e)?V(e):e;return["transform","translate","scale","rotate","perspective"].some(o=>i[o]?i[o]!=="none":!1)||(i.containerType?i.containerType!=="normal":!1)||!t&&(i.backdropFilter?i.backdropFilter!=="none":!1)||!t&&(i.filter?i.filter!=="none":!1)||["transform","translate","scale","rotate","perspective","filter"].some(o=>(i.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(i.contain||"").includes(o))}function xs(e){let t=ct(e);for(;Y(t)&&!Ct(t);){if(ce(t))return t;if(le(t))return null;t=ct(t)}return null}function qe(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Ct(e){return["html","body","#document"].includes(St(e))}function V(e){return M(e).getComputedStyle(e)}function ue(e){return B(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ct(e){if(St(e)==="html")return e;const t=e.assignedSlot||e.parentNode||pi(e)&&e.host||X(e);return pi(t)?t.host:t}function qi(e){const t=ct(e);return Ct(t)?e.ownerDocument?e.ownerDocument.body:e.body:Y(t)&&jt(t)?t:qi(t)}function Ht(e,t,i){var o;t===void 0&&(t=[]),i===void 0&&(i=!0);const s=qi(e),n=s===((o=e.ownerDocument)==null?void 0:o.body),r=M(s);if(n){const a=Ee(r);return t.concat(r,r.visualViewport||[],jt(s)?s:[],a&&i?Ht(a):[])}return t.concat(s,Ht(s,[],i))}function Ee(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Wi(e){const t=V(e);let i=parseFloat(t.width)||0,o=parseFloat(t.height)||0;const s=Y(e),n=s?e.offsetWidth:i,r=s?e.offsetHeight:o,a=ee(i)!==n||ee(o)!==r;return a&&(i=n,o=r),{width:i,height:o,$:a}}function We(e){return B(e)?e:e.contextElement}function _t(e){const t=We(e);if(!Y(t))return j(1);const i=t.getBoundingClientRect(),{width:o,height:s,$:n}=Wi(t);let r=(n?ee(i.width):i.width)/o,a=(n?ee(i.height):i.height)/s;return(!r||!Number.isFinite(r))&&(r=1),(!a||!Number.isFinite(a))&&(a=1),{x:r,y:a}}const $s=j(0);function ji(e){const t=M(e);return!qe()||!t.visualViewport?$s:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function _s(e,t,i){return t===void 0&&(t=!1),!i||t&&i!==M(e)?!1:t}function bt(e,t,i,o){t===void 0&&(t=!1),i===void 0&&(i=!1);const s=e.getBoundingClientRect(),n=We(e);let r=j(1);t&&(o?B(o)&&(r=_t(o)):r=_t(e));const a=_s(n,i,o)?ji(n):j(0);let l=(s.left+a.x)/r.x,c=(s.top+a.y)/r.y,u=s.width/r.x,d=s.height/r.y;if(n){const m=M(n),p=o&&B(o)?M(o):o;let b=m,g=Ee(b);for(;g&&o&&p!==b;){const w=_t(g),v=g.getBoundingClientRect(),$=V(g),C=v.left+(g.clientLeft+parseFloat($.paddingLeft))*w.x,S=v.top+(g.clientTop+parseFloat($.paddingTop))*w.y;l*=w.x,c*=w.y,u*=w.x,d*=w.y,l+=C,c+=S,b=M(g),g=Ee(b)}}return oe({width:u,height:d,x:l,y:c})}function je(e,t){const i=ue(e).scrollLeft;return t?t.left+i:bt(X(e)).left+i}function Yi(e,t,i){i===void 0&&(i=!1);const o=e.getBoundingClientRect(),s=o.left+t.scrollLeft-(i?0:je(e,o)),n=o.top+t.scrollTop;return{x:s,y:n}}function ks(e){let{elements:t,rect:i,offsetParent:o,strategy:s}=e;const n=s==="fixed",r=X(o),a=t?le(t.floating):!1;if(o===r||a&&n)return i;let l={scrollLeft:0,scrollTop:0},c=j(1);const u=j(0),d=Y(o);if((d||!d&&!n)&&((St(o)!=="body"||jt(r))&&(l=ue(o)),Y(o))){const p=bt(o);c=_t(o),u.x=p.x+o.clientLeft,u.y=p.y+o.clientTop}const m=r&&!d&&!n?Yi(r,l,!0):j(0);return{width:i.width*c.x,height:i.height*c.y,x:i.x*c.x-l.scrollLeft*c.x+u.x+m.x,y:i.y*c.y-l.scrollTop*c.y+u.y+m.y}}function Cs(e){return Array.from(e.getClientRects())}function As(e){const t=X(e),i=ue(e),o=e.ownerDocument.body,s=O(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth),n=O(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight);let r=-i.scrollLeft+je(e);const a=-i.scrollTop;return V(o).direction==="rtl"&&(r+=O(t.clientWidth,o.clientWidth)-s),{width:s,height:n,x:r,y:a}}function Es(e,t){const i=M(e),o=X(e),s=i.visualViewport;let n=o.clientWidth,r=o.clientHeight,a=0,l=0;if(s){n=s.width,r=s.height;const c=qe();(!c||c&&t==="fixed")&&(a=s.offsetLeft,l=s.offsetTop)}return{width:n,height:r,x:a,y:l}}function Ss(e,t){const i=bt(e,!0,t==="fixed"),o=i.top+e.clientTop,s=i.left+e.clientLeft,n=Y(e)?_t(e):j(1),r=e.clientWidth*n.x,a=e.clientHeight*n.y,l=s*n.x,c=o*n.y;return{width:r,height:a,x:l,y:c}}function fi(e,t,i){let o;if(t==="viewport")o=Es(e,i);else if(t==="document")o=As(X(e));else if(B(t))o=Ss(t,i);else{const s=ji(e);o={x:t.x-s.x,y:t.y-s.y,width:t.width,height:t.height}}return oe(o)}function Ki(e,t){const i=ct(e);return i===t||!B(i)||Ct(i)?!1:V(i).position==="fixed"||Ki(i,t)}function Rs(e,t){const i=t.get(e);if(i)return i;let o=Ht(e,[],!1).filter(a=>B(a)&&St(a)!=="body"),s=null;const n=V(e).position==="fixed";let r=n?ct(e):e;for(;B(r)&&!Ct(r);){const a=V(r),l=ce(r);!l&&a.position==="fixed"&&(s=null),(n?!l&&!s:!l&&a.position==="static"&&!!s&&["absolute","fixed"].includes(s.position)||jt(r)&&!l&&Ki(e,r))?o=o.filter(u=>u!==r):s=a,r=ct(r)}return t.set(e,o),o}function Ps(e){let{element:t,boundary:i,rootBoundary:o,strategy:s}=e;const r=[...i==="clippingAncestors"?le(t)?[]:Rs(t,this._c):[].concat(i),o],a=r[0],l=r.reduce((c,u)=>{const d=fi(t,u,s);return c.top=O(d.top,c.top),c.right=at(d.right,c.right),c.bottom=at(d.bottom,c.bottom),c.left=O(d.left,c.left),c},fi(t,a,s));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Ls(e){const{width:t,height:i}=Wi(e);return{width:t,height:i}}function Ts(e,t,i){const o=Y(t),s=X(t),n=i==="fixed",r=bt(e,!0,n,t);let a={scrollLeft:0,scrollTop:0};const l=j(0);if(o||!o&&!n)if((St(t)!=="body"||jt(s))&&(a=ue(t)),o){const m=bt(t,!0,n,t);l.x=m.x+t.clientLeft,l.y=m.y+t.clientTop}else s&&(l.x=je(s));const c=s&&!o&&!n?Yi(s,a):j(0),u=r.left+a.scrollLeft-l.x-c.x,d=r.top+a.scrollTop-l.y-c.y;return{x:u,y:d,width:r.width,height:r.height}}function ye(e){return V(e).position==="static"}function mi(e,t){if(!Y(e)||V(e).position==="fixed")return null;if(t)return t(e);let i=e.offsetParent;return X(e)===i&&(i=i.ownerDocument.body),i}function Xi(e,t){const i=M(e);if(le(e))return i;if(!Y(e)){let s=ct(e);for(;s&&!Ct(s);){if(B(s)&&!ye(s))return s;s=ct(s)}return i}let o=mi(e,t);for(;o&&ws(o)&&ye(o);)o=mi(o,t);return o&&Ct(o)&&ye(o)&&!ce(o)?i:o||xs(e)||i}const Os=async function(e){const t=this.getOffsetParent||Xi,i=this.getDimensions,o=await i(e.floating);return{reference:Ts(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function Ms(e){return V(e).direction==="rtl"}const Jt={convertOffsetParentRelativeRectToViewportRelativeRect:ks,getDocumentElement:X,getClippingRect:Ps,getOffsetParent:Xi,getElementRects:Os,getClientRects:Cs,getDimensions:Ls,getScale:_t,isElement:B,isRTL:Ms};function Gi(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function zs(e,t){let i=null,o;const s=X(e);function n(){var a;clearTimeout(o),(a=i)==null||a.disconnect(),i=null}function r(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),n();const c=e.getBoundingClientRect(),{left:u,top:d,width:m,height:p}=c;if(a||t(),!m||!p)return;const b=Xt(d),g=Xt(s.clientWidth-(u+m)),w=Xt(s.clientHeight-(d+p)),v=Xt(u),C={rootMargin:-b+"px "+-g+"px "+-w+"px "+-v+"px",threshold:O(0,at(1,l))||1};let S=!0;function A(D){const R=D[0].intersectionRatio;if(R!==l){if(!S)return r();R?r(!1,R):o=setTimeout(()=>{r(!1,1e-7)},1e3)}R===1&&!Gi(c,e.getBoundingClientRect())&&r(),S=!1}try{i=new IntersectionObserver(A,{...C,root:s.ownerDocument})}catch{i=new IntersectionObserver(A,C)}i.observe(e)}return r(!0),n}function Is(e,t,i,o){o===void 0&&(o={});const{ancestorScroll:s=!0,ancestorResize:n=!0,elementResize:r=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=o,c=We(e),u=s||n?[...c?Ht(c):[],...Ht(t)]:[];u.forEach(v=>{s&&v.addEventListener("scroll",i,{passive:!0}),n&&v.addEventListener("resize",i)});const d=c&&a?zs(c,i):null;let m=-1,p=null;r&&(p=new ResizeObserver(v=>{let[$]=v;$&&$.target===c&&p&&(p.unobserve(t),cancelAnimationFrame(m),m=requestAnimationFrame(()=>{var C;(C=p)==null||C.observe(t)})),i()}),c&&!l&&p.observe(c),p.observe(t));let b,g=l?bt(e):null;l&&w();function w(){const v=bt(e);g&&!Gi(g,v)&&i(),g=v,b=requestAnimationFrame(w)}return i(),()=>{var v;u.forEach($=>{s&&$.removeEventListener("scroll",i),n&&$.removeEventListener("resize",i)}),d==null||d(),(v=p)==null||v.disconnect(),p=null,l&&cancelAnimationFrame(b)}}const Ds=gs,Ns=vs,Bs=ms,bi=ys,Vs=fs,Fs=(e,t,i)=>{const o=new Map,s={platform:Jt,...i},n={...s.platform,_c:o};return ps(e,t,{...s,platform:n})};function Us(e){return Hs(e)}function we(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Hs(e){for(let t=e;t;t=we(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=we(e);t;t=we(t)){if(!(t instanceof Element))continue;const i=getComputedStyle(t);if(i.display!=="contents"&&(i.position!=="static"||ce(i)||t.tagName==="BODY"))return t}return null}function qs(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e instanceof Element:!0)}var k=class extends F{constructor(){super(...arguments),this.localize=new Wt(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){const e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom");let o=0,s=0,n=0,r=0,a=0,l=0,c=0,u=0;i?e.top<t.top?(o=e.left,s=e.bottom,n=e.right,r=e.bottom,a=t.left,l=t.top,c=t.right,u=t.top):(o=t.left,s=t.bottom,n=t.right,r=t.bottom,a=e.left,l=e.top,c=e.right,u=e.top):e.left<t.left?(o=e.right,s=e.top,n=t.left,r=t.top,a=e.right,l=e.bottom,c=t.left,u=t.bottom):(o=t.right,s=t.top,n=e.left,r=e.top,a=t.right,l=t.bottom,c=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${r}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||qs(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){!this.anchorEl||!this.active||(this.cleanup=Is(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl)return;const e=[Ds({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(bi({apply:({rects:i})=>{const o=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=o?`${i.reference.width}px`:"",this.popup.style.height=s?`${i.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&e.push(Bs({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(Ns({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?e.push(bi({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:i,availableHeight:o})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${o}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${i}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(Vs({element:this.arrowEl,padding:this.arrowPadding}));const t=this.strategy==="absolute"?i=>Jt.getOffsetParent(i,Us):Jt.getOffsetParent;Fs(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.strategy,platform:re(vt({},Jt),{getOffsetParent:t})}).then(({x:i,y:o,middlewareData:s,placement:n})=>{const r=this.localize.dir()==="rtl",a={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];if(this.setAttribute("data-current-placement",n),Object.assign(this.popup.style,{left:`${i}px`,top:`${o}px`}),this.arrow){const l=s.arrow.x,c=s.arrow.y;let u="",d="",m="",p="";if(this.arrowPlacement==="start"){const b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",d=r?b:"",p=r?"":b}else if(this.arrowPlacement==="end"){const b=typeof l=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=r?"":b,p=r?b:"",m=typeof c=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(p=typeof l=="number"?"calc(50% - var(--arrow-size-diagonal))":"",u=typeof c=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(p=typeof l=="number"?`${l}px`:"",u=typeof c=="number"?`${c}px`:"");Object.assign(this.arrowEl.style,{top:u,right:d,bottom:m,left:p,[a]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return y`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Ut({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${Ut({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?y`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};k.styles=[gt,ns];h([tt(".popup")],k.prototype,"popup",2);h([tt(".popup__arrow")],k.prototype,"arrowEl",2);h([f()],k.prototype,"anchor",2);h([f({type:Boolean,reflect:!0})],k.prototype,"active",2);h([f({reflect:!0})],k.prototype,"placement",2);h([f({reflect:!0})],k.prototype,"strategy",2);h([f({type:Number})],k.prototype,"distance",2);h([f({type:Number})],k.prototype,"skidding",2);h([f({type:Boolean})],k.prototype,"arrow",2);h([f({attribute:"arrow-placement"})],k.prototype,"arrowPlacement",2);h([f({attribute:"arrow-padding",type:Number})],k.prototype,"arrowPadding",2);h([f({type:Boolean})],k.prototype,"flip",2);h([f({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],k.prototype,"flipFallbackPlacements",2);h([f({attribute:"flip-fallback-strategy"})],k.prototype,"flipFallbackStrategy",2);h([f({type:Object})],k.prototype,"flipBoundary",2);h([f({attribute:"flip-padding",type:Number})],k.prototype,"flipPadding",2);h([f({type:Boolean})],k.prototype,"shift",2);h([f({type:Object})],k.prototype,"shiftBoundary",2);h([f({attribute:"shift-padding",type:Number})],k.prototype,"shiftPadding",2);h([f({attribute:"auto-size"})],k.prototype,"autoSize",2);h([f()],k.prototype,"sync",2);h([f({type:Object})],k.prototype,"autoSizeBoundary",2);h([f({attribute:"auto-size-padding",type:Number})],k.prototype,"autoSizePadding",2);h([f({attribute:"hover-bridge",type:Boolean})],k.prototype,"hoverBridge",2);var Zi=new Map,Ws=new WeakMap;function js(e){return e??{keyframes:[],options:{duration:0}}}function gi(e,t){return t.toLowerCase()==="rtl"?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function Ji(e,t){Zi.set(e,js(t))}function vi(e,t,i){const o=Ws.get(e);if(o!=null&&o[t])return gi(o[t],i.dir);const s=Zi.get(t);return s?gi(s,i.dir):{keyframes:[],options:{duration:0}}}function yi(e,t){return new Promise(i=>{function o(s){s.target===e&&(e.removeEventListener(t,o),i())}e.addEventListener(t,o)})}function wi(e,t,i){return new Promise(o=>{if((i==null?void 0:i.duration)===1/0)throw new Error("Promise-based animations must be finite.");const s=e.animate(t,re(vt({},i),{duration:Ys()?0:i.duration}));s.addEventListener("cancel",o,{once:!0}),s.addEventListener("finish",o,{once:!0})})}function Ys(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function xi(e){return Promise.all(e.getAnimations().map(t=>new Promise(i=>{t.cancel(),requestAnimationFrame(i)})))}var P=class extends F{constructor(){super(...arguments),this.localize=new Wt(this),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1,this.sync=void 0,this.handleKeyDown=e=>{this.open&&e.key==="Escape"&&(e.stopPropagation(),this.hide(),this.focusOnTrigger())},this.handleDocumentKeyDown=e=>{var t;if(e.key==="Escape"&&this.open&&!this.closeWatcher){e.stopPropagation(),this.focusOnTrigger(),this.hide();return}if(e.key==="Tab"){if(this.open&&((t=document.activeElement)==null?void 0:t.tagName.toLowerCase())==="sl-menu-item"){e.preventDefault(),this.hide(),this.focusOnTrigger();return}setTimeout(()=>{var i,o,s;const n=((i=this.containingElement)==null?void 0:i.getRootNode())instanceof ShadowRoot?(s=(o=document.activeElement)==null?void 0:o.shadowRoot)==null?void 0:s.activeElement:document.activeElement;(!this.containingElement||(n==null?void 0:n.closest(this.containingElement.tagName.toLowerCase()))!==this.containingElement)&&this.hide()})}},this.handleDocumentMouseDown=e=>{const t=e.composedPath();this.containingElement&&!t.includes(this.containingElement)&&this.hide()},this.handlePanelSelect=e=>{const t=e.target;!this.stayOpenOnSelect&&t.tagName.toLowerCase()==="sl-menu"&&(this.hide(),this.focusOnTrigger())}}connectedCallback(){super.connectedCallback(),this.containingElement||(this.containingElement=this)}firstUpdated(){this.panel.hidden=!this.open,this.open&&(this.addOpenListeners(),this.popup.active=!0)}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.hide()}focusOnTrigger(){const e=this.trigger.assignedElements({flatten:!0})[0];typeof(e==null?void 0:e.focus)=="function"&&e.focus()}getMenu(){return this.panel.assignedElements({flatten:!0}).find(e=>e.tagName.toLowerCase()==="sl-menu")}handleTriggerClick(){this.open?this.hide():(this.show(),this.focusOnTrigger())}async handleTriggerKeyDown(e){if([" ","Enter"].includes(e.key)){e.preventDefault(),this.handleTriggerClick();return}const t=this.getMenu();if(t){const i=t.getAllItems(),o=i[0],s=i[i.length-1];["ArrowDown","ArrowUp","Home","End"].includes(e.key)&&(e.preventDefault(),this.open||(this.show(),await this.updateComplete),i.length>0&&this.updateComplete.then(()=>{(e.key==="ArrowDown"||e.key==="Home")&&(t.setCurrentItem(o),o.focus()),(e.key==="ArrowUp"||e.key==="End")&&(t.setCurrentItem(s),s.focus())}))}}handleTriggerKeyUp(e){e.key===" "&&e.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.assignedElements({flatten:!0}).find(o=>is(o).start);let i;if(t){switch(t.tagName.toLowerCase()){case"sl-button":case"sl-icon-button":i=t.button;break;default:i=t}i.setAttribute("aria-haspopup","true"),i.setAttribute("aria-expanded",this.open?"true":"false")}}async show(){if(!this.open)return this.open=!0,yi(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,yi(this,"sl-after-hide")}reposition(){this.popup.reposition()}addOpenListeners(){var e;this.panel.addEventListener("sl-select",this.handlePanelSelect),"CloseWatcher"in window?((e=this.closeWatcher)==null||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide(),this.focusOnTrigger()}):this.panel.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown)}removeOpenListeners(){var e;this.panel&&(this.panel.removeEventListener("sl-select",this.handlePanelSelect),this.panel.removeEventListener("keydown",this.handleKeyDown)),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),(e=this.closeWatcher)==null||e.destroy()}async handleOpenChange(){if(this.disabled){this.open=!1;return}if(this.updateAccessibleTrigger(),this.open){this.emit("sl-show"),this.addOpenListeners(),await xi(this),this.panel.hidden=!1,this.popup.active=!0;const{keyframes:e,options:t}=vi(this,"dropdown.show",{dir:this.localize.dir()});await wi(this.popup.popup,e,t),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),await xi(this);const{keyframes:e,options:t}=vi(this,"dropdown.hide",{dir:this.localize.dir()});await wi(this.popup.popup,e,t),this.panel.hidden=!0,this.popup.active=!1,this.emit("sl-after-hide")}}render(){return y`
      <sl-popup
        part="base"
        exportparts="popup:base__popup"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        sync=${W(this.sync?this.sync:void 0)}
        class=${Ut({dropdown:!0,"dropdown--open":this.open})}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <div aria-hidden=${this.open?"false":"true"} aria-labelledby="dropdown">
          <slot part="panel" class="dropdown__panel"></slot>
        </div>
      </sl-popup>
    `}};P.styles=[gt,Jo];P.dependencies={"sl-popup":k};h([tt(".dropdown")],P.prototype,"popup",2);h([tt(".dropdown__trigger")],P.prototype,"trigger",2);h([tt(".dropdown__panel")],P.prototype,"panel",2);h([f({type:Boolean,reflect:!0})],P.prototype,"open",2);h([f({reflect:!0})],P.prototype,"placement",2);h([f({type:Boolean,reflect:!0})],P.prototype,"disabled",2);h([f({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],P.prototype,"stayOpenOnSelect",2);h([f({attribute:!1})],P.prototype,"containingElement",2);h([f({type:Number})],P.prototype,"distance",2);h([f({type:Number})],P.prototype,"skidding",2);h([f({type:Boolean})],P.prototype,"hoist",2);h([f({reflect:!0})],P.prototype,"sync",2);h([yt("open",{waitUntilFirstUpdate:!0})],P.prototype,"handleOpenChange",1);Ji("dropdown.show",{keyframes:[{opacity:0,scale:.9},{opacity:1,scale:1}],options:{duration:100,easing:"ease"}});Ji("dropdown.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.9}],options:{duration:100,easing:"ease"}});P.define("sl-dropdown");var Ks=I`
  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,Ye=class extends F{connectedCallback(){super.connectedCallback(),this.setAttribute("role","menu")}handleClick(e){const t=["menuitem","menuitemcheckbox"],i=e.composedPath(),o=i.find(a=>{var l;return t.includes(((l=a==null?void 0:a.getAttribute)==null?void 0:l.call(a,"role"))||"")});if(!o||i.find(a=>{var l;return((l=a==null?void 0:a.getAttribute)==null?void 0:l.call(a,"role"))==="menu"})!==this)return;const r=o;r.type==="checkbox"&&(r.checked=!r.checked),this.emit("sl-select",{detail:{item:r}})}handleKeyDown(e){if(e.key==="Enter"||e.key===" "){const t=this.getCurrentItem();e.preventDefault(),e.stopPropagation(),t==null||t.click()}else if(["ArrowDown","ArrowUp","Home","End"].includes(e.key)){const t=this.getAllItems(),i=this.getCurrentItem();let o=i?t.indexOf(i):0;t.length>0&&(e.preventDefault(),e.stopPropagation(),e.key==="ArrowDown"?o++:e.key==="ArrowUp"?o--:e.key==="Home"?o=0:e.key==="End"&&(o=t.length-1),o<0&&(o=t.length-1),o>t.length-1&&(o=0),this.setCurrentItem(t[o]),t[o].focus())}}handleMouseDown(e){const t=e.target;this.isMenuItem(t)&&this.setCurrentItem(t)}handleSlotChange(){const e=this.getAllItems();e.length>0&&this.setCurrentItem(e[0])}isMenuItem(e){var t;return e.tagName.toLowerCase()==="sl-menu-item"||["menuitem","menuitemcheckbox","menuitemradio"].includes((t=e.getAttribute("role"))!=null?t:"")}getAllItems(){return[...this.defaultSlot.assignedElements({flatten:!0})].filter(e=>!(e.inert||!this.isMenuItem(e)))}getCurrentItem(){return this.getAllItems().find(e=>e.getAttribute("tabindex")==="0")}setCurrentItem(e){this.getAllItems().forEach(i=>{i.setAttribute("tabindex",i===e?"0":"-1")})}render(){return y`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `}};Ye.styles=[gt,Ks];h([tt("slot")],Ye.prototype,"defaultSlot",2);Ye.define("sl-menu");var Xs=I`
  :host {
    --submenu-offset: -2px;

    display: block;
  }

  :host([inert]) {
    display: none;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item.menu-item--loading {
    outline: none;
    cursor: wait;
  }

  .menu-item.menu-item--loading *:not(sl-spinner) {
    opacity: 0.5;
  }

  .menu-item--loading sl-spinner {
    --indicator-color: currentColor;
    --track-width: 1px;
    position: absolute;
    font-size: 0.75em;
    top: calc(50% - 0.5em);
    left: 0.65rem;
    opacity: 1;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /* Safe triangle */
  .menu-item--submenu-expanded::after {
    content: '';
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
      var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
      var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
    );
  }

  :host(:focus-visible) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'], :focus-visible)) .menu-item,
  .menu-item--submenu-expanded {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  /* Add elevation and z-index to submenus */
  sl-popup::part(popup) {
    box-shadow: var(--sl-shadow-large);
    z-index: var(--sl-z-index-dropdown);
    margin-left: var(--submenu-offset);
  }

  .menu-item--rtl sl-popup::part(popup) {
    margin-left: calc(-1 * var(--submenu-offset));
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }

  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt=(e,t)=>{var o;const i=e._$AN;if(i===void 0)return!1;for(const s of i)(o=s._$AO)==null||o.call(s,t,!1),Nt(s,t);return!0},se=e=>{let t,i;do{if((t=e._$AM)===void 0)break;i=t._$AN,i.delete(e),e=t}while((i==null?void 0:i.size)===0)},Qi=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(i===void 0)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),Js(t)}};function Gs(e){this._$AN!==void 0?(se(this),this._$AM=e,Qi(this)):this._$AM=e}function Zs(e,t=!1,i=0){const o=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(t)if(Array.isArray(o))for(let n=i;n<o.length;n++)Nt(o[n],!1),se(o[n]);else o!=null&&(Nt(o,!1),se(o));else Nt(this,e)}const Js=e=>{e.type==Ii.CHILD&&(e._$AP??(e._$AP=Zs),e._$AQ??(e._$AQ=Gs))};class Qs extends Ni{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,o){super._$AT(t,i,o),Qi(this),this.isConnected=t._$AU}_$AO(t,i=!0){var o,s;t!==this.isConnected&&(this.isConnected=t,t?(o=this.reconnected)==null||o.call(this):(s=this.disconnected)==null||s.call(this)),i&&(Nt(this,t),se(this))}setValue(t){if(Xo(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tn=()=>new en;class en{}const xe=new WeakMap,on=Di(class extends Qs{render(e){return E}update(e,[t]){var o;const i=t!==this.Y;return i&&this.Y!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.Y=t,this.ht=(o=e.options)==null?void 0:o.host,this.rt(this.ct=e.element)),E}rt(e){if(this.isConnected||(e=void 0),typeof this.Y=="function"){const t=this.ht??globalThis;let i=xe.get(t);i===void 0&&(i=new WeakMap,xe.set(t,i)),i.get(this.Y)!==void 0&&this.Y.call(this.ht,void 0),i.set(this.Y,e),e!==void 0&&this.Y.call(this.ht,e)}else this.Y.value=e}get lt(){var e,t;return typeof this.Y=="function"?(e=xe.get(this.ht??globalThis))==null?void 0:e.get(this.Y):(t=this.Y)==null?void 0:t.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var sn=class{constructor(e,t){this.popupRef=tn(),this.enableSubmenuTimer=-1,this.isConnected=!1,this.isPopupConnected=!1,this.skidding=0,this.submenuOpenDelay=100,this.handleMouseMove=i=>{this.host.style.setProperty("--safe-triangle-cursor-x",`${i.clientX}px`),this.host.style.setProperty("--safe-triangle-cursor-y",`${i.clientY}px`)},this.handleMouseOver=()=>{this.hasSlotController.test("submenu")&&this.enableSubmenu()},this.handleKeyDown=i=>{switch(i.key){case"Escape":case"Tab":this.disableSubmenu();break;case"ArrowLeft":i.target!==this.host&&(i.preventDefault(),i.stopPropagation(),this.host.focus(),this.disableSubmenu());break;case"ArrowRight":case"Enter":case" ":this.handleSubmenuEntry(i);break}},this.handleClick=i=>{var o;i.target===this.host?(i.preventDefault(),i.stopPropagation()):i.target instanceof Element&&(i.target.tagName==="sl-menu-item"||(o=i.target.role)!=null&&o.startsWith("menuitem"))&&this.disableSubmenu()},this.handleFocusOut=i=>{i.relatedTarget&&i.relatedTarget instanceof Element&&this.host.contains(i.relatedTarget)||this.disableSubmenu()},this.handlePopupMouseover=i=>{i.stopPropagation()},this.handlePopupReposition=()=>{const i=this.host.renderRoot.querySelector("slot[name='submenu']"),o=i==null?void 0:i.assignedElements({flatten:!0}).filter(c=>c.localName==="sl-menu")[0],s=getComputedStyle(this.host).direction==="rtl";if(!o)return;const{left:n,top:r,width:a,height:l}=o.getBoundingClientRect();this.host.style.setProperty("--safe-triangle-submenu-start-x",`${s?n+a:n}px`),this.host.style.setProperty("--safe-triangle-submenu-start-y",`${r}px`),this.host.style.setProperty("--safe-triangle-submenu-end-x",`${s?n+a:n}px`),this.host.style.setProperty("--safe-triangle-submenu-end-y",`${r+l}px`)},(this.host=e).addController(this),this.hasSlotController=t}hostConnected(){this.hasSlotController.test("submenu")&&!this.host.disabled&&this.addListeners()}hostDisconnected(){this.removeListeners()}hostUpdated(){this.hasSlotController.test("submenu")&&!this.host.disabled?(this.addListeners(),this.updateSkidding()):this.removeListeners()}addListeners(){this.isConnected||(this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseover",this.handleMouseOver),this.host.addEventListener("keydown",this.handleKeyDown),this.host.addEventListener("click",this.handleClick),this.host.addEventListener("focusout",this.handleFocusOut),this.isConnected=!0),this.isPopupConnected||this.popupRef.value&&(this.popupRef.value.addEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.addEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!0)}removeListeners(){this.isConnected&&(this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseover",this.handleMouseOver),this.host.removeEventListener("keydown",this.handleKeyDown),this.host.removeEventListener("click",this.handleClick),this.host.removeEventListener("focusout",this.handleFocusOut),this.isConnected=!1),this.isPopupConnected&&this.popupRef.value&&(this.popupRef.value.removeEventListener("mouseover",this.handlePopupMouseover),this.popupRef.value.removeEventListener("sl-reposition",this.handlePopupReposition),this.isPopupConnected=!1)}handleSubmenuEntry(e){const t=this.host.renderRoot.querySelector("slot[name='submenu']");if(!t){console.error("Cannot activate a submenu if no corresponding menuitem can be found.",this);return}let i=null;for(const o of t.assignedElements())if(i=o.querySelectorAll("sl-menu-item, [role^='menuitem']"),i.length!==0)break;if(!(!i||i.length===0)){i[0].setAttribute("tabindex","0");for(let o=1;o!==i.length;++o)i[o].setAttribute("tabindex","-1");this.popupRef.value&&(e.preventDefault(),e.stopPropagation(),this.popupRef.value.active?i[0]instanceof HTMLElement&&i[0].focus():(this.enableSubmenu(!1),this.host.updateComplete.then(()=>{i[0]instanceof HTMLElement&&i[0].focus()}),this.host.requestUpdate()))}}setSubmenuState(e){this.popupRef.value&&this.popupRef.value.active!==e&&(this.popupRef.value.active=e,this.host.requestUpdate())}enableSubmenu(e=!0){e?(window.clearTimeout(this.enableSubmenuTimer),this.enableSubmenuTimer=window.setTimeout(()=>{this.setSubmenuState(!0)},this.submenuOpenDelay)):this.setSubmenuState(!0)}disableSubmenu(){window.clearTimeout(this.enableSubmenuTimer),this.setSubmenuState(!1)}updateSkidding(){var e;if(!((e=this.host.parentElement)!=null&&e.computedStyleMap))return;const t=this.host.parentElement.computedStyleMap(),o=["padding-top","border-top-width","margin-top"].reduce((s,n)=>{var r;const a=(r=t.get(n))!=null?r:new CSSUnitValue(0,"px"),c=(a instanceof CSSUnitValue?a:new CSSUnitValue(0,"px")).to("px");return s-c.value},0);this.skidding=o}isExpanded(){return this.popupRef.value?this.popupRef.value.active:!1}renderSubmenu(){const e=getComputedStyle(this.host).direction==="rtl";return this.isConnected?y`
      <sl-popup
        ${on(this.popupRef)}
        placement=${e?"left-start":"right-start"}
        anchor="anchor"
        flip
        flip-fallback-strategy="best-fit"
        skidding="${this.skidding}"
        strategy="fixed"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot name="submenu"></slot>
      </sl-popup>
    `:y` <slot name="submenu" hidden></slot> `}},z=class extends F{constructor(){super(...arguments),this.localize=new Wt(this),this.type="normal",this.checked=!1,this.value="",this.loading=!1,this.disabled=!1,this.hasSlotController=new zi(this,"submenu"),this.submenuController=new sn(this,this.hasSlotController),this.handleHostClick=e=>{this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())},this.handleMouseOver=e=>{this.focus(),e.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleHostClick),this.addEventListener("mouseover",this.handleMouseOver)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleHostClick),this.removeEventListener("mouseover",this.handleMouseOver)}handleDefaultSlotChange(){const e=this.getTextLabel();if(typeof this.cachedTextLabel>"u"){this.cachedTextLabel=e;return}e!==this.cachedTextLabel&&(this.cachedTextLabel=e,this.emit("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}handleCheckedChange(){if(this.checked&&this.type!=="checkbox"){this.checked=!1,console.error('The checked attribute can only be used on menu items with type="checkbox"',this);return}this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleTypeChange(){this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))}getTextLabel(){return No(this.defaultSlot)}isSubmenu(){return this.hasSlotController.test("submenu")}render(){const e=this.localize.dir()==="rtl",t=this.submenuController.isExpanded();return y`
      <div
        id="anchor"
        part="base"
        class=${Ut({"menu-item":!0,"menu-item--rtl":e,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled,"menu-item--loading":this.loading,"menu-item--has-submenu":this.isSubmenu(),"menu-item--submenu-expanded":t})}
        ?aria-haspopup="${this.isSubmenu()}"
        ?aria-expanded="${!!t}"
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span part="submenu-icon" class="menu-item__chevron">
          <sl-icon name=${e?"chevron-left":"chevron-right"} library="system" aria-hidden="true"></sl-icon>
        </span>

        ${this.submenuController.renderSubmenu()}
        ${this.loading?y` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `:""}
      </div>
    `}};z.styles=[gt,Xs];z.dependencies={"sl-icon":K,"sl-popup":k,"sl-spinner":Be};h([tt("slot:not([name])")],z.prototype,"defaultSlot",2);h([tt(".menu-item")],z.prototype,"menuItem",2);h([f()],z.prototype,"type",2);h([f({type:Boolean,reflect:!0})],z.prototype,"checked",2);h([f()],z.prototype,"value",2);h([f({type:Boolean,reflect:!0})],z.prototype,"loading",2);h([f({type:Boolean,reflect:!0})],z.prototype,"disabled",2);h([yt("checked")],z.prototype,"handleCheckedChange",1);h([yt("disabled")],z.prototype,"handleDisabledChange",1);h([yt("type")],z.prototype,"handleTypeChange",1);z.define("sl-menu-item");class Se extends Q{constructor(){super(),this.closureResult="",this.identityResult="",this.associativityResult="",this.inverseResult=""}checkClosure(){const t=parseInt(this.renderRoot.querySelector("#closure-a").value,10),i=parseInt(this.renderRoot.querySelector("#closure-b").value,10);if(isNaN(t)||isNaN(i)){this.closureResult="Please enter valid integers for a and b.";return}const o=t+i;this.closureResult=`Result: ${t} + ${i} = ${o}. Closure holds because the sum is an integer.`}checkIdentity(){const t=parseInt(this.renderRoot.querySelector("#identity-a").value,10);if(isNaN(t)){this.identityResult="Please enter a valid integer for a.";return}const i=t+0;this.identityResult=`Result: ${t} + 0 = ${i}. The identity element is 0.`}checkAssociativity(){const t=parseInt(this.renderRoot.querySelector("#assoc-a").value,10),i=parseInt(this.renderRoot.querySelector("#assoc-b").value,10),o=parseInt(this.renderRoot.querySelector("#assoc-c").value,10);if(isNaN(t)||isNaN(i)||isNaN(o)){this.associativityResult="Please enter valid integers for a, b, and c.";return}const s=t+i+o,n=t+(i+o);let r=`Result: (${t} + ${i}) + ${o} = ${s} and ${t} + (${i} + ${o}) = ${n}. `;r+=s===n?"Associativity holds.":"Associativity does not hold!",this.associativityResult=r}checkInverse(){const t=parseInt(this.renderRoot.querySelector("#inverse-a").value,10);if(isNaN(t)){this.inverseResult="Please enter a valid integer for a.";return}const i=-t,o=t+i;this.inverseResult=`Result: ${t} + (${i}) = ${o}. Every integer has an inverse such that a + (-a) = 0.`}render(){return y`
      <!-- Closure Section -->
      <section id="closure">
        <h3>Closure</h3>
        <div class="row">
          <div>
            <label for="closure-a">a:</label>
            <input id="closure-a" type="number" data-test-id="closure-a-input" />
            <label for="closure-b">b:</label>
            <input id="closure-b" type="number" data-test-id="closure-b-input" />
          </div>
          <sl-button
            id="check-closure"
            data-test-id="check-closure-button"
            aria-label="Check Closure"
            variant="primary"
            @click=${this.checkClosure}
          >
            Check Closure
          </sl-button>
        </div>
        <div class="result" data-test-id="closure-result">
          ${this.closureResult}
        </div>
      </section>

      <!-- Identity Section -->
      <section id="identity">
        <h3>Identity</h3>
        <div class="row">
          <div>
            <label for="identity-a">a:</label>
            <input id="identity-a" type="number" data-test-id="identity-a-input" />
          </div>
          <sl-button
            id="check-identity"
            data-test-id="check-identity-button"
            aria-label="Check Identity"
            variant="primary"
            @click=${this.checkIdentity}
          >
            Check Identity
          </sl-button>
        </div>
        <div class="result" data-test-id="identity-result">
          ${this.identityResult}
        </div>
      </section>

      <!-- Associativity Section -->
      <section id="associativity">
        <h3>Associativity</h3>
        <div class="row">
          <div>
            <label for="assoc-a">a:</label>
            <input id="assoc-a" type="number" data-test-id="assoc-a-input" />
            <label for="assoc-b">b:</label>
            <input id="assoc-b" type="number" data-test-id="assoc-b-input" />
            <label for="assoc-c">c:</label>
            <input id="assoc-c" type="number" data-test-id="assoc-c-input" />
          </div>
          <sl-button
            id="check-associativity"
            data-test-id="check-associativity-button"
            aria-label="Check Associativity"
            variant="primary"
            @click=${this.checkAssociativity}
          >
            Check Associativity
          </sl-button>
        </div>
        <div class="result" data-test-id="associativity-result">
          ${this.associativityResult}
        </div>
      </section>

      <!-- Inverse Section -->
      <section id="inverse">
        <h3>Inverse</h3>
        <div class="row">
          <div>
            <label for="inverse-a">a:</label>
            <input id="inverse-a" type="number" data-test-id="inverse-a-input" />
          </div>
          <sl-button
            id="check-inverse"
            data-test-id="check-inverse-button"
            aria-label="Check Inverse"
            variant="primary"
            @click=${this.checkInverse}
          >
            Check Inverse
          </sl-button>
        </div>
        <div class="result" data-test-id="inverse-result">
          ${this.inverseResult}
        </div>
      </section>
    `}}J(Se,"properties",{closureResult:{type:String},identityResult:{type:String},associativityResult:{type:String},inverseResult:{type:String}}),J(Se,"styles",I`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      background-color: #eef;
      padding: 20px;
    }
    section {
      margin-bottom: 20px;
      border: 1px solid #ccc;
      padding: 15px;
      border-radius: 8px;
      background-color: #fff;
    }
    h3 {
      margin-top: 0;
    }
    label {
      margin-right: 5px;
    }
    input {
      margin: 5px;
      padding: 5px;
      width: 60px;
    }
    .result {
      margin-top: 10px;
      font-weight: bold;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
  `);customElements.define("z-group-demo",Se);class Re extends Q{constructor(){super(),this.closureResult="",this.identityResult="",this.associativityResult="",this.inverseResult=""}isEven(t){return t%2===0}checkClosure(){const t=parseInt(this.renderRoot.getElementById("closure-a").value,10),i=parseInt(this.renderRoot.getElementById("closure-b").value,10);if(isNaN(t)||isNaN(i)){this.closureResult="Please enter valid integers for a and b.";return}if(!this.isEven(t)||!this.isEven(i)){this.closureResult="Both a and b must be even numbers.";return}const o=t+i;this.closureResult=`Result: ${t} + ${i} = ${o}. Closure holds because the sum is even.`}checkIdentity(){const t=parseInt(this.renderRoot.getElementById("identity-a").value,10);if(isNaN(t)){this.identityResult="Please enter a valid integer for a.";return}if(!this.isEven(t)){this.identityResult="Please enter an even number for a.";return}const i=t+0;this.identityResult=`Result: ${t} + 0 = ${i}. The identity element is 0, which is even.`}checkAssociativity(){const t=parseInt(this.renderRoot.getElementById("assoc-a").value,10),i=parseInt(this.renderRoot.getElementById("assoc-b").value,10),o=parseInt(this.renderRoot.getElementById("assoc-c").value,10);if(isNaN(t)||isNaN(i)||isNaN(o)){this.associativityResult="Please enter valid integers for a, b, and c.";return}if(!this.isEven(t)||!this.isEven(i)||!this.isEven(o)){this.associativityResult="All of a, b, and c must be even numbers.";return}const s=t+i+o,n=t+(i+o);let r=`Result: ( ${t} + ${i} ) + ${o} = ${s} and ${t} + ( ${i} + ${o} ) = ${n}. `;r+=s===n?"Associativity holds.":"Associativity does not hold!",this.associativityResult=r}checkInverse(){const t=parseInt(this.renderRoot.getElementById("inverse-a").value,10);if(isNaN(t)){this.inverseResult="Please enter a valid integer for a.";return}if(!this.isEven(t)){this.inverseResult="Please enter an even number for a.";return}const i=-t,o=t+i;this.inverseResult=`Result: ${t} + (${i}) = ${o}. Every even number a has an inverse (-a) such that a + (-a) = 0.`}render(){return y`
      <h1>Even Numbers Group Demonstration</h1>
      <p>
        This demonstration shows the group properties of the set of even numbers 
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mn>2</mn>
          <mi>&#x2124;</mi>
        </math>
        under addition.
      </p>
      
      <section id="closure">
        <h2>Closure</h2>
        <p>
          Enter two even numbers to demonstrate closure:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>a</mi>
            <mo>+</mo>
            <mi>b</mi>
            <mo>=</mo>
            <mrow>
              <mn>2</mn>
              <mi>&#x2124;</mi>
            </mrow>
          </math>
        </p>
        <label for="closure-a">a:</label>
        <input id="closure-a" type="number" step="1">
        <label for="closure-b">b:</label>
        <input id="closure-b" type="number" step="1">
        <button @click=${this.checkClosure} id="check-closure">Check Closure</button>
        <div class="result" id="closure-result">${this.closureResult}</div>
      </section>
      
      <section id="identity">
        <h2>Identity</h2>
        <p>
          Enter an even number to demonstrate the identity property:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>a</mi>
            <mo>+</mo>
            <mn>0</mn>
            <mo>=</mo>
            <mi>a</mi>
          </math>
        </p>
        <label for="identity-a">a:</label>
        <input id="identity-a" type="number" step="1">
        <button @click=${this.checkIdentity} id="check-identity">Check Identity</button>
        <div class="result" id="identity-result">${this.identityResult}</div>
      </section>
      
      <section id="associativity">
        <h2>Associativity</h2>
        <p>
          Enter three even numbers to demonstrate associativity:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mo>(</mo>
            <mi>a</mi>
            <mo>+</mo>
            <mi>b</mi>
            <mo>)</mo>
            <mo>+</mo>
            <mi>c</mi>
            <mo>=</mo>
            <mi>a</mi>
            <mo>+</mo>
            <mo>(</mo>
            <mi>b</mi>
            <mo>+</mo>
            <mi>c</mi>
            <mo>)</mo>
          </math>
        </p>
        <label for="assoc-a">a:</label>
        <input id="assoc-a" type="number" step="1">
        <label for="assoc-b">b:</label>
        <input id="assoc-b" type="number" step="1">
        <label for="assoc-c">c:</label>
        <input id="assoc-c" type="number" step="1">
        <button @click=${this.checkAssociativity} id="check-associativity">Check Associativity</button>
        <div class="result" id="associativity-result">${this.associativityResult}</div>
      </section>
      
      <section id="inverse">
        <h2>Inverse</h2>
        <p>
          Enter an even number to demonstrate the inverse property:
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mi>a</mi>
            <mo>+</mo>
            <mrow>
              <mo>(</mo>
              <mo>&#x2212;</mo>
              <mi>a</mi>
              <mo>)</mo>
            </mrow>
            <mo>=</mo>
            <mn>0</mn>
          </math>
        </p>
        <label for="inverse-a">a:</label>
        <input id="inverse-a" type="number" step="1">
        <button @click=${this.checkInverse} id="check-inverse">Check Inverse</button>
        <div class="result" id="inverse-result">${this.inverseResult}</div>
      </section>
    `}}J(Re,"properties",{closureResult:{type:String},identityResult:{type:String},associativityResult:{type:String},inverseResult:{type:String}}),J(Re,"styles",I`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      background-color: #eef;
      margin: 0;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    section {
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 15px;
      margin: 20px 0;
      border-radius: 8px;
    }
    label {
      margin-right: 10px;
    }
    input {
      margin: 5px;
      padding: 5px;
      width: 60px;
    }
    button {
      padding: 8px 16px;
      font-size: 14px;
      margin-top: 10px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background-color: #007BFF;
      color: #fff;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #0056b3;
    }
    .result {
      margin-top: 10px;
      font-weight: bold;
    }
  `);customElements.define("even-group-demo",Re);const zt={1:{k:0,d:0},r:{k:1,d:0},r2:{k:2,d:0},f:{k:0,d:1},rf:{k:1,d:1},r2f:{k:2,d:1}};function T(e,t){const i=zt[e],o=zt[t];let s=i.k+(i.d===0?o.k:-o.k);s=(s%3+3)%3;const n=(i.d+o.d)%2;for(let r in zt){const a=zt[r];if(a.k===s&&a.d===n)return r}return null}function nn(e){for(let t in zt)if(T(e,t)==="1")return t;return null}function _(e){switch(e){case"1":return y`1`;case"r":return y`r`;case"r2":return y`r<sup>2</sup>`;case"f":return y`f`;case"rf":return y`r&middot;f`;case"r2f":return y`r<sup>2</sup>&middot;f`;default:return y`${e}`}}const rn={1:{top:"1",right:"2",left:"3"},r:{top:"3",right:"1",left:"2"},r2:{top:"2",right:"3",left:"1"},f:{top:"1",right:"3",left:"2"},rf:{top:"2",right:"1",left:"3"},r2f:{top:"3",right:"2",left:"1"}};class Pe extends Q{constructor(){super(),this.currentElement="1",this.animating=!1,this.formula=y`
      Result: <span class="left-highlight">${_("1")}</span> &middot; 
      <span class="right-highlight">${_("1")}</span> = 
      <span class="product-highlight">${_("1")}</span>
    `}async firstUpdated(){await new Promise(t=>setTimeout(t,0)),this.resetDemo()}clearTableHighlights(){this.renderRoot.querySelectorAll("#multiplication-table td, #multiplication-table th").forEach(i=>{i.classList.remove("table-left-highlight","table-right-highlight","table-product-highlight")})}resetDemo(){this.currentElement!=="1"&&(this.currentElement="1"),this.formula=y`
      Result: <span class="left-highlight">${_("1")}</span> &middot; 
      <span class="right-highlight">${_("1")}</span> = 
      <span class="product-highlight">${_("1")}</span>
    `,this.updateVertices(),this.clearTableHighlights(),this.highlightMultiplicationCell("1","1");const t=this.renderRoot.querySelector("#triangle-group");t&&t.setAttribute("transform","")}updateFormulaDisplay(t,i,o){this.formula=y`
      Result: <span class="left-highlight">${_(t)}</span> &middot; 
      <span class="right-highlight">${_(i)}</span> = 
      <span class="product-highlight">${_(o)}</span>
    `}updateVertices(){const t=rn[this.currentElement];this.renderRoot.querySelector("#vertex-top").textContent=t.top,this.renderRoot.querySelector("#vertex-right").textContent=t.right,this.renderRoot.querySelector("#vertex-left").textContent=t.left}highlightMultiplicationCell(t,i){this.clearTableHighlights(),this.renderRoot.querySelectorAll(`#multiplication-table [data-left="${t}"]`).forEach(r=>r.classList.add("table-left-highlight")),this.renderRoot.querySelectorAll(`#multiplication-table [data-right="${i}"]`).forEach(r=>r.classList.add("table-right-highlight"));const n=this.renderRoot.querySelector(`#multiplication-table td[data-left="${t}"][data-right="${i}"]`);n&&(n.classList.remove("table-left-highlight","table-right-highlight"),n.classList.add("table-product-highlight"))}async handleIdentityClick(){if(this.animating)return;this.animating=!0;const t="1",i=this.currentElement,o=T(t,i);this.highlightMultiplicationCell(t,i),this.updateFormulaDisplay(t,i,o);const s=this.renderRoot.querySelector("#triangle-group"),n=s.animate([{transform:"scale(1)"},{transform:"scale(1.2)"},{transform:"scale(1)"}],{duration:300,easing:"ease-out",fill:"forwards"});await n.finished,n.cancel(),s.setAttribute("transform",""),this.currentElement=o,this.updateVertices(),this.animating=!1}async animateRotation(t,i,o){const s=this.renderRoot.querySelector("#triangle-group"),n=performance.now();await new Promise(r=>{const a=l=>{const c=l-n,u=Math.min(c/i,1);s.setAttribute("transform",`rotate(${t*u})`),u<1?requestAnimationFrame(a):r()};requestAnimationFrame(a)}),s.setAttribute("transform",""),this.currentElement=o,this.updateVertices(),this.animating=!1}async handleRotate120Click(){if(this.animating)return;this.animating=!0;const t="r",i=this.currentElement,o=T(t,i);this.highlightMultiplicationCell(t,i),this.updateFormulaDisplay(t,i,o),await this.animateRotation(120,500,o)}async handleRotate240Click(){if(this.animating)return;this.animating=!0;const t="r2",i=this.currentElement,o=T(t,i);this.highlightMultiplicationCell(t,i),this.updateFormulaDisplay(t,i,o),await this.animateRotation(240,1e3,o)}async animateReflection(t,i){const o=this.renderRoot.querySelector("#triangle-group"),s=performance.now();await new Promise(n=>{const r=a=>{const l=a-s,c=Math.min(l/t,1),u=1-2*c;o.setAttribute("transform",`scale(${u}, 1)`),c<1?requestAnimationFrame(r):n()};requestAnimationFrame(r)}),o.setAttribute("transform",""),this.currentElement=i,this.updateVertices(),this.animating=!1}async handleReflectClick(){if(this.animating)return;this.animating=!0;const t="f",i=this.currentElement,o=T(t,i);this.highlightMultiplicationCell(t,i),this.updateFormulaDisplay(t,i,o),await this.animateReflection(500,o)}async animateFlipThenRotation(t,i,o,s){const n=this.renderRoot.querySelector("#triangle-group"),r=performance.now();await new Promise(l=>{const c=u=>{const d=u-r,m=Math.min(d/i,1),p=1-2*m;n.setAttribute("transform",`scale(${p}, 1)`),m<1?requestAnimationFrame(c):l()};requestAnimationFrame(c)});const a=performance.now();await new Promise(l=>{const c=u=>{const d=u-a,m=Math.min(d/o,1);n.setAttribute("transform",`rotate(${t*m}) scale(-1,1)`),m<1?requestAnimationFrame(c):l()};requestAnimationFrame(c)}),n.setAttribute("transform",""),this.currentElement=s,this.updateVertices(),this.animating=!1}async handleRFClick(){if(this.animating)return;this.animating=!0;const t="rf",i=this.currentElement,o=T(t,i);this.highlightMultiplicationCell(t,i),this.updateFormulaDisplay(t,i,o),await this.animateFlipThenRotation(120,500,500,o)}async handleR2FClick(){if(this.animating)return;this.animating=!0;const t="r2f",i=this.currentElement,o=T(t,i);this.highlightMultiplicationCell(t,i),this.updateFormulaDisplay(t,i,o),await this.animateFlipThenRotation(240,500,1e3,o)}handleInteractiveClosure(){const t=this.renderRoot.querySelector("#closure-a").value,i=this.renderRoot.querySelector("#closure-b").value,o=T(t,i),s=y`
      Result: ${_(t)} &middot; ${_(i)} = ${_(o)}. Closure holds because the result is in D₃.
    `;Mt(s,this.renderRoot.querySelector("#closure-result"))}handleInteractiveIdentityProp(){const t=this.renderRoot.querySelector("#identity-element").value,i=T("1",t),o=y`
      Result: ${_("1")} &middot; ${_(t)} = ${_(i)}. The identity element is 1.
    `;Mt(o,this.renderRoot.querySelector("#identity-result-prop"))}handleInteractiveAssociativityProp(){const t=this.renderRoot.querySelector("#assoc-a").value,i=this.renderRoot.querySelector("#assoc-b").value,o=this.renderRoot.querySelector("#assoc-c").value,s=T(T(t,i),o),n=T(t,T(i,o)),r=y`
      Result: ( ${_(t)} &middot; ${_(i)} ) &middot; ${_(o)} = ${_(s)}
      and ${_(t)} &middot; ( ${_(i)} &middot; ${_(o)} ) = ${_(n)}.
      ${s===n?"Associativity holds.":"Associativity fails!"}
    `;Mt(r,this.renderRoot.querySelector("#associativity-result-prop"))}handleInteractiveInverseProp(){const t=this.renderRoot.querySelector("#inverse-element").value,i=nn(t),o=y`
      Result: ${_(t)} &middot; ${_(i)} = 1. Inverse holds.
    `;Mt(o,this.renderRoot.querySelector("#inverse-result-prop"))}render(){const t=["1","r","r2","f","rf","r2f"];return y`
      <h1>Triangle Group Demonstration (Dihedral Group D₃)</h1>
      
      <div id="formula-display" data-test-id="formula-display">${this.formula}</div>
      
      <div class="demo-container">
        <svg id="triangle-svg" width="300" height="300" viewBox="-150 -150 300 300" aria-label="Triangle group demonstration">
          <g id="triangle-group">
            <polygon points="0,-100 86.6,50 -86.6,50" fill="#007BFF" stroke="#0056b3" stroke-width="3"></polygon>
            <text id="vertex-top" class="vertex-label" x="0" y="-60" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">1</text>
            <text id="vertex-right" class="vertex-label" x="50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">2</text>
            <text id="vertex-left" class="vertex-label" x="-50" y="30" font-size="20" text-anchor="middle" fill="white" dominant-baseline="middle">3</text>
          </g>
        </svg>
        
        <div id="multiplication-table">
          <table>
            <thead>
              <tr>
                <th>*</th>
                ${t.map(i=>y`<th data-right="${i}">${_(i)}</th>`)}
              </tr>
            </thead>
            <tbody>
              ${t.map(i=>y`
                <tr>
                  <th data-left="${i}">${_(i)}</th>
                  ${t.map(o=>y`
                    <td data-left="${i}" data-right="${o}">
                      ${_(T(i,o))}
                    </td>
                  `)}
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="buttons">
        <button id="identity-button" 
          aria-label="Apply identity transformation"
          data-test-id="identity-button"
          ?disabled="${this.animating}"
          @click="${this.handleIdentityClick}">
          1 (Identity)
        </button>
        <button id="rotate-120-button" 
          aria-label="Rotate triangle 120 degrees"
          data-test-id="rotate-120-button"
          ?disabled="${this.animating}"
          @click="${this.handleRotate120Click}">
          r (Rotate 120°)
        </button>
        <button id="rotate-240-button" 
          aria-label="Rotate triangle 240 degrees"
          data-test-id="rotate-240-button"
          ?disabled="${this.animating}"
          @click="${this.handleRotate240Click}">
          r<sup>2</sup> (Rotate 240°)
        </button>
        <button id="reflect-button" 
          aria-label="Reflect triangle"
          data-test-id="reflect-button"
          ?disabled="${this.animating}"
          @click="${this.handleReflectClick}">
          f (Reflect)
        </button>
        <button id="rf-button" 
          aria-label="Reflect then rotate 120 degrees"
          data-test-id="rf-button"
          ?disabled="${this.animating}"
          @click="${this.handleRFClick}">
          r&middot;f
        </button>
        <button id="r2f-button" 
          aria-label="Reflect then rotate 240 degrees"
          data-test-id="r2f-button"
          ?disabled="${this.animating}"
          @click="${this.handleR2FClick}">
          r<sup>2</sup>&middot;f
        </button>
        <button id="reset-button" 
          aria-label="Reset demonstration"
          data-test-id="reset-button"
          ?disabled="${this.animating}"
          @click="${this.resetDemo}">
          Reset
        </button>
      </div>
      
      <div class="interactive">
        <section id="closure-section" aria-labelledby="closure-heading" data-test-id="closure-section">
          <h2 id="closure-heading">Closure</h2>
          <p>Select two elements to check closure under composition:</p>
          <label for="closure-a">a:</label>
          <select id="closure-a" data-test-id="closure-a-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <label for="closure-b">b:</label>
          <select id="closure-b" data-test-id="closure-b-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-closure" 
            aria-label="Check closure property"
            data-test-id="check-closure-button"
            @click="${this.handleInteractiveClosure}">
            Check Closure
          </button>
          <div id="closure-result" class="result" data-test-id="closure-result"></div>
        </section>
        
        <section id="identity-prop-section" aria-labelledby="identity-prop-heading" data-test-id="identity-prop-section">
          <h2 id="identity-prop-heading">Identity</h2>
          <p>Select an element to see that composing with the identity yields the same element:</p>
          <label for="identity-element">a:</label>
          <select id="identity-element" data-test-id="identity-element-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-identity-prop" 
            aria-label="Check identity property"
            data-test-id="identity-result-prop-button"
            @click="${this.handleInteractiveIdentityProp}">
            Check Identity
          </button>
          <div id="identity-result-prop" class="result" data-test-id="identity-result-prop"></div>
        </section>
        
        <section id="associativity-prop-section" aria-labelledby="associativity-prop-heading" data-test-id="associativity-prop-section">
          <h2 id="associativity-prop-heading">Associativity</h2>
          <p>Select three elements to verify associativity: (a·b)·c = a·(b·c)</p>
          <label for="assoc-a">a:</label>
          <select id="assoc-a" data-test-id="assoc-a-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <label for="assoc-b">b:</label>
          <select id="assoc-b" data-test-id="assoc-b-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <label for="assoc-c">c:</label>
          <select id="assoc-c" data-test-id="assoc-c-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-associativity-prop" 
            aria-label="Check associativity property"
            data-test-id="check-associativity-prop-button"
            @click="${this.handleInteractiveAssociativityProp}">
            Check Associativity
          </button>
          <div id="associativity-result-prop" class="result" data-test-id="associativity-result-prop"></div>
        </section>
        
        <section id="inverse-prop-section" aria-labelledby="inverse-prop-heading" data-test-id="inverse-prop-section">
          <h2 id="inverse-prop-heading">Inverse</h2>
          <p>Select an element to find its inverse (b such that a·b = 1):</p>
          <label for="inverse-element">a:</label>
          <select id="inverse-element" data-test-id="inverse-element-select">
            <option value="1">1</option>
            <option value="r">r</option>
            <option value="r2">r²</option>
            <option value="f">f</option>
            <option value="rf">r·f</option>
            <option value="r2f">r²·f</option>
          </select>
          <button id="check-inverse-prop" 
            aria-label="Check inverse property"
            data-test-id="inverse-result-prop-button"
            @click="${this.handleInteractiveInverseProp}">
            Check Inverse
          </button>
          <div id="inverse-result-prop" class="result" data-test-id="inverse-result-prop"></div>
        </section>
      </div>
    `}}J(Pe,"properties",{currentElement:{type:String},animating:{type:Boolean},formula:{type:Object}}),J(Pe,"styles",I`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #eef;
    }
    h1 {
      text-align: center;
      color: #333;
    }
    .demo-container {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    svg {
      overflow: visible;
    }
    #multiplication-table {
      font-family: monospace;
      font-size: 16px;
    }
    #multiplication-table table {
      border-collapse: collapse;
    }
    #multiplication-table th,
    #multiplication-table td {
      border: 1px solid #ccc;
      padding: 5px 10px;
      text-align: center;
    }
    .table-left-highlight {
      background-color: rgba(255, 200, 200, 0.3);
    }
    .table-right-highlight {
      background-color: rgba(200, 200, 255, 0.3);
    }
    .table-product-highlight {
      background-color: rgba(200, 255, 200, 0.8);
    }
    #formula-display {
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .left-highlight {
      background-color: rgba(255, 200, 200, 0.8);
      padding: 0 4px;
    }
    .right-highlight {
      background-color: rgba(200, 200, 255, 0.8);
      padding: 0 4px;
    }
    .product-highlight {
      background-color: rgba(200, 255, 200, 0.8);
      padding: 0 4px;
    }
    .buttons, .interactive {
      text-align: center;
      margin-top: 20px;
    }
    button {
      padding: 8px 16px;
      margin: 5px;
      font-size: 14px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: #fff;
    }
    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    section {
      background: #fff;
      border: 1px solid #ccc;
      padding: 15px;
      margin: 20px auto;
      max-width: 600px;
      border-radius: 8px;
      text-align: left;
    }
    section h2 {
      margin-top: 0;
      text-align: center;
    }
    section label {
      margin-right: 10px;
    }
    section select, section input {
      margin: 5px;
      padding: 5px;
      width: 80px;
    }
    section div.result {
      margin-top: 10px;
      font-weight: bold;
      text-align: center;
    }
  `);customElements.define("triangle-group-demo",Pe);class Le extends Q{constructor(){super(),this.activeView="";const t=["Ecclesiastes 1:13 – 'And I applied my mind to seek and to search out by wisdom all that is done under heaven; it is an unhappy business that God has given to the sons of men to be busy with.'","Romans 1:20 – 'Ever since the creation of the world his invisible nature, namely, his eternal power and deity, has been clearly perceived in the things that have been made. So they are without excuse;'","Psalm 19:1 – 'The heavens are telling the glory of God; and the firmament proclaims his handiwork.'","Colossians 1:16–17 – 'For in him all things were created, in heaven and on earth, visible and invisible, whether thrones or dominions or principalities or authorities—all things were created through him and for him. He is before all things, and in him all things hold together.'","Proverbs 1:5 – 'The wise man also may hear and increase in learning, and the man of understanding acquire skill,'"];this.randomVerse=t[Math.floor(Math.random()*t.length)]}render(){return y`
      <header>
        <h1>Museum of Mathematics</h1>
        <p>Explore our exhibits by selecting one from the menu below.</p>
      </header>
      <nav class="menu">
        <sl-dropdown>
          <sl-button slot="trigger" variant="primary">Group Demos</sl-button>
          <sl-menu>
            <sl-menu-item @click=${()=>this.handleMenuClick("group")}>
              Group Theory Exhibit
            </sl-menu-item>
            <sl-menu-item @click=${()=>this.handleMenuClick("even")}>
              Even Numbers Exhibit
            </sl-menu-item>
            <sl-menu-item @click=${()=>this.handleMenuClick("other")}>
              Triangle Groups Exhibit
            </sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </nav>
      <main class="content">
        ${this.activeView==="group"?y`<z-group-demo></z-group-demo>`:this.activeView==="even"?y`<even-group-demo></even-group-demo>`:this.activeView==="other"?y`<triangle-group-demo></triangle-group-demo>`:y`<p>Welcome to the Museum of Mathematics. Please select an exhibit from the menu above.</p>`}
      </main>
      <footer>
        <p>${this.randomVerse}</p>
      </footer>
    `}handleMenuClick(t){this.activeView=t}}J(Le,"styles",I`
    header {
      text-align: center;
      margin-bottom: 2rem;
    }
    nav.menu {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    main.content {
      border: none;
    }
    footer {
      text-align: center;
      background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
      color: #fff;
      padding: 1.5rem;
      margin-top: 2rem;
      font-size: 1rem;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15);
    }
  `),J(Le,"properties",{activeView:{type:String},randomVerse:{type:String}});customElements.define("my-app",Le);
//# sourceMappingURL=index-Q3keJME_.js.map
