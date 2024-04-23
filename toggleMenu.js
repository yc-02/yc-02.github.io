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