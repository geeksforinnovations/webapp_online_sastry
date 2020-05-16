import { API } from "aws-amplify";

export class APIs {

    static getPujas() {
        return API.get('pujas', '/pujas')
    }

    static getPujaris () {
        return API.get('pujas', '/pujaris')
    }
}