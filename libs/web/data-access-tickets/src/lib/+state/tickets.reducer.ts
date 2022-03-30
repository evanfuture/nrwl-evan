import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import * as TicketsActions from './tickets.actions';
import { Ticket, User } from './tickets.models';

export const TICKETS_FEATURE_KEY = 'tickets';

export interface State extends EntityState<Ticket> {
  selectedId?: string;
  loaded: boolean;
  error?: string;
  users: EntityState<User>;
  searchTerm: string;
}

export interface TicketsPartialState {
  readonly [TICKETS_FEATURE_KEY]: State;
}

export const ticketsAdapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>();
export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = ticketsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  users: usersAdapter.getInitialState(),
  searchTerm: '',
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
  on(TicketsActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: usersAdapter.setAll(users, { ...state.users }),
  })),
  on(TicketsActions.updateTicket, (state, { updates, id }) =>
    ticketsAdapter.updateOne(
      { id: `${id}` || state.selectedId, changes: { ...updates, isUpdating: true } },
      { ...state },
    ),
  ),
  on(TicketsActions.updateTicketSuccess, (state, { updates, id }) =>
    ticketsAdapter.updateOne({ id, changes: { ...updates, isUpdating: false } }, { ...state }),
  ),
  on(TicketsActions.createTicket, (state) => ({
    ...state,
    updated: false,
  })),
  on(TicketsActions.createTicketSuccess, (state, { newTicket }) =>
    ticketsAdapter.addOne({ ...newTicket, isUpdating: false }, { ...state }),
  ),
  on(TicketsActions.setId, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(TicketsActions.updateSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return ticketsReducer(state, action);
}
