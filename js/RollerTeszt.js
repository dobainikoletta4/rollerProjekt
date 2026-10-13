var roller = new Rollerek(1, "Xiaomi", 100, "Belváros", "Aktív", 10);

console.assert(roller.getAzonosito() == 1,"Hiba: Az azonosító nem megfelelő!");

console.assert(roller.getModell() === "Xiaomi","Hiba: A modell nem megfelelő!");

console.assert(roller.getToltottseg() == 100,"Hiba: A töltöttség nem 100%!");

console.assert(roller.getKorzet() === "Belváros","Hiba: A körzet nem megfelelő!");

console.assert(roller.getAllapot() === "Aktív", "Hiba: Az adott rollernek aktivnak kell lennie!")

console.assert(roller.getKilometer() == 10, "Hiba: A kilometer nem megfelelő!")

roller.setToltottseg(-10);

console.assert(roller.getToltottseg() == 0,"Hiba: A töltöttség nem lehet 0% alatt!");

roller.setToltottseg(120);

console.assert(roller.getToltottseg() == 100,"Hiba: A töltöttség nem lehet 100% felett!");

roller.setModell("Segway");

console.assert(roller.getModell() === "Segway","Hiba: A modell módosítása sikertelen!");

roller.setKorzet("Városliget");

console.assert(roller.getKorzet() === "Városliget","Hiba: A körzet módosítása sikertelen!");

roller.setAzonosito(2);

console.assert(roller.getAzonosito() == 2,"Hiba, Az azonosító módosítása sikertelen!");
