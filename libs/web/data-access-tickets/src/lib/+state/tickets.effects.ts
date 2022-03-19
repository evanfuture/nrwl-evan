import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, getSelectors } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { BackendService } from '../backend.service';

import * as TicketsActions from './tickets.actions';

@Injectable()
export class TicketsEffects {
  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketsActions.loadTickets),
      switchMap(() =>
        this.backendService.tickets().pipe(
          map((tickets) => TicketsActions.loadTicketsSuccess({ tickets })),
          catchError((error) =>
            of(TicketsActions.loadTicketsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  setCurrentTicketId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      mergeMap(() => this.store.select(getSelectors().selectRouteParam('id'))),
      map((id) => TicketsActions.setId({ id: id || null })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private backendService: BackendService,
    private store: Store,
  ) {}
}
