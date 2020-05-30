import { API } from "aws-amplify";

export class APIs {

    static getPujas() {
        return API.get('pujas', '/pujas')
    }

    static getPujaris () {
        return API.get('pujas', '/pujaris')
    }

    static sendOTP (ph) {
        return API.get('payments', `/verify/${ph}`)
    }
    static verifyOTP (ph, otp) {
        const init = {
            body:{
                phoneNumber: ph,
                code: otp
            }
        }
        return API.post('payments', `/verify`,init)
    }

    static pay(source, pujaId) {
        const init = {
            body:{
                source,
                pujaId
            }
        }
        return API.post('payments', `/payment`,init)
    }

    static createIntent(pujaId=1){
        const init = {
            body:{
                pujaId
            }
        }
        return API.post('payment', '/createIntent', init)
    }

    static payIntent(pujaId=1,intentId){
        const init = {
            body:{
                intentId,
                pujaId
            }
        }
        return API.post('payment', '/payIntent', init)
    }
}