import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { PrismaService } from '../prisma/prisma.service'
import { CreateReservationDto } from './dto/create-reservation.dto';
import { HttpException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationsService, PrismaService],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should get a reservation by id', () => {
    expect(service).toBeDefined();
    const reservation1: CreateReservationDto = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@hotmail.com",
      numGuests: 2,
      checkInDate: new Date(),
      checkOutDate: new Date()
    }
    prisma.reservation.findFirst = jest.fn().mockReturnValueOnce(reservation1);
    expect(service.findOne(1)).toBe(reservation1);
  });

  it('should create a reservation given a reservation dto', () => {
    const reservationRequestDto: CreateReservationDto = {
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@hotmail.com",
      numGuests: 2,
      checkInDate: new Date(),
      checkOutDate: new Date()
    }
    const reservationResultDto: CreateReservationDto = {
      id: 1,
      ...reservationRequestDto
    }
    prisma.reservation.create = jest.fn().mockReturnValueOnce(reservationResultDto);
    expect(service.create(reservationRequestDto)).resolves.toBe(reservationResultDto);
  })

  it('should throw exception given reservation dates overlap', () => {
    const checkInDate1 = new Date("2022-09-02T15:00:00.000Z")
    const checkOutDate1 = new Date("2022-09-03T12:00:00.000Z")
    const checkInDate2 = new Date("2022-09-02T18:00:00.000Z")
    const checkOutDate2 = new Date("2022-09-04T11:00:00.000Z")
    const reservationRequestDto1: CreateReservationDto = {
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@hotmail.com",
      numGuests: 2,
      checkInDate: checkInDate1,
      checkOutDate: checkOutDate1
    }
    const reservationResultDto1: CreateReservationDto = {
      id: 1,
      ...reservationRequestDto1
    }

    const reservationRequestDto2: CreateReservationDto = {
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@hotmail.com",
      numGuests: 2,
      checkInDate: checkInDate2,
      checkOutDate: checkOutDate2
    }
    const reservationResultDto2: CreateReservationDto = {
      id: 1,
      ...reservationRequestDto2
    }

    prisma.reservation.findMany = jest.fn().mockReturnValueOnce([reservationResultDto1]);
    expect(service.create(reservationRequestDto2)).rejects.toThrow(HttpException);
  })

});
