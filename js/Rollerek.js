class Rollerek {
    #azonosito;
    #modell;
    #toltottseg;
    #korzet;
    #allapot;
    #kilometer;

    constructor(azonosito, modell, toltottseg = 100, korzet, allapot, kilometer){
        this.setAzonosito(azonosito);
        this.setModell(modell);
        this.setToltottseg(toltottseg);
        this.setKorzet(korzet);
        this.setAllapot(allapot);
        this.setKilometer(kilometer);
    }

    setAzonosito(azonosito){
        this.#azonosito = azonosito;
    }

    setModell(modell){
        this.#modell = modell;
    }

    setToltottseg(toltottseg){
        if (toltottseg < 0){
            toltottseg = 0;
        }

        if (toltottseg > 100){
            toltottseg = 100;
        }

        this.#toltottseg = toltottseg;
    }

    setKorzet(korzet){
        this.#korzet = korzet;
    }

    setAllapot(allapot){
        this.#allapot = allapot;
    }

    setKilometer(kilometer){
        this.#kilometer = kilometer;
    }

    getAzonosito(){
        return this.#azonosito;
    }

    getModell(){
        return this.#modell;
    }

    getToltottseg(){
        return this.#toltottseg;
    }

    getKorzet(){
        return this.#korzet;
    }

    getAllapot(){
        return this.#allapot;
    }

    getKilometer(){
        return this.#kilometer;
    }

}