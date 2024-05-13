const webNav=
`
<ul class="webNav">
<li><a href="/" class="navTitle">yc-02</a></li>
<div class="webNavRight">
  <li><a href="/apps/roamer/" class="appsLink">Published</a></li>
  <li><a href="/projects/" class="projectsLink">Projects</a></li>
  <li><a href="/about/" class="aboutLink">About</a></li>
  <li><a href="/contact/" class="contactLink">Contact</a></li>
</div>
</ul>
`

const footer =
`
<div style="position:absolute; bottom:-20vh; width: 100%; display: flex;align-items: center; gap: 10px;justify-content: center; align-items: center; color: #a1a1aa;">
<i class="fa-regular fa-copyright" color="inherit"></i>
<p style="font-size:smaller;">2024 Ying Cui</p>
</div>
`

const navbar = 
`
<div class="smNav">
<div class="openNav">
  <a href="/" style="font-style: italic; font-size: larger; text-decoration: none; color: inherit; font-weight: 500;">yc-02</a>
  <div class="openNavButton" onclick="openNav()" id="openButton">
    <i class="fa-solid fa-bars fa-lg" style="color:inherit"></i>
  </div>
</div>
<div class="smNavContents" id="contents" style="display: none;">
  <div onclick="closeNav()" class="smNavLeft" id="contentsLeft">
  </div>
  <div class="smNavRight" id="contentsRight">
    <div class="closeNavButton" onclick="closeNav()">
      <i class="fa-solid fa-xmark fa-lg"  style="color:inherit"></i>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px; padding: 0px 20px;">
      <a href="/" class="navIcon">
          <i class="fa-solid fa-house" style="color:inherit"></i>          
          <p>Home</p>
      </a>
        <div style="display: flex; align-items: center; justify-content: space-between; user-select: none; cursor: pointer;"   onclick="toggleApps()">
          <div class="navIcon">
            <i class="fa-solid fa-folder-open"  style="color:inherit"></i>
            <p>Published</p>            
          </div>
          <i class="fa-solid fa-chevron-right"  style="color:inherit"></i>
        </div>
        <div style="padding-left: 6px; display: none;" id="apps">
          <a href="/apps/roamer/" class="navIcon">
              <i class="fa-solid fa-code"  style="color:inherit"></i>            
              <P>Roamer - Plan & Pack</P>
            </a>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; user-select: none; cursor: pointer;"  onclick="toggleProjects()">
          <div class="navIcon">
            <i class="fa-solid fa-folder-open"  style="color:inherit"></i>
            <p>Projects</p>            
          </div>
          <i class="fa-solid fa-chevron-right"  style="color:inherit"></i>
        </div>
        <div style="padding-left: 6px; display: none;" id="projects">
          <a href="/projects/recipes-blog/" class="navIcon">
            <i class="fa-solid fa-code"  style="color:inherit"></i>            
            <P>Recipes Blog</P>
          </a>
          <a href="/projects/footwear/" class="navIcon">
              <i class="fa-solid fa-code"  style="color:inherit"></i>          
              <p>Footwear E-commerce Platform</p>
          </a>
          <a href="/projects/travel-blog/" class="navIcon">
            <i class="fa-solid fa-code"  style="color:inherit"></i>            
            <P>Travel Blog</P>
          </a>
          <a href="/projects/restaurant/" class="navIcon">
            <i class="fa-solid fa-code"  style="color:inherit"></i>            
            <P>Restaurant Reservation and Menu Platform</P>
          </a>
          <a href="/projects/coffee-mobile/" class="navIcon">
            <i class="fa-solid fa-code"  style="color:inherit"></i>            
            <P>Coffee Shop Mobile App</P>
          </a>
        </div>
      <a href="/about/" class="navIcon">
          <i class="fa-solid fa-address-card"  style="color:inherit"></i>                                   
          <p>About</p>            
      </a>
      <a href="/contact/" class="navIcon">
          <i class="fa-solid fa-envelope"  style="color:inherit"></i>
          <p>Contact</p>            
      </a> 
  </div>
  </div> 
</div>
</div>
`

//render navbar and footer
const promise1 = document.querySelector('nav').insertAdjacentHTML("afterbegin",navbar);
const promise2 = document.querySelector('footer').insertAdjacentHTML("afterbegin",footer);
const promise3 = document.querySelector('nav').insertAdjacentHTML("afterend",webNav)

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
  
  function toggleProjects() {
    const projectsDiv = document.getElementById('projects');
    if (projectsDiv.style.display === 'block') {
        projectsDiv.style.display = 'none';
    } else {
        projectsDiv.style.display = 'block';
    }
  }
  
  function toggleApps(){
    const appsDiv = document.getElementById('apps');
    if (appsDiv.style.display === 'block') {
        appsDiv.style.display = 'none';
    } else {
        appsDiv.style.display = 'block';
    }
  
  }
  
  
  // navbar current style
  const currentUrl = window.location.href
  const appsLink = document.querySelector('.appsLink')
  const projectsLink = document.querySelector('.projectsLink')
  const aboutLink = document.querySelector('.aboutLink')
  const contactLink = document.querySelector('.contactLink')
  if(appsLink){
    if(currentUrl.endsWith('/roamer/')){
      appsLink.classList.add('currentLink')
    }else{
      appsLink.classList.remove('currentLink')
    }
  }
  
  if(projectsLink){
    if(currentUrl.endsWith('/projects/')){
      const webNav = document.querySelector('.webNav')
      webNav.style.background = 'white'
    }
    if(currentUrl.endsWith('/projects/')|| 
    currentUrl.endsWith('/travel-blog/')||
      currentUrl.endsWith('/coffee-mobile/') || 
      currentUrl.endsWith('/footwear/') || 
      currentUrl.endsWith('/restaurant/')||
      currentUrl.endsWith('/recipes-blog/')){
      projectsLink.classList.add('currentLink')
    }else{
      projectsLink.classList.remove('currentLink')
    }
  }
  
  if(aboutLink){
    if(currentUrl.endsWith('/about/')){
      aboutLink.classList.add('currentLink')
    }else{
      aboutLink.classList.remove('currentLink')
    }
  }
  if(contactLink){
    if(currentUrl.endsWith('/contact/')){
      contactLink.classList.add('currentLink')
    }else{
      contactLink.classList.remove('currentLink')
    }
  }
  
  