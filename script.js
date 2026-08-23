const CLOUDINARY_PLAYER="https://player.cloudinary.com/embed/?cloud_name=syz3hyeu&public_id=fa676365-b791-4ce3-a965-49cee639bfaa_876DC2F&autoplay=true&controls=true";

/* Navigation */
const menu=document.getElementById("menu"),menuBtn=document.getElementById("menuBtn"),menuClose=document.getElementById("menuClose");
menuBtn.onclick=()=>menu.classList.add("open");
menuClose.onclick=()=>menu.classList.remove("open");
document.querySelectorAll(".menu a").forEach(a=>a.onclick=()=>menu.classList.remove("open"));

/* Portfolio video */
const modal=document.getElementById("videoModal"),player=document.getElementById("player");
function openVideo(){player.src=CLOUDINARY_PLAYER;modal.classList.add("open");document.body.style.overflow="hidden"}
function closeVideo(){modal.classList.remove("open");player.src="";document.body.style.overflow=""}
document.querySelectorAll("[data-video]").forEach(x=>x.addEventListener("click",openVideo));
document.getElementById("closeVideo").onclick=closeVideo;
modal.addEventListener("click",e=>{if(e.target===modal)closeVideo()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeVideo()});

/* Lightweight 3D particle field — no external library required */
const canvas=document.getElementById("webgl");
const ctx=canvas.getContext("2d");
let w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio||1,2);
let particles=[], mx=0,my=0,tx=0,ty=0, t=0;

function resize(){
  w=innerWidth; h=innerHeight; dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=w*dpr; canvas.height=h*dpr;
  canvas.style.width=w+"px"; canvas.style.height=h+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  makeParticles();
}
function makeParticles(){
  const count=Math.min(1100,Math.floor(w*h/850));
  particles=[];
  for(let i=0;i<count;i++){
    particles.push({
      x:(Math.random()-.5)*14,
      y:(Math.random()-.5)*9,
      z:Math.random()*10+.5,
      s:Math.random()*1.5+.35,
      a:Math.random()*Math.PI*2
    });
  }
}
function draw(){
  t+=.008;
  mx+=(tx-mx)*.035; my+=(ty-my)*.035;
  ctx.clearRect(0,0,w,h);

  const cx=w/2+mx*70, cy=h/2+my*40;
  const focal=Math.min(w,h)*.72;

  for(const p of particles){
    p.z-=.018;
    p.a+=.001;
    if(p.z<.5){p.z=10; p.x=(Math.random()-.5)*14; p.y=(Math.random()-.5)*9}
    const px=cx+(p.x+mx*.5)*focal/p.z;
    const py=cy+(p.y+my*.3)*focal/p.z;
    const size=Math.max(.35,p.s*(1.2/p.z));
    const alpha=Math.max(0,.55-p.z*.045);
    ctx.beginPath();
    ctx.arc(px,py,size,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${alpha})`;
    ctx.fill();
  }

  /* subtle 3D rings */
  ctx.save();
  ctx.translate(cx,cy+h*.05);
  ctx.rotate(-.08+mx*.15);
  ctx.scale(1,.28);
  for(let r=140;r<Math.min(w*.42,500);r+=75){
    ctx.beginPath();
    ctx.arc(0,0,r,0,Math.PI*2);
    ctx.strokeStyle="rgba(255,255,255,.07)";
    ctx.lineWidth=1;
    ctx.stroke();
  }
  ctx.restore();

  requestAnimationFrame(draw);
}
if(matchMedia("(pointer:fine)").matches){
  addEventListener("mousemove",e=>{
    tx=(e.clientX/w-.5)*.9;
    ty=(e.clientY/h-.5)*.55;
  });
}
addEventListener("resize",resize);
resize();
draw();

/* Never let the intro loader get stuck */
setTimeout(()=>document.getElementById("loader")?.classList.add("done"),900);
