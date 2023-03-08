const preloader = document.querySelector(".preloader");
const preloaderDuration = 500;

const hidePreloader = () => {
  setTimeout(() => {
    preloader.classList.add("hide");
  }, preloaderDuration);
};

window.addEventListener("load", hidePreloader);
