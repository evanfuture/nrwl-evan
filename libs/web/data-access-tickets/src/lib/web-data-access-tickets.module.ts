import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TicketsEffects } from './+state/tickets.effects';
import * as fromTickets from './+state/tickets.reducer';
import { BackendService } from './backend.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTickets.TICKETS_FEATURE_KEY, fromTickets.reducer),
    EffectsModule.forFeature([TicketsEffects]),
  ],
  providers: [BackendService],
})
export class WebDataAccessTicketsModule {}
