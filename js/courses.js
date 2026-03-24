const priceMin = document.getElementById("price-min");
const priceMax = document.getElementById("price-max");
const priceMinSlider = document.getElementById("price-min-slider");
const priceMaxSlider = document.getElementById("price-max-slider");
const clearFiltersBtn = document.querySelector("#clearFiltersBtn");

function setPrice() {
    priceMin.textContent = Number(priceMinSlider.value).toLocaleString("en-US");
    priceMax.textContent = Number(priceMaxSlider.value).toLocaleString("en-US");

    priceMinSlider.max = priceMaxSlider.value; 
    priceMaxSlider.min = priceMinSlider.value; 
}

priceMinSlider.addEventListener("input", setPrice);
priceMaxSlider.addEventListener("input", setPrice);

function createCourseCard(course) {
    let levelClass = '';

    if (course.level === "beginner") {
        levelClass = "level-beginner";
    } else if (course.level === "intermediate") {
        levelClass = "level-intermediate";
    } else if (course.level === "advanced") {
        levelClass = "level-advanced";
    }

    return `
        <div class="course-card">

            <div class="course-card-img">
                <div class="course-card-top-tags">
                    <span class="course-lang-tag">${course.language}</span>${course.technologies && course.technologies.length > 0
                    ? `<span class="course-tech-tag">${course.technologies.join(', ')}</span>` 
                    : ''}
                </div>
                
                <span class="course-level-tag ${levelClass}">${course.level}</span>
                <img src="${course.thumbnail}" alt="course img"> 
            </div>

            <div class="course-card-content">
                <div class="course-card-info">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-price">MGA ${course.price.toLocaleString("en-US")}</p>
                    <p class="course-description">${course.description}</p>
                </div>

                <div class="course-card-btns">
                    <button class="toggle-btn">Learn more</button>
                    <button class="course-book-btn" 
                    onclick="addToCart('${course.id}', '${course.title}', ${course.price})">Add to cart</button>            
                </div>
            </div>
            
        </div>
`
}

const gallery = document.querySelector(".courses-gallery");

function showCourses(coursesArray) {
    const countLabel = document.querySelector(".courses-count");

    countLabel.textContent = `${coursesArray.length} course${coursesArray.length !== 1 ? 's' : ''} found`;

    gallery.innerHTML = "";
    if (coursesArray.length === 0) {
        gallery.innerHTML = `
        <div class="no-results">
            <p class="no-results-header">No courses match your filters.</p>
            <a href="#" class="clearFiltersLink">CLEAR ALL FILTERS</a>
        </div>
        `;
        return;
    }
    coursesArray.forEach(course => {
        gallery.innerHTML += createCourseCard(course);
    });
}

showCourses(data.courses);

document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.course-card');
    const desc = card.querySelector(".course-description");
    desc.classList.toggle('expanded');
    btn.textContent = desc.classList.contains('expanded') ? 'Cancel' : 'Learn more';

    if (desc.classList.contains('expanded')) {
      btn.textContent = 'Cancel';
    } else {
      btn.textContent = 'Learn more';
    }
  });
});


const langIcons = document.querySelectorAll(".lang-icons span");
const techFilter = document.getElementById("tech-select");
const levelFilter = document.getElementById("level-select");
const priceMinFilter = document.getElementById("price-min-slider");
const priceMaxFilter = document.getElementById("price-max-slider");
const searchFilter = document.querySelector(".search-filter input");

let selectedLangs = [...document.querySelectorAll(".lang-icons span.active")].map(icon => icon.id);
langIcons.forEach(icon => icon.classList.add('active'));

langIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        icon.classList.toggle('active');

        selectedLangs = [...document.querySelectorAll(".lang-icons span.active")]
            .map(icon => icon.id);

        if (selectedLangs.length === 0) {
            langIcons.forEach(i => i.classList.add('active'));

            selectedLangs = [...langIcons].map(icon => icon.id);
        }

        filter();
    });
});
techFilter.addEventListener('change', filter);
levelFilter.addEventListener('change', filter);
priceMinFilter.addEventListener('input', filter);
priceMaxFilter.addEventListener('input', filter);
searchFilter.addEventListener('input', filter);

function filter() {
    const selectedTech = techFilter.value;
    const selectedLevel = levelFilter.value;
    const selectedMinPrice = Number(priceMinFilter.value);
    const selectedMaxPrice = Number(priceMaxFilter.value);
    const searchedKeywords = searchFilter.value.toLowerCase();

    const filtered = data.courses.filter(course => {

        const langMatch = selectedLangs.length === 0 || selectedLangs.includes(course.language);
        let techMatch = selectedTech === "all" || 
            (course.technologies && course.technologies.includes(selectedTech));

        let levelMatch = selectedLevel === "all" ||
            course.level.toLowerCase() === selectedLevel.toLowerCase();      

        let minPriceMatch = course.price >= selectedMinPrice;
        let maxPriceMatch = course.price <= selectedMaxPrice;

        let searchedMatch = course.title.toLowerCase().includes(searchedKeywords) ||
            course.description.toLowerCase().includes(searchedKeywords); 

        return langMatch && techMatch && levelMatch && minPriceMatch && maxPriceMatch && searchedMatch;
    })
    filtered.sort((a, b) => a.price - b.price);
    showCourses(filtered);
}

function clearFilters() {
    langIcons.forEach(icon => icon.classList.add('active'));

    selectedLangs = [...langIcons].map(icon => icon.id);

    techFilter.value = "all";
    levelFilter.value = "all";

    priceMinFilter.value = priceMinSlider.min;
    priceMaxFilter.value = priceMaxSlider.max;

    setPrice();

    searchFilter.value = "";

    filter();
}

clearFiltersBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearFilters();
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('clearFiltersLink')) {
        e.preventDefault();
        clearFilters();
    }
});

const addCartBtn = document.querySelector(".course-book-btn");
addCartBtn.addEventListener('click', () => {
    addToCart(course.id, )
})