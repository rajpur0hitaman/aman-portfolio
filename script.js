const CLOUDINARY_PLAYER="https://player.cloudinary.com/embed/?cloud_name=syz3hyeu&public_id=fa676365-b791-4ce3-a965-49cee639bfaa_876DC2F&autoplay=true&controls=true";
const menu=document.getElementById("menu"),menuBtn=document.getElementById("menuBtn"),menuClose=document.getElementById("menuClose");
menuBtn.onclick=()=>menu.classList.add("open");menuClose.onclick=()=>menu.classList.remove("open");
document.querySelectorAll(".menu a").forEach(a=>a.onclick=()=>menu.classList.remove("open"));

const modal=document.getElementById("videoModal"),player=document.getElementById("player");
function openVideo(){player.src=CLOUDINARY_PLAYER;modal.classList.add("open");document.body.style.overflow="hidden"}
function closeVideo(){modal.classList.remove("open");player.src="";document.body.style.overflow=""}
document.querySelectorAll("[data-video]").forEach(x=>x.addEventListener("click",openVideo));
document.getElementById("closeVideo").onclick=closeVideo;
modal.addEventListener("click",e=>{if(e.target===modal)closeVideo()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeVideo()});

const canvas=document.getElementById("webgl");
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));
renderer.setSize(innerWidth,innerHeight);
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,100);
camera.position.z=7;

const count=1800, pos=new Float32Array(count*3), vel=new Float32Array(count);
for(let i=0;i<count;i++){
 const r=3.8+Math.random()*5.5, a=Math.random()*Math.PI*2, y=(Math.random()-.5)*7;
 pos[i*3]=Math.cos(a)*r;pos[i*3+1]=y;pos[i*3+2]=Math.sin(a)*r;
 vel[i]=.15+Math.random()*.4;
}
const geo=new THREE.BufferGeometry();
geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
const mat=new THREE.PointsMaterial({color:0xffffff,size:.018,transparent:true,opacity:.42,sizeAttenuation:true});
const particles=new THREE.Points(geo,mat);scene.add(particles);

const ringGeo=new THREE.TorusGeometry(3.7,.006,8,160);
const ringMat=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.15});
const ring=new THREE.Mesh(ringGeo,ringMat);ring.rotation.x=Math.PI/2.5;scene.add(ring);

let mx=0,my=0,tx=0,ty=0;
if(matchMedia("(pointer:fine)").matches){
 addEventListener("mousemove",e=>{tx=(e.clientX/innerWidth-.5)*.6;ty=(e.clientY/innerHeight-.5)*.35});
}
function animate(t){
 mx+=(tx-mx)*.035;my+=(ty-my)*.035;
 particles.rotation.y=t*.000035+mx*.18;particles.rotation.x=my;
 ring.rotation.z=t*.00004+mx*.25;
 camera.position.x=mx*.7;camera.position.y=-my*.35;camera.lookAt(0,0,0);
 renderer.render(scene,camera);requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
addEventListener("resize",()=>{renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()});

const loader=document.getElementById("loader");
setTimeout(()=>{loader.classList.add("done")},700);
