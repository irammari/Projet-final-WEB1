document.querySelector(".about1").textContent = data.aboutMe_part1;
document.querySelector(".about2").textContent = data.aboutMe_part2;

const container = document.querySelector(".about-me-xp");

data.overview.forEach(item => {
  const block = document.createElement("div");

  block.innerHTML = `
    <div class="xp-num">${item.number}</div>
    <div class="xp-text">${item.label}</div>
  `;

  container.appendChild(block);
});