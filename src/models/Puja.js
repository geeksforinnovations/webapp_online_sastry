export default class Puja {
    constructor(puja){
        this.name = puja.name;
        this.pujaType = puja.pujaType;
        this.description = puja.description;
        this.about = puja.about;
        this.timeInHrs = puja.timeInHrs;
        this.cost = puja.cost
        this.requiredThings = puja.requiredThings
        this.pujaLanguages = puja.PujaLanguages || []
        
    }

    get Price() {
        
        const cost = this.cost ? this.cost : 0
        return `$${cost}`
    }
    get Languages () {
        //return []
        return this.pujaLanguages.map(lang => lang.Language.name)
    }
}