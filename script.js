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



const currentUrl = window.location.href
const appsLink = document.getElementById('appsLink')
const projectsLink = document.getElementById('projectsLink')
const aboutLink = document.getElementById('aboutLink')
const contactLink = document.getElementById('contactLink')

if(appsLink){
  if(currentUrl.endsWith('/roamer/')){
    appsLink.classList.add('currentLink')
  }else{
    appsLink.classList.remove('currentLink')
  }
}

if(projectsLink){
  if(currentUrl.endsWith('/projects/')|| currentUrl.endsWith('/footwear/') || currentUrl.endsWith('/restaurant/')||currentUrl.endsWith('/recipes-blog/')){
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

