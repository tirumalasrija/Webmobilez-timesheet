import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './support-routing.module';
import { SupportIndexComponent } from './support-index/support-index.component';
import { SupportCreateComponent } from './support-create/support-create.component';
import { SupportEditComponent } from './support-edit/support-edit.component';
import { SupportListComponent } from './support-list/support-list.component';
import { SupportRestService } from './support-rest.service';
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
  declarations: [SupportIndexComponent,SupportCreateComponent, SupportEditComponent,SupportListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    SupportRestService
  ]
})
export class SupportModule { }
