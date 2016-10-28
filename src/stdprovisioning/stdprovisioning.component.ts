import { Component, NgModule } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';

import {FeedbackComponent} from '../feedback/feedback.component';
import {OS, Size, Subnet, StdProvForm, AdditionalDisk} from '../std-prov-form-input/std-prov-form-input.interface';

import { ReasonService } from '../app/reason.service';

@Component({
  selector: 'admin-component',
  templateUrl: './stdprovisioning2.component.html',
  styleUrls: [ './stdprovisioning.component.css' ], 
  providers: [ReasonService]
  
})

export class StdProvisioningComponent {

  title = 'Reason Standard Provisioning';
  public outputJSONs:string;
  public logJSONs:string;
  public posts:string;
  public displayOutputDiv = false;
  public displayLogDiv = false;
  public displayRequestDiv = false;
  public uuid = '';
  public status:string;
  public templateName:string;
  public templatejson:string;

  public message = '';
  public hasError = false;
  public messageStatus = '';
  public finalMessage = '';
  public display = 'none';
  public messageDiv = '<div class="alert alert-[MessageStatus]"><strong>[MessageStatus]]!</strong> [ErrorMEssage]</div>';
  public class = '';

  public message2 = '';
  public hasError2= false;
  public messageStatus2 = '';
  public finalMessage2 = '';
  public display2 = 'none';
  public messageDiv2 = '<div class="alert alert-[MessageStatus]"><strong>[MessageStatus]]!</strong> [ErrorMEssage]</div>';
  public class2 = '';

  public year = new Date().getFullYear();
  public requestSubmitted = false;
  public statusTimeStamp = new Date().toDateString() + " " + new Date().toTimeString();
  public logsTimeStamp = new Date().toDateString() + " " + new Date().toTimeString();
  public outputsTimeStamp = new Date().toDateString() + " " + new Date().toTimeString();
  public statusChangeMessage = 'Polling...';
  public pollCounter = 0;
  public pollCounterString = '';
  public statusSubscription:any = null;
  public logSubscription:any = null;
  public logArr:any = [];
  public outputDic = {};
  public outputsArr:any = [];
  //public homeURL = 'http://localhost:4200/';
  public result : Array<Object>; 
  public displaySubmitButton = true;
  public displayFeedback = false;
  public feedbackSent = false;

  public Panel1a = 'true';
  public Panel1Class = 'panel-collapse collapse in';

  public Panel2a = 'false';
  public Panel2Class = 'panel-collapse collapse';

  public Panel3a = 'false';
  public Panel3Class = 'panel-collapse collapse';

  public Panel4a = 'false';
  public Panel4Class = 'panel-collapse collapse';

      constructor(private _reasonService: ReasonService, private http:Http) {
    
        //this.homeURL = _reasonService.HomeURL;
        
        let proOpt:string = "";

        //returns object from 
        _reasonService.getProvisioningOptions().subscribe(
            data => { proOpt = JSON.stringify(data), console.log(JSON.stringify(data))},
            err => console.error(err), //TODO: OUTPUT ERRORS/MESSAGES TO UX
            () => console.log('done loading posts')
          );

        console.log(proOpt);

  }
//---------------------------------------------------------------------------------------------------------
submittedEvent(stdProvFormIn:StdProvForm){

 console.log("submittedEvent() fired");

        this.sendRequest(stdProvFormIn);

  this.Panel1a = 'false';
  this.Panel1Class = 'panel-collapse collapse';
  this.Panel2a = 'true';
  this.Panel2Class = 'panel-collapse collapse in';

}
  //HELPERS
  getTimeStamp() {
    return new Date().toDateString() + " " + new Date().toTimeString();

  }

//---------------------------------------------------------------------------------------------------------
  reloadPage(){
    location.reload();
  }

//FeedbackRequest button click------------------------------------------------------------------------------
  sendFeedbackRequest(formValue:any){

    var jsonData = JSON.stringify(formValue);
    
    this._reasonService.doFeedbackPost(jsonData).subscribe();

    this.setFeedbackMessage('[Old] Thanks for the  feedback, we will get back to you shortly :)','s');

  }

