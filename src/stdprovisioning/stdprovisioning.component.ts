import { Component, NgModule } from '@angular/core';
import { Http } from "@angular/http";
'@angular/http'; import 'rxjs/add/operator/map';
import { ReasonService } from '../app/reason.service';

import { FormsModule } from "@angular/forms";
//import {NgFor} from 'angular2/angular2';


import any = jasmine.any;

@Component({
 selector: 'stdprovisioning-component',
 templateUrl: './stdprovisioning.component.html',
 styleUrls: [ './stdprovisioning.component.css'],
 providers: [ReasonService],
 //directives:[ConfirmSummaryComponent]
})

export class StdProvisioningComponent {
 values = '';
 public OS = '';
 public Size = '';
 public Subnet = '';
 public OSoptions: string;
 public sizeoptions: string;
 public subnetoptions: string;
 public bootVolumeOptions: string;
 public selectedValue;
 public selectedOSValue;
 public subnetSelectedValue;
 public bootVolumeSelectedValue;
 public instanceSizeSelectedValue;
 public projectName = "Test";
 public requestConfirm;
 public templateName;
//  public selectedValue;
//  public instanceSizeSelectedValue;
//  public subnetSelectedValue;



 // onKey(event: any) {
 //   this.values = event.target.value;
 //   var myoptions = JSON.parse(this.values);
 //   console.log('hhy' + myoptions)
 // }

 constructor(private _reasonService: ReasonService, private http: Http) {

   var provOptions = _reasonService.getProvisioningOptions();
   provOptions.subscribe(data => {
    this.OSoptions = data.OS
    this.sizeoptions = data.Size
    this.subnetoptions = data.Subnet;
   })
}


sendConfirmedRequest(){
  console.log("inside confirmed request sending method");

}

   sendRequest(form) {
   var body = JSON.stringify(form);
   this.requestConfirm = JSON.parse(body);
   this.templateName = this.requestConfirm.templateName;
   this.projectName = this.requestConfirm.projectName;


 }

}
