import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { StdProvisioning } from './model-based-form.interface';

import { ReasonService } from '../app/reason.service';

import {OS} from '../admin/OS';
import {Size} from '../admin/Size';
import {SubnetID} from '../admin/SubnetID';

@Component({
  selector: 'model-based-form',
  templateUrl: './model-based-form.component.html',
  styleUrls: ['./model-based-form.component.css']
})

export class ModelBasedFormComponent  {

 public additionalDisks:string[];
 public newArray:string[];
 public projectName:string;
 public theJSON:string;
 public theinput:string;
 public inputJSON:string;

 public OS:OS; //THE DEFAULT
 public OSArr:OS[] =[];

 public RootVolumeSize:string; //THE DEFAULT
 public SizeArr:Size[] = [];

 public SubnetID:string; //THE DEFAULT
 public SubnetIDArr:SubnetID[] = [];

  constructor(fb: FormBuilder) { 

    this.additionalDisks = [];

    // _reasonService.getProvisioningOptions().subscribe(
    //         data => { this.inputJSON = JSON.stringify(data), console.log(JSON.stringify(data))},
    //         err => console.error(err), //TODO: OUTPUT ERRORS/MESSAGES TO UX
    //         () => console.log('done loading provisioning options')
    //       );


        let os = new OS();
        os.ID = "rel6";
        os.Description = "rel6-descr-pity";
        os.Default  =true;
        os.minRootVolSize = "8";
        this.OSArr.push(os);

        os = new OS();
        os.ID = "rel7";
        os.Description = "rel7-descr-ddd";
        os.Default  = false;
        os.minRootVolSize = "9";
        this.OSArr.push(os);

        os = new OS();
        os.ID = "rel8";
        os.Description = "rel8-descr-pity";
        os.Default  = false;
        os.minRootVolSize = "10";
        this.OSArr.push(os);

        var s = new Size()
        s.ID = "S";
        s.Description = "1 x vCPU 2GB RAM"
        s.Default = true;
        this.SizeArr.push(s);

        s = new Size()
        s.ID = "M";
        s.Description = "2 x vCPU 4GB RAM"
        s.Default = false;
        this.SizeArr.push(s);

        s = new Size()
        s.ID = "L";
        s.Description = "4 x vCPU 8GB RAM"
        s.Default = false;
        this.SizeArr.push(s);

        let snet = new SubnetID();
        snet.ID = "123"
        snet.Description = "Default subnet Eng"
        snet.Default  =true;
        this.SubnetIDArr.push(snet);

        snet = new SubnetID();
        snet.ID = "666"
        snet.Description = "Satans subnet 666"
        snet.Default  =false;
        this.SubnetIDArr.push(snet);


  }

//----------------------------------------------------------------------------------------------------------------
  addAdditionalDisk(string,event){
    if(Number(this.theinput) > 0 &&  Number(this.theinput) <= 500){
      //console.log(this.theinput)
      this.additionalDisks.push(this.theinput);

      this.theJSON = JSON.stringify(this.additionalDisks);
      this.theinput = "";
      event.preventDefault();
    }
    else{
        alert('Invalid disk size must be between 1 and 500');
    }

  }

//----------------------------------------------------------------------------------------------------------------
  removeAdditionalDisk(i: any, event,){

    //console.log('index # to remove = ' + i);
     this.newArray = [];
    for(let entry in this.additionalDisks)
    {
       //console.log('entry = ' + entry);
       //console.log('val = ' + this.additionalDisks[entry]);
        if(entry != i)
        {
          console.log('push = ' + this.additionalDisks[entry]);
          this.newArray.push(this.additionalDisks[entry]);
        }
        else{
          //console.log('found and skipped index #' + i);
        }
    }
    this.additionalDisks = [];
    //this.additionalDisks = this.newArray.splice(0);

    this.theJSON = JSON.stringify(this.additionalDisks);
    event.preventDefault();
  }
    
  //----------------------------------------------------------------------------------------------------------------
  save(formValue:any){

    console.log('save = '+JSON.stringify(formValue));

    //DO WS CALL HERE ......

    //CLEAR ALL ARRAYS ETC....
    this.additionalDisks = [];
  }
//----------------------------------------------------------------------------------------------------------------
  osChanged(value:any){

    this.RootVolumeSize = "";
    for(let o of this.OSArr){
         if (o.ID == value){
           this.RootVolumeSize = o.minRootVolSize;
           console.log(o.minRootVolSize);
           break;
         }
    }
  }

}