  //Submit button click---------------------------------------------------------------------------------------------------------
  sendRequest(stdProvFormIn:StdProvForm) {

    let stdProvJSON = JSON.stringify(stdProvFormIn);
    console.log('sendRequest = ' + stdProvJSON);
    //clear any vars
    this.displayOutputDiv = false;
    this.displayLogDiv = false;
    this.displayRequestDiv = false;
    this.hasError = false;
    this.display = 'none';
    this.statusChangeMessage = 'Polling...';
    this.displayFeedback = false;

    var v = false;
    this.uuid = '';

    //validation #1
    // if (formValue.templateName.length > 0) {
    //   v = true;
    // }
    // else {
    //   this.hasError = true;
    //   this.messageStatus = 'danger';
    //   this.message = 'Template name must be entered!!';
    // }

    //validation #2
    if (this.IsJsonString(stdProvJSON)) {

      this.displaySubmitButton = false;

      this.templateName = stdProvFormIn.ProvisioningName;
      this.templatejson = stdProvJSON;

      //TOO: IS THIS STILL NEEDED???
       var sleep = function (time:any) {
         return new Promise((resolve) => setTimeout(resolve, time));
       }

      //DO INITIAL POST
      this.doPost();

      sleep(1000).then(() => {

        if (this.status === "submitted") {

          this.setMessage('uuid: ' + this.uuid,'s');
          console.log(this.uuid);
          this.requestSubmitted = true; // :) WE HAVE THE UUID :)
          
          //CHECK THE STATUS AND START POLLING...
          this.startPolling();

        }
        else {

          this.setMessage('Error: No response from server','e');
          this.displaySubmitButton = true;

        }
      });
    }
    else {

      //DO ERROR FORMATTING ETC...
      if (v == true) {

        if (stdProvJSON.length < 1) {
          this.setMessage('Error: JSON Template is required','e');
          this.displaySubmitButton = true;
        }
        else {
          this.setMessage('Error: JSON Template is not valid JSON','e');
          this.displaySubmitButton = true;
        }
      }
      else {
        this.setMessage('Error: Provisioning Name is a required field','e');
        this.displaySubmitButton = true;
      }

    }

    //SHOW MESSAGE DIV LASTLY
    this.messageDiv = this.messageDiv.replace('[MessageStatus]', this.messageStatus);
    this.messageDiv = this.messageDiv.replace('[ErrorMEssage]', this.message);

    this.finalMessage = this.messageDiv;
    this.display = 'visible';

  }

  //----------------------------------------------------------------------------------------------------------------------------
  doPost() {
   
    if (this.IsJsonString(this.templatejson)) {

      this._reasonService.doAdminProvisioningPost(this.templateName, this.templatejson).subscribe(
        data => { this.posts = 'created', this.uuid = data.uuid, this.status = data.status},
        err => console.error(err), //TODO: OUTPUT ERRORS/MESSAGES TO UX
        () => console.log('done loading posts') //TODO: OUTPUT ERRORS/MESSAGES TO UX
      );
    }
    else {

       this.setMessage('Error: Template is not valid JSON','e');
       this.displaySubmitButton = true;
    }

  }

//MESSGAE FORMATTING------------------------------------------------------------------------------------------------
  setMessage(TheMessage:string, MessageType:string ){

    if(MessageType == "s")
    {
          this.message = TheMessage
          this.hasError = false;
          this.messageStatus = 'success';
          this.class = 'alert alert-success';
          this.display = 'visible';
    }
    else if(MessageType == "e")
    {
          this.message = TheMessage
          this.hasError = true;
          this.messageStatus = 'danger';
          this.class = 'alert alert-danger';
          this.display = 'visible';
    }  
    else if(MessageType == "i")
    {
      //TODO:.............
    }
    else
    {
      //TODO:.............
    }

  }
  
//setFeedbackMessage------------------------------------------------------------------------------------------------
  setFeedbackMessage(TheMessage:string, MessageType:string ){

    //console.log('setFeedbackMessage');
    this.feedbackSent = true;

    if(MessageType == "s")
    {
          this.message2 = TheMessage
          this.hasError2 = false;
          this.messageStatus2 = 'success';
          this.class2 = 'alert alert-success';
          this.display2 = 'visible';
    }
    else if(MessageType == "e")
    {
          this.message2 = TheMessage
          this.hasError2 = true;
          this.messageStatus2 = 'danger';
          this.class2 = 'alert alert-danger';
          this.display2 = 'visible';
    }  
    else if(MessageType == "i")
    {
      //TODO:.............
    }
    else
    {
      //TODO:.............
    }

  }

