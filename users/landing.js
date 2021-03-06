1; // Toggle NAV-MENU
const toggleMenu = (toggleId, navId) => {
  const toggle_btn = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle_btn && nav) {
    toggle_btn.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
toggleMenu("menu_toggle_btn", "nav__menu");

document
  .getElementById("exercise-search-btn")
  .addEventListener("click", exerciseSearch);

async function exerciseSearch() {
  console.log("clicked btn....");
  let exerciseSearchTerm = document.getElementById("exercise-search").value;
  let result = await fetch(`../workout/${exerciseSearchTerm}`)
    .then((response) => response.json())
    .then((data) => data);
  if (result.length === 0) {
    result = await fetch(`../workout/musclegroup/${exerciseSearchTerm}`)
      .then((response) => response.json())
      .then((data) => data);
  }
  //display results
  console.log(result);
  displayData(result);
}

function displayData(data) {
  let blah = document.getElementById("search-results-container");
  console.log(data);
  let dataDisplay = "";
  for (const exercise of data) {
    dataDisplay += `<div class="card" style="width: 18rem;">
    <img src="${exercise.photo}" class="card-img-top">
    <div class="card-body">
      <h5 class="card-title">${exercise.name}</h5>
      <p class="card-text">${exercise.description}</p>
      <a href="${exercise.video}" class="btn btn-primary">See video</a>
    </div>
  </div>`;
  }
  console.log(dataDisplay);
  blah.innerHTML = dataDisplay;
}

// CONTAINER's
gsap.from(".left_container", {
  delay: 2,
  duration: 1.5,
  top: "100%",
  ease: "expo.inOut",
});

gsap.from(".right_container", {
  delay: 2,
  duration: 1.5,
  bottom: "100%",
  ease: "expo.inOut",
});
// LOGO
gsap.from(".logo", {
  opacity: 0,
  delay: 3.3,
  duration: 2.5,
  y: -20,
  ease: "expo.inOut",
});
// NAV-ITEM
gsap.from(".nav__item", {
  opacity: 0,
  delay: 3.8,
  duration: 3,
  y: 25,
  ease: "expo.Out",
  stagger: 0.2,
});

// SEARCH-BTN
gsap.from(".search_btn", {
  opacity: 0,
  delay: 4,
  duration: 3,
  x: 20,
  ease: "expo.Out",
});

// CART-BTN
gsap.from(".cart_btn", {
  opacity: 0,
  delay: 4,
  duration: 3,
  x: 20,
  ease: "expo.Out",
});
// SOCIAL-ITEM
gsap.from(".social_item", {
  opacity: 0,
  delay: 4.5,
  duration: 3,
  x: -25,
  ease: "expo.Out",
  stagger: 0.2,
});
// DIRECTION-BTN
gsap.from(".direction_btn", {
  opacity: 0,
  delay: 4.4,
  x: -20,
  ease: "power3.Out",
  stagger: 0.2,
});
// SLIDE
gsap.from(".dot", {
  opacity: 0,
  delay: 4.4,
  x: -20,
  ease: "power3.Out",
  stagger: 0.2,
});
// PRODUCT-IMG
gsap.from(".product_img", {
  opacity: 0,
  delay: 5,
  duration: 1.5,
  ease: "expo.inOut",
});
// PRODUCT-TTTLE
gsap.from(".product_title", {
  opacity: 0,
  delay: 5.4,
  duration: 1.8,
  y: 100,
  ease: "expo.inOut",
});
// PRODUCT-TYPE
gsap.from(".product_type", {
  opacity: 0,
  delay: 5.8,
  duration: 1.8,
  y: 100,
  ease: "expo.inOut",
});

// OVERLAY
gsap.to(".first", {
  delay: 0.5,
  duration: 1,
  top: "-100%",
  ease: "expo.inOut",
});
gsap.to(".second", {
  delay: 0.7,
  duration: 1,
  top: "-100%",
  ease: "expo.inOut",
});
gsap.to(".third", {
  delay: 0.9,
  duration: 1,
  top: "-100%",
  ease: "expo.inOut",
});
