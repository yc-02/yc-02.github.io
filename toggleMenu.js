function openMenu() {
    document.getElementById("contents").style.display ='block'
    document.getElementById("openButton").style.display ='none'
    document.body.style.overflow = "hidden";
  }
function closeMenu(){
  document.getElementById("contents").style.display ='none'
  document.getElementById("openButton").style.display ='block'
  document.body.style.overflow ="scroll";
}
