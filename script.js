// Set the club's official WhatsApp number (country code + number, digits only).
const WHATSAPP_NUMBER = "919447002405";
const menuButton = document.querySelector(".menu-toggle");
const navGroups = document.querySelectorAll(".nav");
menuButton.addEventListener("click", () => {
  const open = !navGroups[0].classList.contains("open");
  navGroups.forEach(group => group.classList.toggle("open", open));
  menuButton.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => {
  navGroups.forEach(group => group.classList.remove("open"));
  menuButton.setAttribute("aria-expanded", "false");
  document.querySelectorAll(".nav a").forEach(x => x.classList.remove("active")); a.classList.add("active");
}));
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => { toTop.style.display = window.scrollY > 450 ? "block" : "none"; });
toTop.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxText = document.getElementById("lightboxText");
document.querySelectorAll(".gallery-item").forEach(item => item.addEventListener("click", () => {
  const image = item.querySelector("img");
  lightboxImage.src = image.src; lightboxImage.alt = image.alt;
  lightboxText.textContent = item.dataset.caption || image.alt;
  lightbox.classList.add("open"); lightbox.setAttribute("aria-hidden","false");
}));
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");}
document.querySelector(".close-lightbox").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox();});

function sendWhatsApp(message){
  if(WHATSAPP_NUMBER.includes("X")){alert("Please add the club's official WhatsApp number in script.js before using WhatsApp contact.");return;}
  window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(message),"_blank","noopener");
}
document.getElementById("contactForm").addEventListener("submit",e=>{
  e.preventDefault();const data=new FormData(e.currentTarget);
  const message=`Hello Rotary Club Kunnamkulam,\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nMessage: ${data.get("message")}`;
  sendWhatsApp(message);
});
document.getElementById("whatsapp").addEventListener("click",e=>{
  e.preventDefault();sendWhatsApp("Hello Rotary Club Kunnamkulam. I would like to know more about your club.");
});
const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
}),{threshold:.12});
document.querySelectorAll(".section-head,.principles article,.leader,.event-card,.report-card,.gallery-item,.publication-copy").forEach(el=>{
  el.classList.add("reveal");observer.observe(el);
});
