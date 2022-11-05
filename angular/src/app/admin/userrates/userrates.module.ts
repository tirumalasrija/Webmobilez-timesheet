import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRatesRoutingModule } from './userrates-routing.module';
import { UserRatesIndexComponent } from './userrates-index/userrates-index.component';
import {UserRatesCreateComponent } from './userrates-create/userrates-create.component';
import { UserRatesEditComponent } from './userrates-edit/userrates-edit.component';
import { UserRatesListComponent } from './userrates-list/userrates-list.component';
import { UserRatesRestService } from './userrates-rest.service';
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

@NgModule({
  declarations: [UserRatesIndexComponent,UserRatesCreateComponent, UserRatesEditComponent,UserRatesListComponent],
  imports: [
    CommonModule,
    UserRatesRoutingModule,
    ReactiveFormsModule, TableModule, MultiSelectModule, CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule, TabMenuModule, TooltipModule, FileUploadModule, NgxDropzoneModule, DropdownModule, FormsModule,InplaceModule
  ],
  providers: [
    UserRatesRestService
  ]
})
export class UserRatesModule { }
