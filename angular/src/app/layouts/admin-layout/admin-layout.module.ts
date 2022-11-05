import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserDocsComponent } from '../../pages/userdocs/userdocs.component';
import { SupportComponent } from '../../pages/support/support.component';
import { UserComponent } from '../../pages/user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { UserService } from './user.serviuce';
import {DialogModule} from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ChartistModule } from 'ng-chartist';
import {InputMaskModule} from 'primeng/inputmask';
import {AccordionModule} from 'primeng/accordion';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,ChartistModule , ReactiveFormsModule, ToastModule,DynamicDialogModule,DialogModule,ButtonModule,CardModule,SignaturePadModule,InputMaskModule,AccordionModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,UserDocsComponent,SupportComponent
  ],
  providers: [UserService],
})

export class AdminLayoutModule { }
