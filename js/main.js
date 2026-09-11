function createCarousel(gridId, prevId, nextId) {
  const grid = document.getElementById(gridId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  if (!grid || !prevBtn || !nextBtn) return;

  const track = document.createElement("div");
  track.className = "slider-track";

  while (grid.firstElementChild) {
    track.appendChild(grid.firstElementChild);
  }

  grid.appendChild(track);

  let isMoving = false;

  function getStep() {
    const firstCard = track.firstElementChild;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;

    return firstCard.offsetWidth + gap;
  }

  function lockButtons() {
    isMoving = true;
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  }

  function unlockButtons() {
    isMoving = false;
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }

  nextBtn.addEventListener("click", () => {
    if (isMoving) return;

    lockButtons();

    const step = getStep();

    track.style.transition = "transform 0.45s ease";
    track.style.transform = `translateX(-${step}px)`;

    track.addEventListener(
      "transitionend",
      () => {
        track.appendChild(track.firstElementChild);

        track.style.transition = "none";
        track.style.transform = "translateX(0)";

        track.offsetHeight;

        unlockButtons();
      },
      { once: true }
    );
  });

  prevBtn.addEventListener("click", () => {
    if (isMoving) return;

    lockButtons();

    const step = getStep();

    track.style.transition = "none";
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transform = `translateX(-${step}px)`;

    track.offsetHeight;

    track.style.transition = "transform 0.45s ease";
    track.style.transform = "translateX(0)";

    track.addEventListener(
      "transitionend",
      () => {
        unlockButtons();
      },
      { once: true }
    );
  });
}

createCarousel("fav-grid", "fav-prev", "fav-next");
createCarousel("test-grid", "test-prev", "test-next");

let menu = document.getElementById('menu');

function togglemenu(){
    menu.classList.toggle("open_nav");
}

document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !e.target.closest('.nav_pop-up_menu')) {
        menu.classList.remove("open_nav");
    }
});
$(function() {
  let top = $("#top");
  let topH = top.height();
  let header = $("#header");
  let scrollPos = $(window).scrollTop();
  console.log(topH);

  $(window).on("scroll load", function() {
    scrollPos = $(this).scrollTop();
    if (scrollPos > topH) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
    console.log(scrollPos);
  }
}