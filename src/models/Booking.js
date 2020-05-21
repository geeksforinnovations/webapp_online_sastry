class Booking {
    constructor(booking) {
        this.id = booking.id;
        this.pujaId = booking.pujaId;
        this.selectedPujaries = booking.selectedPujaries;
        this.confirmedPujari = booking.confirmedPujari;
        this.bookingStartAt = booking.bookingStartAt;
        this.bookingEndAt = booking.bookingEndAt;
        this.userId = booking.userId
    }
    
}

export default Booking;