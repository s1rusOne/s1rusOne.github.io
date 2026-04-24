let cats_array = [
    { "name": "Pilli",  "src": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80" },
    { "name": "Pulla",  "src": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=80" },
    { "name": "Monni",  "src": "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=600&q=80" },
    { "name": "Nuppu",  "src": "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&q=80" },
    { "name": "Toffee", "src": "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&q=80" }
];

let index = 0;
let intervalId = null;
let playing = true;

window.onload = function () {
    if (localStorage.hasOwnProperty('imageId')) {
        index = parseInt(localStorage.getItem('imageId'));
        if (index >= cats_array.length) index = 0;
    }
    showSlide(index);
    startPlay();
};

function showSlide(i) {
    let cat = cats_array[i];
    $("#cat-img").fadeOut(200, function () {
        $(this).attr("src", cat.src).attr("alt", cat.name);
        $(this).fadeIn(300);
    });
    $("#cat-name").fadeOut(150, function () {
        $(this).text(cat.name).fadeIn(200);
    });
    localStorage.setItem('imageId', i);
}

function nextSlide() {
    index = (index + 1) % cats_array.length;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + cats_array.length) % cats_array.length;
    showSlide(index);
}

function resetTimer() {
    if (playing) {
        window.clearInterval(intervalId);
        intervalId = window.setInterval(nextSlide, 3000);
    }
}

function startPlay() {
    intervalId = window.setInterval(nextSlide, 3000);
    playing = true;
    $("#play-btn i").removeClass("bi-play-fill").addClass("bi-stop-fill");
}

function stopPlay() {
    window.clearInterval(intervalId);
    intervalId = null;
    playing = false;
    $("#play-btn i").removeClass("bi-stop-fill").addClass("bi-play-fill");
}

function togglePlay() {
    if (playing) {
        stopPlay();
    } else {
        startPlay();
    }
}
