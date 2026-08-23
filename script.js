const projects=[
{name:"Tech Short / 01",cat:"short",label:"SHORT FORM",link:"YOUR_PROJECT_LINK_1",bg:"radial-gradient(circle at 30% 20%,#777,#161616 45%,#050505)"},
{name:"Story / 01",cat:"doc",label:"DOCUMENTARY",link:"YOUR_PROJECT_LINK_2",bg:"linear-gradient(135deg,#343434,#090909)"},
{name:"Motion Study / 01",cat:"motion",label:"MOTION GRAPHICS",link:"YOUR_PROJECT_LINK_3",bg:"radial-gradient(circle,#555,#101010 55%,#050505)"},
{name:"Brand Film / 01",cat:"commercial",label:"COMMERCIAL",link:"YOUR_PROJECT_LINK_4",bg:"linear-gradient(145deg,#454545,#0b0b0b)"},
{name:"Tech Short / 02",cat:"short",label:"SHORT FORM",link:"YOUR_PROJECT_LINK_5",bg:"linear-gradient(135deg,#222,#666,#080808)"},
{name:"Motion Study / 02",cat:"motion",label:"MOTION GRAPHICS",link:"YOUR_PROJECT_LINK_6",bg:"radial-gradient(circle at 70% 30%,#888,#111 50%)"}
];
const grid=document.querySelector("#workGrid");
function render(filter="all"){grid.innerHTML=projects.filter(p=>filter==="all"||p.cat===filter).map(p=>`<a class="project" href="${p.link}" target="_blank" rel="noopener"><div class="project-visual" style="--bg:${p.bg}"></div><div class="project-info"><div><h3>${p.name}</h3><small>${p.label}</small></div><span>↗</span></div></a>`).join("")}
render();
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)}));
const scene=document.querySelector("#scene");document.addEventListener("mousemove",e=>{const x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);scene.style.transform=`rotateY(${x*8}deg) rotateX(${-y*5}deg)`;document.querySelector("#cursor").style.left=e.clientX+"px";document.querySelector("#cursor").style.top=e.clientY+"px"});
addEventListener("scroll",()=>{document.querySelector("#progress").style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+"%"});
