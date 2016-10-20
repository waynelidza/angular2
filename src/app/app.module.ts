import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';

import { AdminComponent } from '../admin/admin.component';
import { StdProvisioningComponent } from '../stdprovisioning/stdprovisioning.component';
import { HomeComponent } from '../home/home.component';
import { FeedbackComponent } from'../feedback/feedback.component';
import { StreamingListComponent } from '../streaming-list/streaming-list.component';

import { AppComponent }  from './app.component';
import { AppRoutingModule }     from './app.routes';

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, AppRoutingModule],
  declarations: [ AppComponent, AdminComponent, StdProvisioningComponent, HomeComponent, FeedbackComponent, StreamingListComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
