window.addEventListener("scroll", event =>{
  let scrollTop = document.documentElement.scrollTop;
  let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = 100 * (scrollTop/scrollHeight)
  document.querySelector(".scroll-progress div").style.width = progress+"%";
  document.querySelector(".scroll-progress div").setAttribute('aria-valuenow', progress);
});
