const deskNav =
  `
<div class="desk-nav-wrapper">
<div class="desk-nav">
  <div class="desk-nav-left">
    <a href="/">yc-02</a>
  </div>
  <div class="desk-nav-right">
      <a href="/" class="home-link current-link">Home</a>
      <a href="/portfolio" class="portfolio-link">Portfolio</a>
      <a href="/about" class="about-link">About</a>
  </div>
</div>
</div>

`
// <a>|</a>
// <a href="https://yc-02-tools.streamlit.app/" target="_blank" class="tools-link">Tools</a>
const footer =
  `
<div class="footer-container">
  <div class="footer-left">
    <i class="fa-regular fa-copyright" color="inherit"></i>
    <p>2025 Ying Cui</p>
  </div>
  <div class="footer-right">
    <p class="footer-title">Contact</p>
    <div class="footer-contact">
      <a href="https://linkedin.com/in/yingcui02" class="footer-email" target="_blank"><i class="fa-brands fa-linkedin"></i><p>LinkedIn</p></a>
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
  </div>
  </div>
</div>
</div>
`
//       <a href="https://yc-02-tools.streamlit.app/" target="_blank" class="navIcon">
//  <i class="fa-solid fa-wrench" style="color:inherit"></i>
//   <p>Tools</p>
// </a>

//render navbar and footer

const promise1 = document.querySelector('nav').insertAdjacentHTML("afterbegin", phoneNav);
const promise2 = document.querySelector('footer').insertAdjacentHTML("afterbegin", footer);
const promise3 = document.querySelector('nav').insertAdjacentHTML("afterbegin", deskNav)

Promise.all([promise1, promise2, promise3]).then(() => {
  document.body.style.display = 'block';
})
  .catch(error => console.error('Error fetching HTML file:', error));



// small navbar open and close
function openNav() {
  document.getElementById("contents").style.display = 'block'
  document.getElementById("openButton").style.display = 'none'
  document.body.style.overflow = "hidden";
  document.getElementById("contentsRight").style.animation = 'slideIn 0.2s forwards';
  document.getElementById("contentsLeft").style.animation = 'opacity 0.2s 0.2s forwards';
}
function closeNav() {
  document.getElementById("contents").style.display = 'none'
  document.getElementById("openButton").style.display = 'block'
  document.getElementById('projects').style.display = 'none'
  document.getElementById('apps').style.display = 'none'
  document.body.style.overflow = "scroll";
}


//navbar current style
const currentUrl = window.location.href
const homeLink = document.querySelector('.home-link')
const portfolioLink = document.querySelector('.portfolio-link')
const aboutLink = document.querySelector('.about-link')

if (homeLink && portfolioLink && aboutLink) {
  const linkMap = [
    { path: '/portfolio/', el: portfolioLink },
    { path: '/about/', el: aboutLink },
    { path: '/', el: homeLink },
  ];

  linkMap.forEach(({ el }) => el.classList.remove('current-link'));

  const match = linkMap.find(({ path }) => currentUrl.endsWith(path));
  if (match) match.el.classList.add('current-link');
}
