import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketDetailComponent, TicketDetailComponentModule } from './ticket-detail.component';

@NgModule({
  imports: [
    CommonModule,
    TicketDetailComponentModule,
    RouterModule.forChild([{ path: '', component: TicketDetailComponent }]),
  ],
})
export class WebFeatureTicketDetailModule {}
