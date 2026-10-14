var kezeles = new RollerKezeles();

// AI
var markerek;
var terkep;
//
kezeles.hozzaad("Xiaomi Pro 2", 95, "Belváros", "Szabad", 12);
kezeles.hozzaad("Segway Ninebot", 72, "Főtér", "Szabad", 35);
kezeles.hozzaad("Xiaomi Essential", 15, "Kelenföld", "Töltőn", 87);
kezeles.hozzaad("Ninebot Max", 48, "Városliget", "Bérlés alatt", 120);
kezeles.hozzaad("Xiaomi Scooter 4", 8, "Belváros", "Karbantartás alatt", 210);

// AI
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


function terkepKiir() {
    if (!markerek) return;

    markerek.clearLayers();

    var rollerek = kezeles.getOsszesroller();
    var darabok = {};

    for (var i = 0; i < rollerek.length; i++) {
        var roller = rollerek[i];
        var korzet = roller.getKorzet();
        var hely = korzetek[korzet] || [47.4979, 19.0402];

        var index = darabok[korzet] || 0;
        darabok[korzet] = index + 1;

        var szog = index * (Math.PI / 2);
        var tavolsag = 0.001 * Math.sqrt(index);

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
            <b>Hely:</b> ${roller.getKorzet()}
        `);

        markerek.addLayer(marker);
    }
}

function statisztikaKiir() {
    var stat = kezeles.getStatisztika();
    var kicsik = document.querySelectorAll(".col-6 p");
 
    document.querySelector(".p1").textContent = stat.osszes;
    kicsik[0].textContent = stat.szabad;
    kicsik[1].textContent = stat.toltesAlatt;
    kicsik[2].textContent = stat.alacsony;
    kicsik[3].textContent = stat.karbantartas;
}

function kiir() {
    var tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";
 
    var rollerek = kezeles.getOsszesroller();
 
    for (var i = 0; i < rollerek.length; i++) {
        var roller = rollerek[i];
 
        tbody.innerHTML += `<tr> <th>${roller.getAzonosito()}</th>
                <td>${roller.getModell()}</td>
                <td>${roller.getToltottseg()}%</td>
                <td>${roller.getAllapot()}</td>
                <td>${roller.getKorzet()}</td>
                <td>${roller.getKilometer()} km</td>

                <td><i class="bi bi-trash3-fill text-danger"
                       onclick="torol(${roller.getAzonosito()})">
                </i></td>
            </tr>`;
    }
 
    statisztikaKiir();
    terkepKiir();
}

function regisztral() {
    var modell = document.querySelector(".modell");
    var toltottseg = document.querySelector(".toltottseg");
    var korzet = document.querySelector(".korzet");

    if (
        modell.value.trim() === "" ||
        toltottseg.value === "" ||
        korzet.value.trim() === "" ||
        !Number.isInteger(Number(toltottseg.value)) ||
        Number(toltottseg.value) < 0 ||
        Number(toltottseg.value) > 100
    ) {
        alert("Töltsd ki helyesen az összes mezőt!");
        return;
    }

    kezeles.hozzaad(
        modell.value.trim(),
        Number(toltottseg.value),
        korzet.value.trim(),
        Number(toltottseg.value) < 20 ? "Töltőn" : "Szabad",
        0
    );

    modell.value = "";
    toltottseg.value = "";
    korzet.value = "";

    kiir();
}
//AI
document.addEventListener("DOMContentLoaded", function() {
    terkepInditasa();
    kiir();

    document.querySelector(".regisztralas").addEventListener("click", function() {
        regisztral();
    });
});
//
