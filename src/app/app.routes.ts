import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminComponent} from'../admin/admin.component';
import {StdProvisioningComponent} from'../stdprovisioning/stdprovisioning.component';
import {HomeComponent} from'../home/home.component';
import {FeedbackComponent} from'../feedback/feedback.component';
import {ModelBasedFormComponent} from'../model-based-form/model-based-form.component';

// Route Configuration
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'reasonux/', redirectTo: '/home', pathMatch: 'full' },
    { path: 'admin', component: AdminComponent },
    { path: 'std', component: StdProvisioningComponent },
    { path: 'home', component: HomeComponent },
    { path: 'feedback', component: FeedbackComponent },
    { path: 'mbf', component: ModelBasedFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {
  
}