import { Ticket } from './tickets.models';
import { initialState, ticketsAdapter, TicketsPartialState } from './tickets.reducer';
import * as TicketsSelectors from './tickets.selectors';

describe('Tickets Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTicketsId = (it: Ticket) => it.id;
  const createTicketsEntity = (id: number) =>
    ({
      id,
      description: '',
      assigneeId: null,
      completed: false,
    } as Ticket);

  let state: TicketsPartialState;

  beforeEach(() => {
    state = {
      tickets: ticketsAdapter.setAll([createTicketsEntity(100), createTicketsEntity(101), createTicketsEntity(102)], {
        ...initialState,
        selectedId: '101',
        error: ERROR_MSG,
        loaded: true,
      }),
    };
  });

  describe('Tickets Selectors', () => {
    it('getAllTickets() should return the list of Tickets', () => {
      const results = TicketsSelectors.getAllTickets(state);
      const selId = getTicketsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = TicketsSelectors.getSelected(state) as Ticket;
      const selId = getTicketsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getTicketsLoaded() should return the current "loaded" status', () => {
      const result = TicketsSelectors.getTicketsLoaded(state);

      expect(result).toBe(true);
    });

    it('getTicketsError() should return the current "error" state', () => {
      const result = TicketsSelectors.getTicketsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
