import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { getSelectors, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { BackendService } from '../backend.service';
import * as TicketsActions from './tickets.actions';
import { getSelectedId } from './tickets.selectors';

@Injectable()
export class TicketsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.init),
      mergeMap(() => [TicketsActions.loadTickets(), TicketsActions.loadUsers()]),
    ),
  );

  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.loadTickets),
      switchMap(() =>
        this.backendService.tickets().pipe(
          map((tickets) => TicketsActions.loadTicketsSuccess({ tickets })),
          catchError((error) => of(TicketsActions.loadTicketsFailure({ error }))),
        ),
      ),
    ),
  );
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.loadUsers),
      switchMap(() =>
        this.backendService.users().pipe(
          map((users) => TicketsActions.loadUsersSuccess({ users })),
          catchError((error) => of(TicketsActions.loadUsersFailure({ error }))),
        ),
      ),
    ),
  );

  updateTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.updateTicket),
      concatLatestFrom(() => this.store.select(getSelectedId)),
      switchMap(([{ updates }, ticketId]) => {
        const id = Number(ticketId);
        return this.backendService.update(id, updates).pipe(
          map(() => TicketsActions.updateTicketSuccess({ updates, id })),
          catchError((error) => of(TicketsActions.updateTicketFailure({ error }))),
        );
      }),
    ),
  );

  createTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.createTicket),
      switchMap(({ description, assigneeId }) => {
        return this.backendService.newTicket(description, assigneeId).pipe(
          map((newTicket) => TicketsActions.createTicketSuccess({ newTicket })),
          catchError((error) => of(TicketsActions.createTicketFailure({ error }))),
        );
      }),
    ),
  );

  setCurrentTicketId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      mergeMap(() => this.store.select(getSelectors().selectRouteParam('id'))),
      map((id) => TicketsActions.setId({ id: id || null })),
    ),
  );

  constructor(private readonly actions$: Actions, private backendService: BackendService, private store: Store) {}
}
