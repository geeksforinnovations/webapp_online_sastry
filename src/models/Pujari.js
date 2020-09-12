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

    get FullName () {
        return `${this.firstName} ${this.lastName}`
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
    static toList(array) {
        return array.map(pujari=> new Pujari(pujari))
    }


    create() {
        const body = {}
        return API.post('pujaries', '/pujaris', body)
    }

    updateStatus(status) {
        console.log('st', status);
        const init = {
            body:{status: status}
        }
        const body = {status: status}
        return API.post('pujaries', `/updatePujari/${this.id}`, init)
    }
}

export default Pujari;