import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nrwl-evan-layout',
  template: `<div class="container mx-auto px-4 md:px-0">
    <router-outlet></router-outlet>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [RouterModule],
})
export class LayoutComponentModule {}
