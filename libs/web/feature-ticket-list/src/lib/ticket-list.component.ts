import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nrwl-evan-ticket-list',
  templateUrl: './ticket-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketListComponent implements OnInit {
  constructor() {
    console.log('something');
  }

  ngOnInit(): void {
    console.log('something');
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [TicketListComponent],
  exports: [TicketListComponent],
})
export class TicketListComponentModule {}
