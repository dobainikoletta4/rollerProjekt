var kezeles = new RollerKezeles();
var csakHuszSzazalekAlattiRoller = false;

kezeles.hozzaad("Xiaomi Pro 2", 95, "Belváros", "Szabad", 12);
kezeles.hozzaad("Segway Ninebot", 72, "Főtér", "Szabad", 35);
kezeles.hozzaad("Xiaomi Essential", 15, "Kelenföld", "Töltőn", 87);
kezeles.hozzaad("Ninebot Max", 48, "Városliget", "Bérlés alatt", 120);
kezeles.hozzaad("Xiaomi Scooter 4", 8, "Belváros", "Karbantartás alatt", 210);

// AI
var markerek;
var terkep;
var korzetek = {
    "Belváros": [47.4979, 19.0402],
    "Főtér": [47.5069, 19.0399],
    "Kelenföld": [47.4647, 19.0208],
    "Városliget": [47.5149, 19.0847],
    "Margitsziget": [47.5260, 19.0475],
    "Újbuda": [47.4730, 19.0420],
    "Astoria": [47.4950, 19.0600],
    "Deák tér": [47.4980, 19.0548]
};



function terkepInditasa() {
    terkep = L.map("terkep").setView([47.4979, 19.0402], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(terkep);

    markerek = L.layerGroup().addTo(terkep);
}



var helyCache = {};

async function korzetHelye(korzet) {
    // Ha a körzet már szerepel az objektumban
    if (korzetek[korzet]) {
        return korzetek[korzet];
    }

    // Ha korábban már megkerestük a helyet
    if (helyCache[korzet]) {
        return helyCache[korzet];
    }

    try {
        var url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q="
            + encodeURIComponent(korzet + ", Budapest, Hungary");

        var valasz = await fetch(url);
        var adatok = await valasz.json();

        if (adatok.length > 0) {
            var hely = [
                Number(adatok[0].lat),
                Number(adatok[0].lon)
            ];

            helyCache[korzet] = hely;
            return hely;
        }
    } catch (hiba) {
        console.error("A körzet keresése sikertelen:", hiba);
    }

    return null;
}

async function terkepKiir() {
    if (!markerek) return;

    markerek.clearLayers();

    var rollerek = kezeles.getOsszesroller();
    var darabok = {};

    for (var i = 0; i < rollerek.length; i++) {
        var roller = rollerek[i];
        var korzet = roller.getKorzet();

        var hely = await korzetHelye(korzet);

        if (hely === null) {
            console.warn("Nem található ilyen körzet:", korzet);
            continue;
        }

        var index = darabok[korzet] || 0;
        darabok[korzet] = index + 1;

        var szog = index * (Math.PI / 2);
        var tavolsag = 0.003 * Math.sqrt(index);

        var lat = hely[0] + Math.sin(szog) * tavolsag;
        var lng = hely[1] + Math.cos(szog) * tavolsag;

        var szin = "#16a34a";

        if (roller.getToltottseg() < 20) {
            szin = "#dc2626";
        } else if (roller.getAllapot() === "Töltőn") {
            szin = "#eab308";
        } else if (roller.getAllapot() === "Bérlés alatt") {
            szin = "#2563eb";
        } else if (roller.getAllapot() === "Karbantartás alatt") {
            szin = "#7c3aed";
        }

        var ikon = L.divIcon({
            className: "",
            html: `
                <div style="
                    background:${szin};
                    width:32px;
                    height:32px;
                    border:2px solid white;
                    border-radius:50%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    box-shadow:0 2px 6px #555;
                    font-size:17px;
                ">🛴</div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        var marker = L.marker([lat, lng], { icon: ikon });

        marker.bindTooltip(`
            <b>ID:</b> ${roller.getAzonosito()}<br>
            <b>Modell:</b> ${roller.getModell()}<br>
            <b>Töltöttség:</b> ${roller.getToltottseg()}%<br>
            <b>Állapot:</b> ${roller.getAllapot()}<br>
            <b>Hely:</b> ${korzet}
        `);

        markerek.addLayer(marker);
    }
}

//

function statisztikaKiir() {
    var stat = kezeles.getStatisztika();
    var kicsiszamok = document.querySelectorAll(".col-6 p");

    document.querySelector(".p1").textContent = stat.osszes;
    kicsiszamok[0].textContent = stat.szabad;
    kicsiszamok[1].textContent = stat.toltesAlatt;
    kicsiszamok[2].textContent = stat.alacsony;
    kicsiszamok[3].textContent = stat.karbantartas;
}

function kiir() {
    var tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    var rollerek;

    if (csakHuszSzazalekAlattiRoller) {
        rollerek = kezeles.getKritikusAllappot();
    } else {
        rollerek = kezeles.getOsszesroller();
    }

    if (rollerek.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-muted py-4">
                    Nincsenek elemek.
                </td>
            </tr>
        `;

        statisztikaKiir();
        terkepKiir();
        return;
    }


    for (var i = 0; i < rollerek.length; i++) {
        var roller = rollerek[i];

        var szin = "";

        if (roller.getToltottseg() <= 20) {
            szin = "bg-danger";
        } else if (roller.getToltottseg() <= 40) {
            szin = "narancssarga";
        } else if (roller.getToltottseg() <= 70) {
            szin = "bg-warning";
        } else {
            szin = "bg-success";
        }

        tbody.innerHTML += `<tr> <th>${roller.getAzonosito()}</th>
                <td>${roller.getModell()}</td>
                <td><div class="progress" role="progressbar" aria-valuenow="${roller.getToltottseg()}" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar ${szin}" style="width: ${roller.getToltottseg()}%">${roller.getToltottseg()}%</div>
                    </div>
                </td>
                <td>${roller.getAllapot()}</td>
                <td>${roller.getKorzet()}</td>
                <td>${roller.getKilometer()} km</td>
 
                <td><i class="bi bi-trash3-fill text-danger"
                       data-bs-toggle="modal" data-bs-target="#TorlesModal"
                       onclick=torol(${roller.getAzonosito()})>
                </i>
                <i class="bi bi-pencil-fill text-primary ms-4" onclick="szerkesztes(${roller.getAzonosito()})"></i></td>
            </tr>`;

    }

    statisztikaKiir();
    terkepKiir();
}

var sikeresModal = new bootstrap.Modal("#sikeresModal");

var sikeresModal2 = new bootstrap.Modal("#sikeresModal2");

var szerkesztendo = -1;

function regisztral() {
    var modell = document.querySelector(".modell");
    var korzet = document.querySelector(".korzet");
    var gomb = document.querySelector(".regisztralas");

    var szazalek = 100;

    if (
        modell.value.trim() === "" ||
        korzet.value.trim() === ""
    ) {
        alert("Töltsd ki helyesen az összes mezőt!");
        return;
    }

    if (szerkesztendo !== -1) {
        var roller = kezeles.getEgyRoller(szerkesztendo);

        if (roller !== null) {
            roller.setModell(modell.value.trim());
            roller.setKorzet(korzet.value.trim());
        }

        szerkesztendo = -1;
        gomb.textContent = "Regisztrálás";

        document.querySelector("form").reset();
        kiir();

        sikeresModal2.show();
    } else {
        kezeles.hozzaad(
            modell.value.trim(),
            100,
            korzet.value.trim(),
            "Bérlés alatt"
        );

        document.querySelector("form").reset();
        kiir();

        sikeresModal.show();
    }
}

document.querySelector(".regisztralas").addEventListener("click", () => {
    regisztral();
});

document.addEventListener("DOMContentLoaded", function () {
    terkepInditasa();
    kiir();

    var HuszSzazalekGomb = document.querySelector(".d-flex .btn-danger");

    HuszSzazalekGomb.addEventListener('click', () => {
        if (csakHuszSzazalekAlattiRoller) {
            csakHuszSzazalekAlattiRoller = false;
            HuszSzazalekGomb.textContent = "20% alatti töltöttség";
        } else {
            csakHuszSzazalekAlattiRoller = true;
            HuszSzazalekGomb.textContent = "Összes roller mutatása";
        }

        kiir();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#feltoltesGomb").addEventListener('click', function () {
        var rollerek = kezeles.getOsszesroller();

        for (var i = 0; i < rollerek.length; i++) {
            var roller = rollerek[i];

            if (roller.getAllapot() === "Bérlés alatt") {
                kezeles.frissitAllapot(roller.getAzonosito(), "Töltőn");
                continue;
            } else

                kezeles.frissitToltottseg(roller.getAzonosito(), 100);

            if (roller.getAllapot() === "Töltőn") {
                kezeles.frissitAllapot(roller.getAzonosito(), "Szabad");
            }
        }

        kiir();
    });

    document.querySelector("#javitasGomb").addEventListener('click', () => {
        var rollerek = kezeles.getOsszesroller();

        for (var i = 0; i < rollerek.length; i++) {
            var roller = rollerek[i];

            if (roller.getAllapot() === "Karbantartás alatt") {
                kezeles.frissitAllapot(roller.getAzonosito(), "Szabad");
            }
        }

        kiir();
    });
});


szerkesztendo = -1;

function szerkesztes(azonosito) {
    var roller = kezeles.getEgyRoller(azonosito);

    var modell = document.querySelector(".modell");
    var korzet = document.querySelector(".korzet");
    var gomb = document.querySelector(".regisztralas");

    if (roller === null) {
        return;
    }

    modell.value = roller.getModell();
    korzet.value = roller.getKorzet();

    szerkesztendo = azonosito;

    gomb.textContent = "Mentés";
}

var torlendoId = null;

function torol(id) {
    var roller = kezeles.getEgyRoller(id);
    if (roller === null) return;

    torlendoId = id;
    document.querySelector("#Torles").textContent =
        roller.getModell();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#TorlesMegerosites").addEventListener('click', () => {
        if (torlendoId === null) return;

        kezeles.torol(torlendoId);
        torlendoId = null;
        kiir();
    });
});