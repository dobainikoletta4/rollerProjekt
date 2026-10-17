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

    hozzaad(modell, toltottseg = 100, korzet, allapot = "Bérlés alatt", kilometer = 0) {
        if (!this.#allapotok.includes(allapot)) {
            return null;
        }

        var roller = new Rollerek(this.#kovetkezoId, modell, Number(toltottseg), korzet, allapot, Number(kilometer));
        this.#kovetkezoId++;
        this.#rollerek.push(roller);
        return roller;
    }

    getEgyRoller(azonosito) {
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

    frissitAllapot(azonosito, ujAllapot) {
        var roller = this.getEgyRoller(azonosito);
        if (roller === null || !this.#allapotok.includes(ujAllapot)) {
            return false;
        }

        roller.setAllapot(ujAllapot);
        return true;
    }

    frissitToltottseg(azonosito, ujToltottseg) {
        var roller = this.getEgyRoller(azonosito);

        if (roller === null || isNaN(Number(ujToltottseg))) {
            return false;
        }

        roller.setToltottseg(Number(ujToltottseg));
        return true;
    }

    torol(azonosito) {
        for (var i = 0; i < this.#rollerek.length; i++) {
            if (this.#rollerek[i].getAzonosito() === azonosito) {
                this.#rollerek.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    getKritikusAllappot() {
        var kritikus = [];

        for (var i = 0; i < this.#rollerek.length; i++) {
            if (this.#rollerek[i].getToltottseg() < 20) {
                kritikus.push(this.#rollerek[i]);
            }
        }
        return kritikus;
    }

    getDarab(allapot) {
        var db = 0;

        for (var i = 0; i < this.#rollerek.length; i++) {
            if (this.#rollerek[i].getAllapot() === allapot) {
                db++;
            }
        }
        return db;
    }

    getStatisztika() {
        return {
            osszes: this.#rollerek.length,
            szabad: this.getDarab("Szabad"),
            toltesAlatt: this.getDarab("Töltőn"),
            berlesAlatt: this.getDarab("Bérlés alatt"),
            karbantartas: this.getDarab("Karbantartás alatt"),
            alacsony: this.getKritikusAllappot().length
        };
    }
}