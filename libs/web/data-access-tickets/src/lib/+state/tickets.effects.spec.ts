import { fakeTime, subscribeSpyTo } from '@hirez_io/observer-spy';
import { ActionsSubject } from '@ngrx/store';
import { getMockStore } from '@ngrx/store/testing';
import { BackendService } from '../backend.service';
import * as TicketsActions from './tickets.actions';
import { TicketsEffects } from './tickets.effects';
import { getSelectedId } from './tickets.selectors';

it(
  'loadTickets$ dispatches success action',
  fakeTime((flush) => {
    const actions = new ActionsSubject();
    const effects = new TicketsEffects(
      actions,
      newBackendService(),
      getMockStore({
        selectors: [{ selector: getSelectedId, value: null }],
      }),
    );

    const observerSpy = subscribeSpyTo(effects.loadTickets$);

    const action = TicketsActions.loadTickets();
    actions.next(action);
    flush();

    expect(observerSpy.getValues()).toEqual([
      TicketsActions.loadTicketsSuccess({ tickets: newBackendService().storedTickets }),
    ]);
  }),
);

it(
  'updateTicket$ dispatches success action',
  fakeTime((flush) => {
    const updates = { description: 'new description' };
    const currentId = 1;

    const actions = new ActionsSubject();
    const effects = new TicketsEffects(
      actions,
      newBackendService(),
      getMockStore({
        selectors: [{ selector: getSelectedId, value: currentId }],
      }),
    );

    const observerSpy = subscribeSpyTo(effects.updateTicket$);

    const action = TicketsActions.updateTicket({ updates });
    actions.next(action);
    flush();

    expect(observerSpy.getValues()).toEqual([TicketsActions.updateTicketSuccess({ updates, id: currentId })]);
  }),
);

function newBackendService(): BackendService {
  return new BackendService(); //  not mocking currently because this is actually a mock anyway!
}
