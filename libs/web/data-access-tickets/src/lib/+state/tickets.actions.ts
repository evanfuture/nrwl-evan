import { createAction, props } from '@ngrx/store';
import { Ticket } from './tickets.models';

export const loadTickets = createAction('[Tickets] Load Tickets');

export const loadTicketsSuccess = createAction(
  '[Tickets] Load Tickets Success',
  props<{ tickets: Ticket[] }>(),
);

export const loadTicketsFailure = createAction(
  '[Tickets] Load Tickets Failure',
  props<{ error: any }>(),
);
export const setId = createAction(
  '[Tickets] Set Ticket Id',
  props<{ id: string | null }>(),
);
