import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { StdProvForm,AdditionalDisk } from './model-based-form.interface';
import { RouterModule, Routes, Router} from '@angular/router';

import { ReasonService } from '../app/reason.service';

import {Size} from '../admin/Size';
import {OS} from './model-based-form.interface';
import {SubnetID} from '../admin/SubnetID';

@Component({
  selector: 'model-based-form',
  templateUrl: './model-based-form.component.html',
  styleUrls: ['./model-based-form.component.css'],
  providers: [ReasonService]
})

export class ModelBasedFormComponent  {

  public additionalDisks:string[]= [];
  public newArray:string[];
  public projectName:string;
  //public theJSON:string;
  public theinput:string;
  public inputJSON:string;

  public RootVolumeSize:string; //THE DEFAULT
  public SizeArr:Size[] = [];

  public SubnetID:string; //THE DEFAULT
  public SubnetIDArr:SubnetID[] = [];
  public theFormJson:string;

  public defaultAdditionalDiskSize:string;
  public defaultAdditionalMin:string;
  public defaultAdditionalMax:string;
  public defaultAdditionalDiskUnit:string;

  public stdProvForm: StdProvForm=  {projectName: '',name: '',oS: null,Size: '',RootVolumeSize: 0,additionalDisks: [],Subnet: ''}
  public OSArr = [];

 public inputData:any;

 public log:boolean = false;

  constructor(fb: FormBuilder, private router: Router, private reasonService:ReasonService ) { 

        this.doLog('constructor()');
      
          //1. GET THE PROVISIONING INPUT/SETUP/OPTIONS FORM DATA
          this.reasonService.getProvisioningOptions().subscribe(data => { 

                this.doLog('unpackData()');
                this.OSArr = data["OS"];

                //2. find and set default for OS as well as initial value for RootVolSize
                  let iOsDefIndex:number = 0;
                  let defRootVolSize = -1;
                    for(let o of this.OSArr)
                    {
                      if(o.Defaultvalue == 'true')
                      {
                        this.doLog('found default it is = ' + o.ID);
                        defRootVolSize = Number(o.MinRootVolSize);
                          break;
                      }
                      iOsDefIndex++
                    }

                this.SizeArr = data["Size"];//TODO: GET AND SET DEFAULTS
                this.SubnetIDArr = data["Subnet"]; //TODO: GET AND SET DEFAULTS

                //SET VALIDATION PROPERTIES
                this.defaultAdditionalDiskSize = data["AdditionalDiskSizes"].Defaultvalue;
                this.theinput = this.defaultAdditionalDiskSize;
                this.defaultAdditionalMax = data["AdditionalDiskSizes"].Maximum;
                this.defaultAdditionalMin = data["AdditionalDiskSizes"].Minimum;
                this.defaultAdditionalDiskUnit = data["AdditionalDiskSizes"].Unit;

                //CREATE BASE MODEL FOR FORM WITH DEFAULTS SET
                this.stdProvForm = {
                  projectName: '',
                  name: '',
                  oS: this.OSArr[iOsDefIndex],
                  Size: '',
                  RootVolumeSize: defRootVolSize,
                  additionalDisks: [],
                  Subnet: ''
                }
            },
            err => console.error(err), //TODO: OUTPUT ERRORS/MESSAGES TO UX
            () => this.doLog('done loading provisioning options')
          );
  }

//---------------------------------------------------------------------------------------------------------------
doLog(val:string){
  if(this.log){
    console.log(`${val} ${this.getTimeStamp()}`);
  }
 
}

getTimeStamp() {
    return new Date().toDateString() + " " + new Date().toTimeString();
  }

//----------------------------------------------------------------------------------------------------------------
  addAdditionalDisk(string,event){
    if(Number(this.theinput) >= Number(this.defaultAdditionalMin) &&  Number(this.theinput) <= Number(this.defaultAdditionalMax)){
      //console.log(this.theinput)
      this.additionalDisks.push(this.theinput);

      //this.theJSON = JSON.stringify(this.additionalDisks);
      this.theinput = this.defaultAdditionalDiskSize;
      event.preventDefault();
    }
    else{
      this.theinput = this.defaultAdditionalDiskSize;
        alert('Invalid disk size must be between 1 and 500');
    }

  }

//----------------------------------------------------------------------------------------------------------------
  removeAdditionalDisks(i: any, event,){

    this.additionalDisks = [];

    //this.theJSON = JSON.stringify(this.additionalDisks);
    event.preventDefault();
  }
    
  //----------------------------------------------------------------------------------------------------------------
  save(formValue:any){
    this.theFormJson = JSON.stringify(formValue);
    console.log('save = '+JSON.stringify(formValue));

    //TODO: DO WS CALL HERE ......

    //CLEAR ALL ARRAYS ETC....
    this.additionalDisks = [];

    //INFO: NAVIGATE AWAY
    //this.router.navigate(['/home']);
  }
//----------------------------------------------------------------------------------------------------------------
  osChanged(value:any){
    console.log(value);
    let splitArr = String(value).split(":", 10);
    let index = Number(splitArr[0]);

    let i:number = 0;
    for(let o of this.OSArr)
    {
      if (index == i)
      {
        this.stdProvForm.RootVolumeSize = Number(o.MinRootVolSize);
        break;
      }
      i++;
    }
  }

}
