window.onload = function() {
    let address = 'Yliopistonkatu 36 ';
    let city = 'Lappeenranta';
    let place = 'https://www.google.com/maps?q=' + address + city + '&output=embed';

    let iframeElement = document.getElementById('map-frame');
    iframeElement.src = place;

    document.getElementById('addr-field').value = 'Yliopistonkatu 36';
    document.getElementById('city-field').value = 'Lappeenranta';
};

function haeOsoite() {
    let address = document.getElementById('addr-field').value;
    let city = document.getElementById('city-field').value;
    let place = 'https://www.google.com/maps?q=' + address + ' ' + city + '&output=embed';

    let iframeElement = document.getElementById('map-frame');
    iframeElement.src = place;
}
