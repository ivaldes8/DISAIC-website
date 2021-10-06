import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';
import { Component3Component } from './components/component3/component3.component';
import { Component4Component } from './components/component4/component4.component';
import { Component5Component } from './components/component5/component5.component';
import { Component6Component } from './components/component6/component6.component';
import { Component7Component } from './components/component7/component7.component';
import { Component8Component } from './components/component8/component8.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { WhoComponent } from './components/who/who.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { MainAdminComponent } from './admin/main-admin/main-admin.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HomeComponent } from './admin/home/home.component';
import { TemaComponent } from './admin/tema/tema.component';
import { WhoWeAreComponent } from './admin/who-we-are/who-we-are.component';
import { ContactsAdminComponent } from './admin/contacts-admin/contacts-admin.component';
import { CarouselTeamaComponent } from './admin/tema/carousel-teama/carousel-teama.component';

const routes: Routes = [
  {
    path:'',
    component: InicioComponent
  },
  {
    path:'inicio',
    component: InicioComponent
  },
  {
    path:'who',
    component: WhoComponent
  },
  {
    path:'contact',
    component: ContactsComponent
  },
  {
    path:'1',
    component:Component1Component,
  },
  {
    path:'2',
    component:Component2Component,
  },
  {
    path:'3',
    component:Component3Component
  },
  {
    path:'4',
    component:Component4Component
  },
  {
    path:'5',
    component:Component5Component
  },
  {
    path:'6',
    component:Component6Component
  },
  {
    path:'7',
    component:Component7Component
  },
  {
    path:'8',
    component:Component8Component
  },
  {
    path:'auth',
    component:AuthComponent
  },
  {
    path:'admin',
    canActivate: [AuthGuard],
    component: MainAdminComponent,
    children:[
      {
        path:'homeAdmin',
        component: HomeComponent
      },
      {
        path:'whoAdmin',
        component: WhoWeAreComponent
      },
      {
        path:'contactAdmin',
        component: ContactsAdminComponent
      },
      {
        path:'temaAdmin',
        component:TemaComponent
      },
      {
        path:'carouselTema',
        component:CarouselTeamaComponent
      }
    ]
  },
  {
    path:'**',
    redirectTo: '/inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
