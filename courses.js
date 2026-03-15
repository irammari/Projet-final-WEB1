const priceMin = document.getElementById("price-min");
const priceMax = document.getElementById("price-max");
const priceMinSlider = document.getElementById("price-min-slider");
const priceMaxSlider = document.getElementById("price-max-slider");

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
                <p class="course-price">${course.price.toLocaleString("en-US")}</p>
                <p class="course-description">${course.description}</p>
            </div>

            <div class="course-card-btns">
                <button class="course-learn-more-btn">Learn about me</button>
                <button class="course-book-btn">Add to cart</button>            
            </div>
        </div>
`
}

const gallery = document.querySelector(".courses-gallery");

data.courses.forEach(course => {
    gallery.innerHTML += createCourseCard(course);
});