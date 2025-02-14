import { Module } from '@nestjs/common';
import { MockService } from './mock.service';

@Module({
  providers: [MockService],   // Asegúrate de declarar el servicio aquí
  exports: [MockService],     // Asegúrate de exportar el servicio
})
export class MockModule {}