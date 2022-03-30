import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketExpanded } from './tickets.models';
import { State, ticketsAdapter, TICKETS_FEATURE_KEY, usersAdapter } from './tickets.reducer';

// Lookup the 'Tickets' feature state managed by NgRx
export const getTicketsState = createFeatureSelector<State>(TICKETS_FEATURE_KEY);

const { selectAll, selectEntities } = ticketsAdapter.getSelectors();
const { selectAll: selectAllUsers, selectEntities: selectUserEntities } = usersAdapter.getSelectors();

export const getTicketsLoaded = createSelector(getTicketsState, (state: State) => state.loaded);
export const getTicketsLoading = createSelector(getTicketsState, (state: State) => !state.loaded);
export const getSearchTerm = createSelector(getTicketsState, (state: State) => state.searchTerm);

export const getTicketsError = createSelector(getTicketsState, (state: State) => state.error);

export const getAllTickets = createSelector(getTicketsState, (state: State) => selectAll(state));
export const getTicketsEntities = createSelector(getTicketsState, (state: State) => selectEntities(state));

export const getAllUsers = createSelector(getTicketsState, (state: State) => selectAllUsers(state.users));
export const getUsersEntities = createSelector(getTicketsState, (state: State) => selectUserEntities(state.users));

export const getSelectedId = createSelector(getTicketsState, (state: State) => state.selectedId);
export const getIsNew = createSelector(getSelectedId, (id) => id === 'new');

export const getSelected = createSelector(getTicketsEntities, getSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined,
);

export const getTicketUpdating = createSelector(getSelected, (currentTicket) => currentTicket?.isUpdating);

export const getAllTicketsExpanded = createSelector(
  getAllTickets,
  getUsersEntities,
  getSelectedId,
  getSearchTerm,
  (tickets, userEntities, selectedId, searchTerm) => {
    const withUsers: TicketExpanded[] = tickets
      .filter((ticket) => {
        return ticket.description.includes(searchTerm);
      })
      .map((ticket) => {
        return {
          ...ticket,
          assignee: ticket.assigneeId ? userEntities[ticket.assigneeId] : null,
          isActive: !!selectedId && selectedId === `${ticket.id}`,
        };
      });
    return withUsers;
  },
);
