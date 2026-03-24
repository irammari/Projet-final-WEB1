document.querySelector(".about1").textContent = data.aboutMe_part1;
document.querySelector(".about2").textContent = data.aboutMe_part2;

const xpContainer = document.querySelector(".about-me-xp");

data.overview.forEach(item => {
  const xpNumText = document.createElement("div");

  xpNumText.innerHTML = `
    <div class="xp-num">${item.number}</div>
    <div class="xp-text">${item.label}</div>
  `;

  xpContainer.appendChild(xpNumText);
});

const homeCourses = document.querySelector(".home-courses-cards");

data.homeCourses.forEach(item => {
  const courseCard = document.createElement("div");
  courseCard.classList.add("card");

  courseCard.innerHTML = `
  <div class="card-content">
    <p class="tag">${item.tag}</p>
    <h3>${item.title}</h3>
  </div>
  <hr>
  <div class="details">
      <p>${item.mode}</p>
      <p>${item.duration}</p>
  `

  homeCourses.appendChild(courseCard);
})

const xpGrid = document.querySelector(".xp-grid");

data.experiences.forEach(exp => {
  const item = document.createElement("div");
  item.className = "xp-item";

  item.innerHTML = `
    <div class="year">${exp.year}</div>
    <div class="role">${exp.role}</div>
    <div class="org">${exp.org}</div>
    <div class="desc">${exp.desc}</div>
  `;

  xpGrid.appendChild(item);
});