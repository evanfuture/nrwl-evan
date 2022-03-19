import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTickets from './+state/tickets.reducer';
import { TicketsEffects } from './+state/tickets.effects';
import { BackendService } from './backend.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTickets.TICKETS_FEATURE_KEY,
      fromTickets.reducer
    ),
    EffectsModule.forFeature([TicketsEffects]),
  ],
  providers: [BackendService],
})
export class WebDataAccessTicketsModule {}
