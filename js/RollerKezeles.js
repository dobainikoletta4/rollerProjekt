class RollerKezeles {
    #rollerek;
    #kovetkezoId;
    #allapotok;

    constructor() {
        this.#rollerek = [];
        this.#kovetkezoId = 1;
        this.#allapotok = ["Szabad", "Bérlés alatt", "Töltőn", "Karbantartás alatt"];
    }
    getAllapotok() {
        return this.#allapotok;
    }

    hozzaad(modell, toltottseg, korzet, allapot = "Szabad", kilometer = 0) {
        if (!this.#allapotok.includes(allapot)) {
            return null;
        }

        var roller = new Rollerek(this.#kovetkezoId, modell, Number(toltottseg), korzet, allapot, Number(kilometer));
        this.#kovetkezoId++;
        this.#rollerek.push(roller);
        return roller;
    }

    getEgy(azonosito) {
        for (var i = 0; i < this.#rollerek.length; i++) {
            if (this.#rollerek[i].getAzonosito() === azonosito) {
                return this.#rollerek[i];
            }
        }
        return null;
    }

    getOsszesroller() {
    var lista = [];

    for (var i = 0; i < this.#rollerek.length; i++) {
        lista.push(this.#rollerek[i]);
    }
    return lista;
}

    frissitAllapot(azonosito,ujAllapot) {
        var roller = this.getEgy(azonosito);
        if (roller === null || !this.#allapotok.includes(ujAllapot)) {
            return false;
        }

        roller.setAllapot(ujAllapot);
        return true;
    }
}