import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
  imports: [PrismaModule]
})
export class ReservationsModule {}
