(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[425],{25374:function(t,e,n){Promise.resolve().then(n.t.bind(n,25250,23)),Promise.resolve().then(n.bind(n,3185)),Promise.resolve().then(n.bind(n,13265)),Promise.resolve().then(n.bind(n,59583))},3185:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return a}});var r=n(57437),u=n(20318),i=n(36549),s=n(47907),o=n(41310),c=n(8179),l=n(70784);function a(){let t=(0,u.Z)(),e=(0,s.useRouter)(),{addSuccessToast:n}=(0,o.Z)(),{mutate:a}=(0,c.Z)(()=>i.Z.post("/logout"));return(0,r.jsxs)("button",{type:"button",className:"text-text-gray flex gap-1 items-center",onClick:()=>{a(null,{onSettled:()=>{n("로그아웃 되었습니다."),e.replace("/login"),t()}})},children:[(0,r.jsx)(l.lE7,{className:"text-xl"}),(0,r.jsx)("span",{children:"로그아웃"})]})}},13265:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return i}});var r=n(57437),u=n(56787);function i(){let{userInfo:t,isFetched:e}=(0,u.Z)();return e&&(null==t?void 0:t.memo)!==""?(0,r.jsx)("p",{children:t.memo}):(0,r.jsx)("p",{className:"text-text-gray",children:"메모가 없습니다."})}},59583:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return i}});var r=n(57437),u=n(56787);function i(){let{userInfo:t,isFetched:e}=(0,u.Z)();return(0,r.jsx)("span",{children:e?null==t?void 0:t.name:""})}},20318:function(t,e,n){"use strict";n.d(e,{Z:function(){return s}});var r=n(32153),u=n(2419),i=n(50399);function s(){let t=(0,r.Zl)(i.j);return()=>{t(0),(0,u.l6)()}}},8179:function(t,e,n){"use strict";n.d(e,{Z:function(){return i}});var r=n(47082),u=n(20568);function i(t){let e=(0,r.NL)(),{mutate:n}=(0,u.D)({mutationFn:t});return{mutate:n,queryClient:e}}},41310:function(t,e,n){"use strict";n.d(e,{Z:function(){return i}});var r=n(32153),u=n(83168);function i(){let t=(0,r.Zl)(u.Z);return{addSuccessToast:e=>{t(t=>[...t,{id:Date.now(),type:"success",message:e}])},addWarningToast:e=>{t(t=>[...t,{id:Date.now(),type:"warning",message:e}])},addErrorToast:e=>{t(t=>[...t,{id:Date.now(),type:"error",message:e}])}}}},56787:function(t,e,n){"use strict";n.d(e,{Z:function(){return o}});var r=n(47082),u=n(73667),i=n(20568),s=n(36549);function o(){let t=(0,r.NL)(),{data:e,isFetched:n}=(0,u.a)({queryKey:["/users/mine"],queryFn:async()=>s.Z.get("/users/mine").then(t=>t.data.response),staleTime:3e5}),{mutate:o}=(0,i.D)({mutationFn:t=>s.Z.put("/users/mine",t),onSuccess:()=>{t.invalidateQueries({queryKey:["/users/mine"]}).then()}});return{userInfo:e,isFetched:n,updateUserInfo:o}}},50399:function(t,e,n){"use strict";n.d(e,{j:function(){return u}});var r=n(32153);let u=(0,r.cn)({key:"userIdState",default:0});(0,r.nZ)({key:"isLoginState",get:t=>{let{get:e}=t;return 0!==e(u)}})},83168:function(t,e,n){"use strict";let r=(0,n(32153).cn)({key:"toastState",default:[]});e.Z=r},36549:function(t,e,n){"use strict";let r=n(7908).default.create({baseURL:"".concat("https://server.jagaldol.com/fitness-api"),withCredentials:!0});e.Z=r},2419:function(t,e,n){"use strict";function r(t){localStorage.setItem("jwt",t)}function u(){localStorage.removeItem("jwt")}function i(t){let e="";if(t)e=t;else{let t=localStorage.getItem("jwt");e=null!=t?t:e}if(null===e)return null;let n=e.split(".");return e.startsWith("Bearer ")&&3===n.length?JSON.parse(atob(n[1])):null}function s(t){let e=i(t);return e?e.exp:null}function o(t){let e=i(t);return e?e.id:null}function c(){return localStorage.getItem("jwt")}n.d(e,{He:function(){return c},LJ:function(){return r},Ld:function(){return s},l6:function(){return u},sk:function(){return o},ss:function(){return i}})},73667:function(t,e,n){"use strict";n.d(e,{a:function(){return i}});var r=n(86968),u=n(22438);function i(t,e){return(0,u.r)(t,r.z,e)}}},function(t){t.O(0,[691,51,147,329,846,250,971,69,744],function(){return t(t.s=25374)}),_N_E=t.O()}]);