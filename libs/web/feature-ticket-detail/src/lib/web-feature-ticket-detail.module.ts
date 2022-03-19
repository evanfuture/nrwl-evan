import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TicketDetailComponent,
  TicketDetailComponentModule,
} from './ticket-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    TicketDetailComponentModule,
    RouterModule.forChild([{ path: '', component: TicketDetailComponent }]),
  ],
})
export class WebFeatureTicketDetailModule {}
