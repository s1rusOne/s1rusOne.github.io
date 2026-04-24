let history = [];

window.onload = function () {
    let a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;
    document.getElementById('numA').value = a;
    document.getElementById('numB').value = b;

    $("#error-dialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: { "OK": function () { $(this).dialog("close"); } }
    });

    $("#info-btn").click(function () {
        $("#error-message").text("Laskin laskee kaksi lukua valitulla operaattorilla. Voit muuttaa lukuja +/- painikkeilla.");
        $("#error-dialog").dialog("option", "title", "Tietoa laskimesta").dialog("open");
    });
};

function showError(msg) {
    $("#error-message").text(msg);
    $("#error-dialog").dialog("option", "title", "Virhe").dialog("open");
}

function stepNumber(field, delta) {
    let id = field === 'a' ? 'numA' : 'numB';
    let val = parseInt(document.getElementById(id).value);
    if (isNaN(val)) val = 0;
    document.getElementById(id).value = val + delta;
}

function calculate() {
    let aStr = $("#numA").val().trim();
    let bStr = $("#numB").val().trim();

    if (aStr === '' || bStr === '') {
        showError("Molemmat numerokentät ovat pakollisia.");
        return;
    }

    let a = parseInt(aStr);
    let b = parseInt(bStr);

    if (isNaN(a) || isNaN(b)) {
        showError("Syötä kelvollinen kokonaisluku molempiin kenttiin.");
        return;
    }

    let op = $("#operationSelect").val();
    let displayOp = $("#operationSelect option:selected").text();

    if (op === '/' && b === 0) {
        showError("Nollalla jakaminen ei ole sallittua.");
        return;
    }

    let result;
    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
    }

    let resultDisplay = Number.isInteger(result) ? result : result.toFixed(2);
    $("#result-value").text(resultDisplay);

    let entry = a + " " + displayOp + " " + b + " = " + resultDisplay;
    history.push(entry);
    renderHistory();
}

function renderHistory() {
    let box = $("#history-box");
    box.empty();
    if (history.length === 0) return;

    box.append('<div class="history-count">laskutoimituksia: ' + history.length + ' kpl</div>');
    history.forEach(function (item) {
        box.append('<div>' + item + '</div>');
    });
}
