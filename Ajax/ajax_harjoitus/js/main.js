var laskuri = 0;
var laskuriZen = 0;
var laskuriProfile = 0;
var hakuNro = 0;
var jqReady = false;

$(document).ready(function () {

    // --- Chuck Norris ---
    $("#btn-hae").on("click", function () {
        $("#spinner").show();

        $.getJSON("https://api.chucknorris.io/jokes/random", function (data) {
            laskuri++;
            hakuNro++;
            $("#laskuri").text(laskuri);

            var teksti = data.value;
            $("#tulokset").append("<p><em>" + teksti + "</em></p>");
            lisaaAccordion(hakuNro + ". haku", "<em>" + teksti + "</em>");

        }).fail(function () {
            $("#tulokset").append("<p class='text-danger'>Virhe: rajapintaan ei saatu yhteyttä.</p>");
        }).always(function () {
            $("#spinner").hide();
        });
    });

    // --- GitHub Zen ---
    $("#btn-zen").on("click", function () {
        $("#spinner-zen").show();

        $.ajax({
            url: "https://api.github.com/zen",
            type: "GET",
            success: function (quote) {
                laskuriZen++;
                hakuNro++;
                $("#laskuri-zen").text(laskuriZen);
                $("#tulokset-zen").append("<p><em>" + quote + "</em></p>");
                lisaaAccordion(hakuNro + ". haku (Zen)", "<em>" + quote + "</em>");
            },
            error: function () {
                $("#tulokset-zen").append("<p class='text-danger'>Virhe: ei saatu yhteyttä.</p>");
            },
            complete: function () {
                $("#spinner-zen").hide();
            }
        });
    });

    // --- GitHub Profiili ---
    $("#btn-profile").on("click", function () {
        var kayttaja = $("#username-input").val().trim();
        if (!kayttaja) return;

        $("#spinner-profile").show();
        $("#tulokset-profile").empty();

        $.getJSON("https://api.github.com/users/" + kayttaja)
            .done(function (data) {
                laskuriProfile++;
                hakuNro++;
                $("#laskuri-profile").text(laskuriProfile);

                var sisalto;
                if (data.message) {
                    sisalto = "<p class='text-danger'>" + data.message + "</p>";
                } else {
                    sisalto =
                        "<strong>" + (data.name || data.login) + "</strong><br>" +
                        "<small>@" + data.login + "</small><br>" +
                        (data.company ? "Yritys: " + data.company + "<br>" : "") +
                        (data.location ? "Sijainti: " + data.location + "<br>" : "") +
                        "Seuraajat: " + data.followers + " | Repot: " + data.public_repos;
                }

                $("#tulokset-profile").html(sisalto);
                lisaaAccordion(hakuNro + ". haku (@" + kayttaja + ")", sisalto);
            })
            .fail(function () {
                $("#tulokset-profile").html("<p class='text-danger'>Käyttäjää ei löydy.</p>");
            })
            .always(function () {
                $("#spinner-profile").hide();
            });
    });

});

function lisaaAccordion(otsikko, sisalto) {
    // Bootstrap accordion
    var collapseId = "bs-collapse-" + hakuNro;
    document.getElementById("bs-accordion").insertAdjacentHTML("beforeend",
        '<div class="accordion-item">' +
            '<h2 class="accordion-header">' +
                '<button class="accordion-button collapsed" type="button" ' +
                    'data-bs-toggle="collapse" data-bs-target="#' + collapseId + '">' +
                    otsikko +
                '</button>' +
            '</h2>' +
            '<div id="' + collapseId + '" class="accordion-collapse collapse">' +
                '<div class="accordion-body">' + sisalto + '</div>' +
            '</div>' +
        '</div>'
    );

    // jQuery accordion
    if (!jqReady) {
        $("#jq-accordion").accordion({ collapsible: true, active: false, heightStyle: "content" });
        jqReady = true;
    }
    $("#jq-accordion").append("<h3>" + otsikko + "</h3><div>" + sisalto + "</div>");
    $("#jq-accordion").accordion("refresh");
    $("#jq-accordion").accordion("option", "active", false);
}
