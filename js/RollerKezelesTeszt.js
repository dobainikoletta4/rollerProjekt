var kezeles = new RollerKezeles();

var r1 = kezeles.hozzaad("Xiaomi", 80, "Főtér");
var r2 = kezeles.hozzaad("Valami", 15, "Réti utca", "Töltőn", 100);
var r3 = kezeles.hozzaad("Random", 50, "Kelenföld", "Bérlés alatt", 40);

console.assert(kezeles.getOsszesroller().length == 3, "Hiba: 3 rollernek kell lennie mert annyit vettünk fel!");

console.assert(r1.getAzonosito() == 1, "Hiba: Az első roller azonosítója nem 1!");

console.assert(r1.getAllapot() === "Szabad", "Hiba: Az alapértelmezett állapot nem szabad!");

console.assert(kezeles.hozzaad("Hibás", 50, "Főtér", "Ismeretlen") === null, "Hiba: Érvénytelen állapottal nem vehető fel roller, nullt kell kapnunk");

console.assert(kezeles.getEgyRoller(2).getModell() === "Valami", "Hiba: A getEgyRoller nem a megfelelő rollert adja, a 2es azonosítójú roller a Valami nevű!");

console.assert(kezeles.getEgyRoller(99) === null, "Hiba: Nem létező azonosítóra nullt  kell visszaadni!");

console.assert(kezeles.frissitAllapot(1, "Karbantartás alatt") === true, "Hiba: Érvényes állapotr a frissítés sikertelen!");

console.assert(kezeles.getEgyRoller(1).getAllapot() === "Karbantartás alatt", "Hiba: Az állapot nem változott meg!");

console.assert(kezeles.frissitAllapot(1, "Ismeretlen") === false, "Hiba: Érvénytelen állapot nem állítható be!");


kezeles.frissitToltottseg(3, 150);

console.assert(kezeles.getEgyRoller(3).getToltottseg() == 100, "Hiba: A töltöttség nem lehet 100% felett!");

console.assert(kezeles.frissitToltottseg(2, "asd") === false, "Hiba: Szöveg nem lehet töltöttség!");


console.assert(kezeles.getKritikusAllappot().length == 1, "Hiba: 1 kritikus rollernek kell lennie mert r2 15%-on van!");

console.assert(kezeles.getKritikusAllappot()[0].getAzonosito() == 2, "Hiba: Rossz roller van a kritikus listában!");


//statisztika tesztelés
var stat = kezeles.getStatisztika();

console.assert(stat.osszes == 3, "Hiba: Az összes roller száma nem megfelelő!");

console.assert(stat.szabad == 0, "Hiba: A szabad rollerek száma nem megfelelő, egyik se szabad!");

console.assert(stat.toltesAlatt == 1, "Hiba: A töltőn lévő rollerek száma nem megfelelő, r2 éppen töltődik!");

console.assert(stat.berlesAlatt == 1, "Hiba: A bérlés alatti rollerek száma nem megfelelő, r3 bérlés alatt van!");

console.assert(stat.karbantartas == 1, "Hiba: A karbantartás alatti rollerek száma nem megfelelő, r1 karbantartás alatt van!");

console.assert(stat.alacsony == 1, "Hiba: Az alacsony töltöttségű rollerek száma nem megfelelő, csak r2 kritikus!");

//törlés tesztelés
console.assert(kezeles.torol(2) === true, "Hiba: A törlés sikertelen!");

console.assert(kezeles.getOsszesroller().length == 2, "Hiba: Törlés után 2 rollernek kell maradnia!");

console.assert(kezeles.getEgyRoller(2) === null, "Hiba: A törölt roller még létezik valamiért!");

console.assert(kezeles.torol(2) === false, "Hiba: Már törölt roller nem törölhető újra!");