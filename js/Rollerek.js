class Rollerek {
    #azonosito;
    #modell;
    #toltottseg;
    #korzet;
    #allapot;

    constructor(azonosito, modell, toltottseg = 100, korzet) {
        this.setAzonosito(azonosito);
        this.setModell(modell);
        this.setToltottseg(toltottseg);
        this.setKorzet(korzet);
    }

    setAzonosito(azonosito){
        this.#azonosito = azonosito;
    }

    setModell(modell) {
        this.#modell = modell;
    }

    setToltottseg(toltottseg) {
        if (toltottseg < 0) {
            toltottseg = 0;
        }

        if (toltottseg > 100) {
            toltottseg = 100;
        }

        this.#toltottseg = toltottseg;

        if (toltottseg >= 80) {
            this.#allapot = "Jó";
        } else if (toltottseg >= 50) {
            this.#allapot = "Közepes";
        } else if (toltottseg >= 21) {
            this.#allapot = "Gyenge";
        } else {
            this.#allapot = "Kritikus";
        }
    }

    setKorzet(korzet) {
        this.#korzet = korzet;
    }

    getAzonosito() {
        return this.#azonosito;
    }

    getModell() {
        return this.#modell;
    }

    getToltottseg() {
        return this.#toltottseg;
    }

    getKorzet() {
        return this.#korzet;
    }

    getAllapot() {
        return this.#allapot;
    }

}