
// js function to test webp support
function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});


// Header switcher ************************************************
const headerWrapper = document.querySelector('.header__wrapper');
const headerTrack = document.querySelector('.header__banners-track');
const banners = document.querySelectorAll('.banner');
const headerDotsWrapper = document.querySelector('.banner-switch__dots');
const headerPrevButton = document.querySelector('.banner-switch__right-arrow');
const headerNextButton = document.querySelector('.banner-switch__left-arrow');

let headerDotClassName = 'dot';
let bannersCount = banners.length;
let activeBanner = 1;
let bannerHeight = banners[0].offsetHeight;
let regExprPx = /[0-9-.]+(?=px)/g


headerDotsWrapper.innerHTML = '';
for (let i = 0; i < bannersCount; i++) {
    headerDotsWrapper.innerHTML += `<div class="${headerDotClassName}"></div>`;
}

const headerDots = document.querySelectorAll(`.banner-switch__dots .${headerDotClassName}`);

headerTrack.style.transform = `translate3d(0px,-${bannerHeight * activeBanner}px,0px)`;
headerDots[bannersCount - 1 - activeBanner].classList.add(`${headerDotClassName}_active`);

let setBanner = function(bannerIndex = activeBanner) {
    activeBanner = bannerIndex;

    // console.log(headerTrack.style.transform.match(regExprPx)[0]);

    headerTrack.style.transition = 'all 0.3s ease';
    headerTrack.style.transform = `translate3d(0px,-${bannerHeight * activeBanner}px,0px)`;

    for (let i = 0; i < bannersCount; i++) {
        if (i === activeBanner) {
            headerDots[bannersCount - 1 - i].classList.add(`${headerDotClassName}_active`);
        }
        else {
            headerDots[bannersCount - 1 - i].classList.remove(`${headerDotClassName}_active`);
        }
    }

    // console.log(headerTrack.style.transform.match(regExprPx)[0]);
};

for (let dot of headerDots) {
    dot.addEventListener('click', function() {
        let bannerIndex = activeBanner;
        for (let i = 0; i < bannersCount; i++) {
            if (headerDots[bannersCount - 1 - i] == this) {
                bannerIndex = i;
                break;
            }
        }
        setBanner(bannerIndex);
    });
}

headerPrevButton.addEventListener('click', function() {
    activeBanner--;
    if (activeBanner < 0) {
        activeBanner += bannersCount;
    }
    setBanner();
});
headerNextButton.addEventListener('click', function() {
    activeBanner++;
    if (activeBanner >= bannersCount) {
        activeBanner -= bannersCount;
    }
    setBanner();
});