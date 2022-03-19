window.addEventListener('load', () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
    };
    const observed = document.querySelector('#observed');
    let observer = new IntersectionObserver(handleObserver, options);
    observer.observe(observed);
    let prevY = 0;
    let curPage = 1;
    let totalPages = Infinity;
    function handleObserver(entities, observer) {
        let y = entities[0].boundingClientRect.y;
        if (prevY > y && curPage <= totalPages) {
            getClasses(curPage);
            curPage++;
        }
        prevY = y;
    }

    async function getClasses(curPage) {
        const response = await fetch(
            `https://mundo-sapien.herokuapp.com/api/products/p?page=${curPage}`
        );

        const { products: data } = await response.json();

        totalPages = Math.floor(data.count / 8);
        if (curPage >= totalPages) {
            observed.classList.add('d-none');
            document.querySelector('#loading').classList.add('d-none');
        }

        const newClassesSel = data.products;
        if (!newClassesSel) return;
        showMoreClasses(newClassesSel);
    }
    function showMoreClasses(newClasses) {
        const container = document.querySelector('section');
        for (let classSel of newClasses) {
            const article = document.createElement('article');
            article.classList.add('p-2');
            const containerDiv = document.createElement('div');
            containerDiv.classList.add(
                'descriptioncontainer-c',
                'container-c_noFlex'
            );
            const a = document.createElement('a');
            a.classList.add(
                'd-flex',
                'flex-column',
                'h-100',
                'justify-content-between',
                'position-relative'
            );
            a.href = `/products/${classSel.id}`;
            const divPreview = document.createElement('div');
            divPreview.classList.add('p-1');
            const imgPreview = document.createElement('img');
            imgPreview.classList.add('img-thumbnail');
            imgPreview.src = `/img/clases-preview/${classSel.interactive.preview.location}`;
            const infoDiv = document.createElement('div');
            const classTitle = document.createElement('h5');
            classTitle.innerText =
                classSel.title + ' en ' + classSel.subject.name;
            const classGrade = document.createElement('h5');
            classGrade.innerText = classSel.grades.name;
            const classTeacher = document.createElement('h5');
            classTeacher.innerText =
                classSel.teacher.firstName + ' ' + classSel.teacher.lastName;
            const classStars = document.createElement('div');
            const starFull = document.createElement('i');
            starFull.classList.add('fas', 'fa-star');
            const starHalf = document.createElement('i');
            starHalf.classList.add('fas', 'fa-star-half-alt');
            const starEmpty = document.createElement('i');
            starEmpty.classList.add('far', 'fa-star');
            for (let i = 0; i < classSel.stars[0]; i++) {
                classStars.innerHTML += '<i class="fas fa-star"></i>';
            }
            for (let j = 0; j < classSel.stars[1]; j++) {
                classStars.innerHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            for (let k = 0; k < classSel.stars[2]; k++) {
                classStars.innerHTML += '<i class="far fa-star"></i>';
            }
            const priceDiv = document.createElement('div');
            priceDiv.classList.add('shadow-pill', 'text-end', 'mb-5');
            const price = document.createElement('h3');
            price.innerText = '$' + classSel.price.toFixed(2);
            const moreInfoDiv = document.createElement('div');
            moreInfoDiv.classList.add(
                'position-absolute',
                'bottom-0',
                'description'
            );
            const moreInfoT = document.createElement('h5');
            moreInfoT.innerText = 'Más información';
            const moreInfo = document.createElement('p');
            moreInfo.innerText = classSel.description.descriptionLong;

            article.appendChild(containerDiv);
            containerDiv.appendChild(a);
            a.appendChild(imgPreview);
            a.appendChild(infoDiv);
            infoDiv.appendChild(classTitle);
            infoDiv.appendChild(classGrade);
            infoDiv.appendChild(classTeacher);
            infoDiv.appendChild(classStars);
            a.appendChild(priceDiv);
            priceDiv.appendChild(price);
            a.appendChild(moreInfoDiv);
            moreInfoDiv.appendChild(moreInfoT);
            moreInfoDiv.appendChild(moreInfo);
            container.appendChild(article);
        }
    }
});
