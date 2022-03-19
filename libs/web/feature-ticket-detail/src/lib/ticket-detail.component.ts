import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nrwl-evan-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketDetailComponent implements OnInit {
  constructor() {
    console.log('something');
  }

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
