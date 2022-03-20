import { createAction, props } from '@ngrx/store';
import { Ticket, User } from './tickets.models';

export const init = createAction('[Tickets] Init');

export const loadTickets = createAction('[Tickets] Load Tickets');
export const loadTicketsSuccess = createAction('[Tickets] Load Tickets Success', props<{ tickets: Ticket[] }>());
export const loadTicketsFailure = createAction('[Tickets] Load Tickets Failure', props<{ error: any }>());

export const loadUsers = createAction('[Tickets] Load Users');
export const loadUsersSuccess = createAction('[Tickets] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Tickets] Load Users Failure', props<{ error: any }>());

export const updateTicket = createAction('[Tickets] Update Ticket', props<{ updates: Partial<Omit<Ticket, 'id'>> }>());
export const updateTicketSuccess = createAction(
  '[Tickets] Update Ticket Success',
  props<{ id: number; updates: Partial<Omit<Ticket, 'id'>> }>(),
);
export const updateTicketFailure = createAction('[Tickets] Update Ticket Failure', props<{ error: any }>());

export const createTicket = createAction(
  '[Tickets] Create Ticket',
  props<{ description: string; assigneeId: number }>(),
);
export const createTicketSuccess = createAction('[Tickets] Create Ticket Success', props<{ newTicket: Ticket }>());
export const createTicketFailure = createAction('[Tickets] Create Ticket Failure', props<{ error: any }>());

export const setId = createAction('[Tickets] Set Ticket Id', props<{ id: string }>());
