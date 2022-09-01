export class CreateReservationDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    numGuests: number;
    checkInDate: Date;
    checkOutDate: Date;
}