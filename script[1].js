const projects=[
{name:"Portfolio Showreel",cat:"all",label:"SHORT FORM · DOCUMENTARY · MOTION GRAPHICS",link:"https://drive.google.com/file/d/1xhWRVgriNpz0bWshNWGkTZn8Grjb3H5h/view?usp=drivesdk",image:"portfolio-cover.jpg"},
{name:"Short Form Work",cat:"short",label:"SHORT FORM CONTENT",link:"https://drive.google.com/file/d/1xhWRVgriNpz0bWshNWGkTZn8Grjb3H5h/view?usp=drivesdk",image:"portfolio-cover.jpg"},
{name:"Motion & Visual Work",cat:"motion",label:"MOTION GRAPHICS",link:"https://drive.google.com/file/d/1xhWRVgriNpz0bWshNWGkTZn8Grjb3H5h/view?usp=drivesdk",image:"portfolio-cover.jpg"},
{name:"Documentary Work",cat:"doc",label:"DOCUMENTARY",link:"https://drive.google.com/file/d/1xhWRVgriNpz0bWshNWGkTZn8Grjb3H5h/view?usp=drivesdk",image:"portfolio-cover.jpg"}
];
const grid=document.querySelector("#workGrid");
function render(filter="all"){
 const list=filter==="all"?[projects[0]]:projects.filter(p=>p.cat===filter);
 grid.innerHTML=list.map(p=>`<a class="project" href="${p.link}" target="_blank" rel="noopener"><div class="project-visual" style="background-image:url('${p.image}');background-size:cover;background-position:center"></div><div class="project-info"><div><h3>${p.name}</h3><small>${p.label}</small></div><span>↗</span></div></a>`).join("")
}
render();
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)}));
const scene=document.querySelector("#scene");
document.addEventListener("mousemove",e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;scene.style.transform=`rotateY(${x*8}deg) rotateX(${-y*5}deg)`;document.querySelector("#cursor").style.left=e.clientX+"px";document.querySelector("#cursor").style.top=e.clientY+"px"});
addEventListener("scroll",()=>{document.querySelector("#progress").style.width=(scrollY/(document.body.scrollHeight-innerHeight)*100)+"%"});
