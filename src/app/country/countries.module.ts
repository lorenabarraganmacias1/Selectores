import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SselectorPageComponent } from './pages/sselector-page/sselector-page.component';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';



@NgModule({
  declarations: [
    SselectorPageComponent,
    SelectorPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CountriesModule { }
