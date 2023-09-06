// Drop login

let loginBtn = document.querySelector('.login-btn');
let dropLogin = document.querySelector('.drop-login');

loginBtn.onclick = () => {
   dropLogin.classList.toggle("drop-login-open");
};

// Menu Open
let menu = document.querySelector('.menu-icon');
// let navbar = document.querySelector('.navbar');

menu.onclick = () => {
   menu.classList.toggle("move");
};

// inicio Swiper inicializacion
var swiper = new Swiper(".inicio", {
   spaceBetween: 30,
   centeredSlides: true,
   autoplay: {
   delay: 25000,
   disableOnInteraction: false,
},
   pagination: {
      el: ".swiper-pagination",
      clickable: true,
   },
});






// Acordion de preguntas frecuentes 

const acordionItems = document.querySelectorAll('.acordion-item') ;

acordionItems.forEach((item) => {
   const acordionHeader = item.querySelector('.acordion-header');

   acordionHeader.addEventListener('click', () => {
      const openItem = document.querySelector('.acordion-open') ;

      toggleItem(item);

      if ( openItem && openItem !== item){
         toggleItem(openItem);
      }
   })
})

const toggleItem = (item) => {
   const acordionContent = item.querySelector(".acordion-content");

   if (item.classList.contains("acordion-open")){
      acordionContent.removeAttribute("style");
      item.classList.remove("acordion-open")
   } else {
      acordionContent.style.height = acordionContent.scrollHeight + "px";
      item.classList.add("acordion-open");
   }
};





