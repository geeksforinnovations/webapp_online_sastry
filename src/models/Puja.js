export default class Puja {
    constructor(name, pujaType,description, about,timeInHrs, cost, requiredThings=[]){
        this.name = name;
        this.pujaType = pujaType;
        this.description = description;
        this.about = about;
        this.timeInHrs = timeInHrs;
        this.cost = cost
        this.requiredThings = requiredThings
        
    }

    get Price() {
        const cost = this.cost ? this.cost : 0
        return `$${cost}`
    }
}