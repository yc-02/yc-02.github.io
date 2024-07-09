const deskNav=
`
<div class="desk-nav">
  <div class="desk-nav-left">
    <a href="/">yc-02</a>
  </div>
  <div class="desk-nav-right">
      <a href="/" class="home-link current-link">Home</a>
      <a href="/portfolio" class="portfolio-link">Portfolio</a>
      <a href="/about" class="about-link">About</a>
      <a href="/contact" class="contact-link">Contact</a>
  </div>
</div>
`

const footer =
`
<div class="footer-container">
  <div class="footer-left">
    <i class="fa-regular fa-copyright" color="inherit"></i>
    <p>2024 Ying Cui</p>
  </div>
  <div class="footer-right">
    <p class="web-title">Contact</p>
    <div class="footer-contact">
      <a href="https://linkedin.com/in/yingcui02" class="footer-email" target="_blank"><i class="fa-brands fa-linkedin"></i><p>LinkedIn</p></a>
      <a href="https://yingcui02.wordpress.com/" class="footer-email" target="_blank"><i class="fa-brands fa-wordpress"></i><p>Blog</p></a>
      <a class="footer-email" href="mailto:yingcui02@gmail.com"><i class="fa-solid fa-envelope"></i><p>yingcui02@gmail.com</p></a>
    </div>
  </div>
</div>
`

const phoneNav = 
`
<div class="mobile-nav">
<div class="openNav">
  <a href="/" style="font-style: italic; font-size: larger; text-decoration: none; color: inherit; font-weight: 500;">yc-02</a>
  <div class="openNavButton" onclick="openNav()" id="openButton">
    <i class="fa-solid fa-bars fa-lg" style="color:inherit"></i>
  </div>
</div>
<div class="mobile-nav-contents" id="contents" style="display: none;">
  <div onclick="closeNav()" class="mobile-nav-left" id="contentsLeft">
  </div>
  <div class="mobile-nav-right" id="contentsRight">
    <div class="closeNavButton" onclick="closeNav()">
      <i class="fa-solid fa-xmark fa-lg" style="color:inherit"></i>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px; padding: 0px 20px;">
      <a href="/" class="navIcon">
          <i class="fa-solid fa-house" style="color:inherit"></i>          
          <p>Home</p>
      </a>
      <a href="/portfolio" class="navIcon">
        <i class="fa-solid fa-folder-open" style="color:inherit"></i>
        <p>Portfolio</p>            
      </a>
      <a href="/about" class="navIcon">
        <i class="fa-solid fa-address-card" style="color:inherit"></i>          
        <p>About</p>
      </a>
      <a href="/contact" class="navIcon">
        <i class="fa-solid fa-envelope" style="color:inherit"></i>        
        <p>Contact</p>
      </a>
      <a href="https://yingcui02.wordpress.com/" class="navIcon" target="_blank">
        <i class="fa-brands fa-wordpress" style="color:inherit"></i>        
        <p>Blog</p>
      </a>
  </div>
  </div> 
</div>
</div>
`

//render navbar and footer
const promise1 = document.querySelector('nav').insertAdjacentHTML("afterbegin",phoneNav);
const promise2 = document.querySelector('footer').insertAdjacentHTML("afterbegin",footer);
const promise3 = document.querySelector('nav').insertAdjacentHTML("afterend",deskNav)

Promise.all([promise1,promise2,promise3]).then(()=>{
      document.body.style.display = 'block';
    })
    .catch(error => console.error('Error fetching HTML file:', error));



  // small navbar open and close  
  function openNav() {
    document.getElementById("contents").style.display ='block'
    document.getElementById("openButton").style.display ='none'
    document.body.style.overflow = "hidden";
    document.getElementById("contentsRight").style.animation = 'slideIn 0.2s forwards';
    document.getElementById("contentsLeft").style.animation = 'opacity 0.2s 0.2s forwards';
  }
  function closeNav(){
    document.getElementById("contents").style.display ='none'
    document.getElementById("openButton").style.display ='block'
    document.getElementById('projects').style.display='none'
    document.getElementById('apps').style.display='none'
    document.body.style.overflow ="scroll";
  }
  
  // function toggleProjects() {
  //   const projectsDiv = document.getElementById('projects');
  //   if (projectsDiv.style.display === 'block') {
  //       projectsDiv.style.display = 'none';
  //   } else {
  //       projectsDiv.style.display = 'block';
  //   }
  // }
  
  // function toggleApps(){
  //   const appsDiv = document.getElementById('apps');
  //   if (appsDiv.style.display === 'block') {
  //       appsDiv.style.display = 'none';
  //   } else {
  //       appsDiv.style.display = 'block';
  //   }
  
  // }
  
  
   //navbar current style
  const currentUrl = window.location.href
  const homeLink = document.querySelector('.home-link')
  const portfolioLink = document.querySelector('.portfolio-link')
  const aboutLink = document.querySelector('.about-link')
  const contactLink = document.querySelector('.contact-link')

  if(portfolioLink){
    if(currentUrl.endsWith('/portfolio/')|| 
    currentUrl.endsWith('/travel-blog/')||
      currentUrl.endsWith('/coffee-mobile/') || 
      currentUrl.endsWith('/footwear/') || 
      currentUrl.endsWith('/restaurant/')||
      currentUrl.endsWith('/recipes-blog/')){
      portfolioLink.classList.add('current-link')
      homeLink.classList.remove('current-link')
    }else{
      portfolioLink.classList.remove('current-link')
    }
  }
  
  if(aboutLink){
    if(currentUrl.endsWith('/about/')){
      aboutLink.classList.add('current-link')
      homeLink.classList.remove('current-link')
    }else{
      aboutLink.classList.remove('current-link')
    }
  }
  if(contactLink){
    if(currentUrl.endsWith('/contact/')){
      contactLink.classList.add('current-link')
      homeLink.classList.remove('current-link')
    }else{
      contactLink.classList.remove('current-link')
    }
  }
  
  