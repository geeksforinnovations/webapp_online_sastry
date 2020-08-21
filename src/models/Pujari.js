import { API } from "aws-amplify";
export class Pujari {
    constructor(pujari) {
        this.id = pujari.id;
        this.firstName = pujari.firstName;
        this.lastName = pujari.lastName;
        this.description = pujari.description;
        this.contactNo = pujari.contactNo;
        this.address1 = pujari.address1;
        this.address2 = pujari.address2;
        this.type = pujari.type;
        this.city = pujari.city;
        this.country = pujari.country
        this.timeZone = pujari.timeZone;
        this.status = pujari.status;
        this.imageId = pujari.imageId;
        this.rating = pujari.rating;
        this.experience = pujari.experience
        this.PujariLanguages = pujari.PujariLanguages

    }
    get Languages () {
        //return []
        return this.PujariLanguages.map(lang => lang.Language.name)
    }
    static getAll() {
        return API.get('pujaries', '/pujaris')
    }

    isNew() {
        return this.id == null
    }
    get name() {
        return `${this.firstName} ${this.lastName}`
    }


    create() {
        const body = {}
        return API.post('pujaries', '/pujaries', body)
    }

    update() {
        const body = {}
        return API.patch('pujaries', '/pujaries', body)
    }
}

export default Pujari;