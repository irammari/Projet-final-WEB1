const PER_PAGE = 5;
let currentPage = 1;

const articles = document.querySelectorAll('.left-col article');
const totalPages = Math.ceil(articles.length / PER_PAGE);

const input = document.querySelector('.newsletter input');
const button = document.querySelector('.newsletter button');

function showPage(page) {
    currentPage = page;

    articles.forEach((article, i) => {
        const start = (page - 1) * PER_PAGE;
        article.style.display = (i >= start && i < start + PER_PAGE) ? 'flex' : 'none';
    });

    document.querySelectorAll('.nb-page').forEach((btn, i) => {
        btn.classList.toggle('active', i + 1 === page);
    });

    document.querySelectorAll('.slider')[0].disabled = (page === 1);
    document.querySelectorAll('.slider')[1].disabled = (page === totalPages);

    document.querySelector('.left-col').scrollIntoView({ behavior: 'smooth', block: 'start' });
}


function buildPagination() {
    const nav = document.querySelector('.page-navigation');
    const prevBtn = nav.querySelector('.slider:first-child');
    const nextBtn = nav.querySelector('.slider:last-child');

    nav.querySelectorAll('.nb-page').forEach(b => b.remove());

    for (let i = totalPages; i >= 1; i--) {
        const btn = document.createElement('button');
        btn.className = 'nb-page';
        btn.textContent = i;
        btn.onclick = () => showPage(i);
        prevBtn.insertAdjacentElement('afterend', btn);
    }

    prevBtn.onclick = () => showPage(currentPage - 1);
    nextBtn.onclick = () => showPage(currentPage + 1);
}

buildPagination();
showPage(1);


button.addEventListener('click', () => {
    const email = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValid) {
        input.style.display = 'none';
        button.style.display = 'none';

        const success = document.createElement('p');
        success.textContent = "You're in! Talk soon.";
        success.className = 'success'
        button.insertAdjacentElement('afterend', success);
        document.querySelector('.newsletter .error')?.remove();
    }
    else {
        document.querySelector('.newsletter .error')?.remove();
        const error = document.createElement('p');
        error.className = 'error';
        error.textContent = 'Please enter a valid email address.';
        button.insertAdjacentElement('afterend', error);
    }
});

