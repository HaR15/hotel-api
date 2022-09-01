import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
    @ApiProperty()
    id?: number;

    @ApiProperty()
    firstName: string;
    
    @ApiProperty()
    lastName: string;
    
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    numGuests: number;
    
    @ApiProperty()
    checkInDate: Date;
    
    @ApiProperty()
    checkOutDate: Date;
}