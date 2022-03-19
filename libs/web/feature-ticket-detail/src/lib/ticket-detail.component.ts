import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getSelected } from '@nrwl-evan/web/data-access-tickets';

@Component({
  selector: 'nrwl-evan-ticket-detail',
  template: `<div>{{ ticket$ | async | json }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailComponent implements OnInit {
  ticket$ = this.store.select(getSelected);
  constructor(private store: Store) {}

  ngOnInit(): void {
    console.log('something');
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [TicketDetailComponent],
  exports: [TicketDetailComponent],
})
export class TicketDetailComponentModule {}
