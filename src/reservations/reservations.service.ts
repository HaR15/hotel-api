import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {

  constructor(private prisma: PrismaService) {}

  create(createReservationDto: CreateReservationDto) {
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
