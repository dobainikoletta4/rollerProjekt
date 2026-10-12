const roller = new Roller(1, "Xiaomi", 100, "Belváros");

console.assert(
    roller.getAzonosito() === 1,
    "Hiba: Az azonosító nem megfelelő!"
);

console.assert(
    roller.getModell() === "Xiaomi",
    "Hiba: A modell nem megfelelő!"
);

console.assert(
    roller.getToltottseg() === 100,
    "Hiba: A töltöttség nem 100%!"
);

console.assert(
    roller.getKorzet() === "Belváros",
    "Hiba: A körzet nem megfelelő!"
);

console.assert(
    roller.getAllapot() === "Jó",
    "Hiba: Az állapot nem megfelelő!"
);

roller.setToltottseg(60);

console.assert(
    roller.getToltottseg() === 60,
    "Hiba: A töltöttség módosítása sikertelen!"
);

console.assert(
    roller.getAllapot() === "Közepes",
    "Hiba: Az állapotnak Közepesnek kell lennie!"
);

roller.setToltottseg(-10);

console.assert(
    roller.getToltottseg() === 0,
    "Hiba: A töltöttség nem lehet 0% alatt!"
);

console.assert(
    roller.getAllapot() === "Kritikus",
    "Hiba: Az állapotnak Kritikusnak kell lennie!"
);

roller.setToltottseg(120);

console.assert(
    roller.getToltottseg() === 100,
    "Hiba: A töltöttség nem lehet 100% felett!"
);

console.assert(
    roller.getAllapot() === "Jó",
    "Hiba: Az állapotnak Jónak kell lennie!"
);

roller.setModell("Segway");

console.assert(
    roller.getModell() === "Segway",
    "Hiba: A modell módosítása sikertelen!"
);

roller.setKorzet("Városliget");

console.assert(
    roller.getKorzet() === "Városliget",
    "Hiba: A körzet módosítása sikertelen!"
);

roller.setAzonosito(2);

console.assert(
    roller.getAzonosito() === 2,
    "Hiba: Az azonosító módosítása sikertelen!"
);
