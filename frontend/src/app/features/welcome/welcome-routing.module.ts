import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent, title: 'PopCorn - Welcome' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
