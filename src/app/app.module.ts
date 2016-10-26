import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpModule }  from '@angular/http';

import { AdminComponent } from '../admin/admin.component';
import { HomeComponent } from '../home/home.component';
import { FeedbackComponent } from'../feedback/feedback.component';
import { StreamingListComponent } from '../streaming-list/streaming-list.component';

import { AppComponent }  from './app.component';
import { AppRoutingModule }     from './app.routes';

import { ModelBasedFormComponent } from '../model-based-form/model-based-form.component';


@NgModule({
  imports: [ BrowserModule, FormsModule,ReactiveFormsModule, HttpModule, AppRoutingModule],
  declarations: [ AppComponent, AdminComponent, HomeComponent, FeedbackComponent, StreamingListComponent, ModelBasedFormComponent],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
