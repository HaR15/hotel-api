import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ReservationsService {

  constructor(private prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto) {
    const reqCheckInDate = new Date(createReservationDto.checkInDate);
    const reqCheckOutDate = new Date(createReservationDto.checkOutDate);
    const reservations = await this.findAll();
    for (let r of reservations) {
      const rCheckInDate = new Date(r.checkInDate);
      const rCheckOutDate = new Date(r.checkOutDate);
      if ((reqCheckInDate == rCheckInDate && reqCheckOutDate == rCheckOutDate)
       || (reqCheckInDate > rCheckInDate && reqCheckInDate < rCheckOutDate)
       || (reqCheckOutDate > rCheckInDate && reqCheckOutDate < rCheckOutDate)
       || (reqCheckInDate < rCheckInDate && reqCheckOutDate > rCheckOutDate)) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: 'Reservation dates overlap with ' + 'reservation ' + r.id + ' starting on ' + rCheckInDate + ' and ending on ' + rCheckOutDate,
        }, HttpStatus.FORBIDDEN);
      }
    }
    return this.prisma.reservation.create({ data: createReservationDto });
  }

  findAll() {
    return this.prisma.reservation.findMany({});
  }

  findOne(id: number) {
    return this.prisma.reservation.findFirst({
      where: {
        id: id
      }
    });
  }

  remove(id: number) {
    return this.prisma.reservation.delete({
      where: { 
        id: id 
      }
    });
  }
}
