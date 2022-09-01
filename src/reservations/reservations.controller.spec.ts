import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [ReservationsService, PrismaService],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should return a reservation given an id', () => {
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
    service.findOne = jest.fn().mockReturnValue(reservationResultDto);

    expect(controller.findOne("1")).toBe(reservationResultDto);
    expect(controller).toBeDefined();
  });
});
