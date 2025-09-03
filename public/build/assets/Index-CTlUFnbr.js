import{r as l,j as e,H as d,L as s}from"./app-DyEdge20.js";import{B as m}from"./button-D3OwELb8.js";import{W as h,m as x}from"./WebLayout-SFo7rAmz.js";import{A as g}from"./arrow-right-GbT6LwHD.js";/* empty css            */import"./createLucideIcon-CFm_GpvR.js";import"./use-mobile-DGsOrUmJ.js";import"./index-Df_DPcC1.js";import"./index-BXIrDaaF.js";import"./index-DDBZ5q__.js";import"./floating-ui.react-dom-Bl6OpAys.js";import"./chevron-down-DZvbY19g.js";function S({services:i}){const[c,a]=l.useState(""),n="/images/logo.png";return l.useEffect(()=>{let t;if(Array.isArray(i)&&i.length>0){const r=i.map(o=>o?.image?.trim()).filter(o=>o);r.length>1?(a(r[Math.floor(Math.random()*r.length)]),t=setInterval(()=>{const o=r[Math.floor(Math.random()*r.length)];a(o)},3e3)):a(r[0]||n)}else a(n);return()=>{t&&clearInterval(t)}},[i]),e.jsxs(h,{children:[e.jsx(d,{title:"Our Services"}),e.jsxs("div",{children:[e.jsx("style",{children:`
        .team-hero-bg {
          background-image: linear-gradient(
              to right,
              rgba(0, 70, 173, 0.85),
              rgba(0, 160, 233, 0.85)
            ),
            url(${c});
          background-size: cover;
          background-position: center;
        }
        .service-hover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 112, 243, 0.65);
    color: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    text-align: center;
    transform: translateY(calc(100% - 60px));
    transition: transform 0.3s ease-in-out;
    height: 100%;
  }
    .service-card{
        height:500px
    }
  .service-card:hover .service-hover {
    transform: translateY(0);
  }
  .service-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 1rem;
    transition: all 0.3s ease-in-out;
  }
  .service-card:hover .service-title {
    background-color: transparent;
    position: relative;
  }
  .service-content {
    opacity: 0;
    transition: opacity 0.2s ease-in-out 0.1s;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .service-card:hover .service-content {
    opacity: 1;
  }
        .skeleton {
          position: relative;
          overflow: hidden;
          background-color: #e2e8f0;
          border-radius: 0.5rem;
        }
        .skeleton::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 1.2s infinite;
        }
        @keyframes shimmer {
          100% {
            left: 100%;
          }
        }
      `}),e.jsx("section",{className:"team-hero-bg py-20 pt-32 text-white",children:e.jsx("div",{className:"container mx-auto px-4",children:e.jsxs("div",{className:"max-w-3xl",children:[e.jsx("h1",{className:"mb-6 text-4xl font-bold md:text-5xl",children:"Our Services"}),e.jsx("p",{className:"text-xl text-white/90",children:"With over five decades of experience, we provide comprehensive engineering and construction services to meet the diverse needs of our clients."})]})})}),e.jsx("section",{className:"py-16",children:e.jsx("div",{className:"container mx-auto px-4",children:e.jsx("div",{className:"grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",children:i&&i.map((t,r)=>e.jsxs(x.div,{initial:{opacity:0,y:-50},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:r*.1,duration:.5},className:"service-card relative h-72 overflow-hidden rounded-lg shadow-md",children:[e.jsx("img",{src:t.image||"/placeholder.jpg",alt:t.title,className:"h-full w-full rounded-lg object-cover"}),e.jsxs("div",{className:"service-hover rounded-lg",children:[e.jsx(s,{href:`/services/${t.slug}`,className:"flex items-center justify-center gap-2 font-semibold uppercase",children:e.jsx("div",{className:"text-lg font-bold",children:t.title})}),e.jsxs("div",{className:"service-content",children:[e.jsx("p",{className:"mb-4 line-clamp-5",children:t.description}),e.jsxs(s,{href:`/services/${t.slug}`,className:"flex items-center justify-center gap-2 font-semibold underline",children:["Learn More ",e.jsx(g,{size:16})]})]})]})]},t.id))})})}),e.jsx("section",{className:"bg-oki-gray-light py-16",children:e.jsxs("div",{className:"container mx-auto px-4 text-center",children:[e.jsx("h2",{className:"mb-6 text-3xl font-bold text-oki-gray-dark",children:"Need a Customized Solution?"}),e.jsx("p",{className:"mx-auto mb-8 max-w-2xl text-lg text-gray-600",children:"Our team of experts is ready to work with you to develop tailored solutions for your specific project requirements."}),e.jsx(s,{to:"/contact",children:e.jsx(m,{className:"bg-oki-red px-8 py-6 text-white hover:bg-oki-red/90",children:"Request a Consultation"})})]})})]})]})}export{S as default};
