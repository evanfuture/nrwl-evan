import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  TicketListComponent,
  TicketListComponentModule,
} from './ticket-list.component';

@NgModule({
  imports: [
    CommonModule,
    TicketListComponentModule,
    RouterModule.forChild([{ path: '', component: TicketListComponent }]),
  ],
})
export class WebFeatureTicketListModule {}
