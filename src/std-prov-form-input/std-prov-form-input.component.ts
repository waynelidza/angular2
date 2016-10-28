import { Component, OnInit,EventEmitter ,Output } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Routes, Router} from '@angular/router';

import { ReasonService } from '../app/reason.service';
import { RHelper }     from '../std-prov-form-input/helper.module';

import {OS, Size, Subnet, StdProvForm, AdditionalDisk} from './std-prov-form-input.interface';


@Component({
  selector: 'std-prov-form-input',
  templateUrl: './std-prov-form-input.component.html',
  styleUrls: ['./std-prov-form-input.component.css'],
  providers: [ReasonService]
})

export class StdProvFormInputComponent  {

  @Output() submittedEvent: EventEmitter<StdProvForm> = new EventEmitter<StdProvForm>();

  public newArray:string[];
  public theDiskInput:string;
  public inputJSON:string;
  public SizeArr = [];
  public SubnetArr = [];
  public theFormJson:string;

  public defaultAdditionalDiskSize:string;
  public defaultAdditionalMin:string;
  public defaultAdditionalMax:string;
  public defaultAdditionalDiskUnit:string;

  public stdProvForm: StdProvForm =  { ProjectName: '', ProvisioningName: '', OS: null, Size: null, RootVolumeSize: 0, AdditionalDisks: [], Subnet: null}
  public OSArr = [];

 public inputData:any;

 public m_enableLogging:boolean = false;

 public valRootVolSizeMessage: string = '';
 public valProjectNameMessage: string = '';
 public valProvNameMessage: string = '';
 public valAdditionalDiskMessage: string = '';
 public valErrorCount = 0;

 public MinRootSize = 0;
 public valCounter = 0;

 constructor( private router: Router, private reasonService:ReasonService ) { 

         RHelper.doLog('constructor()',this.m_enableLogging)

         this.setDefaults();
  }


 setDefaults(){

      //1. GET THE PROVISIONING INPUT/SETUP/OPTIONS FORM DATA (TO BE REPLACED BY WS CALL)
      this.reasonService.getProvisioningOptions().subscribe(data => { 

          RHelper.doLog(JSON.stringify(data),this.m_enableLogging)
            //2. Find and set default for OS as well as initial value for RootVolSize
              this.OSArr = data["OS"];
              let iOsDefIndex:number = 0;
              let defRootVolSize = -1;
                for(let o of this.OSArr)
                {
                  if(o.Defaultvalue == 'true')
                  {
                    defRootVolSize = Number(o.MinRootVolSize);
                    break;
                  }
                  iOsDefIndex++
                }

            //3. GET SIZES AND SET DEFAULT   
            this.SizeArr = data["Size"];
            let sizeDefIndex = RHelper.getDefaultIndex(this.SizeArr,'true');

            //4. GET SUBNETS AND SET DEFAULT   
            this.SubnetArr = data["Subnet"]; 
            let subnetDefIndex = RHelper.getDefaultIndex(this.SubnetArr,'true');

            //4.SET VALIDATION PROPERTIES
            this.defaultAdditionalDiskSize = data["AdditionalDiskSizes"].Defaultvalue;
            this.theDiskInput = this.defaultAdditionalDiskSize;
            this.defaultAdditionalMax = data["AdditionalDiskSizes"].Maximum;
            this.defaultAdditionalMin = data["AdditionalDiskSizes"].Minimum;
            this.defaultAdditionalDiskUnit = data["AdditionalDiskSizes"].Unit;

            //5.CREATE BASE MODEL FOR FORM WITH DEFAULTS SET
            this.stdProvForm = {
              ProjectName: '',
              ProvisioningName: '',
              OS: this.OSArr[iOsDefIndex],
              Size: this.SizeArr[sizeDefIndex],
              RootVolumeSize: defRootVolSize,
              AdditionalDisks: [],
              Subnet: this.SubnetArr[subnetDefIndex]
            }

            this.MinRootSize = defRootVolSize;
        },
        err => console.error(err), //TODO: OUTPUT ERRORS/MESSAGES TO UX
        () => RHelper.doLog('done loading/setting provisioning options',this.m_enableLogging)
      );

}

//----------------------------------------------------------------------------------------------------------------
  addAdditionalDisk(diskSize:string, event){

    this.valAdditionalDiskMessage = '';
    
    if(Number(this.theDiskInput) >= Number(this.defaultAdditionalMin) &&  Number(this.theDiskInput) <= Number(this.defaultAdditionalMax))
    {

      let ad = new AdditionalDisk();
      ad.size = Number(this.theDiskInput);
      this.stdProvForm.AdditionalDisks.push(ad);

      this.theDiskInput = this.defaultAdditionalDiskSize;
      this.valAdditionalDiskMessage = '';
      event.preventDefault();
    }
    else
    {
      this.theDiskInput = this.defaultAdditionalDiskSize;
      this.valAdditionalDiskMessage = `Additional Disk: Disk size must be between ${this.defaultAdditionalMin} and ${this.defaultAdditionalMax} Gigabytes (inclusive)`;

    }

  }

//----------------------------------------------------------------------------------------------------------------
  removeAdditionalDisks(i: any, event,){

    this.stdProvForm.AdditionalDisks = [];
    event.preventDefault();
  }
    
  //----------------------------------------------------------------------------------------------------------------
  deploy(formValue:any, event){

    console.log('doProvisioning');
    this.doValidation();
    event.preventDefault();

  }

doValidation(){

   this.valErrorCount = 0;

   this.valProjectNameMessage = '';
   this.valProvNameMessage = '';
   this.valRootVolSizeMessage = '';

  //1. ProjectName
  if(this.stdProvForm.ProjectName.length == 0)
  {
    this.valProjectNameMessage = 'This field is required'
    this.valErrorCount++;
  }

  //2. ProvisioningName
  if(this.stdProvForm.ProvisioningName.length == 0)
  {
    this.valProvNameMessage = 'This field is required';
    this.valErrorCount++;
  }

  //3 MinRootSize
  if(this.stdProvForm.RootVolumeSize < this.MinRootSize )
  {
    this.valRootVolSizeMessage = `Root Volume Size: Your root volume must be ${this.MinRootSize} Gigabytes or greater`
    this.valErrorCount++;
  }

}
  //----------------------------------------------------------------------------------------------------------------
  sendConfirmedRequest(formValue:any, event){
    
    console.log('sendConfirmedRequest');

    event.preventDefault();

    //EMMIT EVENT AND DATA FOR PROVISIONING
    this.submittedEvent.emit(this.stdProvForm);

    //CLEAR ALL ARRAYS ETC....
    this.setDefaults();
  }
//----------------------------------------------------------------------------------------------------------------
  osChanged(value:any){
   
    let splitArr = String(value).split(":", 10);
    let index = Number(splitArr[0]);

    let i:number = 0;
    for(let o of this.OSArr)
    {
      if (index == i)
      {
        this.stdProvForm.RootVolumeSize = Number(o.MinRootVolSize);
        this.MinRootSize = this.stdProvForm.RootVolumeSize;
        break;
      }
      i++;
    }
  }
  


}
