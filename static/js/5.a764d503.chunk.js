(this["webpackJsonpfirst-node-project"]=this["webpackJsonpfirst-node-project"]||[]).push([[5],{293:function(e,t,c){"use strict";c.r(t);var r=c(5),n=c(0),s=c.n(n),j=c(13),i=c(142),u=c(2),o=function(){var e=Object(j.c)(),t=Object(j.d)((function(e){return e.chat.status}));return Object(n.useEffect)((function(){return e(Object(i.c)()),function(){e(Object(i.d)())}}),[]),Object(u.jsxs)("div",{children:["error"===t&&Object(u.jsx)("div",{children:"Some error occured please refresh page"}),Object(u.jsx)(b,{}),Object(u.jsx)(a,{})]})},b=function(){var e=Object(n.useRef)(null),t=Object(j.d)((function(e){return e.chat.messages})),c=Object(n.useState)(!1),s=Object(r.a)(c,2),i=s[0],o=s[1];return Object(n.useEffect)((function(){var t;i&&(null===(t=e.current)||void 0===t||t.scrollIntoView({behavior:"smooth"}))}),[t]),Object(u.jsxs)("div",{style:{height:"400px",overflowY:"auto"},onScroll:function(e){var t=e.currentTarget;Math.abs(t.scrollHeight-t.scrollTop-t.clientHeight)<300?!i&&o(!0):i&&o(!1)},children:[t.map((function(e){return Object(u.jsx)(d,{message:e},e.id)})),Object(u.jsx)("div",{ref:e})]})},a=function(){var e=Object(n.useState)(""),t=Object(r.a)(e,2),c=t[0],s=t[1],o=Object(j.c)(),b=Object(j.d)((function(e){return e.chat.status}));return Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{children:Object(u.jsx)("textarea",{onChange:function(e){return s(e.currentTarget.value)},value:c})}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{disabled:"ready"!==b,onClick:function(){c&&(o(Object(i.b)(c)),s(""))},children:"Send"})})]})},d=s.a.memo((function(e){var t=e.message;return Object(u.jsxs)("div",{children:[Object(u.jsx)("img",{src:t.photo,style:{width:"30px"}})," ",Object(u.jsx)("b",{children:t.userName}),Object(u.jsx)("br",{}),t.message,Object(u.jsx)("hr",{})]})}));t.default=function(){return Object(u.jsx)("div",{children:Object(u.jsx)(o,{})})}}}]);
//# sourceMappingURL=5.a764d503.chunk.js.map