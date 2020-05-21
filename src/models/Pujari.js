class Pujari {
    constructor(pujari) {
        this.id = pujari.id;
        this.name = pujari.name;
    }

    isNew() {
       return this.id == null
    }
}

export default Pujari;