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
    if (!firstCard) return 0;
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
        track.offsetHeight; // reflow
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
    track.offsetHeight; // reflow

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

// ===== МЕНЮ =====
const menu = document.getElementById("menu");

function togglemenu() {
  menu.classList.toggle("open_nav");
}

document.addEventListener("click", function (e) {
  if (!menu.contains(e.target) && !e.target.closest(".nav_pop-up_menu")) {
    menu.classList.remove("open_nav");
  }
});

// ===== STICKY HEADER =====
$(function () {
  const $header = $("#header");
  const headerHeight = $header.outerHeight();

  // Placeholder, щоб контент не стрибав
  const $placeholder = $('<div class="header-placeholder"></div>');
  $header.after($placeholder);

  function checkScroll() {
    const scrollPos = $(window).scrollTop();

    if (scrollPos > 50) { // можна змінити поріг
      $header.addClass("fixed");
      $placeholder.addClass("active").height(headerHeight);
    } else {
      $header.removeClass("fixed");
      $placeholder.removeClass("active");
    }
  }

  $(window).on("scroll load resize", checkScroll);
  checkScroll();
});

// ===== ІНТЕРАКТИВНІ КАРТКИ ТОВАРІВ =====
document.querySelectorAll(".product-card-big").forEach((card) => {
  // Hover-ефект уже в CSS, тут — клік по кольорах і кнопці кошика
  const colorDots = card.querySelectorAll(".color-dot");
  const cartBtn = card.querySelector(".cart-btn");

  colorDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      colorDots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
    });
  });

  if (cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      cartBtn.classList.add("added");
      // Можна додати анімацію / toast
      setTimeout(() => cartBtn.classList.remove("added"), 600);
    });
  }
});