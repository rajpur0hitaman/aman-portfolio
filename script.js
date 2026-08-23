const PLAYER_URL="https://player.cloudinary.com/embed/?cloud_name=syz3hyeu&public_id=fa676365-b791-4ce3-a965-49cee639bfaa_876DC2F";
const projects=[
{name:"Portfolio Showreel",cat:"all",label:"SHORT FORM · DOCUMENTARY · MOTION GRAPHICS",image:"portfolio-cover.png",video:true},
{name:"Short Form Work",cat:"short",label:"SHORT FORM CONTENT",image:"portfolio-cover.png",video:true},
{name:"Motion & Visual Work",cat:"motion",label:"MOTION GRAPHICS",image:"portfolio-cover.png",video:true},
{name:"Documentary Work",cat:"doc",label:"DOCUMENTARY",image:"portfolio-cover.png",video:true}
];
const grid=document.querySelector("#workGrid");
const modal=document.querySelector("#videoModal");
const player=document.querySelector("#portfolioPlayer");
function openVideo(){player.src=PLAYER_URL; modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open")}
function closeVideo(){player.src="about:blank"; modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.classList.remove("modal-open")}
function render(filter="all"){
 const list=filter==="all"?[projects[0]]:projects.filter(p=>p.cat===filter);
 grid.innerHTML=list.map((p,i)=>`<button class="project" type="button" data-video="${p.video?"1":"0"}"><div class="project-visual" style="background-image:url('${p.image}');background-size:cover;background-position:center"><span class="project-play">▶</span></div><div class="project-info"><div><h3>${p.name}</h3><small>${p.label}</small></div><span>↗</span></div></button>`).join("");
 grid.querySelectorAll(".project[data-video="1"]").forEach(el=>el.addEventListener("click",openVideo));
}
render();
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)}));
document.querySelectorAll("[data-close-video]").forEach(el=>el.addEventListener("click",closeVideo));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))closeVideo()});
const scene=document.querySelector("#scene");
if (window.matchMedia("(pointer:fine)").matches) {
document.addEventListener("mousemove",e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;scene.style.transform=`rotateY(${x*8}deg) rotateX(${-y*5}deg)`;document.querySelector("#cursor").style.left=e.clientX+"px";document.querySelector("#cursor").style.top=e.clientY+"px"});
}
addEventListener("scroll",()=>{document.querySelector("#progress").style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+"%"});
