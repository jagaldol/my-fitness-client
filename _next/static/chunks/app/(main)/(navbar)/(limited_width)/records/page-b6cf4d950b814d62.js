(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[279],{86935:function(e,t,s){Promise.resolve().then(s.bind(s,7820)),Promise.resolve().then(s.bind(s,11443))},90908:function(e,t,s){"use strict";s.d(t,{Z:function(){return a}});var n=s(57437);function a(e){let{children:t}=e;return(0,n.jsx)("section",{className:"bg-content-box rounded-md p-2 w-full",children:t})}},11443:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return m}});var n=s(57437),a=s(34050),i=s(36549),r=s(2265),l=s(90908),c=s(45967),o=s(70784),u=s(84406),d=s(42151),f=s.n(d);function h(e){let{session:t}=e,s=f()(t.date,"YYYY-MM-DD"),[a,i]=(0,r.useState)(!1);return(0,n.jsx)(l.Z,{children:(0,n.jsxs)("div",{className:"pt-3 relative",children:[(0,n.jsx)("button",{className:"flex justify-end items-start w-full ".concat(a?"h-fit":"h-full"," absolute right-0 top-2"),type:"button","aria-label":"토글 버튼",onClick:()=>i(!a),children:(0,n.jsx)(o.Yc6,{className:"text-4xl transition-all ".concat(a?"rotate-180":"")})}),(0,n.jsx)("div",{className:"flex items-center text-xl gap-3 px-5",children:(0,n.jsx)("h2",{className:"font-bold",children:"".concat(s.format("M"),"월 ").concat(s.format("D"),"일(").concat((0,c.hd)(s.day()),")")})}),(0,n.jsx)("div",{className:"p-2",children:(0,n.jsx)(u.Z,{session:t,shortView:!a})})]})})}var x=s(64227);function m(){let{data:e,fetchNextPage:t,hasNextPage:s}=(0,a.N)({initialData:void 0,initialPageParam:1,queryKey:["/sessions"],queryFn:async e=>{let{pageParam:t=1}=e;try{return(await i.Z.get("/sessions",{params:{page:t}})).data.response}catch(e){return null}},getNextPageParam:(e,t,s)=>{if(e&&e.sessions.length>0)return s+1}}),l=(0,r.useCallback)(async(e,n)=>{let[a]=e;a.isIntersecting&&(n.unobserve(a.target),s&&(await t(),n.observe(a.target)))},[s,t]),{targetRef:c}=(0,x.Z)(l);return(0,n.jsxs)(n.Fragment,{children:[null==e?void 0:e.pages.map(e=>null==e?void 0:e.sessions.map(e=>(0,n.jsx)(h,{session:e},e.id))),s&&(0,n.jsx)("div",{ref:c})]})}}},function(e){e.O(0,[691,51,990,147,329,846,250,148,198,971,69,744],function(){return e(e.s=86935)}),_N_E=e.O()}]);