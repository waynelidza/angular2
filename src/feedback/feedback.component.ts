import { Component, NgModule, Input } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { ReasonService } from '../app/reason.service';

declare var $:any;

@Component({
  selector: 'feedback-component',
  templateUrl: './feedback.component.html',
  styleUrls: [ './feedback.component.css' ], 
  providers: [ReasonService]
})
export class FeedbackComponent {

  
    private showMessage:boolean  =false;
    private responseMessage:string = "";
    private class:string = "";
    private display:string = "";

    private counter = 0;

    @Input() featureName:string = "Raw Feedback Component";

    constructor(private _reasonService: ReasonService){

    }


//FeedbackRequest button click--------------------------------------------------------------------------------------
  sendFeedbackRequest(formValue:any){

    var jsonData = JSON.stringify(formValue);

          this._reasonService.doFeedbackPost(jsonData).subscribe(
          );
          
          this.setFeedbackMessage(`Thanks for the feedback WRT the ${this.featureName}, we will get back to you shortly :)`,'s');

  }

//setFeedbackMessage------------------------------------------------------------------------------------------------
  setFeedbackMessage(TheMessage:string, MessageType:string ){

    if(MessageType == "s")
    {
          this.responseMessage = TheMessage
          this.class = 'alert alert-success';
          this.display = 'visible';
    }
    else if(MessageType == "e")
    {
          this.responseMessage = TheMessage
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
      this.showMessage = true;
  }

}