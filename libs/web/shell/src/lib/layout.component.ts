import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'nrwl-evan-layout',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}

@NgModule({
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  imports: [RouterModule],
})
export class LayoutComponentModule {}
