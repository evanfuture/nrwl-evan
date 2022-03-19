import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAllTickets, loadTickets } from '@nrwl-evan/web/data-access-tickets';

@Component({
  selector: 'nrwl-evan-ticket-list',
  template: `
    <h2>Tickets</h2>

    <ul>
      <li *ngFor="let ticket of tickets$ | async">
        <a [routerLink]="[ticket.id]">{{ ticket.description }}</a>
      </li>
    </ul>

    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListComponent implements OnInit {
  tickets$ = this.store.select(getAllTickets);

  // TODO: Add new ticket form
  // TODO: Filter tickets
  // TODO: Assign tickets
  // TODO: Complete tickets

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadTickets());
  }
}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TicketListComponent],
  exports: [TicketListComponent],
})
export class TicketListComponentModule {}
