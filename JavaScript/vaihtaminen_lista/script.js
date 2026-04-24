let cats_array = [
    { "name": "Pilli",  "src": "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80" },
    { "name": "Pulla",  "src": "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=80" },
    { "name": "Monni",  "src": "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=600&q=80" },
    { "name": "Nuppu",  "src": "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&q=80" },
    { "name": "Toffee", "src": "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600&q=80" }
];

window.onload = function () {
    let container = $('#image-container');
    cats_array.forEach(function (cat) {
        let item = $('<div class="cat-item"></div>');
        item.append('<img src="' + cat.src + '" alt="' + cat.name + '">');
        item.append('<p>' + cat.name + '</p>');
        container.append(item);
    });
};

function showGrid() {
    $('#image-container').removeClass('list-container').addClass('grid-container');
    $('#btn-grid').addClass('active');
    $('#btn-list').removeClass('active');
}

function showList() {
    $('#image-container').removeClass('grid-container').addClass('list-container');
    $('#btn-list').addClass('active');
    $('#btn-grid').removeClass('active');
}