  //SIMPLE IS VALID JASON CHECK------------------------------------------------------------------------------------------------
  IsJsonString(str:string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  //STATUS POLL----------------------------------------------------------------------------------------------------------------------------
  startPolling() {

    //WAIT FOR THE UUID TO BE SET ...USUALLY A FEW SECONDS
    while (this.uuid == '') {
      //console.log('waiting for uui...')
    }

    //CALL STAUS POLLABLE SERVICE WITH A SUBSCRIPTION TO CANCEL LATER
    this.statusSubscription = this._reasonService.getStatustPoll(this.uuid, this.templateName).subscribe(data => {
      this.displayRequestDiv = true, this.statusTimeStamp = this.getTimeStamp(), this.doStatusCheck(data),
        this.pollCounter++; this.pollCounterString = this.pollCounter.toString()
    }
    );

    //CALL LOG POLLABLE SERVICE WITH A SUBSCRIPTION TO CANCEL LATER
    this.logSubscription = this._reasonService.getLogPoll(this.uuid, this.templateName).subscribe(data => {
      this.displayLogDiv = true, this.logsTimeStamp = this.getTimeStamp(), this.logArr = data.logs
    });

  }

  //----------------------------------------------------------------------------------------------------------------------------
  doStatusCheck(data:any) {

    if (data.status != this.status) {
      this.statusChangeMessage = 'Changed from ' + this.status + ' to ' + data.status;

      this.status = data.status; //IT CHANGED

      //...to created
      var didEnd = false;
      if (this.status == 'created') {

        //unsubscribe from the status poller
        this.statusSubscription.unsubscribe();
        
        //CALL SINGLE GET FOR TERRAFORM OUTPUTS
        //TODO: DIPLAY OUTPUTS...
        this._reasonService.getOutputs(this.uuid, this.templateName).subscribe(
          data => { this.displayOutputDiv = true, this.outputsTimeStamp = this.getTimeStamp(), this.outputDic = data.outputs, this.convertToArr(data.outputs) })
          
          //UNSUBSCRIBE FROM LOG POLL
          this.logSubscription.unsubscribe();

           this.setMessage('Provisioning complete OK','s');
           
           this.pollCounterString = '';
           
           this.displaySubmitButton = true;

           didEnd = true;
           
      }
      else if (this.status == 'failed') {

        //TODO: DO FAIL CODE HERE...
          this.displaySubmitButton = true;
          this.pollCounterString = '';
          this.setMessage('Error: Provising failed, please check the logs','e');

          didEnd = true;
          
      }
        if(didEnd == true)
        {
          this.displayFeedback = true;

        this.Panel2a = 'false';
        this.Panel2Class = 'panel-collapse collapse';
        
        this.Panel3a = 'true';
        this.Panel3Class = 'panel-collapse collapse in';


        // this.Panel4a = 'true';
        // this.Panel4Class = 'panel-collapse collapse in';
        } 
    }
  }

convertToArr(Input:any)
{
  //console.log('convertToArr');

      for(var i in Input){
        //console.log(i);
        //console.log(Input[i]);
        this.outputsArr.push(i + ": " + Input[i]);
      }
}

}

// DEPLOYMENT_STATUSES = %i{
//   submitted
//   creating
//   created
//   failed
//   destroying
//   destroyed
// }