import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nrwl-evan-layout',
  template: `<div class="container mx-auto px-4 md:px-0">
      <router-outlet></router-outlet>
    </div>
    <svg
      aria-hidden="true"
      class="invisible absolute h-0 w-0 overflow-hidden"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-circle" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
        </symbol>
        <symbol id="icon-circle-check" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </symbol>
        <symbol id="icon-close" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </symbol>
      </defs>
    </svg>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [RouterModule],
})
export class LayoutComponentModule {}
