import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as TicketsActions from './tickets.actions';
import { Ticket } from './tickets.models';

export const TICKETS_FEATURE_KEY = 'tickets';

export interface State extends EntityState<Ticket> {
  selectedId?: string | null; // which Tickets record has been selected
  loaded: boolean; // has the Tickets list been loaded
  error?: string | null; // last known error (if any)
}

export interface TicketsPartialState {
  readonly [TICKETS_FEATURE_KEY]: State;
}

export const ticketsAdapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();

export const initialState: State = ticketsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const ticketsReducer = createReducer(
  initialState,
  on(TicketsActions.loadTickets, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TicketsActions.loadTicketsSuccess, (state, { tickets }) =>
    ticketsAdapter.setAll(tickets, { ...state, loaded: true }),
  ),
  on(TicketsActions.loadTicketsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(TicketsActions.setId, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return ticketsReducer(state, action);
}
