import { Module } from '@nestjs/common';
import { ProcurementService } from './procurement.service';
import { ProcurementResolver } from './procurement.resolver';
import { ProcurementUserModule } from '../procurement-user/procurement-user.module';
import { FileModule } from '../files/file.module';
import { RequestItemsModule } from '../request-items/request-items.module';
import { RequestModule } from '../requests/request.module';
import { PropertiesModule } from '../properties/property.module';

@Module({
  imports: [
    ProcurementUserModule,
    FileModule,
    RequestItemsModule,
    RequestModule,
    PropertiesModule,
  ],
  exports: [ProcurementService],
  providers: [ProcurementService, ProcurementResolver],
})
export class ProcurementModule {}