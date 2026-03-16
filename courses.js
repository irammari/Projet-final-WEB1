const priceMin = document.getElementById("price-min");
const priceMax = document.getElementById("price-max");
const priceMinSlider = document.getElementById("price-min-slider");
const priceMaxSlider = document.getElementById("price-max-slider");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

function setPrice() {
    priceMin.textContent = Number(priceMinSlider.value).toLocaleString("en-US");
    priceMax.textContent = Number(priceMaxSlider.value).toLocaleString("en-US");
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
                
                <img src="${course.thumbnail}" alt="course img"> 
                <span class="course-level-tag ${levelClass}">${course.level}</span>
            </div>

            <div class="course-card-info">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-price">${course.price.toLocaleString("en-US")} Ar</p>
                <p class="course-description">${course.description}</p>
            </div>

            <div class="course-card-btns">
                <button class="course-learn-more-btn">Learn more</button>
                <button class="course-book-btn">Add to cart</button>            
            </div>
        </div>
`
}

const gallery = document.querySelector(".courses-gallery");

function showCourses(coursesArray) {
    gallery.innerHTML = "";
    coursesArray.forEach(course => {
        gallery.innerHTML += createCourseCard(course);
    });
}
showCourses(data.courses);

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
        selectedLangs = [...document.querySelectorAll(".lang-icons span.active")].map(icon => icon.id);
        if (selectedLangs.length === 0) {
            selectedLangs = [...document.querySelectorAll(".lang-icons span")].map(icon => icon.id);
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

clearFiltersBtn.addEventListener('click', (event) => {
    event.preventDefault();
    langIcons.forEach(icon => icon.classList.add('active'));
    techFilter.value = "all";
    levelFilter.value = "all";
    priceMinFilter.value = "0"
    priceMaxFilter.value = max;
    searchFilter.value = null;
    showCourses(data.courses);
})