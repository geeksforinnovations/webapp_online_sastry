import { API } from "aws-amplify";

class Booking {
    constructor(booking = {}) {
        this.id = booking.id || null;
        this.pujaId = booking.pujaId || null;
        this.languageId = booking.languageId || null
        this.selectedPujaries = booking.selectedPujaries || [];
        this.confirmedPujari = booking.confirmedPujari || null;
        this.pujaStartDate = booking.pujaStartDate || null;
        this.pujaEndDate = booking.pujaEndDate || null;
        this.userId = booking.userId || null
        this.customerName = booking.customerName || null
        this.email = booking.email || null
        this.phone = booking.phone || null
        this.pujaType = booking.pujaType || 'Online'
    }

    static confirm(booking, token){
        const init = {
            body:{
                booking,
                token
            }
        }
        return API.post('payments', `/bookings`, init)
    }

}

export default Booking;