"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9262],{3591:(e,n,s)=>{s.r(n),s.d(n,{Highlight:()=>l,assets:()=>c,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"tutorial-basics/markdown-features","title":"Markdown Features","description":"Docusaurus supports Markdown and a few additional features.","source":"@site/docs/tutorial-basics/markdown-features.mdx","sourceDirName":"tutorial-basics","slug":"/tutorial-basics/markdown-features","permalink":"/prabhav.tech/docs/tutorial-basics/markdown-features","draft":false,"unlisted":false,"editUrl":"https://github.com/dograprabhav/prabhav.tech/tree/master/docs/tutorial-basics/markdown-features.mdx","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"tutorialSidebar","previous":{"title":"Create a Blog Post","permalink":"/prabhav.tech/docs/tutorial-basics/create-a-blog-post"},"next":{"title":"Deploy your site","permalink":"/prabhav.tech/docs/tutorial-basics/deploy-your-site"}}');var a=s(4848),t=s(8453);const o={sidebar_position:4},i="Markdown Features",c={},l=({children:e,color:n})=>(0,a.jsx)("span",{style:{backgroundColor:n,borderRadius:"20px",color:"#fff",padding:"10px",cursor:"pointer"},onClick:()=>{alert(`You clicked the color ${n} with label ${e}`)},children:e}),d=[{value:"Front Matter",id:"front-matter",level:2},{value:"Links",id:"links",level:2},{value:"Images",id:"images",level:2},{value:"Code Blocks",id:"code-blocks",level:2},{value:"Admonitions",id:"admonitions",level:2},{value:"MDX and React Components",id:"mdx-and-react-components",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",p:"p",pre:"pre",strong:"strong",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"markdown-features",children:"Markdown Features"})}),"\n",(0,a.jsxs)(n.p,{children:["Docusaurus supports ",(0,a.jsx)(n.strong,{children:(0,a.jsx)(n.a,{href:"https://daringfireball.net/projects/markdown/syntax",children:"Markdown"})})," and a few ",(0,a.jsx)(n.strong,{children:"additional features"}),"."]}),"\n",(0,a.jsx)(n.h2,{id:"front-matter",children:"Front Matter"}),"\n",(0,a.jsxs)(n.p,{children:["Markdown documents have metadata at the top called ",(0,a.jsx)(n.a,{href:"https://jekyllrb.com/docs/front-matter/",children:"Front Matter"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-text",metastring:'title="my-doc.md"',children:"// highlight-start\n---\nid: my-doc-id\ntitle: My document title\ndescription: My document description\nslug: /my-custom-url\n---\n// highlight-end\n\n## Markdown heading\n\nMarkdown text with [links](./hello.md)\n"})}),"\n",(0,a.jsx)(n.h2,{id:"links",children:"Links"}),"\n",(0,a.jsx)(n.p,{children:"Regular Markdown links are supported, using url paths or relative file paths."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-md",children:"Let's see how to [Create a page](/create-a-page).\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-md",children:"Let's see how to [Create a page](./create-a-page.md).\n"})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.strong,{children:"Result:"})," Let's see how to ",(0,a.jsx)(n.a,{href:"/prabhav.tech/docs/tutorial-basics/create-a-page",children:"Create a page"}),"."]}),"\n",(0,a.jsx)(n.h2,{id:"images",children:"Images"}),"\n",(0,a.jsx)(n.p,{children:"Regular Markdown images are supported."}),"\n",(0,a.jsxs)(n.p,{children:["You can use absolute paths to reference images in the static directory (",(0,a.jsx)(n.code,{children:"static/img/docusaurus.png"}),"):"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-md",children:"![Docusaurus logo](/img/docusaurus.png)\n"})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Docusaurus logo",src:s(7965).A+"",width:"256",height:"256"})}),"\n",(0,a.jsx)(n.p,{children:"You can reference images relative to the current file as well. This is particularly useful to colocate images close to the Markdown files using them:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-md",children:"![Docusaurus logo](./img/docusaurus.png)\n"})}),"\n",(0,a.jsx)(n.h2,{id:"code-blocks",children:"Code Blocks"}),"\n",(0,a.jsx)(n.p,{children:"Markdown code blocks are supported with Syntax highlighting."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-md",children:'```jsx title="src/components/HelloDocusaurus.js"\nfunction HelloDocusaurus() {\n  return <h1>Hello, Docusaurus!</h1>;\n}\n```\n'})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-jsx",metastring:'title="src/components/HelloDocusaurus.js"',children:"function HelloDocusaurus() {\n  return <h1>Hello, Docusaurus!</h1>;\n}\n"})}),"\n",(0,a.jsx)(n.h2,{id:"admonitions",children:"Admonitions"}),"\n",(0,a.jsx)(n.p,{children:"Docusaurus has a special syntax to create admonitions and callouts:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-md",children:":::tip[My tip]\n\nUse this awesome feature option\n\n:::\n\n:::danger[Take care]\n\nThis action is dangerous\n\n:::\n"})}),"\n",(0,a.jsx)(n.admonition,{title:"My tip",type:"tip",children:(0,a.jsx)(n.p,{children:"Use this awesome feature option"})}),"\n",(0,a.jsx)(n.admonition,{title:"Take care",type:"danger",children:(0,a.jsx)(n.p,{children:"This action is dangerous"})}),"\n",(0,a.jsx)(n.h2,{id:"mdx-and-react-components",children:"MDX and React Components"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://mdxjs.com/",children:"MDX"})," can make your documentation more ",(0,a.jsx)(n.strong,{children:"interactive"})," and allows using any ",(0,a.jsx)(n.strong,{children:"React components inside Markdown"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-jsx",children:"export const Highlight = ({children, color}) => (\n  <span\n    style={{\n      backgroundColor: color,\n      borderRadius: '20px',\n      color: '#fff',\n      padding: '10px',\n      cursor: 'pointer',\n    }}\n    onClick={() => {\n      alert(`You clicked the color ${color} with label ${children}`)\n    }}>\n    {children}\n  </span>\n);\n\nThis is <Highlight color=\"#25c2a0\">Docusaurus green</Highlight> !\n\nThis is <Highlight color=\"#1877F2\">Facebook blue</Highlight> !\n"})}),"\n","\n",(0,a.jsxs)(n.p,{children:["This is ",(0,a.jsx)(l,{color:"#25c2a0",children:"Docusaurus green"})," !"]}),"\n",(0,a.jsxs)(n.p,{children:["This is ",(0,a.jsx)(l,{color:"#1877F2",children:"Facebook blue"})," !"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},7965:(e,n,s)=>{s.d(n,{A:()=>r});const r=s.p+"assets/images/docusaurus-6897e6ecb789cb31349680f95894a9c1.png"},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>i});var r=s(6540);const a={},t=r.createContext(a);function o(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);