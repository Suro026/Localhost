(()=>{var Uh=()=>{};var jh=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Gg=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],a=n[t++],u=n[t++],l=((i&7)<<18|(s&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{let s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Pi={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],a=i+1<n.length,u=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=s>>2,g=(s&3)<<4|u>>4,v=(u&15)<<2|d>>6,S=d&63;l||(S=64,a||(v=64)),r.push(t[p],t[g],t[v],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(jh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Gg(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],u=i<n.length?t[n.charAt(i)]:0;++i;let d=i<n.length?t[n.charAt(i)]:64;++i;let g=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||u==null||d==null||g==null)throw new Xo;let v=s<<2|u>>4;if(r.push(v),d!==64){let S=u<<4&240|d>>2;if(r.push(S),g!==64){let P=d<<6&192|g;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},Xo=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Kg=function(n){let e=jh(n);return Pi.encodeByteArray(e,!0)},Ar=function(n){return Kg(n).replace(/\./g,"")},Ci=function(n){try{return Pi.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function ki(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var Wg=()=>ki().__FIREBASE_DEFAULTS__,Hg=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Qg=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Ci(n[1]);return e&&JSON.parse(e)},Di=()=>{try{return Uh()||Wg()||Hg()||Qg()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ea=n=>{var e,t;return(t=(e=Di())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},zh=n=>{let e=ea(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},ta=()=>{var n;return(n=Di())===null||n===void 0?void 0:n.config},na=n=>{var e;return(e=Di())===null||e===void 0?void 0:e[`_${n}`]};var ut=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function St(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ni(n){return(await fetch(n,{credentials:"include"})).ok}function $h(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ar(JSON.stringify(t)),Ar(JSON.stringify(a)),""].join(".")}var Tr={};function Jg(){let n={prod:[],emulator:[]};for(let e of Object.keys(Tr))Tr[e]?n.emulator.push(e):n.prod.push(e);return n}function Yg(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}var Bh=!1;function Oi(n,e){if(typeof window=="undefined"||typeof document=="undefined"||!St(window.location.host)||Tr[n]===e||Tr[n]||Bh)return;Tr[n]=e;function t(v){return`__firebase__banner__${v}`}let r="__firebase__banner",s=Jg().prod.length>0;function a(){let v=document.getElementById(r);v&&v.remove()}function u(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function l(v,S){v.setAttribute("width","24"),v.setAttribute("id",S),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function d(){let v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{Bh=!0,a()},v}function p(v,S){v.setAttribute("id",S),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function g(){let v=Yg(r),S=t("text"),P=document.getElementById(S)||document.createElement("span"),N=t("learnmore"),k=document.getElementById(N)||document.createElement("a"),$=t("preprendIcon"),F=document.getElementById($)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){let q=v.element;u(q),p(k,N);let J=d();l(F,$),q.append(F,P,k,J),document.body.appendChild(q)}s?(P.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,P.innerText="Preview backend running in this workspace."),P.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}function fe(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Gh(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(fe())}function Xg(){var n;let e=(n=Di())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Kh(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function Wh(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Hh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Qh(){let n=fe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Jh(){return!Xg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function vn(){try{return typeof indexedDB=="object"}catch{return!1}}function Yh(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Zg="FirebaseError",Oe=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Zg,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,qe.prototype.create)}},qe=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?e_(s,r):"Error",u=`${this.serviceName}: ${a} (${i}).`;return new Oe(i,u,r)}};function e_(n,e){return n.replace(t_,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var t_=/\{\$([^}]+)}/g;function Xh(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function He(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],a=e[i];if(qh(s)&&qh(a)){if(!He(s,a))return!1}else if(s!==a)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function qh(n){return n!==null&&typeof n=="object"}function wn(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function In(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function En(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Zh(n,e){let t=new Zo(n,e);return t.subscribe.bind(t)}var Zo=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");n_(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Yo),i.error===void 0&&(i.error=Yo),i.complete===void 0&&(i.complete=Yo);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function n_(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Yo(){}var r_=1e3,i_=2,s_=4*60*60*1e3,o_=.5;function ed(n,e=r_,t=i_){let r=e*Math.pow(t,n),i=Math.round(o_*r*(Math.random()-.5)*2);return Math.min(s_,r+i)}function X(n){return n&&n._delegate?n._delegate:n}var Pe=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Ht="[DEFAULT]";var ra=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new ut;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(c_(e))try{this.getOrInitializeService({instanceIdentifier:Ht})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Ht){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ht){return this.instances.has(e)}getOptions(e=Ht){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,a]of this.instancesDeferred.entries()){let u=this.normalizeInstanceIdentifier(s);r===u&&a.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:a_(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ht){return this.component?this.component.multipleInstances?e:Ht:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function a_(n){return n===Ht?void 0:n}function c_(n){return n.instantiationMode==="EAGER"}var Vi=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new ra(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var u_=[],z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(z||(z={}));var l_={debug:z.DEBUG,verbose:z.VERBOSE,info:z.INFO,warn:z.WARN,error:z.ERROR,silent:z.SILENT},h_=z.INFO,d_={[z.DEBUG]:"log",[z.VERBOSE]:"log",[z.INFO]:"info",[z.WARN]:"warn",[z.ERROR]:"error"},f_=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=d_[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Qe=class{constructor(e){this.name=e,this._logLevel=h_,this._logHandler=f_,this._userLogHandler=null,u_.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?l_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,z.DEBUG,...e),this._logHandler(this,z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,z.VERBOSE,...e),this._logHandler(this,z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,z.INFO,...e),this._logHandler(this,z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,z.WARN,...e),this._logHandler(this,z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,z.ERROR,...e),this._logHandler(this,z.ERROR,...e)}};var p_=(n,e)=>e.some(t=>n instanceof t),td,nd;function m_(){return td||(td=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function g_(){return nd||(nd=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var rd=new WeakMap,sa=new WeakMap,id=new WeakMap,ia=new WeakMap,aa=new WeakMap;function __(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Je(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&rd.set(t,n)}).catch(()=>{}),aa.set(e,n),e}function y_(n){if(sa.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});sa.set(n,e)}var oa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return sa.get(n);if(e==="objectStoreNames")return n.objectStoreNames||id.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Je(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function sd(n){oa=n(oa)}function v_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(xi(this),e,...t);return id.set(r,e.sort?e.sort():[e]),Je(r)}:g_().includes(n)?function(...e){return n.apply(xi(this),e),Je(rd.get(this))}:function(...e){return Je(n.apply(xi(this),e))}}function w_(n){return typeof n=="function"?v_(n):(n instanceof IDBTransaction&&y_(n),p_(n,m_())?new Proxy(n,oa):n)}function Je(n){if(n instanceof IDBRequest)return __(n);if(ia.has(n))return ia.get(n);let e=w_(n);return e!==n&&(ia.set(n,e),aa.set(e,n)),e}var xi=n=>aa.get(n);function ad(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(n,e),u=Je(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Je(a.result),l.oldVersion,l.newVersion,Je(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),u.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}var I_=["get","getKey","getAll","getAllKeys","count"],E_=["put","add","delete","clear"],ca=new Map;function od(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ca.get(e))return ca.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=E_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||I_.includes(t)))return;let s=async function(a,...u){let l=this.transaction(a,i?"readwrite":"readonly"),d=l.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[t](...u),i&&l.done]))[0]};return ca.set(e,s),s}sd(n=>({...n,get:(e,t,r)=>od(e,t)||n.get(e,t,r),has:(e,t)=>!!od(e,t)||n.has(e,t)}));var la=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(T_(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function T_(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var ha="@firebase/app",cd="0.13.2";var lt=new Qe("@firebase/app"),A_="@firebase/app-compat",b_="@firebase/analytics-compat",S_="@firebase/analytics",R_="@firebase/app-check-compat",P_="@firebase/app-check",C_="@firebase/auth",k_="@firebase/auth-compat",D_="@firebase/database",N_="@firebase/data-connect",O_="@firebase/database-compat",V_="@firebase/functions",x_="@firebase/functions-compat",L_="@firebase/installations",M_="@firebase/installations-compat",F_="@firebase/messaging",U_="@firebase/messaging-compat",B_="@firebase/performance",q_="@firebase/performance-compat",j_="@firebase/remote-config",z_="@firebase/remote-config-compat",$_="@firebase/storage",G_="@firebase/storage-compat",K_="@firebase/firestore",W_="@firebase/ai",H_="@firebase/firestore-compat",Q_="firebase",J_="11.10.0";var da="[DEFAULT]",Y_={[ha]:"fire-core",[A_]:"fire-core-compat",[S_]:"fire-analytics",[b_]:"fire-analytics-compat",[P_]:"fire-app-check",[R_]:"fire-app-check-compat",[C_]:"fire-auth",[k_]:"fire-auth-compat",[D_]:"fire-rtdb",[N_]:"fire-data-connect",[O_]:"fire-rtdb-compat",[V_]:"fire-fn",[x_]:"fire-fn-compat",[L_]:"fire-iid",[M_]:"fire-iid-compat",[F_]:"fire-fcm",[U_]:"fire-fcm-compat",[B_]:"fire-perf",[q_]:"fire-perf-compat",[j_]:"fire-rc",[z_]:"fire-rc-compat",[$_]:"fire-gcs",[G_]:"fire-gcs-compat",[K_]:"fire-fst",[H_]:"fire-fst-compat",[W_]:"fire-vertex","fire-js":"fire-js",[Q_]:"fire-js-all"};var Li=new Map,X_=new Map,fa=new Map;function ud(n,e){try{n.container.addComponent(e)}catch(t){lt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function je(n){let e=n.name;if(fa.has(e))return lt.debug(`There were multiple attempts to register component ${e}.`),!1;fa.set(e,n);for(let t of Li.values())ud(t,n);for(let t of X_.values())ud(t,n);return!0}function Pt(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Ce(n){return n==null?!1:n.settings!==void 0}var Z_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Rt=new qe("app","Firebase",Z_);var pa=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Pe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Rt.create("app-deleted",{appName:this._name})}};var Ct=J_;function _a(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:da,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw Rt.create("bad-app-name",{appName:String(i)});if(t||(t=ta()),!t)throw Rt.create("no-options");let s=Li.get(i);if(s){if(He(t,s.options)&&He(r,s.config))return s;throw Rt.create("duplicate-app",{appName:i})}let a=new Vi(i);for(let l of fa.values())a.addComponent(l);let u=new pa(t,r,a);return Li.set(i,u),u}function Tn(n=da){let e=Li.get(n);if(!e&&n===da&&ta())return _a();if(!e)throw Rt.create("no-app",{appName:n});return e}function Ve(n,e,t){var r;let i=(r=Y_[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){let u=[`Unable to register library "${i}" with version "${e}":`];s&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&u.push("and"),a&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),lt.warn(u.join(" "));return}je(new Pe(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var ey="firebase-heartbeat-database",ty=1,br="firebase-heartbeat-store",ua=null;function fd(){return ua||(ua=ad(ey,ty,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(br)}catch(t){console.warn(t)}}}}).catch(n=>{throw Rt.create("idb-open",{originalErrorMessage:n.message})})),ua}async function ny(n){try{let t=(await fd()).transaction(br),r=await t.objectStore(br).get(pd(n));return await t.done,r}catch(e){if(e instanceof Oe)lt.warn(e.message);else{let t=Rt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});lt.warn(t.message)}}}async function ld(n,e){try{let r=(await fd()).transaction(br,"readwrite");await r.objectStore(br).put(e,pd(n)),await r.done}catch(t){if(t instanceof Oe)lt.warn(t.message);else{let r=Rt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});lt.warn(r.message)}}}function pd(n){return`${n.name}!${n.options.appId}`}var ry=1024,iy=30,ma=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new ga(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=hd();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>iy){let a=oy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){lt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=hd(),{heartbeatsToSend:r,unsentEntries:i}=sy(this._heartbeatsCache.heartbeats),s=Ar(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return lt.warn(t),""}}};function hd(){return new Date().toISOString().substring(0,10)}function sy(n,e=ry){let t=[],r=n.slice();for(let i of n){let s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),dd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),dd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var ga=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return vn()?Yh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await ny(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return ld(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return ld(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function dd(n){return Ar(JSON.stringify({version:2,heartbeats:n})).length}function oy(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function ay(n){je(new Pe("platform-logger",e=>new la(e),"PRIVATE")),je(new Pe("heartbeat",e=>new ma(e),"PRIVATE")),Ve(ha,cd,n),Ve(ha,cd,"esm2017"),Ve("fire-js","")}ay("");var cy="firebase",uy="11.10.0";Ve(cy,uy,"app");var wa=new Map,wd={activated:!1,tokenObservers:[]},ly={initialized:!1,enabled:!1};function le(n){return wa.get(n)||Object.assign({},wd)}function hy(n,e){return wa.set(n,e),wa.get(n)}function Bi(){return ly}var Id="https://content-firebaseappcheck.googleapis.com/v1";var dy="exchangeRecaptchaEnterpriseToken",fy="exchangeDebugToken",md={OFFSET_DURATION:5*60*1e3,RETRIAL_MIN_WAIT:30*1e3,RETRIAL_MAX_WAIT:16*60*1e3},py=24*60*60*1e3;var Ia=class{constructor(e,t,r,i,s){if(this.operation=e,this.retryPolicy=t,this.getWaitDuration=r,this.lowerBound=i,this.upperBound=s,this.pending=null,this.nextErrorWaitInterval=i,i>s)throw new Error("Proactive refresh lower bound greater than upper bound!")}start(){this.nextErrorWaitInterval=this.lowerBound,this.process(!0).catch(()=>{})}stop(){this.pending&&(this.pending.reject("cancelled"),this.pending=null)}isRunning(){return!!this.pending}async process(e){this.stop();try{this.pending=new ut,this.pending.promise.catch(t=>{}),await my(this.getNextRun(e)),this.pending.resolve(),await this.pending.promise,this.pending=new ut,this.pending.promise.catch(t=>{}),await this.operation(),this.pending.resolve(),await this.pending.promise,this.process(!0).catch(()=>{})}catch(t){this.retryPolicy(t)?this.process(!1).catch(()=>{}):this.stop()}}getNextRun(e){if(e)return this.nextErrorWaitInterval=this.lowerBound,this.getWaitDuration();{let t=this.nextErrorWaitInterval;return this.nextErrorWaitInterval*=2,this.nextErrorWaitInterval>this.upperBound&&(this.nextErrorWaitInterval=this.upperBound),t}}};function my(n){return new Promise(e=>{setTimeout(e,n)})}var gy={"already-initialized":"You have already called initializeAppCheck() for FirebaseApp {$appName} with different options. To avoid this error, call initializeAppCheck() with the same options as when it was originally called. This will return the already initialized instance.","use-before-activation":"App Check is being used before initializeAppCheck() is called for FirebaseApp {$appName}. Call initializeAppCheck() before instantiating other Firebase services.","fetch-network-error":"Fetch failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-parse-error":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status-error":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","recaptcha-error":"ReCAPTCHA error.","initial-throttle":"{$httpStatus} error. Attempts allowed again after {$time}",throttled:"Requests throttled due to previous {$httpStatus} error. Attempts allowed again after {$time}"},ke=new qe("appCheck","AppCheck",gy);function gd(n=!1){var e;return n?(e=self.grecaptcha)===null||e===void 0?void 0:e.enterprise:self.grecaptcha}function Aa(n){if(!le(n).activated)throw ke.create("use-before-activation",{appName:n.name})}function Ed(n){let e=Math.round(n/1e3),t=Math.floor(e/(3600*24)),r=Math.floor((e-t*3600*24)/3600),i=Math.floor((e-t*3600*24-r*3600)/60),s=e-t*3600*24-r*3600-i*60,a="";return t&&(a+=Mi(t)+"d:"),r&&(a+=Mi(r)+"h:"),a+=Mi(i)+"m:"+Mi(s)+"s",a}function Mi(n){return n===0?"00":n>=10?n.toString():"0"+n}async function ba({url:n,body:e},t){let r={"Content-Type":"application/json"},i=t.getImmediate({optional:!0});if(i){let g=await i.getHeartbeatsHeader();g&&(r["X-Firebase-Client"]=g)}let s={method:"POST",body:JSON.stringify(e),headers:r},a;try{a=await fetch(n,s)}catch(g){throw ke.create("fetch-network-error",{originalErrorMessage:g==null?void 0:g.message})}if(a.status!==200)throw ke.create("fetch-status-error",{httpStatus:a.status});let u;try{u=await a.json()}catch(g){throw ke.create("fetch-parse-error",{originalErrorMessage:g==null?void 0:g.message})}let l=u.ttl.match(/^([\d.]+)(s)$/);if(!l||!l[2]||isNaN(Number(l[1])))throw ke.create("fetch-parse-error",{originalErrorMessage:`ttl field (timeToLive) is not in standard Protobuf Duration format: ${u.ttl}`});let d=Number(l[1])*1e3,p=Date.now();return{token:u.token,expireTimeMillis:p+d,issuedAtTimeMillis:p}}function _y(n,e){let{projectId:t,appId:r,apiKey:i}=n.options;return{url:`${Id}/projects/${t}/apps/${r}:${dy}?key=${i}`,body:{recaptcha_enterprise_token:e}}}function Td(n,e){let{projectId:t,appId:r,apiKey:i}=n.options;return{url:`${Id}/projects/${t}/apps/${r}:${fy}?key=${i}`,body:{debug_token:e}}}var yy="firebase-app-check-database",vy=1,Sr="firebase-app-check-store",Ad="debug-token",Fi=null;function bd(){return Fi||(Fi=new Promise((n,e)=>{try{let t=indexedDB.open(yy,vy);t.onsuccess=r=>{n(r.target.result)},t.onerror=r=>{var i;e(ke.create("storage-open",{originalErrorMessage:(i=r.target.error)===null||i===void 0?void 0:i.message}))},t.onupgradeneeded=r=>{let i=r.target.result;switch(r.oldVersion){case 0:i.createObjectStore(Sr,{keyPath:"compositeKey"})}}}catch(t){e(ke.create("storage-open",{originalErrorMessage:t==null?void 0:t.message}))}}),Fi)}function wy(n){return Rd(Pd(n))}function Iy(n,e){return Sd(Pd(n),e)}function Ey(n){return Sd(Ad,n)}function Ty(){return Rd(Ad)}async function Sd(n,e){let r=(await bd()).transaction(Sr,"readwrite"),s=r.objectStore(Sr).put({compositeKey:n,value:e});return new Promise((a,u)=>{s.onsuccess=l=>{a()},r.onerror=l=>{var d;u(ke.create("storage-set",{originalErrorMessage:(d=l.target.error)===null||d===void 0?void 0:d.message}))}})}async function Rd(n){let t=(await bd()).transaction(Sr,"readonly"),i=t.objectStore(Sr).get(n);return new Promise((s,a)=>{i.onsuccess=u=>{let l=u.target.result;s(l?l.value:void 0)},t.onerror=u=>{var l;a(ke.create("storage-get",{originalErrorMessage:(l=u.target.error)===null||l===void 0?void 0:l.message}))}})}function Pd(n){return`${n.options.appId}-${n.name}`}var kt=new Qe("@firebase/app-check");async function Ay(n){if(vn()){let e;try{e=await wy(n)}catch(t){kt.warn(`Failed to read token from IndexedDB. Error: ${t}`)}return e}}function ya(n,e){return vn()?Iy(n,e).catch(t=>{kt.warn(`Failed to write token to IndexedDB. Error: ${t}`)}):Promise.resolve()}async function by(){let n;try{n=await Ty()}catch{}if(n)return n;{let e=crypto.randomUUID();return Ey(e).catch(t=>kt.warn(`Failed to persist debug token to IndexedDB. Error: ${t}`)),e}}function Sa(){return Bi().enabled}async function Ra(){let n=Bi();if(n.enabled&&n.token)return n.token.promise;throw Error(`
            Can't get debug token in production mode.
        `)}function Sy(){let n=ki(),e=Bi();if(e.initialized=!0,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN!="string"&&n.FIREBASE_APPCHECK_DEBUG_TOKEN!==!0)return;e.enabled=!0;let t=new ut;e.token=t,typeof n.FIREBASE_APPCHECK_DEBUG_TOKEN=="string"?t.resolve(n.FIREBASE_APPCHECK_DEBUG_TOKEN):t.resolve(by())}var Ry={error:"UNKNOWN_ERROR"};function Py(n){return Pi.encodeString(JSON.stringify(n),!1)}async function Ea(n,e=!1,t=!1){let r=n.app;Aa(r);let i=le(r),s=i.token,a;if(s&&!An(s)&&(i.token=void 0,s=void 0),!s){let d=await i.cachedTokenPromise;d&&(An(d)?s=d:await ya(r,void 0))}if(!e&&s&&An(s))return{token:s.token};let u=!1;if(Sa())try{i.exchangeTokenPromise||(i.exchangeTokenPromise=ba(Td(r,await Ra()),n.heartbeatServiceProvider).finally(()=>{i.exchangeTokenPromise=void 0}),u=!0);let d=await i.exchangeTokenPromise;return await ya(r,d),i.token=d,{token:d.token}}catch(d){return d.code==="appCheck/throttled"||d.code==="appCheck/initial-throttle"?kt.warn(d.message):t&&kt.error(d),va(d)}try{i.exchangeTokenPromise||(i.exchangeTokenPromise=i.provider.getToken().finally(()=>{i.exchangeTokenPromise=void 0}),u=!0),s=await le(r).exchangeTokenPromise}catch(d){d.code==="appCheck/throttled"||d.code==="appCheck/initial-throttle"?kt.warn(d.message):t&&kt.error(d),a=d}let l;return s?a?An(s)?l={token:s.token,internalError:a}:l=va(a):(l={token:s.token},i.token=s,await ya(r,s)):l=va(a),u&&Dd(r,l),l}async function Cy(n){let e=n.app;Aa(e);let{provider:t}=le(e);if(Sa()){let r=await Ra(),{token:i}=await ba(Td(e,r),n.heartbeatServiceProvider);return{token:i}}else{let{token:r}=await t.getToken();return{token:r}}}function Cd(n,e,t,r){let{app:i}=n,s=le(i),a={next:t,error:r,type:e};if(s.tokenObservers=[...s.tokenObservers,a],s.token&&An(s.token)){let u=s.token;Promise.resolve().then(()=>{t({token:u.token}),_d(n)}).catch(()=>{})}s.cachedTokenPromise.then(()=>_d(n))}function kd(n,e){let t=le(n),r=t.tokenObservers.filter(i=>i.next!==e);r.length===0&&t.tokenRefresher&&t.tokenRefresher.isRunning()&&t.tokenRefresher.stop(),t.tokenObservers=r}function _d(n){let{app:e}=n,t=le(e),r=t.tokenRefresher;r||(r=ky(n),t.tokenRefresher=r),!r.isRunning()&&t.isTokenAutoRefreshEnabled&&r.start()}function ky(n){let{app:e}=n;return new Ia(async()=>{let t=le(e),r;if(t.token?r=await Ea(n,!0):r=await Ea(n),r.error)throw r.error;if(r.internalError)throw r.internalError},()=>!0,()=>{let t=le(e);if(t.token){let r=t.token.issuedAtTimeMillis+(t.token.expireTimeMillis-t.token.issuedAtTimeMillis)*.5+3e5,i=t.token.expireTimeMillis-5*60*1e3;return r=Math.min(r,i),Math.max(0,r-Date.now())}else return 0},md.RETRIAL_MIN_WAIT,md.RETRIAL_MAX_WAIT)}function Dd(n,e){let t=le(n).tokenObservers;for(let r of t)try{r.type==="EXTERNAL"&&e.error!=null?r.error(e.error):r.next(e)}catch{}}function An(n){return n.expireTimeMillis-Date.now()>0}function va(n){return{token:Py(Ry),error:n}}var Ta=class{constructor(e,t){this.app=e,this.heartbeatServiceProvider=t}_delete(){let{tokenObservers:e}=le(this.app);for(let t of e)kd(this.app,t.next);return Promise.resolve()}};function Dy(n,e){return new Ta(n,e)}function Ny(n){return{getToken:e=>Ea(n,e),getLimitedUseToken:()=>Cy(n),addTokenListener:e=>Cd(n,"INTERNAL",e),removeTokenListener:e=>kd(n.app,e)}}var Oy="@firebase/app-check",Vy="0.10.1";var xy="https://www.google.com/recaptcha/enterprise.js";function Ly(n,e){let t=new ut,r=le(n);r.reCAPTCHAState={initialized:t};let i=My(n),s=gd(!0);return s?yd(n,e,s,i,t):By(()=>{let a=gd(!0);if(!a)throw new Error("no recaptcha");yd(n,e,a,i,t)}),t.promise}function yd(n,e,t,r,i){t.ready(()=>{Uy(n,e,t,r),i.resolve(t)})}function My(n){let e=`fire_app_check_${n.name}`,t=document.createElement("div");return t.id=e,t.style.display="none",document.body.appendChild(t),e}async function Fy(n){Aa(n);let t=await le(n).reCAPTCHAState.initialized.promise;return new Promise((r,i)=>{let s=le(n).reCAPTCHAState;t.ready(()=>{r(t.execute(s.widgetId,{action:"fire_app_check"}))})})}function Uy(n,e,t,r){let i=t.render(r,{sitekey:e,size:"invisible",callback:()=>{le(n).reCAPTCHAState.succeeded=!0},"error-callback":()=>{le(n).reCAPTCHAState.succeeded=!1}}),s=le(n);s.reCAPTCHAState=Object.assign(Object.assign({},s.reCAPTCHAState),{widgetId:i})}function By(n){let e=document.createElement("script");e.src=xy,e.onload=n,document.head.appendChild(e)}var Ui=class n{constructor(e){this._siteKey=e,this._throttleData=null}async getToken(){var e,t,r;jy(this._throttleData);let i=await Fy(this._app).catch(a=>{throw ke.create("recaptcha-error")});if(!(!((e=le(this._app).reCAPTCHAState)===null||e===void 0)&&e.succeeded))throw ke.create("recaptcha-error");let s;try{s=await ba(_y(this._app,i),this._heartbeatServiceProvider)}catch(a){throw!((t=a.code)===null||t===void 0)&&t.includes("fetch-status-error")?(this._throttleData=qy(Number((r=a.customData)===null||r===void 0?void 0:r.httpStatus),this._throttleData),ke.create("initial-throttle",{time:Ed(this._throttleData.allowRequestsAfter-Date.now()),httpStatus:this._throttleData.httpStatus})):a}return this._throttleData=null,s}initialize(e){this._app=e,this._heartbeatServiceProvider=Pt(e,"heartbeat"),Ly(e,this._siteKey).catch(()=>{})}isEqual(e){return e instanceof n?this._siteKey===e._siteKey:!1}};function qy(n,e){if(n===404||n===403)return{backoffCount:1,allowRequestsAfter:Date.now()+py,httpStatus:n};{let t=e?e.backoffCount:0,r=ed(t,1e3,2);return{backoffCount:t+1,allowRequestsAfter:Date.now()+r,httpStatus:n}}}function jy(n){if(n&&Date.now()-n.allowRequestsAfter<=0)throw ke.create("throttled",{time:Ed(n.allowRequestsAfter-Date.now()),httpStatus:n.httpStatus})}function Nd(n=Tn(),e){n=X(n);let t=Pt(n,"app-check");if(Bi().initialized||Sy(),Sa()&&Ra().then(i=>console.log(`App Check debug token: ${i}. You will need to add it to your app's App Check settings in the Firebase console for it to work.`)),t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(s.isTokenAutoRefreshEnabled===e.isTokenAutoRefreshEnabled&&s.provider.isEqual(e.provider))return i;throw ke.create("already-initialized",{appName:n.name})}let r=t.initialize({options:e});return zy(n,e.provider,e.isTokenAutoRefreshEnabled),le(n).isTokenAutoRefreshEnabled&&Cd(r,"INTERNAL",()=>{}),r}function zy(n,e,t=!1){let r=hy(n,Object.assign({},wd));r.activated=!0,r.provider=e,r.cachedTokenPromise=Ay(n).then(i=>(i&&An(i)&&(r.token=i,Dd(n,{token:i.token})),i)),r.isTokenAutoRefreshEnabled=t&&n.automaticDataCollectionEnabled,!n.automaticDataCollectionEnabled&&t&&kt.warn("`isTokenAutoRefreshEnabled` is true but `automaticDataCollectionEnabled` was set to false during `initializeApp()`. This blocks automatic token refresh."),r.provider.initialize(n)}var $y="app-check",vd="app-check-internal";function Gy(){je(new Pe($y,n=>{let e=n.getProvider("app").getImmediate(),t=n.getProvider("heartbeat");return Dy(e,t)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((n,e,t)=>{n.getProvider(vd).initialize()})),je(new Pe(vd,n=>{let e=n.getProvider("app-check").getImmediate();return Ny(e)},"PUBLIC").setInstantiationMode("EXPLICIT")),Ve(Oy,Vy)}Gy();function qi(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Yd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Xd=Yd,Zd=new qe("auth","Firebase",Yd());var Hi=new Qe("@firebase/auth");function Ky(n,...e){Hi.logLevel<=z.WARN&&Hi.warn(`Auth (${Ct}): ${n}`,...e)}function zi(n,...e){Hi.logLevel<=z.ERROR&&Hi.error(`Auth (${Ct}): ${n}`,...e)}function Me(n,...e){throw Xa(n,...e)}function ze(n,...e){return Xa(n,...e)}function Ya(n,e,t){let r=Object.assign(Object.assign({},Xd()),{[e]:t});return new qe("auth","Firebase",r).create(e,{appName:n.name})}function dt(n){return Ya(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Wy(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Me(n,"argument-error"),Ya(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Xa(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Zd.create(n,...e)}function x(n,e,...t){if(!n)throw Xa(e,...t)}function Ye(n){let e="INTERNAL ASSERTION FAILED: "+n;throw zi(e),new Error(e)}function ft(n,e){n||Ye(e)}function Oa(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Hy(){return Od()==="http:"||Od()==="https:"}function Od(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function Qy(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Hy()||Wh()||"connection"in navigator)?navigator.onLine:!0}function Jy(){if(typeof navigator=="undefined")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Jt=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,ft(t>e,"Short delay should be less than long delay!"),this.isMobile=Gh()||Hh()}get(){return Qy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Za(n,e){ft(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Qi=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;Ye("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;Ye("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;Ye("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Yy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Xy=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Zy=new Jt(3e4,6e4);function se(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function pe(n,e,t,r,i={}){return ef(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});let u=wn(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);let d=Object.assign({method:e,headers:l},s);return Kh()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&St(n.emulatorConfig.host)&&(d.credentials="include"),Qi.fetch()(await tf(n,n.config.apiHost,t,u),d)})}async function ef(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},Yy),e);try{let i=new Va(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let a=await s.json();if("needConfirmation"in a)throw Pr(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{let u=s.ok?a.errorMessage:a.error.message,[l,d]=u.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Pr(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Pr(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Pr(n,"user-disabled",a);let p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw Ya(n,p,d);Me(n,p)}}catch(i){if(i instanceof Oe)throw i;Me(n,"network-request-failed",{message:String(i)})}}async function Ot(n,e,t,r,i={}){let s=await pe(n,e,t,r,i);return"mfaPendingCredential"in s&&Me(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function tf(n,e,t,r){let i=`${e}${t}?${r}`,s=n,a=s.config.emulator?Za(n.config,i):`${n.config.apiScheme}://${i}`;return Xy.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function ev(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var Va=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ze(this.auth,"network-request-failed")),Zy.get())})}};function Pr(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=ze(n,e,r);return i.customData._tokenResponse=t,i}function Vd(n){return n!==void 0&&n.enterprise!==void 0}var Ji=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return ev(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function nf(n,e){return pe(n,"GET","/v2/recaptchaConfig",se(n,e))}async function tv(n,e){return pe(n,"POST","/v1/accounts:delete",e)}async function Yi(n,e){return pe(n,"POST","/v1/accounts:lookup",e)}function Cr(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function rf(n,e=!1){let t=X(n),r=await t.getIdToken(e),i=ec(r);x(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Cr(Pa(i.auth_time)),issuedAtTime:Cr(Pa(i.iat)),expirationTime:Cr(Pa(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Pa(n){return Number(n)*1e3}function ec(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return zi("JWT malformed, contained fewer than 3 sections"),null;try{let i=Ci(t);return i?JSON.parse(i):(zi("Failed to decode base64 JWT payload"),null)}catch(i){return zi("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function xd(n){let e=ec(n);return x(e,"internal-error"),x(typeof e.exp!="undefined","internal-error"),x(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}async function Sn(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Oe&&nv(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function nv({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var xa=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Nr=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Cr(this.lastLoginAt),this.creationTime=Cr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Xi(n){var e;let t=n.auth,r=await n.getIdToken(),i=await Sn(n,Yi(t,{idToken:r}));x(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?of(s.providerUserInfo):[],u=rv(n.providerData,a),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!(u!=null&&u.length),p=l?d:!1,g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:u,metadata:new Nr(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,g)}async function sf(n){let e=X(n);await Xi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function rv(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function of(n){return n.map(e=>{var{providerId:t}=e,r=qi(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function iv(n,e){let t=await ef(n,{},async()=>{let r=wn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await tf(n,i,"/v1/token",`key=${s}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";let l={method:"POST",headers:u,body:r};return n.emulatorConfig&&St(n.emulatorConfig.host)&&(l.credentials="include"),Qi.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function sv(n,e){return pe(n,"POST","/v2/accounts:revokeToken",se(n,e))}var kr=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){x(e.idToken,"internal-error"),x(typeof e.idToken!="undefined","internal-error"),x(typeof e.refreshToken!="undefined","internal-error");let t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):xd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){x(e.length!==0,"internal-error");let t=xd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(x(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await iv(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new n;return r&&(x(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(x(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(x(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Ye("not implemented")}};function Dt(n,e){x(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}var Nt=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=qi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new xa(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Nr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Sn(this,this.stsTokenManager.getToken(this.auth,e));return x(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return rf(this,e)}reload(){return sf(this)}_assign(e){this!==e&&(x(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){x(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Xi(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ce(this.auth.app))return Promise.reject(dt(this.auth));let e=await this.getIdToken();return await Sn(this,tv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,u,l,d,p;let g=(r=t.displayName)!==null&&r!==void 0?r:void 0,v=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,P=(a=t.photoURL)!==null&&a!==void 0?a:void 0,N=(u=t.tenantId)!==null&&u!==void 0?u:void 0,k=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,$=(d=t.createdAt)!==null&&d!==void 0?d:void 0,F=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:q,emailVerified:J,isAnonymous:be,providerData:Q,stsTokenManager:I}=t;x(q&&I,e,"internal-error");let m=kr.fromJSON(this.name,I);x(typeof q=="string",e,"internal-error"),Dt(g,e.name),Dt(v,e.name),x(typeof J=="boolean",e,"internal-error"),x(typeof be=="boolean",e,"internal-error"),Dt(S,e.name),Dt(P,e.name),Dt(N,e.name),Dt(k,e.name),Dt($,e.name),Dt(F,e.name);let y=new n({uid:q,auth:e,email:v,emailVerified:J,displayName:g,isAnonymous:be,photoURL:P,phoneNumber:S,tenantId:N,stsTokenManager:m,createdAt:$,lastLoginAt:F});return Q&&Array.isArray(Q)&&(y.providerData=Q.map(w=>Object.assign({},w))),k&&(y._redirectEventId=k),y}static async _fromIdTokenResponse(e,t,r=!1){let i=new kr;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Xi(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];x(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?of(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),u=new kr;u.updateFromIdToken(r);let l=new n({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Nr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,d),l}};var Ld=new Map;function ht(n){ft(n instanceof Function,"Expected a class definition");let e=Ld.get(n);return e?(ft(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ld.set(n,e),e)}var Zi=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Zi.type="NONE";var La=Zi;function $i(n,e,t){return`firebase:${n}:${e}:${t}`}var es=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=$i(this.userKey,i.apiKey,s),this.fullPersistenceKey=$i("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await Yi(this.auth,{idToken:e}).catch(()=>{});return t?Nt._fromGetAccountInfoResponse(this.auth,t,e):null}return Nt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(ht(La),e,r);let i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d),s=i[0]||ht(La),a=$i(r,e.config.apiKey,e.name),u=null;for(let d of t)try{let p=await d._get(a);if(p){let g;if(typeof p=="string"){let v=await Yi(e,{idToken:p}).catch(()=>{});if(!v)break;g=await Nt._fromGetAccountInfoResponse(e,v,p)}else g=Nt._fromJSON(e,p);d!==s&&(u=g),s=d;break}}catch{}let l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new n(s,e,r):(s=l[0],u&&await s._set(a,u.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new n(s,e,r))}};function Md(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(lf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(af(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(df(e))return"Blackberry";if(ff(e))return"Webos";if(cf(e))return"Safari";if((e.includes("chrome/")||uf(e))&&!e.includes("edge/"))return"Chrome";if(hf(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function af(n=fe()){return/firefox\//i.test(n)}function cf(n=fe()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function uf(n=fe()){return/crios\//i.test(n)}function lf(n=fe()){return/iemobile/i.test(n)}function hf(n=fe()){return/android/i.test(n)}function df(n=fe()){return/blackberry/i.test(n)}function ff(n=fe()){return/webos/i.test(n)}function tc(n=fe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ov(n=fe()){var e;return tc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function av(){return Qh()&&document.documentMode===10}function pf(n=fe()){return tc(n)||hf(n)||ff(n)||df(n)||/windows phone/i.test(n)||lf(n)}function mf(n,e=[]){let t;switch(n){case"Browser":t=Md(fe());break;case"Worker":t=`${Md(fe())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Ct}/${r}`}var Ma=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((a,u)=>{try{let l=e(s);a(l)}catch(l){u(l)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}};async function cv(n,e={}){return pe(n,"GET","/v2/passwordPolicy",se(n,e))}var uv=6,Fa=class{constructor(e){var t,r,i,s;let a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:uv,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,u;let l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(u=l.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),l}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Ua=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ts(this),this.idTokenSubscription=new ts(this),this.beforeStateQueue=new Ma(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Zd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ht(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await es.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Yi(this,{idToken:e}),r=await Nt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Ce(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(u,u))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===u)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return x(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Xi(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Jy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ce(this.app))return Promise.reject(dt(this));let t=e?X(e):null;return t&&x(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&x(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ce(this.app)?Promise.reject(dt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ce(this.app)?Promise.reject(dt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ht(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await cv(this),t=new Fa(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new qe("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await sv(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ht(e)||this._popupRedirectResolver;x(t,this,"argument-error"),this.redirectPersistenceManager=await es.create(this,[ht(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),a=!1,u=this._isInitialized?Promise.resolve():this._initializationPromise;if(x(u,this,"internal-error"),u.then(()=>{a||s(this.currentUser)}),typeof t=="function"){let l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{let l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return x(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=mf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(Ce(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&Ky(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}};function $e(n){return X(n)}var ts=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Zh(t=>this.observer=t)}get next(){return x(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var vs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function lv(n){vs=n}function gf(n){return vs.loadJS(n)}function hv(){return vs.recaptchaEnterpriseScript}function dv(){return vs.gapiScript}function _f(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var Ba=class{constructor(){this.enterprise=new qa}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},qa=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var fv="recaptcha-enterprise",Dr="NO_RECAPTCHA",ns=class{constructor(e){this.type=fv,this.auth=$e(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,u)=>{nf(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{let d=new Ji(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(l=>{u(l)})})}function i(s,a,u){let l=window.grecaptcha;Vd(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(Dr)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Ba().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(u=>{if(!t&&Vd(window.grecaptcha))i(u,s,a);else{if(typeof window=="undefined"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=hv();l.length!==0&&(l+=u),gf(l).then(()=>{i(u,s,a)}).catch(d=>{a(d)})}}).catch(u=>{a(u)})})}};async function Rr(n,e,t,r=!1,i=!1){let s=new ns(n),a;if(i)a=Dr;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}let u=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){let l=u.phoneEnrollmentInfo.phoneNumber,d=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){let l=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:a}):Object.assign(u,{captchaResponse:a}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function Qt(n,e,t,r,i){var s,a;if(i==="EMAIL_PASSWORD_PROVIDER")if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let u=await Rr(n,e,t,t==="getOobCode");return r(n,u)}else return r(n,e).catch(async u=>{if(u.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let l=await Rr(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(u)});else if(i==="PHONE_PROVIDER")if(!((a=n._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("PHONE_PROVIDER")){let u=await Rr(n,e,t);return r(n,u).catch(async l=>{var d;if(((d=n._getRecaptchaConfig())===null||d===void 0?void 0:d.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let p=await Rr(n,e,t,!1,!0);return r(n,p)}return Promise.reject(l)})}else{let u=await Rr(n,e,t,!1,!0);return r(n,u)}else return Promise.reject(i+" provider is not supported.")}async function pv(n){let e=$e(n),t=await nf(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Ji(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new ns(e).verify()}function yf(n,e){let t=Pt(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(He(s,e!=null?e:{}))return i;Me(i,"already-initialized")}return t.initialize({options:e})}function mv(n,e){let t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ht);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function vf(n,e,t){let r=$e(n);x(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!(t!=null&&t.disableWarnings),s=wf(e),{host:a,port:u}=gv(e),l=u===null?"":`:${u}`,d={url:`${s}//${a}${l}/`},p=Object.freeze({host:a,port:u,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){x(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),x(He(d,r.config.emulator)&&He(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,St(a)?(Ni(`${s}//${a}${l}`),Oi("Auth",!0)):i||_v()}function wf(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function gv(n){let e=wf(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:Fd(r.substr(s.length+1))}}else{let[s,a]=r.split(":");return{host:s,port:Fd(a)}}}function Fd(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function _v(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Yt=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ye("not implemented")}_getIdTokenResponse(e){return Ye("not implemented")}_linkToIdToken(e,t){return Ye("not implemented")}_getReauthenticationResolver(e){return Ye("not implemented")}};async function yv(n,e){return pe(n,"POST","/v1/accounts:signUp",e)}async function vv(n,e){return Ot(n,"POST","/v1/accounts:signInWithPassword",se(n,e))}async function If(n,e){return pe(n,"POST","/v1/accounts:sendOobCode",se(n,e))}async function wv(n,e){return If(n,e)}async function Iv(n,e){return If(n,e)}async function Ev(n,e){return Ot(n,"POST","/v1/accounts:signInWithEmailLink",se(n,e))}async function Tv(n,e){return Ot(n,"POST","/v1/accounts:signInWithEmailLink",se(n,e))}var Or=class n extends Yt{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Qt(e,t,"signInWithPassword",vv,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Ev(e,{email:this._email,oobCode:this._password});default:Me(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Qt(e,r,"signUpPassword",yv,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Tv(e,{idToken:t,email:this._email,oobCode:this._password});default:Me(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function bn(n,e){return Ot(n,"POST","/v1/accounts:signInWithIdp",se(n,e))}var Av="http://localhost",Xt=class n extends Yt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Me("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=qi(t,["providerId","signInMethod"]);if(!r||!i)return null;let a=new n(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return bn(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,bn(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,bn(e,t)}buildRequest(){let e={requestUri:Av,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=wn(t)}return e}};async function Ud(n,e){return pe(n,"POST","/v1/accounts:sendVerificationCode",se(n,e))}async function bv(n,e){return Ot(n,"POST","/v1/accounts:signInWithPhoneNumber",se(n,e))}async function Sv(n,e){let t=await Ot(n,"POST","/v1/accounts:signInWithPhoneNumber",se(n,e));if(t.temporaryProof)throw Pr(n,"account-exists-with-different-credential",t);return t}var Rv={USER_NOT_FOUND:"user-not-found"};async function Pv(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Ot(n,"POST","/v1/accounts:signInWithPhoneNumber",se(n,t),Rv)}var Vr=class n extends Yt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return bv(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Sv(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Pv(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function Cv(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function kv(n){let e=In(En(n)).link,t=e?In(En(e)).deep_link_id:null,r=In(En(n)).deep_link_id;return(r?In(En(r)).link:null)||r||t||e||n}var rs=class n{constructor(e){var t,r,i,s,a,u;let l=In(En(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,g=Cv((i=l.mode)!==null&&i!==void 0?i:null);x(d&&p&&g,"argument-error"),this.apiKey=d,this.operation=g,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=l.lang)!==null&&a!==void 0?a:null,this.tenantId=(u=l.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){let t=kv(e);try{return new n(t)}catch{return null}}};var Zt=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Or._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=rs.parseLink(t);return x(r,"argument-error"),Or._fromEmailAndCode(e,r.code,r.tenantId)}};Zt.PROVIDER_ID="password";Zt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Zt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var xr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var en=class extends xr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Lr=class n extends en{constructor(){super("facebook.com")}static credential(e){return Xt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Lr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Lr.PROVIDER_ID="facebook.com";var tn=class n extends en{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Xt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};tn.GOOGLE_SIGN_IN_METHOD="google.com";tn.PROVIDER_ID="google.com";var Mr=class n extends en{constructor(){super("github.com")}static credential(e){return Xt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Mr.GITHUB_SIGN_IN_METHOD="github.com";Mr.PROVIDER_ID="github.com";var Fr=class n extends en{constructor(){super("twitter.com")}static credential(e,t){return Xt._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Fr.TWITTER_SIGN_IN_METHOD="twitter.com";Fr.PROVIDER_ID="twitter.com";async function Dv(n,e){return Ot(n,"POST","/v1/accounts:signUp",se(n,e))}var Rn=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await Nt._fromIdTokenResponse(e,r,i),a=Bd(r);return new n({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=Bd(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function Bd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var ja=class n extends Oe{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function Ef(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ja._fromErrorAndOperation(n,s,e,r):s})}async function Nv(n,e,t=!1){let r=await Sn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Rn._forOperation(n,"link",r)}async function Ov(n,e,t=!1){let{auth:r}=n;if(Ce(r.app))return Promise.reject(dt(r));let i="reauthenticate";try{let s=await Sn(n,Ef(r,i,e,n),t);x(s.idToken,r,"internal-error");let a=ec(s.idToken);x(a,r,"internal-error");let{sub:u}=a;return x(n.uid===u,r,"user-mismatch"),Rn._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Me(r,"user-mismatch"),s}}async function Tf(n,e,t=!1){if(Ce(n.app))return Promise.reject(dt(n));let r="signIn",i=await Ef(n,r,e),s=await Rn._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Af(n,e){return Tf($e(n),e)}function bf(n,e,t){var r;x(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),x(typeof t.dynamicLinkDomain=="undefined"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),x(typeof t.linkDomain=="undefined"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(x(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(x(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}async function Sf(n){let e=$e(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function nc(n,e,t){let r=$e(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&bf(r,i,t),await Qt(r,i,"getOobCode",Iv,"EMAIL_PASSWORD_PROVIDER")}async function rc(n,e,t){if(Ce(n.app))return Promise.reject(dt(n));let r=$e(n),a=await Qt(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Dv,"EMAIL_PASSWORD_PROVIDER").catch(l=>{throw l.code==="auth/password-does-not-meet-requirements"&&Sf(n),l}),u=await Rn._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(u.user),u}function ic(n,e,t){return Ce(n.app)?Promise.reject(dt(n)):Af(X(n),Zt.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Sf(n),r})}async function ws(n,e){let t=X(n),i={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&bf(t.auth,i,e);let{email:s}=await wv(t.auth,i);s!==n.email&&await n.reload()}async function Vv(n,e){return pe(n,"POST","/v1/accounts:update",e)}async function sc(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;let r=X(n),s={idToken:await r.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await Sn(r,Vv(r.auth,s));r.displayName=a.displayName||null,r.photoURL=a.photoUrl||null;let u=r.providerData.find(({providerId:l})=>l==="password");u&&(u.displayName=r.displayName,u.photoURL=r.photoURL),await r._updateTokensIfNecessary(a)}function Is(n,e,t,r){return X(n).onIdTokenChanged(e,t,r)}function Rf(n,e,t){return X(n).beforeAuthStateChanged(e,t)}function oc(n,e,t,r){return X(n).onAuthStateChanged(e,t,r)}function ac(n){return X(n).signOut()}async function cc(n){return X(n).delete()}function qd(n,e){return pe(n,"POST","/v2/accounts/mfaEnrollment:start",se(n,e))}function xv(n,e){return pe(n,"POST","/v2/accounts/mfaEnrollment:finalize",se(n,e))}function Lv(n,e){return pe(n,"POST","/v2/accounts/mfaEnrollment:start",se(n,e))}function Mv(n,e){return pe(n,"POST","/v2/accounts/mfaEnrollment:finalize",se(n,e))}var is="__sak";var ss=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(is,"1"),this.storage.removeItem(is),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Fv=1e3,Uv=10,os=class extends ss{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=pf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,l)=>{this.notifyListeners(a,l)});return}let r=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);av()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Uv):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Fv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};os.type="LOCAL";var Pf=os;var Bv=1e3;function Ca(n){var e,t;let r=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),i=RegExp(`${r}=([^;]+)`);return(t=(e=document.cookie.match(i))===null||e===void 0?void 0:e[1])!==null&&t!==void 0?t:null}function ka(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var za=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){var e;return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator=="undefined"||typeof document=="undefined"?!1:(e=navigator.cookieEnabled)!==null&&e!==void 0?e:!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=ka(e);if(window.cookieStore){let r=await window.cookieStore.get(t);return r==null?void 0:r.value}return Ca(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=ka(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=ka(e);if(window.cookieStore){let u=d=>{let p=d.changed.find(v=>v.name===r);p&&t(p.value),d.deleted.find(v=>v.name===r)&&t(null)},l=()=>window.cookieStore.removeEventListener("change",u);return this.listenerUnsubscribes.set(t,l),window.cookieStore.addEventListener("change",u)}let i=Ca(r),s=setInterval(()=>{let u=Ca(r);u!==i&&(t(u),i=u)},Bv),a=()=>clearInterval(s);this.listenerUnsubscribes.set(t,a)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};za.type="COOKIE";var as=class extends ss{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};as.type="SESSION";var uc=as;function qv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var cs=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let u=Array.from(a).map(async d=>d(t.origin,s)),l=await qv(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};cs.receivers=[];function lc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var $a=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((u,l)=>{let d=lc("",20);i.port1.start();let p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(g){let v=g;if(v.data.eventId===d)switch(v.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),u(v.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function Xe(){return window}function jv(n){Xe().location.href=n}function Cf(){return typeof Xe().WorkerGlobalScope!="undefined"&&typeof Xe().importScripts=="function"}async function zv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function $v(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Gv(){return Cf()?self:null}var kf="firebaseLocalStorageDb",Kv=1,us="firebaseLocalStorage",Df="fbase_key",nn=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Es(n,e){return n.transaction([us],e?"readwrite":"readonly").objectStore(us)}function Wv(){let n=indexedDB.deleteDatabase(kf);return new nn(n).toPromise()}function Ga(){let n=indexedDB.open(kf,Kv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(us,{keyPath:Df})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(us)?e(r):(r.close(),await Wv(),e(await Ga()))})})}async function jd(n,e,t){let r=Es(n,!0).put({[Df]:e,value:t});return new nn(r).toPromise()}async function Hv(n,e){let t=Es(n,!1).get(e),r=await new nn(t).toPromise();return r===void 0?null:r.value}function zd(n,e){let t=Es(n,!0).delete(e);return new nn(t).toPromise()}var Qv=800,Jv=3,ls=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ga(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>Jv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Cf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=cs._getInstance(Gv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await zv(),!this.activeServiceWorker)return;this.sender=new $a(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||$v()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Ga();return await jd(e,is,"1"),await zd(e,is),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>jd(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>Hv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>zd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Es(i,!1).getAll();return new nn(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Qv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};ls.type="LOCAL";var Nf=ls;function $d(n,e){return pe(n,"POST","/v2/accounts/mfaSignIn:start",se(n,e))}function Yv(n,e){return pe(n,"POST","/v2/accounts/mfaSignIn:finalize",se(n,e))}function Xv(n,e){return pe(n,"POST","/v2/accounts/mfaSignIn:finalize",se(n,e))}var UT=_f("rcb"),BT=new Jt(3e4,6e4);var Gi="recaptcha";async function Zv(n,e,t){var r;if(!n._getRecaptchaConfig())try{await pv(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){let s=i.session;if("phoneNumber"in i){x(s.type==="enroll",n,"internal-error");let a={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Qt(n,a,"mfaSmsEnrollment",async(p,g)=>{if(g.phoneEnrollmentInfo.captchaResponse===Dr){x((t==null?void 0:t.type)===Gi,p,"argument-error");let v=await Da(p,g,t);return qd(p,v)}return qd(p,g)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneSessionInfo.sessionInfo}else{x(s.type==="signin",n,"internal-error");let a=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;x(a,n,"missing-multi-factor-info");let u={mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Qt(n,u,"mfaSmsSignIn",async(g,v)=>{if(v.phoneSignInInfo.captchaResponse===Dr){x((t==null?void 0:t.type)===Gi,g,"argument-error");let S=await Da(g,v,t);return $d(g,S)}return $d(g,v)},"PHONE_PROVIDER").catch(g=>Promise.reject(g))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Qt(n,s,"sendVerificationCode",async(d,p)=>{if(p.captchaResponse===Dr){x((t==null?void 0:t.type)===Gi,d,"argument-error");let g=await Da(d,p,t);return Ud(d,g)}return Ud(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).sessionInfo}}finally{t==null||t._reset()}}async function Da(n,e,t){x(t.type===Gi,n,"argument-error");let r=await t.verify();x(typeof r=="string",n,"argument-error");let i=Object.assign({},e);if("phoneEnrollmentInfo"in i){let s=i.phoneEnrollmentInfo.phoneNumber,a=i.phoneEnrollmentInfo.captchaResponse,u=i.phoneEnrollmentInfo.clientType,l=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:a,clientType:u,recaptchaVersion:l}}),i}else if("phoneSignInInfo"in i){let s=i.phoneSignInInfo.captchaResponse,a=i.phoneSignInInfo.clientType,u=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:a,recaptchaVersion:u}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var Ur=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=$e(e)}verifyPhoneNumber(e,t){return Zv(this.auth,e,X(t))}static credential(e,t){return Vr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Vr._fromTokenResponse(t,r):null}};Ur.PROVIDER_ID="phone";Ur.PHONE_SIGN_IN_METHOD="phone";function Of(n,e){return e?ht(e):(x(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Br=class extends Yt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return bn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return bn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return bn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function ew(n){return Tf(n.auth,new Br(n),n.bypassAuthState)}function tw(n){let{auth:e,user:t}=n;return x(t,e,"internal-error"),Ov(t,new Br(n),n.bypassAuthState)}async function nw(n){let{auth:e,user:t}=n;return x(t,e,"internal-error"),Nv(t,new Br(n),n.bypassAuthState)}var hs=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:u}=e;if(a){this.reject(a);return}let l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ew;case"linkViaPopup":case"linkViaRedirect":return nw;case"reauthViaPopup":case"reauthViaRedirect":return tw;default:Me(this.auth,"internal-error")}}resolve(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var rw=new Jt(2e3,1e4);async function hc(n,e,t){if(Ce(n.app))return Promise.reject(ze(n,"operation-not-supported-in-this-environment"));let r=$e(n);Wy(n,e,xr);let i=Of(r,t);return new ds(r,"signInViaPopup",e,i).executeNotNull()}var ds=class n extends hs{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return x(e,this.auth,"internal-error"),e}async onExecution(){ft(this.filter.length===1,"Popup operations only handle one event");let e=lc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ze(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ze(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ze(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,rw.get())};e()}};ds.currentPopupAction=null;var iw="pendingRedirect",Ki=new Map,Ka=class extends hs{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ki.get(this.auth._key());if(!e){try{let r=await sw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ki.set(this.auth._key(),e)}return this.bypassAuthState||Ki.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function sw(n,e){let t=cw(e),r=aw(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function ow(n,e){Ki.set(n._key(),e)}function aw(n){return ht(n._redirectPersistence)}function cw(n){return $i(iw,n.config.apiKey,n.name)}async function uw(n,e,t=!1){if(Ce(n.app))return Promise.reject(dt(n));let r=$e(n),i=Of(r,e),a=await new Ka(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var lw=10*60*1e3,Wa=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!hw(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Vf(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(ze(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=lw&&this.cachedEventUids.clear(),this.cachedEventUids.has(Gd(e))}saveEventToCache(e){this.cachedEventUids.add(Gd(e)),this.lastProcessedEventTime=Date.now()}};function Gd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Vf({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function hw(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Vf(n);default:return!1}}async function dw(n,e={}){return pe(n,"GET","/v1/projects",e)}var fw=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,pw=/^https?/;async function mw(n){if(n.config.emulator)return;let{authorizedDomains:e}=await dw(n);for(let t of e)try{if(gw(t))return}catch{}Me(n,"unauthorized-domain")}function gw(n){let e=Oa(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!pw.test(t))return!1;if(fw.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var _w=new Jt(3e4,6e4);function Kd(){let n=Xe().___jsl;if(n!=null&&n.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function yw(n){return new Promise((e,t)=>{var r,i,s;function a(){Kd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Kd(),t(ze(n,"network-request-failed"))},timeout:_w.get()})}if(!((i=(r=Xe().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Xe().gapi)===null||s===void 0)&&s.load)a();else{let u=_f("iframefcb");return Xe()[u]=()=>{gapi.load?a():t(ze(n,"network-request-failed"))},gf(`${dv()}?onload=${u}`).catch(l=>t(l))}}).catch(e=>{throw Wi=null,e})}var Wi=null;function vw(n){return Wi=Wi||yw(n),Wi}var ww=new Jt(5e3,15e3),Iw="__/auth/iframe",Ew="emulator/auth/iframe",Tw={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Aw=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function bw(n){let e=n.config;x(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Za(e,Ew):`https://${n.config.authDomain}/${Iw}`,r={apiKey:e.apiKey,appName:n.name,v:Ct},i=Aw.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${wn(r).slice(1)}`}async function Sw(n){let e=await vw(n),t=Xe().gapi;return x(t,n,"internal-error"),e.open({where:document.body,url:bw(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Tw,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let a=ze(n,"network-request-failed"),u=Xe().setTimeout(()=>{s(a)},ww.get());function l(){Xe().clearTimeout(u),i(r)}r.ping(l).then(l,()=>{s(a)})}))}var Rw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Pw=500,Cw=600,kw="_blank",Dw="http://localhost",fs=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function Nw(n,e,t,r=Pw,i=Cw){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),u="",l=Object.assign(Object.assign({},Rw),{width:r.toString(),height:i.toString(),top:s,left:a}),d=fe().toLowerCase();t&&(u=uf(d)?kw:t),af(d)&&(e=e||Dw,l.scrollbars="yes");let p=Object.entries(l).reduce((v,[S,P])=>`${v}${S}=${P},`,"");if(ov(d)&&u!=="_self")return Ow(e||"",u),new fs(null);let g=window.open(e||"",u,p);x(g,n,"popup-blocked");try{g.focus()}catch{}return new fs(g)}function Ow(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var Vw="__/auth/handler",xw="emulator/auth/handler",Lw=encodeURIComponent("fac");async function Wd(n,e,t,r,i,s){x(n.config.authDomain,n,"auth-domain-config-required"),x(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Ct,eventId:i};if(e instanceof xr){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Xh(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[p,g]of Object.entries(s||{}))a[p]=g}if(e instanceof en){let p=e.getScopes().filter(g=>g!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);let u=a;for(let p of Object.keys(u))u[p]===void 0&&delete u[p];let l=await n._getAppCheckToken(),d=l?`#${Lw}=${encodeURIComponent(l)}`:"";return`${Mw(n)}?${wn(u).slice(1)}${d}`}function Mw({config:n}){return n.emulator?Za(n,xw):`https://${n.authDomain}/${Vw}`}var Na="webStorageSupport",Ha=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=uc,this._completeRedirectFn=uw,this._overrideRedirectResult=ow}async _openPopup(e,t,r,i){var s;ft((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let a=await Wd(e,t,r,Oa(),i);return Nw(e,a,lc())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await Wd(e,t,r,Oa(),i);return jv(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(ft(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await Sw(e),r=new Wa(e);return t.register("authEvent",i=>(x(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Na,{type:Na},i=>{var s;let a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Na];a!==void 0&&t(!!a),Me(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=mw(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return pf()||cf()||tc()}},xf=Ha,ps=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Ye("unexpected MultiFactorSessionType")}}},Qa=class n extends ps{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return xv(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Yv(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},ms=class{constructor(){}static assertion(e){return Qa._fromCredential(e)}};ms.FACTOR_ID="phone";var gs=class{static assertionForEnrollment(e,t){return _s._fromSecret(e,t)}static assertionForSignIn(e,t){return _s._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;x(typeof((t=r.user)===null||t===void 0?void 0:t.auth)!="undefined","internal-error");let i=await Lv(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return ys._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};gs.FACTOR_ID="totp";var _s=class n extends ps{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return x(typeof this.secret!="undefined",e,"argument-error"),Mv(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){x(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return Xv(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},ys=class n{constructor(e,t,r,i,s,a,u){this.sessionInfo=a,this.auth=u,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(ji(e)||ji(t))&&(i=!0),i&&(ji(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),ji(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function ji(n){return typeof n=="undefined"||(n==null?void 0:n.length)===0}var Hd="@firebase/auth",Qd="1.10.8";var Ja=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){x(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Fw(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Uw(n){je(new Pe("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;x(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:mf(n)},d=new Ua(r,i,s,l);return mv(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),je(new Pe("auth-internal",e=>{let t=$e(e.getProvider("auth").getImmediate());return(r=>new Ja(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ve(Hd,Qd,Fw(n)),Ve(Hd,Qd,"esm2017")}var Bw=5*60,qw=na("authIdTokenMaxAge")||Bw,Jd=null,jw=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>qw)return;let i=t==null?void 0:t.token;Jd!==i&&(Jd=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function dc(n=Tn()){let e=Pt(n,"auth");if(e.isInitialized())return e.getImmediate();let t=yf(n,{popupRedirectResolver:xf,persistence:[Nf,Pf,uc]}),r=na("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let a=jw(s.toString());Rf(t,a,()=>a(t.currentUser)),Is(t,u=>a(u))}}let i=ea("auth");return i&&vf(t,`http://${i}`),t}function zw(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}lv({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=ze("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",zw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Uw("Browser");var Lf=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Mf={};var pt,fc;(function(){var n;function e(I,m){function y(){}y.prototype=m.prototype,I.D=m.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(w,E,A){for(var _=Array(arguments.length-2),ot=2;ot<arguments.length;ot++)_[ot-2]=arguments[ot];return m.prototype[E].apply(w,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,m,y){y||(y=0);var w=Array(16);if(typeof m=="string")for(var E=0;16>E;++E)w[E]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(E=0;16>E;++E)w[E]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=I.g[0],y=I.g[1],E=I.g[2];var A=I.g[3],_=m+(A^y&(E^A))+w[0]+3614090360&4294967295;m=y+(_<<7&4294967295|_>>>25),_=A+(E^m&(y^E))+w[1]+3905402710&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(y^A&(m^y))+w[2]+606105819&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(m^E&(A^m))+w[3]+3250441966&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(A^y&(E^A))+w[4]+4118548399&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(E^m&(y^E))+w[5]+1200080426&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(y^A&(m^y))+w[6]+2821735955&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(m^E&(A^m))+w[7]+4249261313&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(A^y&(E^A))+w[8]+1770035416&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(E^m&(y^E))+w[9]+2336552879&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(y^A&(m^y))+w[10]+4294925233&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(m^E&(A^m))+w[11]+2304563134&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(A^y&(E^A))+w[12]+1804603682&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(E^m&(y^E))+w[13]+4254626195&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(y^A&(m^y))+w[14]+2792965006&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(m^E&(A^m))+w[15]+1236535329&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(E^A&(y^E))+w[1]+4129170786&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(m^y))+w[6]+3225465664&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(A^m))+w[11]+643717713&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(E^A))+w[0]+3921069994&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(E^A&(y^E))+w[5]+3593408605&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(m^y))+w[10]+38016083&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(A^m))+w[15]+3634488961&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(E^A))+w[4]+3889429448&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(E^A&(y^E))+w[9]+568446438&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(m^y))+w[14]+3275163606&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(A^m))+w[3]+4107603335&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(E^A))+w[8]+1163531501&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(E^A&(y^E))+w[13]+2850285829&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(m^y))+w[2]+4243563512&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(A^m))+w[7]+1735328473&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(E^A))+w[12]+2368359562&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(y^E^A)+w[5]+4294588738&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^E)+w[8]+2272392833&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^y)+w[11]+1839030562&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^m)+w[14]+4259657740&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(y^E^A)+w[1]+2763975236&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^E)+w[4]+1272893353&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^y)+w[7]+4139469664&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^m)+w[10]+3200236656&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(y^E^A)+w[13]+681279174&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^E)+w[0]+3936430074&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^y)+w[3]+3572445317&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^m)+w[6]+76029189&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(y^E^A)+w[9]+3654602809&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^E)+w[12]+3873151461&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^y)+w[15]+530742520&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^m)+w[2]+3299628645&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(E^(y|~A))+w[0]+4096336452&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~E))+w[7]+1126891415&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~y))+w[14]+2878612391&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~m))+w[5]+4237533241&4294967295,y=E+(_<<21&4294967295|_>>>11),_=m+(E^(y|~A))+w[12]+1700485571&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~E))+w[3]+2399980690&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~y))+w[10]+4293915773&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~m))+w[1]+2240044497&4294967295,y=E+(_<<21&4294967295|_>>>11),_=m+(E^(y|~A))+w[8]+1873313359&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~E))+w[15]+4264355552&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~y))+w[6]+2734768916&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~m))+w[13]+1309151649&4294967295,y=E+(_<<21&4294967295|_>>>11),_=m+(E^(y|~A))+w[4]+4149444226&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~E))+w[11]+3174756917&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~y))+w[2]+718787259&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~m))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+A&4294967295}r.prototype.u=function(I,m){m===void 0&&(m=I.length);for(var y=m-this.blockSize,w=this.B,E=this.h,A=0;A<m;){if(E==0)for(;A<=y;)i(this,I,A),A+=this.blockSize;if(typeof I=="string"){for(;A<m;)if(w[E++]=I.charCodeAt(A++),E==this.blockSize){i(this,w),E=0;break}}else for(;A<m;)if(w[E++]=I[A++],E==this.blockSize){i(this,w),E=0;break}}this.h=E,this.o+=m},r.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;var y=8*this.o;for(m=I.length-8;m<I.length;++m)I[m]=y&255,y/=256;for(this.u(I),I=Array(16),m=y=0;4>m;++m)for(var w=0;32>w;w+=8)I[y++]=this.g[m]>>>w&255;return I};function s(I,m){var y=u;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=m(I)}function a(I,m){this.h=m;for(var y=[],w=!0,E=I.length-1;0<=E;E--){var A=I[E]|0;w&&A==m||(y[E]=A,w=!1)}this.g=y}var u={};function l(I){return-128<=I&&128>I?s(I,function(m){return new a([m|0],0>m?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return g;if(0>I)return k(d(-I));for(var m=[],y=1,w=0;I>=y;w++)m[w]=I/y|0,y*=4294967296;return new a(m,0)}function p(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return k(p(I.substring(1),m));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(m,8)),w=g,E=0;E<I.length;E+=8){var A=Math.min(8,I.length-E),_=parseInt(I.substring(E,E+A),m);8>A?(A=d(Math.pow(m,A)),w=w.j(A).add(d(_))):(w=w.j(y),w=w.add(d(_)))}return w}var g=l(0),v=l(1),S=l(16777216);n=a.prototype,n.m=function(){if(N(this))return-k(this).m();for(var I=0,m=1,y=0;y<this.g.length;y++){var w=this.i(y);I+=(0<=w?w:4294967296+w)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(P(this))return"0";if(N(this))return"-"+k(this).toString(I);for(var m=d(Math.pow(I,6)),y=this,w="";;){var E=J(y,m).g;y=$(y,E.j(m));var A=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=E,P(y))return A+w;for(;6>A.length;)A="0"+A;w=A+w}},n.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function P(I){if(I.h!=0)return!1;for(var m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function N(I){return I.h==-1}n.l=function(I){return I=$(this,I),N(I)?-1:P(I)?0:1};function k(I){for(var m=I.g.length,y=[],w=0;w<m;w++)y[w]=~I.g[w];return new a(y,~I.h).add(v)}n.abs=function(){return N(this)?k(this):this},n.add=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0,E=0;E<=m;E++){var A=w+(this.i(E)&65535)+(I.i(E)&65535),_=(A>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);w=_>>>16,A&=65535,_&=65535,y[E]=_<<16|A}return new a(y,y[y.length-1]&-2147483648?-1:0)};function $(I,m){return I.add(k(m))}n.j=function(I){if(P(this)||P(I))return g;if(N(this))return N(I)?k(this).j(k(I)):k(k(this).j(I));if(N(I))return k(this.j(k(I)));if(0>this.l(S)&&0>I.l(S))return d(this.m()*I.m());for(var m=this.g.length+I.g.length,y=[],w=0;w<2*m;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var E=0;E<I.g.length;E++){var A=this.i(w)>>>16,_=this.i(w)&65535,ot=I.i(E)>>>16,ir=I.i(E)&65535;y[2*w+2*E]+=_*ir,F(y,2*w+2*E),y[2*w+2*E+1]+=A*ir,F(y,2*w+2*E+1),y[2*w+2*E+1]+=_*ot,F(y,2*w+2*E+1),y[2*w+2*E+2]+=A*ot,F(y,2*w+2*E+2)}for(w=0;w<m;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=m;w<2*m;w++)y[w]=0;return new a(y,0)};function F(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function q(I,m){this.g=I,this.h=m}function J(I,m){if(P(m))throw Error("division by zero");if(P(I))return new q(g,g);if(N(I))return m=J(k(I),m),new q(k(m.g),k(m.h));if(N(m))return m=J(I,k(m)),new q(k(m.g),m.h);if(30<I.g.length){if(N(I)||N(m))throw Error("slowDivide_ only works with positive integers.");for(var y=v,w=m;0>=w.l(I);)y=be(y),w=be(w);var E=Q(y,1),A=Q(w,1);for(w=Q(w,2),y=Q(y,2);!P(w);){var _=A.add(w);0>=_.l(I)&&(E=E.add(y),A=_),w=Q(w,1),y=Q(y,1)}return m=$(I,E.j(m)),new q(E,m)}for(E=g;0<=I.l(m);){for(y=Math.max(1,Math.floor(I.m()/m.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),A=d(y),_=A.j(m);N(_)||0<_.l(I);)y-=w,A=d(y),_=A.j(m);P(A)&&(A=v),E=E.add(A),I=$(I,_)}return new q(E,I)}n.A=function(I){return J(this,I).h},n.and=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)&I.i(w);return new a(y,this.h&I.h)},n.or=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)|I.i(w);return new a(y,this.h|I.h)},n.xor=function(I){for(var m=Math.max(this.g.length,I.g.length),y=[],w=0;w<m;w++)y[w]=this.i(w)^I.i(w);return new a(y,this.h^I.h)};function be(I){for(var m=I.g.length+1,y=[],w=0;w<m;w++)y[w]=I.i(w)<<1|I.i(w-1)>>>31;return new a(y,I.h)}function Q(I,m){var y=m>>5;m%=32;for(var w=I.g.length-y,E=[],A=0;A<w;A++)E[A]=0<m?I.i(A+y)>>>m|I.i(A+y+1)<<32-m:I.i(A+y);return new a(E,I.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,fc=Mf.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,pt=Mf.Integer=a}).apply(typeof Lf!="undefined"?Lf:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Ts=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},mt={};var pc,$w,Pn,mc,qr,As,gc,_c,yc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,h){return o==Array.prototype||o==Object.prototype||(o[c]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ts=="object"&&Ts];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,c){if(c)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var T=o[f];if(!(T in h))break e;h=h[T]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&e(h,o,{configurable:!0,writable:!0,value:c})}}function s(o,c){o instanceof String&&(o+="");var h=0,f=!1,T={next:function(){if(!f&&h<o.length){var b=h++;return{value:c(b,o[b]),done:!1}}return f=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(o){return o||function(){return s(this,function(c,h){return h})}});var a=a||{},u=this||self;function l(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function d(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function p(o,c,h){return o.call.apply(o.bind,arguments)}function g(o,c,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,f),o.apply(c,T)}}return function(){return o.apply(c,arguments)}}function v(o,c,h){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:g,v.apply(null,arguments)}function S(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function P(o,c){function h(){}h.prototype=c.prototype,o.aa=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,T,b){for(var D=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)D[Y-2]=arguments[Y];return c.prototype[T].apply(f,D)}}function N(o){let c=o.length;if(0<c){let h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function k(o,c){for(let h=1;h<arguments.length;h++){let f=arguments[h];if(l(f)){let T=o.length||0,b=f.length||0;o.length=T+b;for(let D=0;D<b;D++)o[T+D]=f[D]}else o.push(f)}}class ${constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function F(o){return/^[\s\xa0]*$/.test(o)}function q(){var o=u.navigator;return o&&(o=o.userAgent)?o:""}function J(o){return J[" "](o),o}J[" "]=function(){};var be=q().indexOf("Gecko")!=-1&&!(q().toLowerCase().indexOf("webkit")!=-1&&q().indexOf("Edge")==-1)&&!(q().indexOf("Trident")!=-1||q().indexOf("MSIE")!=-1)&&q().indexOf("Edge")==-1;function Q(o,c,h){for(let f in o)c.call(h,o[f],f,o)}function I(o,c){for(let h in o)c.call(void 0,o[h],h,o)}function m(o){let c={};for(let h in o)c[h]=o[h];return c}let y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(o,c){let h,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(h in f)o[h]=f[h];for(let b=0;b<y.length;b++)h=y[b],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function E(o){var c=1;o=o.split(":");let h=[];for(;0<c&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function A(o){u.setTimeout(()=>{throw o},0)}function _(){var o=So;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class ot{constructor(){this.h=this.g=null}add(c,h){let f=ir.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var ir=new $(()=>new hg,o=>o.reset());class hg{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let sr,or=!1,So=new ot,Fl=()=>{let o=u.Promise.resolve(void 0);sr=()=>{o.then(dg)}};var dg=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(h){A(h)}var c=ir;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}or=!1};function Et(){this.s=this.s,this.C=this.C}Et.prototype.s=!1,Et.prototype.ma=function(){this.s||(this.s=!0,this.N())},Et.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ye(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}ye.prototype.h=function(){this.defaultPrevented=!0};var fg=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let h=()=>{};u.addEventListener("test",h,c),u.removeEventListener("test",h,c)}catch{}return o}();function ar(o,c){if(ye.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(be){e:{try{J(c.nodeName);var T=!0;break e}catch{}T=!1}T||(c=null)}}else h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:pg[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&ar.aa.h.call(this)}}P(ar,ye);var pg={2:"touch",3:"pen",4:"mouse"};ar.prototype.h=function(){ar.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var cr="closure_listenable_"+(1e6*Math.random()|0),mg=0;function gg(o,c,h,f,T){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=T,this.key=++mg,this.da=this.fa=!1}function hi(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function di(o){this.src=o,this.g={},this.h=0}di.prototype.add=function(o,c,h,f,T){var b=o.toString();o=this.g[b],o||(o=this.g[b]=[],this.h++);var D=Po(o,c,f,T);return-1<D?(c=o[D],h||(c.fa=!1)):(c=new gg(c,this.src,b,!!f,T),c.fa=h,o.push(c)),c};function Ro(o,c){var h=c.type;if(h in o.g){var f=o.g[h],T=Array.prototype.indexOf.call(f,c,void 0),b;(b=0<=T)&&Array.prototype.splice.call(f,T,1),b&&(hi(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Po(o,c,h,f){for(var T=0;T<o.length;++T){var b=o[T];if(!b.da&&b.listener==c&&b.capture==!!h&&b.ha==f)return T}return-1}var Co="closure_lm_"+(1e6*Math.random()|0),ko={};function Ul(o,c,h,f,T){if(f&&f.once)return ql(o,c,h,f,T);if(Array.isArray(c)){for(var b=0;b<c.length;b++)Ul(o,c[b],h,f,T);return null}return h=Vo(h),o&&o[cr]?o.K(c,h,d(f)?!!f.capture:!!f,T):Bl(o,c,h,!1,f,T)}function Bl(o,c,h,f,T,b){if(!c)throw Error("Invalid event type");var D=d(T)?!!T.capture:!!T,Y=No(o);if(Y||(o[Co]=Y=new di(o)),h=Y.add(c,h,f,D,b),h.proxy)return h;if(f=_g(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)fg||(T=D),T===void 0&&(T=!1),o.addEventListener(c.toString(),f,T);else if(o.attachEvent)o.attachEvent(zl(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function _g(){function o(h){return c.call(o.src,o.listener,h)}let c=yg;return o}function ql(o,c,h,f,T){if(Array.isArray(c)){for(var b=0;b<c.length;b++)ql(o,c[b],h,f,T);return null}return h=Vo(h),o&&o[cr]?o.L(c,h,d(f)?!!f.capture:!!f,T):Bl(o,c,h,!0,f,T)}function jl(o,c,h,f,T){if(Array.isArray(c))for(var b=0;b<c.length;b++)jl(o,c[b],h,f,T);else f=d(f)?!!f.capture:!!f,h=Vo(h),o&&o[cr]?(o=o.i,c=String(c).toString(),c in o.g&&(b=o.g[c],h=Po(b,h,f,T),-1<h&&(hi(b[h]),Array.prototype.splice.call(b,h,1),b.length==0&&(delete o.g[c],o.h--)))):o&&(o=No(o))&&(c=o.g[c.toString()],o=-1,c&&(o=Po(c,h,f,T)),(h=-1<o?c[o]:null)&&Do(h))}function Do(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[cr])Ro(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(zl(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=No(c))?(Ro(h,o),h.h==0&&(h.src=null,c[Co]=null)):hi(o)}}}function zl(o){return o in ko?ko[o]:ko[o]="on"+o}function yg(o,c){if(o.da)o=!0;else{c=new ar(c,this);var h=o.listener,f=o.ha||o.src;o.fa&&Do(o),o=h.call(f,c)}return o}function No(o){return o=o[Co],o instanceof di?o:null}var Oo="__closure_events_fn_"+(1e9*Math.random()>>>0);function Vo(o){return typeof o=="function"?o:(o[Oo]||(o[Oo]=function(c){return o.handleEvent(c)}),o[Oo])}function ve(){Et.call(this),this.i=new di(this),this.M=this,this.F=null}P(ve,Et),ve.prototype[cr]=!0,ve.prototype.removeEventListener=function(o,c,h,f){jl(this,o,c,h,f)};function Se(o,c){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new ye(c,o);else if(c instanceof ye)c.target=c.target||o;else{var T=c;c=new ye(f,o),w(c,T)}if(T=!0,h)for(var b=h.length-1;0<=b;b--){var D=c.g=h[b];T=fi(D,f,!0,c)&&T}if(D=c.g=o,T=fi(D,f,!0,c)&&T,T=fi(D,f,!1,c)&&T,h)for(b=0;b<h.length;b++)D=c.g=h[b],T=fi(D,f,!1,c)&&T}ve.prototype.N=function(){if(ve.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var h=o.g[c],f=0;f<h.length;f++)hi(h[f]);delete o.g[c],o.h--}}this.F=null},ve.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},ve.prototype.L=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function fi(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var T=!0,b=0;b<c.length;++b){var D=c[b];if(D&&!D.da&&D.capture==h){var Y=D.listener,_e=D.ha||D.src;D.fa&&Ro(o.i,D),T=Y.call(_e,f)!==!1&&T}}return T&&!f.defaultPrevented}function $l(o,c,h){if(typeof o=="function")h&&(o=v(o,h));else if(o&&typeof o.handleEvent=="function")o=v(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(o,c||0)}function Gl(o){o.g=$l(()=>{o.g=null,o.i&&(o.i=!1,Gl(o))},o.l);let c=o.h;o.h=null,o.m.apply(null,c)}class vg extends Et{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Gl(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ur(o){Et.call(this),this.h=o,this.g={}}P(ur,Et);var Kl=[];function Wl(o){Q(o.g,function(c,h){this.g.hasOwnProperty(h)&&Do(c)},o),o.g={}}ur.prototype.N=function(){ur.aa.N.call(this),Wl(this)},ur.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var xo=u.JSON.stringify,wg=u.JSON.parse,Ig=class{stringify(o){return u.JSON.stringify(o,void 0)}parse(o){return u.JSON.parse(o,void 0)}};function Lo(){}Lo.prototype.h=null;function Hl(o){return o.h||(o.h=o.i())}function Ql(){}var lr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Mo(){ye.call(this,"d")}P(Mo,ye);function Fo(){ye.call(this,"c")}P(Fo,ye);var $t={},Jl=null;function pi(){return Jl=Jl||new ve}$t.La="serverreachability";function Yl(o){ye.call(this,$t.La,o)}P(Yl,ye);function hr(o){let c=pi();Se(c,new Yl(c))}$t.STAT_EVENT="statevent";function Xl(o,c){ye.call(this,$t.STAT_EVENT,o),this.stat=c}P(Xl,ye);function Re(o){let c=pi();Se(c,new Xl(c,o))}$t.Ma="timingevent";function Zl(o,c){ye.call(this,$t.Ma,o),this.size=c}P(Zl,ye);function dr(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){o()},c)}function fr(){this.g=!0}fr.prototype.xa=function(){this.g=!1};function Eg(o,c,h,f,T,b){o.info(function(){if(o.g)if(b)for(var D="",Y=b.split("&"),_e=0;_e<Y.length;_e++){var W=Y[_e].split("=");if(1<W.length){var we=W[0];W=W[1];var Ie=we.split("_");D=2<=Ie.length&&Ie[1]=="type"?D+(we+"="+W+"&"):D+(we+"=redacted&")}}else D=null;else D=b;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+c+`
`+h+`
`+D})}function Tg(o,c,h,f,T,b,D){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+c+`
`+h+`
`+b+" "+D})}function mn(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+bg(o,h)+(f?" "+f:"")})}function Ag(o,c){o.info(function(){return"TIMEOUT: "+c})}fr.prototype.info=function(){};function bg(o,c){if(!o.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var T=f[1];if(Array.isArray(T)&&!(1>T.length)){var b=T[0];if(b!="noop"&&b!="stop"&&b!="close")for(var D=1;D<T.length;D++)T[D]=""}}}}return xo(h)}catch{return c}}var mi={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},eh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Uo;function gi(){}P(gi,Lo),gi.prototype.g=function(){return new XMLHttpRequest},gi.prototype.i=function(){return{}},Uo=new gi;function Tt(o,c,h,f){this.j=o,this.i=c,this.l=h,this.R=f||1,this.U=new ur(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new th}function th(){this.i=null,this.g="",this.h=!1}var nh={},Bo={};function qo(o,c,h){o.L=1,o.v=wi(at(c)),o.m=h,o.P=!0,rh(o,null)}function rh(o,c){o.F=Date.now(),_i(o),o.A=at(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),_h(h.i,"t",f),o.C=0,h=o.j.J,o.h=new th,o.g=xh(o.j,h?c:null,!o.m),0<o.O&&(o.M=new vg(v(o.Y,o,o.g),o.O)),c=o.U,h=o.g,f=o.ca;var T="readystatechange";Array.isArray(T)||(T&&(Kl[0]=T.toString()),T=Kl);for(var b=0;b<T.length;b++){var D=Ul(h,T[b],f||c.handleEvent,!1,c.h||c);if(!D)break;c.g[D.key]=D}c=o.H?m(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),hr(),Eg(o.i,o.u,o.A,o.l,o.R,o.m)}Tt.prototype.ca=function(o){o=o.target;let c=this.M;c&&ct(o)==3?c.j():this.Y(o)},Tt.prototype.Y=function(o){try{if(o==this.g)e:{let Ie=ct(this.g);var c=this.g.Ba();let yn=this.g.Z();if(!(3>Ie)&&(Ie!=3||this.g&&(this.h.h||this.g.oa()||Ah(this.g)))){this.J||Ie!=4||c==7||(c==8||0>=yn?hr(3):hr(2)),jo(this);var h=this.g.Z();this.X=h;t:if(ih(this)){var f=Ah(this.g);o="";var T=f.length,b=ct(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Gt(this),pr(this);var D="";break t}this.h.i=new u.TextDecoder}for(c=0;c<T;c++)this.h.h=!0,o+=this.h.i.decode(f[c],{stream:!(b&&c==T-1)});f.length=0,this.h.g+=o,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=h==200,Tg(this.i,this.u,this.A,this.l,this.R,Ie,h),this.o){if(this.T&&!this.K){t:{if(this.g){var Y,_e=this.g;if((Y=_e.g?_e.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(Y)){var W=Y;break t}}W=null}if(h=W)mn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,zo(this,h);else{this.o=!1,this.s=3,Re(12),Gt(this),pr(this);break e}}if(this.P){h=!0;let Be;for(;!this.J&&this.C<D.length;)if(Be=Sg(this,D),Be==Bo){Ie==4&&(this.s=4,Re(14),h=!1),mn(this.i,this.l,null,"[Incomplete Response]");break}else if(Be==nh){this.s=4,Re(15),mn(this.i,this.l,D,"[Invalid Chunk]"),h=!1;break}else mn(this.i,this.l,Be,null),zo(this,Be);if(ih(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ie!=4||D.length!=0||this.h.h||(this.s=1,Re(16),h=!1),this.o=this.o&&h,!h)mn(this.i,this.l,D,"[Invalid Chunked Response]"),Gt(this),pr(this);else if(0<D.length&&!this.W){this.W=!0;var we=this.j;we.g==this&&we.ba&&!we.M&&(we.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Qo(we),we.M=!0,Re(11))}}else mn(this.i,this.l,D,null),zo(this,D);Ie==4&&Gt(this),this.o&&!this.J&&(Ie==4?Dh(this.j,this):(this.o=!1,_i(this)))}else zg(this.g),h==400&&0<D.indexOf("Unknown SID")?(this.s=3,Re(12)):(this.s=0,Re(13)),Gt(this),pr(this)}}}catch{}finally{}};function ih(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Sg(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?Bo:(h=Number(c.substring(h,f)),isNaN(h)?nh:(f+=1,f+h>c.length?Bo:(c=c.slice(f,f+h),o.C=f+h,c)))}Tt.prototype.cancel=function(){this.J=!0,Gt(this)};function _i(o){o.S=Date.now()+o.I,sh(o,o.I)}function sh(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=dr(v(o.ba,o),c)}function jo(o){o.B&&(u.clearTimeout(o.B),o.B=null)}Tt.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?(Ag(this.i,this.A),this.L!=2&&(hr(),Re(17)),Gt(this),this.s=2,pr(this)):sh(this,this.S-o)};function pr(o){o.j.G==0||o.J||Dh(o.j,o)}function Gt(o){jo(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Wl(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function zo(o,c){try{var h=o.j;if(h.G!=0&&(h.g==o||$o(h.h,o))){if(!o.K&&$o(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)bi(h),Ti(h);else break e;Ho(h),Re(18)}}else h.za=T[1],0<h.za-h.T&&37500>T[2]&&h.F&&h.v==0&&!h.C&&(h.C=dr(v(h.Za,h),6e3));if(1>=ch(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Wt(h,11)}else if((o.K||h.g==o)&&bi(h),!F(c))for(T=h.Da.g.parse(c),c=0;c<T.length;c++){let W=T[c];if(h.T=W[0],W=W[1],h.G==2)if(W[0]=="c"){h.K=W[1],h.ia=W[2];let we=W[3];we!=null&&(h.la=we,h.j.info("VER="+h.la));let Ie=W[4];Ie!=null&&(h.Aa=Ie,h.j.info("SVER="+h.Aa));let yn=W[5];yn!=null&&typeof yn=="number"&&0<yn&&(f=1.5*yn,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;let Be=o.g;if(Be){let Ri=Be.g?Be.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ri){var b=f.h;b.g||Ri.indexOf("spdy")==-1&&Ri.indexOf("quic")==-1&&Ri.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Go(b,b.h),b.h=null))}if(f.D){let Jo=Be.g?Be.g.getResponseHeader("X-HTTP-Session-Id"):null;Jo&&(f.ya=Jo,Z(f.I,f.D,Jo))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var D=o;if(f.qa=Vh(f,f.J?f.ia:null,f.W),D.K){uh(f.h,D);var Y=D,_e=f.L;_e&&(Y.I=_e),Y.B&&(jo(Y),_i(Y)),f.g=D}else Ch(f);0<h.i.length&&Ai(h)}else W[0]!="stop"&&W[0]!="close"||Wt(h,7);else h.G==3&&(W[0]=="stop"||W[0]=="close"?W[0]=="stop"?Wt(h,7):Wo(h):W[0]!="noop"&&h.l&&h.l.ta(W),h.v=0)}}hr(4)}catch{}}var Rg=class{constructor(o,c){this.g=o,this.map=c}};function oh(o){this.l=o||10,u.PerformanceNavigationTiming?(o=u.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ah(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function ch(o){return o.h?1:o.g?o.g.size:0}function $o(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function Go(o,c){o.g?o.g.add(c):o.h=c}function uh(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}oh.prototype.cancel=function(){if(this.i=lh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function lh(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(let h of o.g.values())c=c.concat(h.D);return c}return N(o.i)}function Pg(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map!="undefined"&&o instanceof Map||typeof Set!="undefined"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var c=[],h=o.length,f=0;f<h;f++)c.push(o[f]);return c}c=[],h=0;for(f in o)c[h++]=o[f];return c}function Cg(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map!="undefined"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set!="undefined"&&o instanceof Set)){if(l(o)||typeof o=="string"){var c=[];o=o.length;for(var h=0;h<o;h++)c.push(h);return c}c=[],h=0;for(let f in o)c[h++]=f;return c}}}function hh(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var h=Cg(o),f=Pg(o),T=f.length,b=0;b<T;b++)c.call(void 0,f[b],h&&h[b],o)}var dh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function kg(o,c){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),T=null;if(0<=f){var b=o[h].substring(0,f);T=o[h].substring(f+1)}else b=o[h];c(b,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Kt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Kt){this.h=o.h,yi(this,o.j),this.o=o.o,this.g=o.g,vi(this,o.s),this.l=o.l;var c=o.i,h=new _r;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),fh(this,h),this.m=o.m}else o&&(c=String(o).match(dh))?(this.h=!1,yi(this,c[1]||"",!0),this.o=mr(c[2]||""),this.g=mr(c[3]||"",!0),vi(this,c[4]),this.l=mr(c[5]||"",!0),fh(this,c[6]||"",!0),this.m=mr(c[7]||"")):(this.h=!1,this.i=new _r(null,this.h))}Kt.prototype.toString=function(){var o=[],c=this.j;c&&o.push(gr(c,ph,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(gr(c,ph,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(gr(h,h.charAt(0)=="/"?Og:Ng,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",gr(h,xg)),o.join("")};function at(o){return new Kt(o)}function yi(o,c,h){o.j=h?mr(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function vi(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function fh(o,c,h){c instanceof _r?(o.i=c,Lg(o.i,o.h)):(h||(c=gr(c,Vg)),o.i=new _r(c,o.h))}function Z(o,c,h){o.i.set(c,h)}function wi(o){return Z(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function mr(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function gr(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,Dg),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Dg(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var ph=/[#\/\?@]/g,Ng=/[#\?:]/g,Og=/[#\?]/g,Vg=/[#\?@]/g,xg=/#/g;function _r(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function At(o){o.g||(o.g=new Map,o.h=0,o.i&&kg(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}n=_r.prototype,n.add=function(o,c){At(this),this.i=null,o=gn(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function mh(o,c){At(o),c=gn(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function gh(o,c){return At(o),c=gn(o,c),o.g.has(c)}n.forEach=function(o,c){At(this),this.g.forEach(function(h,f){h.forEach(function(T){o.call(c,T,f,this)},this)},this)},n.na=function(){At(this);let o=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let f=0;f<c.length;f++){let T=o[f];for(let b=0;b<T.length;b++)h.push(c[f])}return h},n.V=function(o){At(this);let c=[];if(typeof o=="string")gh(this,o)&&(c=c.concat(this.g.get(gn(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)c=c.concat(o[h])}return c},n.set=function(o,c){return At(this),this.i=null,o=gn(this,o),gh(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},n.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function _h(o,c,h){mh(o,c),0<h.length&&(o.i=null,o.g.set(gn(o,c),N(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var f=c[h];let b=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var T=b;D[f]!==""&&(T+="="+encodeURIComponent(String(D[f]))),o.push(T)}}return this.i=o.join("&")};function gn(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function Lg(o,c){c&&!o.j&&(At(o),o.i=null,o.g.forEach(function(h,f){var T=f.toLowerCase();f!=T&&(mh(this,f),_h(this,T,h))},o)),o.j=c}function Mg(o,c){let h=new fr;if(u.Image){let f=new Image;f.onload=S(bt,h,"TestLoadImage: loaded",!0,c,f),f.onerror=S(bt,h,"TestLoadImage: error",!1,c,f),f.onabort=S(bt,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=S(bt,h,"TestLoadImage: timeout",!1,c,f),u.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function Fg(o,c){let h=new fr,f=new AbortController,T=setTimeout(()=>{f.abort(),bt(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(b=>{clearTimeout(T),b.ok?bt(h,"TestPingServer: ok",!0,c):bt(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(T),bt(h,"TestPingServer: error",!1,c)})}function bt(o,c,h,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(h)}catch{}}function Ug(){this.g=new Ig}function Bg(o,c,h){let f=h||"";try{hh(o,function(T,b){let D=T;d(T)&&(D=xo(T)),c.push(f+b+"="+encodeURIComponent(D))})}catch(T){throw c.push(f+"type="+encodeURIComponent("_badmap")),T}}function yr(o){this.l=o.Ub||null,this.j=o.eb||!1}P(yr,Lo),yr.prototype.g=function(){return new Ii(this.l,this.j)},yr.prototype.i=function(o){return function(){return o}}({});function Ii(o,c){ve.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(Ii,ve),n=Ii.prototype,n.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,wr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,vr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,wr(this)),this.g&&(this.readyState=3,wr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream!="undefined"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;yh(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function yh(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?vr(this):wr(this),this.readyState==3&&yh(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,vr(this))},n.Qa=function(o){this.g&&(this.response=o,vr(this))},n.ga=function(){this.g&&vr(this)};function vr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,wr(o)}n.setRequestHeader=function(o,c){this.u.append(o,c)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function wr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Ii.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function vh(o){let c="";return Q(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function Ko(o,c,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=vh(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):Z(o,c,h))}function re(o){ve.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(re,ve);var qg=/^https?$/i,jg=["POST","PUT"];n=re.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Uo.g(),this.v=this.o?Hl(this.o):Hl(Uo),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(b){wh(this,b);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)h.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(let b of f.keys())h.set(b,f.get(b));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(b=>b.toLowerCase()=="content-type"),T=u.FormData&&o instanceof u.FormData,!(0<=Array.prototype.indexOf.call(jg,c,void 0))||f||T||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[b,D]of h)this.g.setRequestHeader(b,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Th(this),this.u=!0,this.g.send(o),this.u=!1}catch(b){wh(this,b)}};function wh(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,Ih(o),Ei(o)}function Ih(o){o.A||(o.A=!0,Se(o,"complete"),Se(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Se(this,"complete"),Se(this,"abort"),Ei(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Ei(this,!0)),re.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Eh(this):this.bb())},n.bb=function(){Eh(this)};function Eh(o){if(o.h&&typeof a!="undefined"&&(!o.v[1]||ct(o)!=4||o.Z()!=2)){if(o.u&&ct(o)==4)$l(o.Ea,0,o);else if(Se(o,"readystatechange"),ct(o)==4){o.h=!1;try{let D=o.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var h;if(!(h=c)){var f;if(f=D===0){var T=String(o.D).match(dh)[1]||null;!T&&u.self&&u.self.location&&(T=u.self.location.protocol.slice(0,-1)),f=!qg.test(T?T.toLowerCase():"")}h=f}if(h)Se(o,"complete"),Se(o,"success");else{o.m=6;try{var b=2<ct(o)?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.Z()+"]",Ih(o)}}finally{Ei(o)}}}}function Ei(o,c){if(o.g){Th(o);let h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||Se(o,"ready");try{h.onreadystatechange=f}catch{}}}function Th(o){o.I&&(u.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function ct(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<ct(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),wg(c)}};function Ah(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function zg(o){let c={};o=(o.g&&2<=ct(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(F(o[f]))continue;var h=E(o[f]);let T=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let b=c[T]||[];c[T]=b,b.push(h)}I(c,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ir(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function bh(o){this.Aa=0,this.i=[],this.j=new fr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ir("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ir("baseRetryDelayMs",5e3,o),this.cb=Ir("retryDelaySeedMs",1e4,o),this.Wa=Ir("forwardChannelMaxRetries",2,o),this.wa=Ir("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new oh(o&&o.concurrentRequestLimit),this.Da=new Ug,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=bh.prototype,n.la=8,n.G=1,n.connect=function(o,c,h,f){Re(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=Vh(this,null,this.W),Ai(this)};function Wo(o){if(Sh(o),o.G==3){var c=o.U++,h=at(o.I);if(Z(h,"SID",o.K),Z(h,"RID",c),Z(h,"TYPE","terminate"),Er(o,h),c=new Tt(o,o.j,c),c.L=2,c.v=wi(at(h)),h=!1,u.navigator&&u.navigator.sendBeacon)try{h=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&u.Image&&(new Image().src=c.v,h=!0),h||(c.g=xh(c.j,null),c.g.ea(c.v)),c.F=Date.now(),_i(c)}Oh(o)}function Ti(o){o.g&&(Qo(o),o.g.cancel(),o.g=null)}function Sh(o){Ti(o),o.u&&(u.clearTimeout(o.u),o.u=null),bi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&u.clearTimeout(o.s),o.s=null)}function Ai(o){if(!ah(o.h)&&!o.s){o.s=!0;var c=o.Ga;sr||Fl(),or||(sr(),or=!0),So.add(c,o),o.B=0}}function $g(o,c){return ch(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=dr(v(o.Ga,o,c),Nh(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let T=new Tt(this,this.j,o),b=this.o;if(this.S&&(b?(b=m(b),w(b,this.S)):b=this.S),this.m!==null||this.O||(T.H=b,b=null),this.P)e:{for(var c=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=h;break e}if(c===4096||h===this.i.length-1){c=h+1;break e}}c=1e3}else c=1e3;c=Ph(this,T,c),h=at(this.I),Z(h,"RID",o),Z(h,"CVER",22),this.D&&Z(h,"X-HTTP-Session-Id",this.D),Er(this,h),b&&(this.O?c="headers="+encodeURIComponent(String(vh(b)))+"&"+c:this.m&&Ko(h,this.m,b)),Go(this.h,T),this.Ua&&Z(h,"TYPE","init"),this.P?(Z(h,"$req",c),Z(h,"SID","null"),T.T=!0,qo(T,h,null)):qo(T,h,c),this.G=2}}else this.G==3&&(o?Rh(this,o):this.i.length==0||ah(this.h)||Rh(this))};function Rh(o,c){var h;c?h=c.l:h=o.U++;let f=at(o.I);Z(f,"SID",o.K),Z(f,"RID",h),Z(f,"AID",o.T),Er(o,f),o.m&&o.o&&Ko(f,o.m,o.o),h=new Tt(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),c&&(o.i=c.D.concat(o.i)),c=Ph(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Go(o.h,h),qo(h,f,c)}function Er(o,c){o.H&&Q(o.H,function(h,f){Z(c,f,h)}),o.l&&hh({},function(h,f){Z(c,f,h)})}function Ph(o,c,h){h=Math.min(o.i.length,h);var f=o.l?v(o.l.Na,o.l,o):null;e:{var T=o.i;let b=-1;for(;;){let D=["count="+h];b==-1?0<h?(b=T[0].g,D.push("ofs="+b)):b=0:D.push("ofs="+b);let Y=!0;for(let _e=0;_e<h;_e++){let W=T[_e].g,we=T[_e].map;if(W-=b,0>W)b=Math.max(0,T[_e].g-100),Y=!1;else try{Bg(we,D,"req"+W+"_")}catch{f&&f(we)}}if(Y){f=D.join("&");break e}}}return o=o.i.splice(0,h),c.D=o,f}function Ch(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;sr||Fl(),or||(sr(),or=!0),So.add(c,o),o.v=0}}function Ho(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=dr(v(o.Fa,o),Nh(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,kh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=dr(v(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Re(10),Ti(this),kh(this))};function Qo(o){o.A!=null&&(u.clearTimeout(o.A),o.A=null)}function kh(o){o.g=new Tt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=at(o.qa);Z(c,"RID","rpc"),Z(c,"SID",o.K),Z(c,"AID",o.T),Z(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&Z(c,"TO",o.ja),Z(c,"TYPE","xmlhttp"),Er(o,c),o.m&&o.o&&Ko(c,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=wi(at(c)),h.m=null,h.P=!0,rh(h,o)}n.Za=function(){this.C!=null&&(this.C=null,Ti(this),Ho(this),Re(19))};function bi(o){o.C!=null&&(u.clearTimeout(o.C),o.C=null)}function Dh(o,c){var h=null;if(o.g==c){bi(o),Qo(o),o.g=null;var f=2}else if($o(o.h,c))h=c.D,uh(o.h,c),f=1;else return;if(o.G!=0){if(c.o)if(f==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var T=o.B;f=pi(),Se(f,new Zl(f,h)),Ai(o)}else Ch(o);else if(T=c.s,T==3||T==0&&0<c.X||!(f==1&&$g(o,c)||f==2&&Ho(o)))switch(h&&0<h.length&&(c=o.h,c.i=c.i.concat(h)),T){case 1:Wt(o,5);break;case 4:Wt(o,10);break;case 3:Wt(o,6);break;default:Wt(o,2)}}}function Nh(o,c){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*c}function Wt(o,c){if(o.j.info("Error code "+c),c==2){var h=v(o.fb,o),f=o.Xa;let T=!f;f=new Kt(f||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||yi(f,"https"),wi(f),T?Mg(f.toString(),h):Fg(f.toString(),h)}else Re(2);o.G=0,o.l&&o.l.sa(c),Oh(o),Sh(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Re(2)):(this.j.info("Failed to ping google.com"),Re(1))};function Oh(o){if(o.G=0,o.ka=[],o.l){let c=lh(o.h);(c.length!=0||o.i.length!=0)&&(k(o.ka,c),k(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function Vh(o,c,h){var f=h instanceof Kt?at(h):new Kt(h);if(f.g!="")c&&(f.g=c+"."+f.g),vi(f,f.s);else{var T=u.location;f=T.protocol,c=c?c+"."+T.hostname:T.hostname,T=+T.port;var b=new Kt(null);f&&yi(b,f),c&&(b.g=c),T&&vi(b,T),h&&(b.l=h),f=b}return h=o.D,c=o.ya,h&&c&&Z(f,h,c),Z(f,"VER",o.la),Er(o,f),f}function xh(o,c,h){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new re(new yr({eb:h})):new re(o.pa),c.Ha(o.J),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Lh(){}n=Lh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Si(){}Si.prototype.g=function(o,c){return new Ne(o,c)};function Ne(o,c){ve.call(this),this.g=new bh(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!F(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!F(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new _n(this)}P(Ne,ve),Ne.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ne.prototype.close=function(){Wo(this.g)},Ne.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=xo(o),o=h);c.i.push(new Rg(c.Ya++,o)),c.G==3&&Ai(c)},Ne.prototype.N=function(){this.g.l=null,delete this.j,Wo(this.g),delete this.g,Ne.aa.N.call(this)};function Mh(o){Mo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){e:{for(let h in c){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}P(Mh,Mo);function Fh(){Fo.call(this),this.status=1}P(Fh,Fo);function _n(o){this.g=o}P(_n,Lh),_n.prototype.ua=function(){Se(this.g,"a")},_n.prototype.ta=function(o){Se(this.g,new Mh(o))},_n.prototype.sa=function(o){Se(this.g,new Fh)},_n.prototype.ra=function(){Se(this.g,"b")},Si.prototype.createWebChannel=Si.prototype.g,Ne.prototype.send=Ne.prototype.o,Ne.prototype.open=Ne.prototype.m,Ne.prototype.close=Ne.prototype.close,yc=mt.createWebChannelTransport=function(){return new Si},_c=mt.getStatEventTarget=function(){return pi()},gc=mt.Event=$t,As=mt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},mi.NO_ERROR=0,mi.TIMEOUT=8,mi.HTTP_ERROR=6,qr=mt.ErrorCode=mi,eh.COMPLETE="complete",mc=mt.EventType=eh,Ql.EventType=lr,lr.OPEN="a",lr.CLOSE="b",lr.ERROR="c",lr.MESSAGE="d",ve.prototype.listen=ve.prototype.K,Pn=mt.WebChannel=Ql,$w=mt.FetchXmlHttpFactory=yr,re.prototype.listenOnce=re.prototype.L,re.prototype.getLastError=re.prototype.Ka,re.prototype.getLastErrorCode=re.prototype.Ba,re.prototype.getStatus=re.prototype.Z,re.prototype.getResponseJson=re.prototype.Oa,re.prototype.getResponseText=re.prototype.oa,re.prototype.send=re.prototype.ea,re.prototype.setWithCredentials=re.prototype.Ha,pc=mt.XhrIo=re}).apply(typeof Ts!="undefined"?Ts:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Ff="@firebase/firestore",Uf="4.8.0";var me=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};me.UNAUTHENTICATED=new me(null),me.GOOGLE_CREDENTIALS=new me("google-credentials-uid"),me.FIRST_PARTY=new me("first-party-uid"),me.MOCK_USER=new me("mock-user");var er="11.10.0";var cn=new Qe("@firebase/firestore");function Cn(){return cn.logLevel}function O(n,...e){if(cn.logLevel<=z.DEBUG){let t=e.map(sl);cn.debug(`Firestore (${er}): ${n}`,...t)}}function gt(n,...e){if(cn.logLevel<=z.ERROR){let t=e.map(sl);cn.error(`Firestore (${er}): ${n}`,...t)}}function Ft(n,...e){if(cn.logLevel<=z.WARN){let t=e.map(sl);cn.warn(`Firestore (${er}): ${n}`,...t)}}function sl(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function M(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Rp(n,r,t)}function Rp(n,e,t){let r=`FIRESTORE (${er}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw gt(r),new Error(r)}function H(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Rp(e,i,r)}function U(n,e){return n}var R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},V=class extends Oe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var Ge=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Ds=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},Ac=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(me.UNAUTHENTICATED))}shutdown(){}},bc=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},Sc=class{constructor(e){this.t=e,this.currentUser=me.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){H(this.o===void 0,42304);let r=this.i,i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve(),s=new Ge;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Ge,e.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},u=l=>{O("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>u(l)),setTimeout(()=>{if(!this.auth){let l=this.t.getImmediate({optional:!0});l?u(l):(O("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Ge)}},0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(O("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(H(typeof r.accessToken=="string",31837,{l:r}),new Ds(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return H(e===null||typeof e=="string",2055,{h:e}),new me(e)}},Rc=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=me.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},Pc=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Rc(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(me.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Ns=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Cc=class{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ce(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){H(this.o===void 0,3512);let r=s=>{s.error!=null&&O("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let a=s.token!==this.m;return this.m=s.token,O("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{O("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.V.getImmediate({optional:!0});s?i(s):O("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ns(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(H(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Ns(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function Gw(n){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}function Pp(){return new TextEncoder}var Wr=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=Gw(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}};function j(n,e){return n<e?-1:n>e?1:0}function kc(n,e){let t=0;for(;t<n.length&&t<e.length;){let r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return j(r,i);{let s=Pp(),a=Kw(s.encode(Bf(n,t)),s.encode(Bf(e,t)));return a!==0?a:j(r,i)}}t+=r>65535?2:1}return j(n.length,e.length)}function Bf(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function Kw(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return j(n[t],e[t]);return j(n.length,e.length)}function Mn(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var qf="__name__",Os=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&M(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&M(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=n.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return j(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),i=n.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?n.extractNumericId(e).compare(n.extractNumericId(t)):kc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return pt.fromString(e.substring(4,e.length-2))}},te=class n extends Os{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new V(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},Ww=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Le=class n extends Os{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return Ww.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===qf}static keyField(){return new n([qf])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new V(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},a=!1;for(;i<e.length;){let u=e[i];if(u==="\\"){if(i+1===e.length)throw new V(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new V(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else u==="`"?(a=!a,i++):u!=="."||a?(r+=u,i++):(s(),i++)}if(s(),a)throw new V(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var L=class n{constructor(e){this.path=e}static fromPath(e){return new n(te.fromString(e))}static fromName(e){return new n(te.fromString(e).popFirst(5))}static empty(){return new n(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new te(e.slice()))}};function Cp(n,e,t){if(!t)throw new V(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Hw(n,e,t,r){if(e===!0&&r===!0)throw new V(R.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function jf(n){if(!L.isDocumentKey(n))throw new V(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function zf(n){if(L.isDocumentKey(n))throw new V(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function kp(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function ol(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function _t(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new V(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=ol(n);throw new V(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function ce(n,e){let t={typeString:n};return e&&(t.value=e),t}function ii(n,e){if(!kp(n))throw new V(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}let a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new V(R.INVALID_ARGUMENT,t);return!0}var $f=-62135596800,Gf=1e6,ue=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Gf);return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<$f)throw new V(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Gf}_compareTo(e){return this.seconds===e.seconds?j(this.nanoseconds,e.nanoseconds):j(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ii(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-$f;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};ue._jsonSchemaVersion="firestore/timestamp/1.0",ue._jsonSchema={type:ce("string",ue._jsonSchemaVersion),seconds:ce("number"),nanoseconds:ce("number")};var B=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new ue(0,0))}static max(){return new n(new ue(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var Hr=-1,Dc=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};Dc.UNKNOWN_ID=-1;function Qw(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=B.fromTimestamp(r===1e9?new ue(t+1,0):new ue(t,r));return new un(i,L.empty(),e)}function Jw(n){return new un(n.readTime,n.key,Hr)}var un=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(B.min(),L.empty(),Hr)}static max(){return new n(B.max(),L.empty(),Hr)}};function Yw(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:j(n.largestBatchId,e.largestBatchId))}var Xw="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Nc=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function tr(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==Xw)throw n;O("LocalStore","Unexpectedly lost primary lease")}var C=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,a=!1;e.forEach(u=>{++i,u.next(()=>{++s,a&&s===i&&t()},l=>r(l))}),a=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,a=new Array(s),u=0;for(let l=0;l<s;l++){let d=l;t(e[d]).next(p=>{a[d]=p,++u,u===s&&r(a)},p=>i(p))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function Zw(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function nr(n){return n.name==="IndexedDbTransactionError"}var Fn=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ae&&this.ae(e),e}};Fn.ue=-1;var al=-1;function fo(n){return n==null}function Qr(n){return n===0&&1/n==-1/0}function eI(n){return typeof n=="number"&&Number.isInteger(n)&&!Qr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var Dp="";function tI(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=Kf(e)),e=nI(n.get(t),e);return Kf(e)}function nI(n,e){let t=e,r=n.length;for(let i=0;i<r;i++){let s=n.charAt(i);switch(s){case"\0":t+="";break;case Dp:t+="";break;default:t+=s}}return t}function Kf(n){return n+Dp+""}var rI="remoteDocuments",Np="owner";var Op="mutationQueues";var Vp="mutations";var xp="documentMutations",iI="remoteDocumentsV14";var Lp="remoteDocumentGlobal";var Mp="targets";var Fp="targetDocuments";var Up="targetGlobal",Bp="collectionParents";var qp="clientMetadata";var jp="bundles";var zp="namedQueries";var sI="indexConfiguration";var oI="indexState";var aI="indexEntries";var $p="documentOverlays";var cI="globals";var uI=[Op,Vp,xp,rI,Mp,Np,Up,Fp,qp,Lp,Bp,jp,zp],nb=[...uI,$p],lI=[Op,Vp,xp,iI,Mp,Np,Up,Fp,qp,Lp,Bp,jp,zp,$p],hI=lI,dI=[...hI,sI,oI,aI];var rb=[...dI,cI];function Wf(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function zt(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Gp(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var ie=class n{constructor(e,t){this.comparator=e,this.root=t||Ze.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ze.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ze.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new On(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new On(this.root,e,this.comparator,!1)}getReverseIterator(){return new On(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new On(this.root,e,this.comparator,!0)}},On=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Ze=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:n.EMPTY,this.right=s!=null?s:n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}};Ze.EMPTY=null,Ze.RED=!0,Ze.BLACK=!1;Ze.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new Ze(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var ge=class n{constructor(e){this.comparator=e,this.data=new ie(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Vs(this.data.getIterator())}getIteratorFrom(e){return new Vs(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Vs=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var Ue=class n{constructor(e){this.fields=e,e.sort(Le.comparator)}static empty(){return new n([])}unionWith(e){let t=new ge(Le.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Mn(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var xs=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Ae=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new xs("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return j(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Ae.EMPTY_BYTE_STRING=new Ae("");var fI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function yt(n){if(H(!!n,39018),typeof n=="string"){let e=0,t=fI.exec(n);if(H(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ee(n.seconds),nanos:ee(n.nanos)}}function ee(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function vt(n){return typeof n=="string"?Ae.fromBase64String(n):Ae.fromUint8Array(n)}var Kp="server_timestamp",Wp="__type__",Hp="__previous_value__",Qp="__local_write_time__";function cl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Wp])===null||t===void 0?void 0:t.stringValue)===Kp}function po(n){let e=n.mapValue.fields[Hp];return cl(e)?po(e):e}function Jr(n){let e=yt(n.mapValue.fields[Qp].timestampValue);return new ue(e.seconds,e.nanos)}var Oc=class{constructor(e,t,r,i,s,a,u,l,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=p}},Ls="(default)",Ms=class n{constructor(e,t){this.projectId=e,this.database=t||Ls}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===Ls}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var ul="__type__",Jp="__max__",bs={mapValue:{fields:{__type__:{stringValue:Jp}}}},ll="__vector__",Un="value";function Ut(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?cl(n)?4:Xp(n)?9007199254740991:Yp(n)?10:11:M(28295,{value:n})}function nt(n,e){if(n===e)return!0;let t=Ut(n);if(t!==Ut(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Jr(n).isEqual(Jr(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let a=yt(i.timestampValue),u=yt(s.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return vt(i.bytesValue).isEqual(vt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ee(i.geoPointValue.latitude)===ee(s.geoPointValue.latitude)&&ee(i.geoPointValue.longitude)===ee(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ee(i.integerValue)===ee(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let a=ee(i.doubleValue),u=ee(s.doubleValue);return a===u?Qr(a)===Qr(u):isNaN(a)&&isNaN(u)}return!1}(n,e);case 9:return Mn(n.arrayValue.values||[],e.arrayValue.values||[],nt);case 10:case 11:return function(i,s){let a=i.mapValue.fields||{},u=s.mapValue.fields||{};if(Wf(a)!==Wf(u))return!1;for(let l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!nt(a[l],u[l])))return!1;return!0}(n,e);default:return M(52216,{left:n})}}function Yr(n,e){return(n.values||[]).find(t=>nt(t,e))!==void 0}function Bn(n,e){if(n===e)return 0;let t=Ut(n),r=Ut(e);if(t!==r)return j(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return j(n.booleanValue,e.booleanValue);case 2:return function(s,a){let u=ee(s.integerValue||s.doubleValue),l=ee(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1}(n,e);case 3:return Hf(n.timestampValue,e.timestampValue);case 4:return Hf(Jr(n),Jr(e));case 5:return kc(n.stringValue,e.stringValue);case 6:return function(s,a){let u=vt(s),l=vt(a);return u.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){let u=s.split("/"),l=a.split("/");for(let d=0;d<u.length&&d<l.length;d++){let p=j(u[d],l[d]);if(p!==0)return p}return j(u.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){let u=j(ee(s.latitude),ee(a.latitude));return u!==0?u:j(ee(s.longitude),ee(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Qf(n.arrayValue,e.arrayValue);case 10:return function(s,a){var u,l,d,p;let g=s.fields||{},v=a.fields||{},S=(u=g[Un])===null||u===void 0?void 0:u.arrayValue,P=(l=v[Un])===null||l===void 0?void 0:l.arrayValue,N=j(((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0,((p=P==null?void 0:P.values)===null||p===void 0?void 0:p.length)||0);return N!==0?N:Qf(S,P)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===bs.mapValue&&a===bs.mapValue)return 0;if(s===bs.mapValue)return 1;if(a===bs.mapValue)return-1;let u=s.fields||{},l=Object.keys(u),d=a.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let g=0;g<l.length&&g<p.length;++g){let v=kc(l[g],p[g]);if(v!==0)return v;let S=Bn(u[l[g]],d[p[g]]);if(S!==0)return S}return j(l.length,p.length)}(n.mapValue,e.mapValue);default:throw M(23264,{le:t})}}function Hf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return j(n,e);let t=yt(n),r=yt(e),i=j(t.seconds,r.seconds);return i!==0?i:j(t.nanos,r.nanos)}function Qf(n,e){let t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){let s=Bn(t[i],r[i]);if(s)return s}return j(t.length,r.length)}function qn(n){return Vc(n)}function Vc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=yt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return vt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return L.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Vc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let a of r)s?s=!1:i+=",",i+=`${a}:${Vc(t.fields[a])}`;return i+"}"}(n.mapValue):M(61005,{value:n})}function Ps(n){switch(Ut(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=po(n);return e?16+Ps(e):16;case 5:return 2*n.stringValue.length;case 6:return vt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Ps(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return zt(r.fields,(s,a)=>{i+=s.length+Ps(a)}),i}(n.mapValue);default:throw M(13486,{value:n})}}function xc(n){return!!n&&"integerValue"in n}function hl(n){return!!n&&"arrayValue"in n}function Jf(n){return!!n&&"nullValue"in n}function Yf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Cs(n){return!!n&&"mapValue"in n}function Yp(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[ul])===null||t===void 0?void 0:t.stringValue)===ll}function zr(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return zt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=zr(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=zr(n.arrayValue.values[t]);return e}return Object.assign({},n)}function Xp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Jp}var sb={mapValue:{fields:{[ul]:{stringValue:ll},[Un]:{arrayValue:{}}}}};var xe=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Cs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=zr(t)}setAll(e){let t=Le.emptyPath(),r={},i=[];e.forEach((a,u)=>{if(!t.isImmediateParentOf(u)){let l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=u.popLast()}a?r[u.lastSegment()]=zr(a):i.push(u.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());Cs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return nt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Cs(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){zt(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(zr(this.value))}};function Zp(n){let e=[];return zt(n.fields,(t,r)=>{let i=new Le([t]);if(Cs(r)){let s=Zp(r.mapValue).fields;if(s.length===0)e.push(i);else for(let a of s)e.push(i.child(a))}else e.push(i)}),new Ue(e)}var We=class n{constructor(e,t,r,i,s,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=u}static newInvalidDocument(e){return new n(e,0,B.min(),B.min(),B.min(),xe.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,B.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,B.min(),B.min(),xe.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,B.min(),B.min(),xe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=xe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=xe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var jn=class{constructor(e,t){this.position=e,this.inclusive=t}};function Xf(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],a=n.position[i];if(s.field.isKeyField()?r=L.comparator(L.fromName(a.referenceValue),t.key):r=Bn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Zf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!nt(n.position[t],e.position[t]))return!1;return!0}var zn=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function pI(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var Fs=class{},he=class n extends Fs{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Mc(e,t,r):t==="array-contains"?new Bc(e,r):t==="in"?new qc(e,r):t==="not-in"?new jc(e,r):t==="array-contains-any"?new zc(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Fc(e,r):new Uc(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Bn(t,this.value)):t!==null&&Ut(this.value)===Ut(t)&&this.matchesComparison(Bn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},rt=class n extends Fs{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new n(e,t)}matches(e){return em(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}};function em(n){return n.op==="and"}function tm(n){return mI(n)&&em(n)}function mI(n){for(let e of n.filters)if(e instanceof rt)return!1;return!0}function Lc(n){if(n instanceof he)return n.field.canonicalString()+n.op.toString()+qn(n.value);if(tm(n))return n.filters.map(e=>Lc(e)).join(",");{let e=n.filters.map(t=>Lc(t)).join(",");return`${n.op}(${e})`}}function nm(n,e){return n instanceof he?function(r,i){return i instanceof he&&r.op===i.op&&r.field.isEqual(i.field)&&nt(r.value,i.value)}(n,e):n instanceof rt?function(r,i){return i instanceof rt&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,u)=>s&&nm(a,i.filters[u]),!0):!1}(n,e):void M(19439)}function rm(n){return n instanceof he?function(t){return`${t.field.canonicalString()} ${t.op} ${qn(t.value)}`}(n):n instanceof rt?function(t){return t.op.toString()+" {"+t.getFilters().map(rm).join(" ,")+"}"}(n):"Filter"}var Mc=class extends he{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){let t=L.comparator(e.key,this.key);return this.matchesComparison(t)}},Fc=class extends he{constructor(e,t){super(e,"in",t),this.keys=im("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Uc=class extends he{constructor(e,t){super(e,"not-in",t),this.keys=im("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function im(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>L.fromName(r.referenceValue))}var Bc=class extends he{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return hl(t)&&Yr(t.arrayValue,this.value)}},qc=class extends he{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&Yr(this.value.arrayValue,t)}},jc=class extends he{constructor(e,t){super(e,"not-in",t)}matches(e){if(Yr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Yr(this.value.arrayValue,t)}},zc=class extends he{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!hl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Yr(this.value.arrayValue,r))}};var $c=class{constructor(e,t=null,r=[],i=[],s=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=u,this.Pe=null}};function ep(n,e=null,t=[],r=[],i=null,s=null,a=null){return new $c(n,e,t,r,i,s,a)}function dl(n){let e=U(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Lc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),fo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>qn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>qn(r)).join(",")),e.Pe=t}return e.Pe}function fl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!pI(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!nm(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Zf(n.startAt,e.startAt)&&Zf(n.endAt,e.endAt)}function Gc(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var $n=class{constructor(e,t=null,r=[],i=[],s=null,a="F",u=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=u,this.endAt=l,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function gI(n,e,t,r,i,s,a,u){return new $n(n,e,t,r,i,s,a,u)}function pl(n){return new $n(n)}function tp(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function _I(n){return n.collectionGroup!==null}function $r(n){let e=U(n);if(e.Te===null){e.Te=[];let t=new Set;for(let s of e.explicitOrderBy)e.Te.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new ge(Le.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Te.push(new zn(s,r))}),t.has(Le.keyField().canonicalString())||e.Te.push(new zn(Le.keyField(),r))}return e.Te}function et(n){let e=U(n);return e.Ie||(e.Ie=yI(e,$r(n))),e.Ie}function yI(n,e){if(n.limitType==="F")return ep(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new zn(i.field,s)});let t=n.endAt?new jn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new jn(n.startAt.position,n.startAt.inclusive):null;return ep(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Kc(n,e,t){return new $n(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function mo(n,e){return fl(et(n),et(e))&&n.limitType===e.limitType}function sm(n){return`${dl(et(n))}|lt:${n.limitType}`}function kn(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>rm(i)).join(", ")}]`),fo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>qn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>qn(i)).join(",")),`Target(${r})`}(et(n))}; limitType=${n.limitType})`}function go(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):L.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of $r(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,u,l){let d=Xf(a,u,l);return a.inclusive?d<=0:d<0}(r.startAt,$r(r),i)||r.endAt&&!function(a,u,l){let d=Xf(a,u,l);return a.inclusive?d>=0:d>0}(r.endAt,$r(r),i))}(n,e)}function vI(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function om(n){return(e,t)=>{let r=!1;for(let i of $r(n)){let s=wI(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function wI(n,e,t){let r=n.field.isKeyField()?L.comparator(e.key,t.key):function(s,a,u){let l=a.data.field(s),d=u.data.field(s);return l!==null&&d!==null?Bn(l,d):M(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}var wt=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){zt(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return Gp(this.inner)}size(){return this.innerSize}};var II=new ie(L.comparator);function It(){return II}var am=new ie(L.comparator);function jr(...n){let e=am;for(let t of n)e=e.insert(t.key,t);return e}function cm(n){let e=am;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function rn(){return Gr()}function um(){return Gr()}function Gr(){return new wt(n=>n.toString(),(n,e)=>n.isEqual(e))}var EI=new ie(L.comparator),TI=new ge(L.comparator);function G(...n){let e=TI;for(let t of n)e=e.add(t);return e}var AI=new ge(j);function bI(){return AI}function ml(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Qr(e)?"-0":e}}function lm(n){return{integerValue:""+n}}function SI(n,e){return eI(e)?lm(e):ml(n,e)}var Gn=class{constructor(){this._=void 0}};function RI(n,e,t){return n instanceof Kn?function(i,s){let a={fields:{[Wp]:{stringValue:Kp},[Qp]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&cl(s)&&(s=po(s)),s&&(a.fields[Hp]=s),{mapValue:a}}(t,e):n instanceof ln?dm(n,e):n instanceof hn?fm(n,e):function(i,s){let a=hm(i,s),u=np(a)+np(i.Ee);return xc(a)&&xc(i.Ee)?lm(u):ml(i.serializer,u)}(n,e)}function PI(n,e,t){return n instanceof ln?dm(n,e):n instanceof hn?fm(n,e):t}function hm(n,e){return n instanceof Wn?function(r){return xc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var Kn=class extends Gn{},ln=class extends Gn{constructor(e){super(),this.elements=e}};function dm(n,e){let t=pm(e);for(let r of n.elements)t.some(i=>nt(i,r))||t.push(r);return{arrayValue:{values:t}}}var hn=class extends Gn{constructor(e){super(),this.elements=e}};function fm(n,e){let t=pm(e);for(let r of n.elements)t=t.filter(i=>!nt(i,r));return{arrayValue:{values:t}}}var Wn=class extends Gn{constructor(e,t){super(),this.serializer=e,this.Ee=t}};function np(n){return ee(n.integerValue||n.doubleValue)}function pm(n){return hl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function CI(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof ln&&i instanceof ln||r instanceof hn&&i instanceof hn?Mn(r.elements,i.elements,nt):r instanceof Wn&&i instanceof Wn?nt(r.Ee,i.Ee):r instanceof Kn&&i instanceof Kn}(n.transform,e.transform)}var Wc=class{constructor(e,t){this.version=e,this.transformResults=t}},Ke=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function ks(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Hn=class{};function mm(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Qn(n.key,Ke.none()):new dn(n.key,n.data,Ke.none());{let t=n.data,r=xe.empty(),i=new ge(Le.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new it(n.key,r,new Ue(i.toArray()),Ke.none())}}function kI(n,e,t){n instanceof dn?function(i,s,a){let u=i.value.clone(),l=ip(i.fieldTransforms,s,a.transformResults);u.setAll(l),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):n instanceof it?function(i,s,a){if(!ks(i.precondition,s))return void s.convertToUnknownDocument(a.version);let u=ip(i.fieldTransforms,s,a.transformResults),l=s.data;l.setAll(gm(i)),l.setAll(u),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Kr(n,e,t,r){return n instanceof dn?function(s,a,u,l){if(!ks(s.precondition,a))return u;let d=s.value.clone(),p=sp(s.fieldTransforms,l,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof it?function(s,a,u,l){if(!ks(s.precondition,a))return u;let d=sp(s.fieldTransforms,l,a),p=a.data;return p.setAll(gm(s)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),u===null?null:u.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(s,a,u){return ks(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,e,t)}function DI(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=hm(r.transform,i||null);s!=null&&(t===null&&(t=xe.empty()),t.set(r.field,s))}return t||null}function rp(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Mn(r,i,(s,a)=>CI(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var dn=class extends Hn{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},it=class extends Hn{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function gm(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function ip(n,e,t){let r=new Map;H(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){let s=n[i],a=s.transform,u=e.data.field(s.field);r.set(s.field,PI(a,u,t[i]))}return r}function sp(n,e,t){let r=new Map;for(let i of n){let s=i.transform,a=t.data.field(i.field);r.set(i.field,RI(s,a,e))}return r}var Qn=class extends Hn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Hc=class extends Hn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var Qc=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&kI(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=Kr(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=Kr(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=um();return this.mutations.forEach(i=>{let s=e.get(i.key),a=s.overlayedDocument,u=this.applyToLocalView(a,s.mutatedFields);u=t.has(i.key)?null:u;let l=mm(a,u);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(B.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),G())}isEqual(e){return this.batchId===e.batchId&&Mn(this.mutations,e.mutations,(t,r)=>rp(t,r))&&Mn(this.baseMutations,e.baseMutations,(t,r)=>rp(t,r))}},Jc=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){H(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return EI}(),s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new n(e,t,r,i)}};var Yc=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var Xc=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var oe,K;function NI(n){switch(n){case R.OK:return M(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function _m(n){if(n===void 0)return gt("GRPC error has no .code"),R.UNKNOWN;switch(n){case oe.OK:return R.OK;case oe.CANCELLED:return R.CANCELLED;case oe.UNKNOWN:return R.UNKNOWN;case oe.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case oe.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case oe.INTERNAL:return R.INTERNAL;case oe.UNAVAILABLE:return R.UNAVAILABLE;case oe.UNAUTHENTICATED:return R.UNAUTHENTICATED;case oe.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case oe.NOT_FOUND:return R.NOT_FOUND;case oe.ALREADY_EXISTS:return R.ALREADY_EXISTS;case oe.PERMISSION_DENIED:return R.PERMISSION_DENIED;case oe.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case oe.ABORTED:return R.ABORTED;case oe.OUT_OF_RANGE:return R.OUT_OF_RANGE;case oe.UNIMPLEMENTED:return R.UNIMPLEMENTED;case oe.DATA_LOSS:return R.DATA_LOSS;default:return M(39323,{code:n})}}(K=oe||(oe={}))[K.OK=0]="OK",K[K.CANCELLED=1]="CANCELLED",K[K.UNKNOWN=2]="UNKNOWN",K[K.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",K[K.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",K[K.NOT_FOUND=5]="NOT_FOUND",K[K.ALREADY_EXISTS=6]="ALREADY_EXISTS",K[K.PERMISSION_DENIED=7]="PERMISSION_DENIED",K[K.UNAUTHENTICATED=16]="UNAUTHENTICATED",K[K.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",K[K.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",K[K.ABORTED=10]="ABORTED",K[K.OUT_OF_RANGE=11]="OUT_OF_RANGE",K[K.UNIMPLEMENTED=12]="UNIMPLEMENTED",K[K.INTERNAL=13]="INTERNAL",K[K.UNAVAILABLE=14]="UNAVAILABLE",K[K.DATA_LOSS=15]="DATA_LOSS";var op=null;var OI=new pt([4294967295,4294967295],0);function ap(n){let e=Pp().encode(n),t=new fc;return t.update(e),new Uint8Array(t.digest())}function cp(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new pt([t,r],0),new pt([i,s],0)]}var Zc=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new sn(`Invalid padding: ${t}`);if(r<0)throw new sn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new sn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new sn(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=pt.fromNumber(this.fe)}pe(e,t,r){let i=e.add(t.multiply(pt.fromNumber(r)));return i.compare(OI)===1&&(i=new pt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;let t=ap(e),[r,i]=cp(t);for(let s=0;s<this.hashCount;s++){let a=this.pe(r,i,s);if(!this.ye(a))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new n(s,i,t);return r.forEach(u=>a.insert(u)),a}insert(e){if(this.fe===0)return;let t=ap(e),[r,i]=cp(t);for(let s=0;s<this.hashCount;s++){let a=this.pe(r,i,s);this.we(a)}}we(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},sn=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var Us=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,Xr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(B.min(),i,new ie(j),It(),G())}},Xr=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,G(),G(),G())}};var Vn=class{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=i}},Bs=class{constructor(e,t){this.targetId=e,this.De=t}},qs=class{constructor(e,t,r=Ae.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},js=class{constructor(){this.ve=0,this.Ce=up(),this.Fe=Ae.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=G(),t=G(),r=G();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:M(38017,{changeType:s})}}),new Xr(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=up()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,H(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}},eu=class{constructor(e){this.We=e,this.Ge=new Map,this.ze=It(),this.je=Ss(),this.Je=Ss(),this.He=new ie(j)}Ye(e){for(let t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(let t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{let r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:M(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,i)=>{this.nt(i)&&t(i)})}it(e){let t=e.targetId,r=e.De.count,i=this.st(t);if(i){let s=i.target;if(Gc(s))if(r===0){let a=new L(s.path);this.Xe(t,a,We.newNoDocument(a,B.min()))}else H(r===1,20013,{expectedCount:r});else{let a=this.ot(t);if(a!==r){let u=this._t(e),l=u?this.ut(u,e,a):1;if(l!==0){this.rt(t);let d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,d)}op==null||op.ct(function(p,g,v,S,P){var N,k,$,F,q,J;let be={localCacheCount:p,existenceFilterCount:g.count,databaseId:v.database,projectId:v.projectId},Q=g.unchangedNames;return Q&&(be.bloomFilter={applied:P===0,hashCount:(N=Q==null?void 0:Q.hashCount)!==null&&N!==void 0?N:0,bitmapLength:(F=($=(k=Q==null?void 0:Q.bits)===null||k===void 0?void 0:k.bitmap)===null||$===void 0?void 0:$.length)!==null&&F!==void 0?F:0,padding:(J=(q=Q==null?void 0:Q.bits)===null||q===void 0?void 0:q.padding)!==null&&J!==void 0?J:0,mightContain:I=>{var m;return(m=S==null?void 0:S.mightContain(I))!==null&&m!==void 0&&m}}),be}(a,e.De,this.We.lt(),u,l))}}}}_t(e){let t=e.De.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,a,u;try{a=vt(r).toUint8Array()}catch(l){if(l instanceof xs)return Ft("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new Zc(a,i,s)}catch(l){return Ft(l instanceof sn?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.fe===0?null:u}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){let r=this.We.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let a=this.We.lt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(u)||(this.Xe(t,s,null),i++)}),i}Pt(e){let t=new Map;this.Ge.forEach((s,a)=>{let u=this.st(a);if(u){if(s.current&&Gc(u.target)){let l=new L(u.target.path);this.Tt(l).has(a)||this.It(a,l)||this.Xe(a,l,We.newNoDocument(l,e))}s.Ne&&(t.set(a,s.Le()),s.ke())}});let r=G();this.Je.forEach((s,a)=>{let u=!0;a.forEachWhile(l=>{let d=this.st(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(s))}),this.ze.forEach((s,a)=>a.setReadTime(e));let i=new Us(e,t,this.He,this.ze,r);return this.ze=It(),this.je=Ss(),this.Je=Ss(),this.He=new ie(j),i}Ze(e,t){if(!this.nt(e))return;let r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;let i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){let t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new js,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new ge(j),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new ge(j),this.je=this.je.insert(e,t)),t}nt(e){let t=this.st(e)!==null;return t||O("WatchChangeAggregator","Detected inactive target",e),t}st(e){let t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new js),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}};function Ss(){return new ie(L.comparator)}function up(){return new ie(L.comparator)}var VI={asc:"ASCENDING",desc:"DESCENDING"},xI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},LI={and:"AND",or:"OR"},tu=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function nu(n,e){return n.useProto3Json||fo(e)?e:{value:e}}function zs(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ym(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function MI(n,e){return zs(n,e.toTimestamp())}function tt(n){return H(!!n,49232),B.fromTimestamp(function(t){let r=yt(t);return new ue(r.seconds,r.nanos)}(n))}function gl(n,e){return ru(n,e).canonicalString()}function ru(n,e){let t=function(i){return new te(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function vm(n){let e=te.fromString(n);return H(Am(e),10190,{key:e.toString()}),e}function iu(n,e){return gl(n.databaseId,e.path)}function vc(n,e){let t=vm(e);if(t.get(1)!==n.databaseId.projectId)throw new V(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new V(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(Im(t))}function wm(n,e){return gl(n.databaseId,e)}function FI(n){let e=vm(n);return e.length===4?te.emptyPath():Im(e)}function su(n){return new te(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Im(n){return H(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function lp(n,e,t){return{name:iu(n,e),fields:t.value.mapValue.fields}}function UI(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,p){return d.useProto3Json?(H(p===void 0||typeof p=="string",58123),Ae.fromBase64String(p||"")):(H(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),Ae.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&function(d){let p=d.code===void 0?R.UNKNOWN:_m(d.code);return new V(p,d.message||"")}(a);t=new qs(r,i,s,u||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=vc(n,r.document.name),s=tt(r.document.updateTime),a=r.document.createTime?tt(r.document.createTime):B.min(),u=new xe({mapValue:{fields:r.document.fields}}),l=We.newFoundDocument(i,s,a,u),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Vn(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=vc(n,r.document),s=r.readTime?tt(r.readTime):B.min(),a=We.newNoDocument(i,s),u=r.removedTargetIds||[];t=new Vn([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=vc(n,r.document),s=r.removedTargetIds||[];t=new Vn([],s,i,null)}else{if(!("filter"in e))return M(11601,{At:e});{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,a=new Xc(i,s),u=r.targetId;t=new Bs(u,a)}}return t}function BI(n,e){let t;if(e instanceof dn)t={update:lp(n,e.key,e.value)};else if(e instanceof Qn)t={delete:iu(n,e.key)};else if(e instanceof it)t={update:lp(n,e.key,e.data),updateMask:QI(e.fieldMask)};else{if(!(e instanceof Hc))return M(16599,{Rt:e.type});t={verify:iu(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){let u=a.transform;if(u instanceof Kn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof ln)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof hn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Wn)return{fieldPath:a.field.canonicalString(),increment:u.Ee};throw M(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:MI(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:M(27497)}(n,e.precondition)),t}function qI(n,e){return n&&n.length>0?(H(e!==void 0,14353),n.map(t=>function(i,s){let a=i.updateTime?tt(i.updateTime):tt(s);return a.isEqual(B.min())&&(a=tt(s)),new Wc(a,i.transformResults||[])}(t,e))):[]}function jI(n,e){return{documents:[wm(n,e.path)]}}function zI(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=wm(n,i);let s=function(d){if(d.length!==0)return Tm(rt.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let a=function(d){if(d.length!==0)return d.map(p=>function(v){return{field:Dn(v.field),direction:KI(v.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);let u=nu(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{Vt:t,parent:i}}function $I(n){let e=FI(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){H(r===1,65062);let p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(g){let v=Em(g);return v instanceof rt&&tm(v)?v.getFilters():[v]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(v=>function(P){return new zn(Nn(P.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(v))}(t.orderBy));let u=null;t.limit&&(u=function(g){let v;return v=typeof g=="object"?g.value:g,fo(v)?null:v}(t.limit));let l=null;t.startAt&&(l=function(g){let v=!!g.before,S=g.values||[];return new jn(S,v)}(t.startAt));let d=null;return t.endAt&&(d=function(g){let v=!g.before,S=g.values||[];return new jn(S,v)}(t.endAt)),gI(e,i,a,s,u,"F",l,d)}function GI(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Em(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Nn(t.unaryFilter.field);return he.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=Nn(t.unaryFilter.field);return he.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=Nn(t.unaryFilter.field);return he.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=Nn(t.unaryFilter.field);return he.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(t){return he.create(Nn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return rt.create(t.compositeFilter.filters.map(r=>Em(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(t.compositeFilter.op))}(n):M(30097,{filter:n})}function KI(n){return VI[n]}function WI(n){return xI[n]}function HI(n){return LI[n]}function Dn(n){return{fieldPath:n.canonicalString()}}function Nn(n){return Le.fromServerFormat(n.fieldPath)}function Tm(n){return n instanceof he?function(t){if(t.op==="=="){if(Yf(t.value))return{unaryFilter:{field:Dn(t.field),op:"IS_NAN"}};if(Jf(t.value))return{unaryFilter:{field:Dn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Yf(t.value))return{unaryFilter:{field:Dn(t.field),op:"IS_NOT_NAN"}};if(Jf(t.value))return{unaryFilter:{field:Dn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Dn(t.field),op:WI(t.op),value:t.value}}}(n):n instanceof rt?function(t){let r=t.getFilters().map(i=>Tm(i));return r.length===1?r[0]:{compositeFilter:{op:HI(t.op),filters:r}}}(n):M(54877,{filter:n})}function QI(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Am(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var Zr=class n{constructor(e,t,r,i,s=B.min(),a=B.min(),u=Ae.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var ou=class{constructor(e){this.gt=e}};function JI(n){let e=$I({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Kc(e,e.limit,"L"):e}var $s=class{constructor(){}bt(e,t){this.Dt(e,t),t.vt()}Dt(e,t){if("nullValue"in e)this.Ct(t,5);else if("booleanValue"in e)this.Ct(t,10),t.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(t,15),t.Ft(ee(e.integerValue));else if("doubleValue"in e){let r=ee(e.doubleValue);isNaN(r)?this.Ct(t,13):(this.Ct(t,15),Qr(r)?t.Ft(0):t.Ft(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ct(t,20),typeof r=="string"&&(r=yt(r)),t.Mt(`${r.seconds||""}`),t.Ft(r.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,t),this.Ot(t);else if("bytesValue"in e)this.Ct(t,30),t.Nt(vt(e.bytesValue)),this.Ot(t);else if("referenceValue"in e)this.Bt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Ct(t,45),t.Ft(r.latitude||0),t.Ft(r.longitude||0)}else"mapValue"in e?Xp(e)?this.Ct(t,Number.MAX_SAFE_INTEGER):Yp(e)?this.Lt(e.mapValue,t):(this.kt(e.mapValue,t),this.Ot(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Ot(t)):M(19022,{Qt:e})}xt(e,t){this.Ct(t,25),this.$t(e,t)}$t(e,t){t.Mt(e)}kt(e,t){let r=e.fields||{};this.Ct(t,55);for(let i of Object.keys(r))this.xt(i,t),this.Dt(r[i],t)}Lt(e,t){var r,i;let s=e.fields||{};this.Ct(t,53);let a=Un,u=((i=(r=s[a].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.Ct(t,15),t.Ft(ee(u)),this.xt(a,t),this.Dt(s[a],t)}qt(e,t){let r=e.values||[];this.Ct(t,50);for(let i of r)this.Dt(i,t)}Bt(e,t){this.Ct(t,37),L.fromName(e).path.forEach(r=>{this.Ct(t,60),this.$t(r,t)})}Ct(e,t){e.Ft(t)}Ot(e){e.Ft(2)}};$s.Ut=new $s;var au=class{constructor(){this.Dn=new cu}addToCollectionParentIndex(e,t){return this.Dn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(un.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(un.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}},cu=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new ge(te.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new ge(te.comparator)).toArray()}};var ob=new Uint8Array(0);var hp={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},bm=41943040,Fe=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};Fe.DEFAULT_COLLECTION_PERCENTILE=10,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Fe.DEFAULT=new Fe(bm,Fe.DEFAULT_COLLECTION_PERCENTILE,Fe.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Fe.DISABLED=new Fe(-1,0,0);var ei=class n{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new n(0)}static ur(){return new n(-1)}};var dp="LruGarbageCollector",YI=1048576;function fp([n,e],[t,r]){let i=j(n,t);return i===0?j(e,r):i}var uu=class{constructor(e){this.Tr=e,this.buffer=new ge(fp),this.Ir=0}dr(){return++this.Ir}Er(e){let t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();fp(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},lu=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){O(dp,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){nr(t)?O(dp,"Ignoring IndexedDB error during garbage collection: ",t):await tr(t)}await this.Rr(3e5)})}},hu=class{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return C.resolve(Fn.ue);let r=new uu(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(O("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(hp)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(O("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),hp):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,s,a,u,l,d,p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(O("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),i=this.params.maximumSequenceNumbersToCollect):i=g,a=Date.now(),this.nthSequenceNumber(e,i))).next(g=>(r=g,u=Date.now(),this.removeTargets(e,r,t))).next(g=>(s=g,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(d=Date.now(),Cn()<=z.DEBUG&&O("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${i} in `+(u-a)+`ms
	Removed ${s} targets in `+(l-u)+`ms
	Removed ${g} documents in `+(d-l)+`ms
Total Duration: ${d-p}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:g})))}};function XI(n,e){return new hu(n,e)}var du=class{constructor(){this.changes=new wt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,We.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var fu=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var pu=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&Kr(r.mutation,i,Ue.empty(),ue.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,G()).next(()=>r))}getLocalViewOfDocuments(e,t,r=G()){let i=rn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=jr();return s.forEach((u,l)=>{a=a.insert(u,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=rn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,G()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,u)=>{t.set(a,u)})})}computeViews(e,t,r,i){let s=It(),a=Gr(),u=function(){return Gr()}();return t.forEach((l,d)=>{let p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof it)?s=s.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),Kr(p.mutation,d,p.mutation.getFieldMask(),ue.now())):a.set(d.key,Ue.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var g;return u.set(d,new fu(p,(g=a.get(d))!==null&&g!==void 0?g:null))}),u))}recalculateAndSaveOverlays(e,t){let r=Gr(),i=new ie((a,u)=>a-u),s=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let u of a)u.keys().forEach(l=>{let d=t.get(l);if(d===null)return;let p=r.get(l)||Ue.empty();p=u.applyToLocalView(d,p),r.set(l,p);let g=(i.get(u.batchId)||G()).add(l);i=i.insert(u.batchId,g)})}).next(()=>{let a=[],u=i.getReverseIterator();for(;u.hasNext();){let l=u.getNext(),d=l.key,p=l.value,g=um();p.forEach(v=>{if(!s.has(v)){let S=mm(t.get(v),r.get(v));S!==null&&g.set(v,S),s=s.add(v)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,g))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return L.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):_I(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):C.resolve(rn()),u=Hr,l=s;return a.next(d=>C.forEach(d,(p,g)=>(u<g.largestBatchId&&(u=g.largestBatchId),s.get(p)?C.resolve():this.remoteDocumentCache.getEntry(e,p).next(v=>{l=l.insert(p,v)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,G())).next(p=>({batchId:u,changes:cm(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next(r=>{let i=jr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,a=jr();return this.indexManager.getCollectionParents(e,s).next(u=>C.forEach(u,l=>{let d=function(g,v){return new $n(v,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((g,v)=>{a=a.insert(g,v)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((l,d)=>{let p=d.getKey();a.get(p)===null&&(a=a.insert(p,We.newInvalidDocument(p)))});let u=jr();return a.forEach((l,d)=>{let p=s.get(l);p!==void 0&&Kr(p.mutation,d,Ue.empty(),ue.now()),go(t,d)&&(u=u.insert(l,d))}),u})}};var mu=class{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return C.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:tt(i.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:JI(i.bundledQuery),readTime:tt(i.readTime)}}(t)),C.resolve()}};var gu=class{constructor(){this.overlays=new ie(L.comparator),this.kr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){let r=rn();return C.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.wt(e,t,s)}),C.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){let i=rn(),s=t.length+1,a=new L(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){let l=u.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return C.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new ie((d,p)=>d-p),a=this.overlays.getIterator();for(;a.hasNext();){let d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=s.get(d.largestBatchId);p===null&&(p=rn(),s=s.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}let u=rn(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>u.set(d,p)),!(u.size()>=i)););return C.resolve(u)}wt(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Yc(t,r));let s=this.kr.get(t);s===void 0&&(s=G(),this.kr.set(t,s)),this.kr.set(t,s.add(r.key))}};var _u=class{constructor(){this.sessionToken=Ae.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}};var ti=class{constructor(){this.qr=new ge(ae.Qr),this.$r=new ge(ae.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){let r=new ae(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new ae(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){let t=new L(new te([])),r=new ae(t,e),i=new ae(t,e+1),s=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),s.push(a.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){let t=new L(new te([])),r=new ae(t,e),i=new ae(t,e+1),s=G();return this.$r.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){let t=new ae(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},ae=class{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return L.comparator(e.key,t.key)||j(e.Hr,t.Hr)}static Ur(e,t){return j(e.Hr,t.Hr)||L.comparator(e.key,t.key)}};var yu=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new ge(ae.Qr)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new Qc(s,t,r,i);this.mutationQueue.push(a);for(let u of i)this.Yr=this.Yr.add(new ae(u.key,s)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.Xr(r),s=i<0?0:i;return C.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?al:this.er-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new ae(t,0),i=new ae(t,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],a=>{let u=this.Zr(a.Hr);s.push(u)}),C.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ge(j);return t.forEach(i=>{let s=new ae(i,0),a=new ae(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,a],u=>{r=r.add(u.Hr)})}),C.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;L.isDocumentKey(s)||(s=s.child(""));let a=new ae(new L(s),0),u=new ge(j);return this.Yr.forEachWhile(l=>{let d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(u=u.add(l.Hr)),!0)},a),C.resolve(this.ei(u))}ei(e){let t=[];return e.forEach(r=>{let i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){H(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return C.forEach(t.mutations,i=>{let s=new ae(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){let r=new ae(t,0),i=this.Yr.firstAfterOrEqual(r);return C.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){let t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var vu=class{constructor(e){this.ni=e,this.docs=function(){return new ie(L.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():We.newInvalidDocument(t))}getEntries(e,t){let r=It();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():We.newInvalidDocument(i))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=It(),a=t.path,u=new L(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){let{key:d,value:{document:p}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Yw(Jw(p),r)<=0||(i.has(p.key)||go(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return C.resolve(s)}getAllFromCollectionGroup(e,t,r,i){M(9500)}ri(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new wu(this)}getSize(e){return C.resolve(this.size)}},wu=class extends du{constructor(e){super(),this.Or=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}};var Iu=class{constructor(e){this.persistence=e,this.ii=new wt(t=>dl(t),fl),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.si=0,this.oi=new ti,this.targetCount=0,this._i=ei.ar()}forEachTarget(e,t){return this.ii.forEach((r,i)=>t(i)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),C.resolve()}hr(e){this.ii.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this._i=new ei(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.hr(t),C.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.ii.forEach((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.ii.delete(a),s.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)}),C.waitFor(s).next(()=>i)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){let r=this.ii.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),C.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),C.resolve()}getMatchingKeysForTargetId(e,t){let r=this.oi.Jr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this.oi.containsKey(t))}};var Gs=class{constructor(e,t){this.ai={},this.overlays={},this.ui=new Fn(0),this.ci=!1,this.ci=!0,this.li=new _u,this.referenceDelegate=e(this),this.hi=new Iu(this),this.indexManager=new au,this.remoteDocumentCache=function(i){return new vu(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new ou(t),this.Ti=new mu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new gu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new yu(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){O("MemoryPersistence","Starting transaction:",e);let i=new Eu(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return C.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}},Eu=class extends Nc{constructor(e){super(),this.currentSequenceNumber=e}},Tu=class n{constructor(e){this.persistence=e,this.Ai=new ti,this.Ri=null}static Vi(e){return new n(e)}get mi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.mi,r=>{let i=L.fromPath(r);return this.fi(e,i).next(s=>{s||t.removeEntry(i,B.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return C.or([()=>C.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}},Ks=class n{constructor(e,t){this.persistence=e,this.gi=new wt(r=>tI(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=XI(this,t)}static Vi(e,t){return new n(e,t)}Ii(){}di(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){let t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return C.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?C.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,a=>this.Sr(e,a,t).next(u=>{u||(r++,s.removeEntry(a,B.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),C.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ps(e.data.value)),t}Sr(e,t,r){return C.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let i=this.gi.get(t);return C.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var Au=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=i}static Es(e,t){let r=G(),i=G();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var bu=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var Su=class{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return Jh()?8:Zw(fe())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ps(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ys(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;let a=new bu;return this.ws(e,t,a).next(u=>{if(s.result=u,this.Rs)return this.Ss(e,t,a,u.size)})}).next(()=>s.result)}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(Cn()<=z.DEBUG&&O("QueryEngine","SDK will not create cache indexes for query:",kn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),C.resolve()):(Cn()<=z.DEBUG&&O("QueryEngine","Query:",kn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(Cn()<=z.DEBUG&&O("QueryEngine","The SDK decides to create cache indexes for query:",kn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,et(t))):C.resolve())}ps(e,t){if(tp(t))return C.resolve(null);let r=et(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Kc(t,null,"F"),r=et(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let a=G(...s);return this.gs.getDocuments(e,a).next(u=>this.indexManager.getMinOffset(e,r).next(l=>{let d=this.bs(t,u);return this.Ds(t,d,a,l.readTime)?this.ps(e,Kc(t,null,"F")):this.vs(e,d,t,l)}))})))}ys(e,t,r,i){return tp(t)||i.isEqual(B.min())?C.resolve(null):this.gs.getDocuments(e,r).next(s=>{let a=this.bs(t,s);return this.Ds(t,a,r,i)?C.resolve(null):(Cn()<=z.DEBUG&&O("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),kn(t)),this.vs(e,a,t,Qw(i,Hr)).next(u=>u))})}bs(e,t){let r=new ge(om(e));return t.forEach((i,s)=>{go(e,s)&&(r=r.add(s))}),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,t,r){return Cn()<=z.DEBUG&&O("QueryEngine","Using full collection scan to execute query:",kn(t)),this.gs.getDocumentsMatchingQuery(e,t,un.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}};var _l="LocalStore",ZI=3e8,Ru=class{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new ie(j),this.Ms=new wt(s=>dl(s),fl),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new pu(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}};function eE(n,e,t,r){return new Ru(n,e,t,r)}async function Sm(n,e){let t=U(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let a=[],u=[],l=G();for(let d of i){a.push(d.batchId);for(let p of d.mutations)l=l.add(p.key)}for(let d of s){u.push(d.batchId);for(let p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Bs:d,removedBatchIds:a,addedBatchIds:u}))})})}function tE(n,e){let t=U(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.Os.newChangeBuffer({trackRemovals:!0});return function(u,l,d,p){let g=d.batch,v=g.keys(),S=C.resolve();return v.forEach(P=>{S=S.next(()=>p.getEntry(l,P)).next(N=>{let k=d.docVersions.get(P);H(k!==null,48541),N.version.compareTo(k)<0&&(g.applyToRemoteDocument(N,d),N.isValidDocument()&&(N.setReadTime(d.commitVersion),p.addEntry(N)))})}),S.next(()=>u.mutationQueue.removeMutationBatch(l,g))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let l=G();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(l=l.add(u.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Rm(n){let e=U(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function nE(n,e){let t=U(n),r=e.snapshotVersion,i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let a=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;let u=[];e.targetChanges.forEach((p,g)=>{let v=i.get(g);if(!v)return;u.push(t.hi.removeMatchingKeys(s,p.removedDocuments,g).next(()=>t.hi.addMatchingKeys(s,p.addedDocuments,g)));let S=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?S=S.withResumeToken(Ae.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),i=i.insert(g,S),function(N,k,$){return N.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=ZI?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0}(v,S,p)&&u.push(t.hi.updateTargetData(s,S))});let l=It(),d=G();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),u.push(rE(s,a,e.documentUpdates).next(p=>{l=p.Ls,d=p.ks})),!r.isEqual(B.min())){let p=t.hi.getLastRemoteSnapshotVersion(s).next(g=>t.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));u.push(p)}return C.waitFor(u).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.Fs=i,s))}function rE(n,e,t){let r=G(),i=G();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=It();return t.forEach((u,l)=>{let d=s.get(u);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(u)),l.isNoDocument()&&l.version.isEqual(B.min())?(e.removeEntry(u,l.readTime),a=a.insert(u,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(u,l)):O(_l,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",l.version)}),{Ls:a,ks:i}})}function iE(n,e){let t=U(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=al),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function sE(n,e){let t=U(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.hi.getTargetData(r,e).next(s=>s?(i=s,C.resolve(i)):t.hi.allocateTargetId(r).next(a=>(i=new Zr(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Pu(n,e,t){let r=U(n),i=r.Fs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!nr(a))throw a;O(_l,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function pp(n,e,t){let r=U(n),i=B.min(),s=G();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,p){let g=U(l),v=g.Ms.get(p);return v!==void 0?C.resolve(g.Fs.get(v)):g.hi.getTargetData(d,p)}(r,a,et(e)).next(u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,u.targetId).next(l=>{s=l})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:B.min(),t?s:G())).next(u=>(oE(r,vI(e),u),{documents:u,qs:s})))}function oE(n,e,t){let r=n.xs.get(e)||B.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.xs.set(e,r)}var Ws=class{constructor(){this.activeTargetIds=bI()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Cu=class{constructor(){this.Fo=new Ws,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new Ws,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var ku=class{xo(e){}shutdown(){}};var mp="ConnectivityMonitor",Hs=class{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){O(mp,"Network connectivity changed: AVAILABLE");for(let e of this.ko)e(0)}Lo(){O(mp,"Network connectivity changed: UNAVAILABLE");for(let e of this.ko)e(1)}static C(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Rs=null;function Du(){return Rs===null?Rs=function(){return 268435456+Math.round(2147483648*Math.random())}():Rs++,"0x"+Rs.toString(16)}var wc="RestConnection",aE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},Nu=class{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Ls?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){let a=Du(),u=this.Go(e,t.toUriEncodedString());O(wc,`Sending RPC '${e}' ${a}:`,u,r);let l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(l,i,s);let{host:d}=new URL(u),p=St(d);return this.jo(e,u,l,r,p).then(g=>(O(wc,`Received RPC '${e}' ${a}: `,g),g),g=>{throw Ft(wc,`RPC '${e}' ${a} failed with error: `,g,"url: ",u,"request:",r),g})}Jo(e,t,r,i,s,a){return this.Wo(e,t,r,i,s)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+er}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,t){let r=aE[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}};var Ou=class{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}};var Ee="WebChannelConnection",Vu=class extends Nu{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,s){let a=Du();return new Promise((u,l)=>{let d=new pc;d.setWithCredentials(!0),d.listenOnce(mc.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case qr.NO_ERROR:let g=d.getResponseJson();O(Ee,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),u(g);break;case qr.TIMEOUT:O(Ee,`RPC '${e}' ${a} timed out`),l(new V(R.DEADLINE_EXCEEDED,"Request time out"));break;case qr.HTTP_ERROR:let v=d.getStatus();if(O(Ee,`RPC '${e}' ${a} failed with status:`,v,"response text:",d.getResponseText()),v>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);let P=S==null?void 0:S.error;if(P&&P.status&&P.message){let N=function($){let F=$.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(F)>=0?F:R.UNKNOWN}(P.status);l(new V(N,P.message))}else l(new V(R.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new V(R.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:e,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{O(Ee,`RPC '${e}' ${a} completed.`)}});let p=JSON.stringify(i);O(Ee,`RPC '${e}' ${a} sending request:`,i),d.send(t,"POST",p,r,15)})}P_(e,t,r){let i=Du(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=yc(),u=_c(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.zo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let p=s.join("");O(Ee,`Creating RPC '${e}' stream ${i}: ${p}`,l);let g=a.createWebChannel(p,l);this.T_(g);let v=!1,S=!1,P=new Ou({Ho:k=>{S?O(Ee,`Not sending because RPC '${e}' stream ${i} is closed:`,k):(v||(O(Ee,`Opening RPC '${e}' stream ${i} transport.`),g.open(),v=!0),O(Ee,`RPC '${e}' stream ${i} sending:`,k),g.send(k))},Yo:()=>g.close()}),N=(k,$,F)=>{k.listen($,q=>{try{F(q)}catch(J){setTimeout(()=>{throw J},0)}})};return N(g,Pn.EventType.OPEN,()=>{S||(O(Ee,`RPC '${e}' stream ${i} transport opened.`),P.s_())}),N(g,Pn.EventType.CLOSE,()=>{S||(S=!0,O(Ee,`RPC '${e}' stream ${i} transport closed`),P.__(),this.I_(g))}),N(g,Pn.EventType.ERROR,k=>{S||(S=!0,Ft(Ee,`RPC '${e}' stream ${i} transport errored. Name:`,k.name,"Message:",k.message),P.__(new V(R.UNAVAILABLE,"The operation could not be completed")))}),N(g,Pn.EventType.MESSAGE,k=>{var $;if(!S){let F=k.data[0];H(!!F,16349);let q=F,J=(q==null?void 0:q.error)||(($=q[0])===null||$===void 0?void 0:$.error);if(J){O(Ee,`RPC '${e}' stream ${i} received error:`,J);let be=J.status,Q=function(y){let w=oe[y];if(w!==void 0)return _m(w)}(be),I=J.message;Q===void 0&&(Q=R.INTERNAL,I="Unknown error status: "+be+" with message "+J.message),S=!0,P.__(new V(Q,I)),g.close()}else O(Ee,`RPC '${e}' stream ${i} received:`,F),P.a_(F)}}),N(u,gc.STAT_EVENT,k=>{k.stat===As.PROXY?O(Ee,`RPC '${e}' stream ${i} detected buffering proxy`):k.stat===As.NOPROXY&&O(Ee,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{P.o_()},0),P}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}};function Ic(){return typeof document!="undefined"?document:null}function _o(n){return new tu(n,!0)}var Qs=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();let t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&O("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}};var gp="PersistentStream",Js=class{constructor(e,t,r,i,s,a,u,l){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Qs(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(gt(t.toString()),gt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;let e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===t&&this.W_(r,i)},r=>{e(()=>{let i=new V(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,t){let r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return O(gp,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(O(gp,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},xu=class extends Js{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();let t=UI(this.serializer,e),r=function(s){if(!("targetChange"in s))return B.min();let a=s.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?tt(a.readTime):B.min()}(e);return this.listener.J_(t,r)}H_(e){let t={};t.database=su(this.serializer),t.addTarget=function(s,a){let u,l=a.target;if(u=Gc(l)?{documents:jI(s,l)}:{query:zI(s,l).Vt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=ym(s,a.resumeToken);let d=nu(s,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(B.min())>0){u.readTime=zs(s,a.snapshotVersion.toTimestamp());let d=nu(s,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,e);let r=GI(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){let t={};t.database=su(this.serializer),t.removeTarget=e,this.k_(t)}},Lu=class extends Js{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return H(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,H(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){H(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();let t=qI(e.writeResults,e.commitTime),r=tt(e.commitTime);return this.listener.ta(r,t)}na(){let e={};e.database=su(this.serializer),this.k_(e)}X_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>BI(this.serializer,r))};this.k_(t)}};var Mu=class{},Fu=class extends Mu{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new V(R.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,ru(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new V(R.UNKNOWN,s.toString())})}Jo(e,t,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Jo(e,ru(t,r),i,a,u,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(R.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}},Uu=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(gt(t),this._a=!1):O("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}};var fn="RemoteStore",Bu=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{pn(this)&&(O(fn,"Restarting streams for network reachability change."),await async function(l){let d=U(l);d.Ia.add(4),await si(d),d.Aa.set("Unknown"),d.Ia.delete(4),await yo(d)}(this))})}),this.Aa=new Uu(r,i)}};async function yo(n){if(pn(n))for(let e of n.da)await e(!0)}async function si(n){for(let e of n.da)await e(!1)}function Pm(n,e){let t=U(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),Il(t)?wl(t):rr(t).x_()&&vl(t,e))}function yl(n,e){let t=U(n),r=rr(t);t.Ta.delete(e),r.x_()&&Cm(t,e),t.Ta.size===0&&(r.x_()?r.B_():pn(t)&&t.Aa.set("Unknown"))}function vl(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}rr(n).H_(e)}function Cm(n,e){n.Ra.$e(e),rr(n).Y_(e)}function wl(n){n.Ra=new eu({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),rr(n).start(),n.Aa.aa()}function Il(n){return pn(n)&&!rr(n).M_()&&n.Ta.size>0}function pn(n){return U(n).Ia.size===0}function km(n){n.Ra=void 0}async function cE(n){n.Aa.set("Online")}async function uE(n){n.Ta.forEach((e,t)=>{vl(n,e)})}async function lE(n,e){km(n),Il(n)?(n.Aa.la(e),wl(n)):n.Aa.set("Unknown")}async function hE(n,e,t){if(n.Aa.set("Online"),e instanceof qs&&e.state===2&&e.cause)try{await async function(i,s){let a=s.cause;for(let u of s.targetIds)i.Ta.has(u)&&(await i.remoteSyncer.rejectListen(u,a),i.Ta.delete(u),i.Ra.removeTarget(u))}(n,e)}catch(r){O(fn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Ys(n,r)}else if(e instanceof Vn?n.Ra.Ye(e):e instanceof Bs?n.Ra.it(e):n.Ra.et(e),!t.isEqual(B.min()))try{let r=await Rm(n.localStore);t.compareTo(r)>=0&&await function(s,a){let u=s.Ra.Pt(a);return u.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){let p=s.Ta.get(d);p&&s.Ta.set(d,p.withResumeToken(l.resumeToken,a))}}),u.targetMismatches.forEach((l,d)=>{let p=s.Ta.get(l);if(!p)return;s.Ta.set(l,p.withResumeToken(Ae.EMPTY_BYTE_STRING,p.snapshotVersion)),Cm(s,l);let g=new Zr(p.target,l,d,p.sequenceNumber);vl(s,g)}),s.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){O(fn,"Failed to raise snapshot:",r),await Ys(n,r)}}async function Ys(n,e,t){if(!nr(e))throw e;n.Ia.add(1),await si(n),n.Aa.set("Offline"),t||(t=()=>Rm(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{O(fn,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await yo(n)})}function Dm(n,e){return e().catch(t=>Ys(n,t,e))}async function vo(n){let e=U(n),t=Bt(e),r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:al;for(;dE(e);)try{let i=await iE(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,fE(e,i)}catch(i){await Ys(e,i)}Nm(e)&&Om(e)}function dE(n){return pn(n)&&n.Pa.length<10}function fE(n,e){n.Pa.push(e);let t=Bt(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function Nm(n){return pn(n)&&!Bt(n).M_()&&n.Pa.length>0}function Om(n){Bt(n).start()}async function pE(n){Bt(n).na()}async function mE(n){let e=Bt(n);for(let t of n.Pa)e.X_(t.mutations)}async function gE(n,e,t){let r=n.Pa.shift(),i=Jc.from(r,e,t);await Dm(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await vo(n)}async function _E(n,e){e&&Bt(n).Z_&&await async function(r,i){if(function(a){return NI(a)&&a!==R.ABORTED}(i.code)){let s=r.Pa.shift();Bt(r).N_(),await Dm(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await vo(r)}}(n,e),Nm(n)&&Om(n)}async function _p(n,e){let t=U(n);t.asyncQueue.verifyOperationInProgress(),O(fn,"RemoteStore received new credentials");let r=pn(t);t.Ia.add(3),await si(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await yo(t)}async function yE(n,e){let t=U(n);e?(t.Ia.delete(2),await yo(t)):e||(t.Ia.add(2),await si(t),t.Aa.set("Unknown"))}function rr(n){return n.Va||(n.Va=function(t,r,i){let s=U(t);return s.ia(),new xu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:cE.bind(null,n),e_:uE.bind(null,n),n_:lE.bind(null,n),J_:hE.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),Il(n)?wl(n):n.Aa.set("Unknown")):(await n.Va.stop(),km(n))})),n.Va}function Bt(n){return n.ma||(n.ma=function(t,r,i){let s=U(t);return s.ia(),new Lu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:pE.bind(null,n),n_:_E.bind(null,n),ea:mE.bind(null,n),ta:gE.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await vo(n)):(await n.ma.stop(),n.Pa.length>0&&(O(fn,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}var qu=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Ge,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let a=Date.now()+r,u=new n(e,t,a,i,s);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function El(n,e){if(gt("AsyncQueue",`${e}: ${n}`),nr(n))return new V(R.UNAVAILABLE,`${e}: ${n}`);throw n}var Xs=class n{static emptySet(e){return new n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=jr(),this.sortedSet=new ie(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var Zs=class{constructor(){this.fa=new ie(L.comparator)}track(e){let t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):M(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){let e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}},Jn=class n{constructor(e,t,r,i,s,a,u,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){let a=[];return t.forEach(u=>{a.push({type:0,doc:u})}),new n(e,t,Xs.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&mo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var ju=class{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}},zu=class{constructor(){this.queries=yp(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){let i=U(t),s=i.queries;i.queries=yp(),s.forEach((a,u)=>{for(let l of u.wa)l.onError(r)})})(this,new V(R.ABORTED,"Firestore shutting down"))}};function yp(){return new wt(n=>sm(n),mo)}async function Vm(n,e){let t=U(n),r=3,i=e.query,s=t.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new ju,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await t.onListen(i,!0);break;case 1:s.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){let u=El(a,`Initialization of query '${kn(e.query)}' failed`);return void e.onError(u)}t.queries.set(i,s),s.wa.push(e),e.va(t.onlineState),s.ya&&e.Ca(s.ya)&&Tl(t)}async function xm(n,e){let t=U(n),r=e.query,i=3,s=t.queries.get(r);if(s){let a=s.wa.indexOf(e);a>=0&&(s.wa.splice(a,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function vE(n,e){let t=U(n),r=!1;for(let i of e){let s=i.query,a=t.queries.get(s);if(a){for(let u of a.wa)u.Ca(i)&&(r=!0);a.ya=i}}r&&Tl(t)}function wE(n,e,t){let r=U(n),i=r.queries.get(e);if(i)for(let s of i.wa)s.onError(t);r.queries.delete(e)}function Tl(n){n.Da.forEach(e=>{e.next()})}var $u,vp;(vp=$u||($u={})).Fa="default",vp.Cache="cache";var eo=class{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new Jn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;let r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;let t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Jn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==$u.Cache}};var to=class{constructor(e){this.key=e}},no=class{constructor(e){this.key=e}},Gu=class{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=G(),this.mutatedKeys=G(),this.Xa=om(e),this.eu=new Xs(this.Xa)}get tu(){return this.Ha}nu(e,t){let r=t?t.ru:new Zs,i=t?t.eu:this.eu,s=t?t.mutatedKeys:this.mutatedKeys,a=i,u=!1,l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,g)=>{let v=i.get(p),S=go(this.query,g)?g:null,P=!!v&&this.mutatedKeys.has(v.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations),k=!1;v&&S?v.data.isEqual(S.data)?P!==N&&(r.track({type:3,doc:S}),k=!0):this.iu(v,S)||(r.track({type:2,doc:S}),k=!0,(l&&this.Xa(S,l)>0||d&&this.Xa(S,d)<0)&&(u=!0)):!v&&S?(r.track({type:0,doc:S}),k=!0):v&&!S&&(r.track({type:1,doc:v}),k=!0,(l||d)&&(u=!0)),k&&(S?(a=a.add(S),s=N?s.add(p):s.delete(p)):(a=a.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{eu:a,ru:r,Ds:u,mutatedKeys:s}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;let a=e.ru.pa();a.sort((p,g)=>function(S,P){let N=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:k})}};return N(S)-N(P)}(p.type,g.type)||this.Xa(p.doc,g.doc)),this.su(r),i=i!=null&&i;let u=t&&!i?this.ou():[],l=this.Za.size===0&&this.current&&!i?1:0,d=l!==this.Ya;return this.Ya=l,a.length!==0||d?{snapshot:new Jn(this.query,e.eu,s,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:u}:{_u:u}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Zs,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];let e=this.Za;this.Za=G(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});let t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new no(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new to(r))}),t}uu(e){this.Ha=e.qs,this.Za=G();let t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Jn.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}},Al="SyncEngine",Ku=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Wu=class{constructor(e){this.key=e,this.lu=!1}},Hu=class{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new wt(u=>sm(u),mo),this.Tu=new Map,this.Iu=new Set,this.du=new ie(L.comparator),this.Eu=new Map,this.Au=new ti,this.Ru={},this.Vu=new Map,this.mu=ei.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}};async function IE(n,e,t=!0){let r=qm(n),i,s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await Lm(r,e,t,!0),i}async function EE(n,e){let t=qm(n);await Lm(t,e,!0,!1)}async function Lm(n,e,t,r){let i=await sE(n.localStore,et(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t),u;return r&&(u=await TE(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&Pm(n.remoteStore,i),u}async function TE(n,e,t,r,i){n.gu=(g,v,S)=>async function(N,k,$,F){let q=k.view.nu($);q.Ds&&(q=await pp(N.localStore,k.query,!1).then(({documents:I})=>k.view.nu(I,q)));let J=F&&F.targetChanges.get(k.targetId),be=F&&F.targetMismatches.get(k.targetId)!=null,Q=k.view.applyChanges(q,N.isPrimaryClient,J,be);return Ip(N,k.targetId,Q._u),Q.snapshot}(n,g,v,S);let s=await pp(n.localStore,e,!0),a=new Gu(e,s.qs),u=a.nu(s.documents),l=Xr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(u,n.isPrimaryClient,l);Ip(n,t,d._u);let p=new Ku(e,t,a);return n.Pu.set(e,p),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),d.snapshot}async function AE(n,e,t){let r=U(n),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(a=>!mo(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Pu(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&yl(r.remoteStore,i.targetId),Qu(r,i.targetId)}).catch(tr)):(Qu(r,i.targetId),await Pu(r.localStore,i.targetId,!0))}async function bE(n,e){let t=U(n),r=t.Pu.get(e),i=t.Tu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),yl(t.remoteStore,r.targetId))}async function SE(n,e,t){let r=OE(n);try{let i=await function(a,u){let l=U(a),d=ue.now(),p=u.reduce((S,P)=>S.add(P.key),G()),g,v;return l.persistence.runTransaction("Locally write mutations","readwrite",S=>{let P=It(),N=G();return l.Os.getEntries(S,p).next(k=>{P=k,P.forEach(($,F)=>{F.isValidDocument()||(N=N.add($))})}).next(()=>l.localDocuments.getOverlayedDocuments(S,P)).next(k=>{g=k;let $=[];for(let F of u){let q=DI(F,g.get(F.key).overlayedDocument);q!=null&&$.push(new it(F.key,q,Zp(q.value.mapValue),Ke.exists(!0)))}return l.mutationQueue.addMutationBatch(S,d,$,u)}).next(k=>{v=k;let $=k.applyToLocalDocumentSet(g,N);return l.documentOverlayCache.saveOverlays(S,k.batchId,$)})}).then(()=>({batchId:v.batchId,changes:cm(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,u,l){let d=a.Ru[a.currentUser.toKey()];d||(d=new ie(j)),d=d.insert(u,l),a.Ru[a.currentUser.toKey()]=d}(r,i.batchId,t),await oi(r,i.changes),await vo(r.remoteStore)}catch(i){let s=El(i,"Failed to persist write");t.reject(s)}}async function Mm(n,e){let t=U(n);try{let r=await nE(t.localStore,e);e.targetChanges.forEach((i,s)=>{let a=t.Eu.get(s);a&&(H(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?H(a.lu,14607):i.removedDocuments.size>0&&(H(a.lu,42227),a.lu=!1))}),await oi(t,r,e)}catch(r){await tr(r)}}function wp(n,e,t){let r=U(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.Pu.forEach((s,a)=>{let u=a.view.va(e);u.snapshot&&i.push(u.snapshot)}),function(a,u){let l=U(a);l.onlineState=u;let d=!1;l.queries.forEach((p,g)=>{for(let v of g.wa)v.va(u)&&(d=!0)}),d&&Tl(l)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function RE(n,e,t){let r=U(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Eu.get(e),s=i&&i.key;if(s){let a=new ie(L.comparator);a=a.insert(s,We.newNoDocument(s,B.min()));let u=G().add(s),l=new Us(B.min(),new Map,new ie(j),a,u);await Mm(r,l),r.du=r.du.remove(s),r.Eu.delete(e),bl(r)}else await Pu(r.localStore,e,!1).then(()=>Qu(r,e,t)).catch(tr)}async function PE(n,e){let t=U(n),r=e.batch.batchId;try{let i=await tE(t.localStore,e);Um(t,r,null),Fm(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await oi(t,i)}catch(i){await tr(i)}}async function CE(n,e,t){let r=U(n);try{let i=await function(a,u){let l=U(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,u).next(g=>(H(g!==null,37113),p=g.keys(),l.mutationQueue.removeMutationBatch(d,g))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,u)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);Um(r,e,t),Fm(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await oi(r,i)}catch(i){await tr(i)}}function Fm(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function Um(n,e,t){let r=U(n),i=r.Ru[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function Qu(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||Bm(n,r)})}function Bm(n,e){n.Iu.delete(e.path.canonicalString());let t=n.du.get(e);t!==null&&(yl(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),bl(n))}function Ip(n,e,t){for(let r of t)r instanceof to?(n.Au.addReference(r.key,e),kE(n,r)):r instanceof no?(O(Al,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||Bm(n,r.key)):M(19791,{yu:r})}function kE(n,e){let t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(O(Al,"New document in limbo: "+t),n.Iu.add(r),bl(n))}function bl(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){let e=n.Iu.values().next().value;n.Iu.delete(e);let t=new L(te.fromString(e)),r=n.mu.next();n.Eu.set(r,new Wu(t)),n.du=n.du.insert(t,r),Pm(n.remoteStore,new Zr(et(pl(t.path)),r,"TargetPurposeLimboResolution",Fn.ue))}}async function oi(n,e,t){let r=U(n),i=[],s=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((u,l)=>{a.push(r.gu(l,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){let g=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(d){i.push(d);let g=Au.Es(l.targetId,d);s.push(g)}}))}),await Promise.all(a),r.hu.J_(i),await async function(l,d){let p=U(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>C.forEach(d,v=>C.forEach(v.Is,S=>p.persistence.referenceDelegate.addReference(g,v.targetId,S)).next(()=>C.forEach(v.ds,S=>p.persistence.referenceDelegate.removeReference(g,v.targetId,S)))))}catch(g){if(!nr(g))throw g;O(_l,"Failed to update sequence numbers: "+g)}for(let g of d){let v=g.targetId;if(!g.fromCache){let S=p.Fs.get(v),P=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(P);p.Fs=p.Fs.insert(v,N)}}}(r.localStore,s))}async function DE(n,e){let t=U(n);if(!t.currentUser.isEqual(e)){O(Al,"User change. New user:",e.toKey());let r=await Sm(t.localStore,e);t.currentUser=e,function(s,a){s.Vu.forEach(u=>{u.forEach(l=>{l.reject(new V(R.CANCELLED,a))})}),s.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await oi(t,r.Bs)}}function NE(n,e){let t=U(n),r=t.Eu.get(e);if(r&&r.lu)return G().add(r.key);{let i=G(),s=t.Tu.get(e);if(!s)return i;for(let a of s){let u=t.Pu.get(a);i=i.unionWith(u.view.tu)}return i}}function qm(n){let e=U(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Mm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=NE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=RE.bind(null,e),e.hu.J_=vE.bind(null,e.eventManager),e.hu.pu=wE.bind(null,e.eventManager),e}function OE(n){let e=U(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=PE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=CE.bind(null,e),e}var Yn=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=_o(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return eE(this.persistence,new Su,e.initialUser,this.serializer)}Du(e){return new Gs(Tu.Vi,this.serializer)}bu(e){return new Cu}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};Yn.provider={build:()=>new Yn};var Ju=class extends Yn{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){H(this.persistence.referenceDelegate instanceof Ks,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new lu(r,e.asyncQueue,t)}Du(e){let t=this.cacheSizeBytes!==void 0?Fe.withCacheSize(this.cacheSizeBytes):Fe.DEFAULT;return new Gs(r=>Ks.Vi(r,t),this.serializer)}};var ni=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>wp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=DE.bind(null,this.syncEngine),await yE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new zu}()}createDatastore(e){let t=_o(e.databaseInfo.databaseId),r=function(s){return new Vu(s)}(e.databaseInfo);return function(s,a,u,l){return new Fu(s,a,u,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,u){return new Bu(r,i,s,a,u)}(this.localStore,this.datastore,e.asyncQueue,t=>wp(this.syncEngine,t,0),function(){return Hs.C()?new Hs:new ku}())}createSyncEngine(e,t){return function(i,s,a,u,l,d,p){let g=new Hu(i,s,a,u,l,d);return p&&(g.fu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){let s=U(i);O(fn,"RemoteStore shutting down."),s.Ia.add(5),await si(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}};ni.provider={build:()=>new ni};var ro=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):gt("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}};var qt="FirestoreClient",Yu=class{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=me.UNAUTHENTICATED,this.clientId=Wr.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{O(qt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(O(qt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new Ge;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=El(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Ec(n,e){n.asyncQueue.verifyOperationInProgress(),O(qt,"Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Sm(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{Ft("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{O("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{Ft("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=e}async function Ep(n,e){n.asyncQueue.verifyOperationInProgress();let t=await VE(n);O(qt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>_p(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>_p(e.remoteStore,i)),n._onlineComponents=e}async function VE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){O(qt,"Using user provided OfflineComponentProvider");try{await Ec(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(i){return i.name==="FirebaseError"?i.code===R.FAILED_PRECONDITION||i.code===R.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Ft("Error using user provided cache. Falling back to memory cache: "+t),await Ec(n,new Yn)}}else O(qt,"Using default OfflineComponentProvider"),await Ec(n,new Ju(void 0));return n._offlineComponents}async function jm(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(O(qt,"Using user provided OnlineComponentProvider"),await Ep(n,n._uninitializedComponentsProvider._online)):(O(qt,"Using default OnlineComponentProvider"),await Ep(n,new ni))),n._onlineComponents}function xE(n){return jm(n).then(e=>e.syncEngine)}async function zm(n){let e=await jm(n),t=e.eventManager;return t.onListen=IE.bind(null,e.syncEngine),t.onUnlisten=AE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=EE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=bE.bind(null,e.syncEngine),t}function LE(n,e,t={}){let r=new Ge;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,u,l,d){let p=new ro({next:v=>{p.Ou(),a.enqueueAndForget(()=>xm(s,g));let S=v.docs.has(u);!S&&v.fromCache?d.reject(new V(R.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&v.fromCache&&l&&l.source==="server"?d.reject(new V(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(v)},error:v=>d.reject(v)}),g=new eo(pl(u.path),p,{includeMetadataChanges:!0,ka:!0});return Vm(s,g)}(await zm(n),n.asyncQueue,e,t,r)),r.promise}function ME(n,e,t={}){let r=new Ge;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,u,l,d){let p=new ro({next:v=>{p.Ou(),a.enqueueAndForget(()=>xm(s,g)),v.fromCache&&l.source==="server"?d.reject(new V(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(v)},error:v=>d.reject(v)}),g=new eo(u,p,{includeMetadataChanges:!0,ka:!0});return Vm(s,g)}(await zm(n),n.asyncQueue,e,t,r)),r.promise}function $m(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Tp=new Map;var Gm="firestore.googleapis.com",Ap=!0,io=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new V(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Gm,this.ssl=Ap}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Ap;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=bm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<YI)throw new V(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Hw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$m((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new V(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Xn=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new io({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new io(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Ac;switch(r.type){case"firstParty":return new Pc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Tp.get(t);r&&(O("ComponentProvider","Removing Datastore"),Tp.delete(t),r.terminate())}(this),Promise.resolve()}};function FE(n,e,t,r={}){var i;n=_t(n,Xn);let s=St(e),a=n._getSettings(),u=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),l=`${e}:${t}`;s&&(Ni(`https://${l}`),Oi("Firestore",!0)),a.host!==Gm&&a.host!==l&&Ft("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let d=Object.assign(Object.assign({},a),{host:l,ssl:s,emulatorOptions:r});if(!He(d,u)&&(n._setSettings(d),r.mockUserToken)){let p,g;if(typeof r.mockUserToken=="string")p=r.mockUserToken,g=me.MOCK_USER;else{p=$h(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let v=r.mockUserToken.sub||r.mockUserToken.user_id;if(!v)throw new V(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new me(v)}n._authCredentials=new bc(new Ds(p,g))}}var so=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Te=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Vt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ii(t,n._jsonSchema))return new n(e,r||null,new L(te.fromString(t.referencePath)))}};Te._jsonSchemaVersion="firestore/documentReference/1.0",Te._jsonSchema={type:ce("string",Te._jsonSchemaVersion),referencePath:ce("string")};var Vt=class n extends so{constructor(e,t,r){super(e,t,pl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Te(this.firestore,null,new L(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Km(n,e,...t){if(n=X(n),Cp("collection","path",e),n instanceof Xn){let r=te.fromString(e,...t);return zf(r),new Vt(n,null,r)}{if(!(n instanceof Te||n instanceof Vt))throw new V(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(te.fromString(e,...t));return zf(r),new Vt(n.firestore,null,r)}}function ai(n,e,...t){if(n=X(n),arguments.length===1&&(e=Wr.newId()),Cp("doc","path",e),n instanceof Xn){let r=te.fromString(e,...t);return jf(r),new Te(n,null,new L(r))}{if(!(n instanceof Te||n instanceof Vt))throw new V(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(te.fromString(e,...t));return jf(r),new Te(n.firestore,n instanceof Vt?n.converter:null,new L(r))}}var bp="AsyncQueue",oo=class{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Qs(this,"async_queue_retry"),this.oc=()=>{let r=Ic();r&&O(bp,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;let t=Ic();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;let t=Ic();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});let t=new Ge;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!nr(e))throw e;O(bp,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){let t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,gt("INTERNAL UNHANDLED ERROR: ",Sp(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);let i=qu.createAndSchedule(this,e,t,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&M(47125,{hc:Sp(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(let t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){let t=this.ec.indexOf(e);this.ec.splice(t,1)}};function Sp(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}var jt=class extends Xn{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new oo,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new oo(e),this._firestoreClient=void 0,await e}}};function Wm(n,e){let t=typeof n=="object"?n:Tn(),r=typeof n=="string"?n:e||Ls,i=Pt(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let s=zh("firestore");s&&FE(i,...s)}return i}function wo(n){if(n._terminated)throw new V(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||UE(n),n._firestoreClient}function UE(n){var e,t,r;let i=n._freezeSettings(),s=function(u,l,d,p){return new Oc(u,l,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,$m(p.experimentalLongPollingOptions),p.useFetchStreams,p.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new Yu(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(u){let l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}}(n._componentsProvider))}var xt=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Ae.fromBase64String(e))}catch(t){throw new V(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Ae.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ii(e,n._jsonSchema))return n.fromBase64String(e.bytes)}};xt._jsonSchemaVersion="firestore/bytes/1.0",xt._jsonSchema={type:ce("string",xt._jsonSchemaVersion),bytes:ce("string")};var Zn=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Le(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var ri=class{constructor(e){this._methodName=e}};var Lt=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return j(this._lat,e._lat)||j(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if(ii(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};Lt._jsonSchemaVersion="firestore/geoPoint/1.0",Lt._jsonSchema={type:ce("string",Lt._jsonSchemaVersion),latitude:ce("number"),longitude:ce("number")};var Mt=class n{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ii(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new n(e.vectorValues);throw new V(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};Mt._jsonSchemaVersion="firestore/vectorValue/1.0",Mt._jsonSchema={type:ce("string",Mt._jsonSchemaVersion),vectorValues:ce("object")};var BE=/^__.*__$/,Xu=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new it(e,this.data,this.fieldMask,t,this.fieldTransforms):new dn(e,this.data,t,this.fieldTransforms)}},ao=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new it(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function Hm(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ec:n})}}var Zu=class n{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return uo(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Hm(this.Ec)&&BE.test(e))throw this.wc('Document fields cannot begin and end with "__"')}},el=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||_o(e)}Dc(e,t,r,i=!1){return new Zu({Ec:e,methodName:t,bc:r,path:Le.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Qm(n){let e=n._freezeSettings(),t=_o(n._databaseId);return new el(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Jm(n,e,t,r,i,s={}){let a=n.Dc(s.merge||s.mergeFields?2:0,e,t,i);Sl("Data must be an object, but it was:",a,r);let u=Ym(r,a),l,d;if(s.merge)l=new Ue(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){let p=[];for(let g of s.mergeFields){let v=tl(e,g,t);if(!a.contains(v))throw new V(R.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);Zm(p,v)||p.push(v)}l=new Ue(p),d=a.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,d=a.fieldTransforms;return new Xu(new xe(u),l,d)}var co=class n extends ri{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};function qE(n,e,t,r){let i=n.Dc(1,e,t);Sl("Data must be an object, but it was:",i,r);let s=[],a=xe.empty();zt(r,(l,d)=>{let p=Rl(e,l,t);d=X(d);let g=i.gc(p);if(d instanceof co)s.push(p);else{let v=Io(d,g);v!=null&&(s.push(p),a.set(p,v))}});let u=new Ue(s);return new ao(a,u,i.fieldTransforms)}function jE(n,e,t,r,i,s){let a=n.Dc(1,e,t),u=[tl(e,r,t)],l=[i];if(s.length%2!=0)throw new V(R.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<s.length;v+=2)u.push(tl(e,s[v])),l.push(s[v+1]);let d=[],p=xe.empty();for(let v=u.length-1;v>=0;--v)if(!Zm(d,u[v])){let S=u[v],P=l[v];P=X(P);let N=a.gc(S);if(P instanceof co)d.push(S);else{let k=Io(P,N);k!=null&&(d.push(S),p.set(S,k))}}let g=new Ue(d);return new ao(p,g,a.fieldTransforms)}function Io(n,e){if(Xm(n=X(n)))return Sl("Unsupported field value:",e,n),Ym(n,e);if(n instanceof ri)return function(r,i){if(!Hm(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){let s=[],a=0;for(let u of r){let l=Io(u,i.yc(a));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=X(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return SI(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=ue.fromDate(r);return{timestampValue:zs(i.serializer,s)}}if(r instanceof ue){let s=new ue(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:zs(i.serializer,s)}}if(r instanceof Lt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof xt)return{bytesValue:ym(i.serializer,r._byteString)};if(r instanceof Te){let s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:gl(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Mt)return function(a,u){return{mapValue:{fields:{[ul]:{stringValue:ll},[Un]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw u.wc("VectorValues must only contain numeric values.");return ml(u.serializer,d)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${ol(r)}`)}(n,e)}function Ym(n,e){let t={};return Gp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):zt(n,(r,i)=>{let s=Io(i,e.Vc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Xm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ue||n instanceof Lt||n instanceof xt||n instanceof Te||n instanceof ri||n instanceof Mt)}function Sl(n,e,t){if(!Xm(t)||!kp(t)){let r=ol(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function tl(n,e,t){if((e=X(e))instanceof Zn)return e._internalPath;if(typeof e=="string")return Rl(n,e);throw uo("Field path arguments must be of type string or ",n,!1,void 0,t)}var zE=new RegExp("[~\\*/\\[\\]]");function Rl(n,e,t){if(e.search(zE)>=0)throw uo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Zn(...e.split("."))._internalPath}catch{throw uo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function uo(n,e,t,r,i){let s=r&&!r.isEmpty(),a=i!==void 0,u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=` in field ${r}`),a&&(l+=` in document ${i}`),l+=")"),new V(R.INVALID_ARGUMENT,u+n+l)}function Zm(n,e){return n.some(t=>t.isEqual(e))}var lo=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Te(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new nl(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(eg("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},nl=class extends lo{data(){return super.data()}};function eg(n,e){return typeof e=="string"?Rl(n,e):e instanceof Zn?e._internalPath:e._delegate._internalPath}function $E(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var rl=class{convertValue(e,t="none"){switch(Ut(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ee(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(vt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return zt(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;let s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Un].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>ee(a.doubleValue));return new Mt(s)}convertGeoPoint(e){return new Lt(ee(e.latitude),ee(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=po(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Jr(e));default:return null}}convertTimestamp(e){let t=yt(e);return new ue(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=te.fromString(e);H(Am(r),9688,{name:e});let i=new Ms(r.get(1),r.get(3)),s=new L(r.popFirst(5));return i.isEqual(t)||gt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function tg(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var on=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},an=class n extends lo{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new xn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(eg("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};an._jsonSchemaVersion="firestore/documentSnapshot/1.0",an._jsonSchema={type:ce("string",an._jsonSchemaVersion),bundleSource:ce("string","DocumentSnapshot"),bundleName:ce("string"),bundle:ce("string")};var xn=class extends an{data(e={}){return super.data(e)}},Ln=class n{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new on(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new xn(this._firestore,this._userDataWriter,r.key,r,new on(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(u=>{let l=new xn(i._firestore,i._userDataWriter,u.doc.key,u.doc,new on(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(u=>s||u.type!==3).map(u=>{let l=new xn(i._firestore,i._userDataWriter,u.doc.key,u.doc,new on(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter),d=-1,p=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),p=a.indexOf(u.doc.key)),{type:GE(u.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Wr.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function GE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}function Pl(n){n=_t(n,Te);let e=_t(n.firestore,jt);return LE(wo(e),n._key).then(t=>KE(e,n,t))}Ln._jsonSchemaVersion="firestore/querySnapshot/1.0",Ln._jsonSchema={type:ce("string",Ln._jsonSchemaVersion),bundleSource:ce("string","QuerySnapshot"),bundleName:ce("string"),bundle:ce("string")};var ho=class extends rl{constructor(e){super(),this.firestore=e}convertBytes(e){return new xt(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Te(this.firestore,null,t)}};function Cl(n){n=_t(n,so);let e=_t(n.firestore,jt),t=wo(e),r=new ho(e);return $E(n._query),ME(t,n._query).then(i=>new Ln(e,r,n,i))}function ci(n,e,t){n=_t(n,Te);let r=_t(n.firestore,jt),i=tg(n.converter,e,t);return Dl(r,[Jm(Qm(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Ke.none())])}function kl(n){return Dl(_t(n.firestore,jt),[new Qn(n._key,Ke.none())])}function Dl(n,e){return function(r,i){let s=new Ge;return r.asyncQueue.enqueueAndForget(async()=>SE(await xE(r),i,s)),s.promise}(wo(n),e)}function KE(n,e,t){let r=t.docs.get(e._key),i=new ho(n);return new an(n,i,e._key,r,new on(t.hasPendingWrites,t.fromCache),e.converter)}var il=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Qm(e)}set(e,t,r){this._verifyNotCommitted();let i=Tc(e,this._firestore),s=tg(i.converter,t,r),a=Jm(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(a.toMutation(i._key,Ke.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=Tc(e,this._firestore),a;return a=typeof(t=X(t))=="string"||t instanceof Zn?jE(this._dataReader,"WriteBatch.update",s._key,t,r,i):qE(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(a.toMutation(s._key,Ke.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=Tc(e,this._firestore);return this._mutations=this._mutations.concat(new Qn(t._key,Ke.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new V(R.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function Tc(n,e){if((n=X(n)).firestore!==e)throw new V(R.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function Nl(n){return wo(n=_t(n,jt)),new il(n,e=>Dl(n,e))}(function(e,t=!0){(function(i){er=i})(Ct),je(new Pe("firestore",(r,{instanceIdentifier:i,options:s})=>{let a=r.getProvider("app").getImmediate(),u=new jt(new Sc(r.getProvider("auth-internal")),new Cc(a,r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new V(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ms(d.options.projectId,p)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),u._setSettings(s),u},"PUBLIC").setMultipleInstances(!0)),Ve(Ff,Uf,e),Ve(Ff,Uf,"esm2017")})();var WE={apiKey:"AIzaSyANEqFgTIpfBB12vaXDgHKON0qTM_VMor0",authDomain:"keystone-44f75.firebaseapp.com",projectId:"keystone-44f75",storageBucket:"keystone-44f75.firebasestorage.app",messagingSenderId:"253016823390",appId:"1:253016823390:web:ce2eee09a91e8bdea9c6cf"},De=window.KS,Vl=_a(WE);try{Nd(Vl,{provider:new Ui("6Lep7yEuAAAAAD4FKDZlROZGBz24keyPmZ-QWGR7"),isTokenAutoRefreshEnabled:!0})}catch{}var de=dc(Vl),li=Wm(Vl),HE=10*60*1e3,QE=["ks-attempts","ks-study","ks-timer","ks-auth","ks-synced-uid","ks-last-pull","ks-avatar"],JE={"auth/invalid-credential":"Wrong email or password.","auth/wrong-password":"Wrong email or password.","auth/user-not-found":"No account with that email. Create one instead.","auth/invalid-email":"That email address does not look right.","auth/email-already-in-use":"An account with that email already exists. Sign in instead.","auth/weak-password":"Use a password with at least 8 characters.","auth/missing-password":"Enter your password.","auth/too-many-requests":"Too many attempts. Wait a few minutes and try again.","auth/network-request-failed":"No connection. Check your internet and try again.","auth/popup-closed-by-user":"The Google window was closed before finishing.","auth/cancelled-popup-request":"The Google window was closed before finishing.","auth/popup-blocked":"Your browser blocked the Google window. Allow pop-ups for this site and try again.","auth/operation-not-allowed":"This sign-in method is not turned on yet.","auth/unauthorized-domain":"This website is not yet allowed to sign in. Ask the site owner to add it in Firebase.","auth/requires-recent-login":"For safety, sign in again and then retry.","permission-denied":"Cloud rules refused this. Ask the site owner to publish the Firestore rules."},YE=n=>JE[n&&n.code]||"Something went wrong. Please try again.",st=n=>async(...e)=>{try{return{ok:!0,value:await n(...e)}}catch(t){return{ok:!1,error:YE(t),code:t&&t.code}}},Eo=n=>{try{return localStorage.getItem(n)}catch{return null}},ui=(n,e)=>{try{localStorage.setItem(n,e)}catch{}},xl=n=>{try{localStorage.removeItem(n)}catch{}},ne=null,Ll=!1,sg=[],Ao=n=>Km(li,"users",n,"attempts"),Ml=n=>ai(li,"users",n,"meta","study"),bo=n=>ai(li,"users",n,"meta","profile"),og=n=>({t:n.t,title:String(n.title||""),mode:String(n.mode||""),total:n.total,max:n.max,correct:n.correct,wrong:n.wrong,skipped:n.skipped,secs:n.secs||0,rows:JSON.stringify(n.rows)}),XE=n=>{try{let e={...n,rows:JSON.parse(n.rows)};return Array.isArray(e.rows)?e:null}catch{return null}};async function ZE(n){ne&&await ci(ai(Ao(ne.uid),String(n.t)),og(n))}async function To(){if(ne){let n=De.study();await ci(Ml(ne.uid),{data:JSON.stringify(n),updated:n.updated||Date.now()})}}var ng=null;function eT(){clearTimeout(ng),ng=setTimeout(()=>To().catch(()=>{}),1500)}async function ag(n){let e=await Cl(Ao(n));for(let t=0;t<e.docs.length;t+=400){let r=Nl(li);e.docs.slice(t,t+400).forEach(i=>r.delete(i.ref)),await r.commit()}}function tT(n,e){let t=De.study();Object.assign(t,n);let r=new Set(n.sessions.map(u=>u.t+"|"+u.subject));t.sessions=n.sessions.concat(e.sessions.filter(u=>!r.has(u.t+"|"+u.subject))).sort((u,l)=>u.t-l.t);let i=Array.isArray(e.tasks)?e.tasks:[],s=Array.isArray(n.tasks)?n.tasks:[],a=new Set(s.map(u=>u.id));return t.tasks=s.concat(i.filter(u=>!a.has(u.id))),(e.updated||0)>(n.updated||0)&&(t.reminder=e.reminder||t.reminder,t.plan=e.plan||t.plan),t.updated=Date.now(),t}async function cg(n){if(!ne)return!1;let e=ne.uid,t=Eo("ks-synced-uid")!==e;if(!n&&!t&&Date.now()-Number(Eo("ks-last-pull")||0)<HE)return!1;let r=!1,i=await Cl(Ao(e)),s=[];i.forEach(P=>{let N=XE(P.data());N&&s.push(N)});let a=De.attempts(),u=new Set(a.map(P=>P.t)),l=new Set(s.map(P=>P.t)),d=s.filter(P=>!u.has(P.t));d.length&&(De.write("ks-attempts",a.concat(d).sort((P,N)=>P.t-N.t).slice(-200)),r=!0);let p=a.filter(P=>!l.has(P.t));for(let P=0;P<p.length;P+=400){let N=Nl(li);p.slice(P,P+400).forEach(k=>N.set(ai(Ao(e),String(k.t)),og(k))),await N.commit()}let g=await Pl(Ml(e)),v=null;if(g.exists())try{v=JSON.parse(g.data().data)}catch{v=null}let S=De.study();v&&typeof v=="object"?(v.sessions=Array.isArray(v.sessions)?v.sessions:[],t?(De.write("ks-study",tT(S,v)),r=!0,await To()):(v.updated||0)>(S.updated||0)?(De.write("ks-study",v),r=!0):(S.updated||0)>(v.updated||0)&&await To()):(S.sessions.length||S.tasks&&S.tasks.length||S.reminder.on||S.plan.target)&&await To();try{let P=await Pl(bo(e)),N=P.exists()&&typeof P.data().avatar=="string"?P.data().avatar:"",k=Eo("ks-avatar")||"";N&&N!==k&&(t||!k)?(ui("ks-avatar",N),De.renderAccount&&De.renderAccount(),r=r||!1):k&&k!==N&&await ci(bo(e),{avatar:k})}catch{}return ui("ks-synced-uid",e),ui("ks-last-pull",String(Date.now())),r}function rg(){QE.forEach(xl)}function ug(n){ui("ks-auth",JSON.stringify({e:n.email||"",n:n.displayName||"",p:n.photoURL||""}))}function Ol(){Ll&&(sg.forEach(n=>{try{n(ne)}catch{}}),De.renderAccount&&De.renderAccount())}De.hook=(n,e)=>{ne&&(n==="attempt"?ZE(e).catch(()=>{}):n==="study"?eT():n==="clear"&&ag(ne.uid).catch(()=>{}))};async function lg(n){try{let e=await n.getIdToken();return(await fetch("/auth/session",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:e})})).ok}catch{return!1}}var ig=()=>fetch("/auth/logout",{method:"POST",credentials:"same-origin"}).catch(()=>{});Is(de,n=>{n&&lg(n)});oc(de,async n=>{if(ne=n,Ll=!0,n){ug(n),Ol();try{if(await cg(!1)){let e=Number(sessionStorage.getItem("ks-reload")||0);if(Date.now()-e>15e3&&!/^\/(login|account)/.test(location.pathname)){sessionStorage.setItem("ks-reload",String(Date.now())),location.reload();return}}}catch{}}else xl("ks-auth"),Ol()});window.KSCloud={get user(){return ne},onChange:n=>{sg.push(n),Ll&&n(ne)},profile:()=>ne&&{email:ne.email||"",name:ne.displayName||"",photo:ne.photoURL||"",verified:ne.emailVerified,created:ne.metadata&&ne.metadata.creationTime?Date.parse(ne.metadata.creationTime):0,providers:ne.providerData.map(n=>n.providerId)},updateName:st(async n=>{if(!de.currentUser)throw new Error("no user");await sc(de.currentUser,{displayName:String(n).trim().slice(0,40)}),ug(de.currentUser),Ol()}),signIn:st((n,e)=>ic(de,n,e)),signUp:st(async(n,e)=>{if(e.length<8)throw Object.assign(new Error("short"),{code:"auth/weak-password"});let t=await rc(de,n,e);try{await ws(t.user)}catch{}return t}),resendVerification:st(async()=>{de.currentUser&&await ws(de.currentUser)}),get verified(){return!!(de.currentUser&&de.currentUser.emailVerified)},google:st(()=>hc(de,new tn)),reset:st(n=>nc(de,n)),syncNow:st(()=>cg(!0)),setAvatar:st(async n=>{n?ui("ks-avatar",n):xl("ks-avatar"),ne&&await ci(bo(ne.uid),{avatar:n||""}),De.renderAccount&&De.renderAccount()}),session:async()=>de.currentUser?lg(de.currentUser):!1,signOut:st(async()=>{await ig(),await ac(de),rg()}),deleteAccount:st(async()=>{if(!de.currentUser)throw new Error("no user");let n=de.currentUser.uid;await ag(n),await kl(Ml(n));try{await kl(bo(n))}catch{}await cc(de.currentUser),await ig(),rg()}),lastSync:()=>Number(Eo("ks-last-pull")||0)};document.dispatchEvent(new Event("kscloud:ready"));})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app-check/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
