import { Action } from '@ngrx/store';
import * as TicketsActions from './tickets.actions';
import { Ticket } from './tickets.models';
import { initialState, reducer, State } from './tickets.reducer';

describe('Tickets Reducer', () => {
  const createTicketsEntity = (id: number): Ticket => ({
    id,
    description: '',
    assigneeId: null,
    completed: false,
  });

  describe('valid Tickets actions', () => {
    it('loadTicketsSuccess should return the list of known Tickets', () => {
      const tickets = [createTicketsEntity(100), createTicketsEntity(101)];
      const action = TicketsActions.loadTicketsSuccess({ tickets });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
