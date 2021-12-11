import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MainAdminComponent } from './main-admin/main-admin.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCardComponent } from './card/add-card/add-card.component';
import { EditCardComponent } from './card/edit-card/edit-card.component';
import { DeleteCardComponent } from './card/delete-card/delete-card.component';
import { AddImageComponent } from './image/add-image/add-image.component';
import { EditImageComponent } from './image/edit-image/edit-image.component';
import { DeleteImageComponent } from './image/delete-image/delete-image.component';
import { TemaComponent } from './tema/tema.component';
import { ContactsAdminComponent } from './contacts-admin/contacts-admin.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { CarouselTeamaComponent } from './tema/carousel-teama/carousel-teama.component';
import { AddTemaComponent } from './tema/add-tema/add-tema.component';
import { DeleteTemaComponent } from './tema/delete-tema/delete-tema.component';
import { EditTemaComponent } from './tema/edit-tema/edit-tema.component';
import { UiciAdminComponent } from './uici/uici.component';
import { EditCardPdfComponent } from './cardPdf/edit-card/edit-card-pdf.component';
import { DeleteCardPdfComponent } from './cardPdf/delete-card/delete-card-pdf.component';
import { AddCardPdfComponent } from './cardPdf/add-card/add-card-pdf.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { AddInformeComponent } from './cardInforme/add-informe/add-informe.component';
import { EditInformeComponent } from './cardInforme/edit-informe/edit-informe.component';
import { DeleteInformeComponent } from './cardInforme/delete-informe/delete-informe.component';


@NgModule({
  declarations: [
    AddCardPdfComponent,
    EditCardPdfComponent,
    DeleteCardPdfComponent,
    UiciAdminComponent,
    MainAdminComponent,
    HomeComponent,
    AddCardComponent,
    EditCardComponent,
    DeleteCardComponent,
    AddImageComponent,
    EditImageComponent,
    DeleteImageComponent,
    AddTemaComponent,
    DeleteTemaComponent,
    EditTemaComponent,
    TemaComponent,
    ContactsAdminComponent,
    WhoWeAreComponent,
    CarouselTeamaComponent,
    UsersAdminComponent,
    AddUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    AddInformeComponent,
    EditInformeComponent,
    DeleteInformeComponent

  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
  ],
  entryComponents: [
    AddImageComponent,
    DeleteImageComponent,
    EditImageComponent,

    AddTemaComponent,
    DeleteTemaComponent,
    EditTemaComponent
  ]
})
export class AdminModule { }
