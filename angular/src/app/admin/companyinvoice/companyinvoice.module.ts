import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyInvoiceRoutingModule } from './companyinvoice-routing.module';
import { UserIndexComponent } from './companyinvoice-index/companyinvoice-index.component';
import { UserCreateComponent } from './companyinvoice-create/companyinvoice-create.component';
import { UserEditComponent } from './companyinvoice-edit/companyinvoice-edit.component';
import { UserListComponent } from './companyinvoice-list/companyinvoice-list.component';
import { CompanyInvoiceRestService } from './companyinvoice-rest.service';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropdownModule } from 'primeng/dropdown';
import {InplaceModule} from 'primeng/inplace';
import { UserViewComponent } from './companyinvoice-view/companyinvoice-view.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
import {NumberToWordsPipe} from '../../number.pipe';
@NgModule({
  declarations: [UserIndexComponent, UserCreateComponent, UserEditComponent,UserListComponent,UserViewComponent,NumberToWordsPipe],
  imports: [
    CommonModule,
    CompanyInvoiceRoutingModule,
    ReactiveFormsModule, TableModule, MultiSelectModule, CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,SignaturePadModule,
    ProgressBarModule, TabMenuModule, TooltipModule, FileUploadModule, NgxDropzoneModule, DropdownModule, FormsModule,InplaceModule
  ],
  providers: [
    CompanyInvoiceRestService
  ]
})
export class CompanyInvoiceModule { }
