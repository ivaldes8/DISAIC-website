import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Component3Component } from './component3/component3.component';
import { Component4Component } from './component4/component4.component';
import { Component5Component } from './component5/component5.component';
import { Component6Component } from './component6/component6.component';
import { Component7Component } from './component7/component7.component';
import { Component8Component } from './component8/component8.component';
import { InicioComponent } from './inicio/inicio.component';
import { UiciComponent } from './uici/uici.component';
import { WhoComponent } from './who/who.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BoletinComponent } from './boletin/boletin.component';
import { InformeComponent } from './informe/informe.component';
import { InformePrivateComponent } from './informePrivate/informePrivate.component';



@NgModule({
  declarations: [
    Component1Component,
    Component2Component,
    Component3Component,
    Component4Component,
    Component5Component,
    Component6Component,
    Component7Component,
    Component8Component,
    InicioComponent,
    WhoComponent,
    ContactsComponent,
    UiciComponent,
    BoletinComponent,
    InformeComponent,
    InformePrivateComponent
  ],
  imports: [
    CommonModule,
    CarouselModule.forRoot(),
  ],
  providers: [
  ],
  exports: []
})
export class ComponentsModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}
