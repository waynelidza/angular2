"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
'@angular/http';
require('rxjs/add/operator/map');
var reason_service_1 = require('.././services/reason.service');
var AdminComponent = (function () {
    function AdminComponent(_demoService, http) {
        this._demoService = _demoService;
        this.http = http;
        this.title = 'Reason Admin UX';
        this.displayOutputDiv = false;
        this.displayLogDiv = false;
        this.displayRequestDiv = false;
        this.uuid = '';
        this.message = '';
        this.hasError = false;
        this.messageStatus = '';
        this.finalMessage = '';
        this.display = 'none';
        this.messageDiv = '<div class="alert alert-[MessageStatus]"><strong>[MessageStatus]]!</strong> [ErrorMEssage]</div>';
        this.class = '';
        this.message2 = '';
        this.hasError2 = false;
        this.messageStatus2 = '';
        this.finalMessage2 = '';
        this.display2 = 'none';
        this.messageDiv2 = '<div class="alert alert-[MessageStatus]"><strong>[MessageStatus]]!</strong> [ErrorMEssage]</div>';
        this.class2 = '';
        this.year = new Date().getFullYear();
        this.requestSubmitted = false;
        this.statusTimeStamp = new Date().toDateString() + " " + new Date().toTimeString();
        this.logsTimeStamp = new Date().toDateString() + " " + new Date().toTimeString();
        this.outputsTimeStamp = new Date().toDateString() + " " + new Date().toTimeString();
        this.statusChangeMessage = 'Polling...';
        this.pollCounter = 0;
        this.pollCounterString = '';
        this.statusSubscription = null;
        this.logSubscription = null;
        this.logArr = [];
        this.outputDic = {};
        this.outputsArr = [];
        this.homeURL = 'http://localhost:4200/';
        this.displaySubmitButton = true;
        this.displayFeedback = false;
        this.feedbackSent = false;
        this.homeURL = _demoService.HomeURL;
    }
    //HELPERS
    AdminComponent.prototype.getTimeStamp = function () {
        return new Date().toDateString() + " " + new Date().toTimeString();
    };
    //---------------------------------------------------------------------------------------------------------
    AdminComponent.prototype.reloadPage = function () {
        location.reload();
    };
    //FeedbackRequest button click---------------------------------------------------------------------------------------------------------
    AdminComponent.prototype.sendFeedbackRequest = function (formValue) {
        var jsonData = JSON.stringify(formValue);
        this._demoService.doFeedbackPost(jsonData).subscribe();
        this.setFeedbackMessage('Thanks for the feedback, we will get back to you shortly :)', 's');
    };
    AdminComponent.prototype.checkResults = function (data) {
        alert(data.status);
    };
    //Submit button click---------------------------------------------------------------------------------------------------------
    AdminComponent.prototype.sendRequest = function (formValue) {
        var _this = this;
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
        if (formValue.templateName.length > 0) {
            v = true;
        }
        else {
            this.hasError = true;
            this.messageStatus = 'danger';
            this.message = 'Template name must be entered!!';
        }
        //validation #2
        if (this.IsJsonString(formValue.templatejson) && v == true) {
            this.displaySubmitButton = false;
            this.templateName = formValue.templateName;
            this.templatejson = formValue.templatejson;
            //TOO: IS THIS STILL NEEDED???
            var sleep = function (time) {
                return new Promise(function (resolve) { return setTimeout(resolve, time); });
            };
            //DO INITIAL POST
            this.doPost();
            sleep(1000).then(function () {
                if (_this.status === "submitted") {
                    _this.setMessage('uuid: ' + _this.uuid, 's');
                    _this.requestSubmitted = true; // :) WE HAVE THE UUID :)
                    //CHECK THE STATUS AND START POLLING...
                    _this.startPolling();
                }
                else {
                    _this.setMessage('Error: No response from server', 'e');
                    _this.displaySubmitButton = true;
                }
            });
        }
        else {
            //DO ERROR FORMATTING ETC...
            if (v == true) {
                if (formValue.templatejson.length < 1) {
                    this.setMessage('Error: JSON Template is required', 'e');
                    this.displaySubmitButton = true;
                }
                else {
                    this.setMessage('Error: JSON Template is not valid JSON', 'e');
                    this.displaySubmitButton = true;
                }
            }
            else {
                this.setMessage('Error: Provisioning Name is a required field', 'e');
                this.displaySubmitButton = true;
            }
        }
        //SHOW MESSAGE DIV LASTLY
        this.messageDiv = this.messageDiv.replace('[MessageStatus]', this.messageStatus);
        this.messageDiv = this.messageDiv.replace('[ErrorMEssage]', this.message);
        this.finalMessage = this.messageDiv;
        this.display = 'visible';
    };
    //----------------------------------------------------------------------------------------------------------------------------
    AdminComponent.prototype.doPost = function () {
        var _this = this;
        if (this.IsJsonString(this.templatejson)) {
            this._demoService.doPost(this.templateName, this.templatejson).subscribe(function (data) { _this.posts = 'created', _this.uuid = data.uuid, _this.status = data.status; }, function (err) { return console.error(err); }, //TODO: OUTPUT ERRORS/MESSAGES TO UX
            function () { return console.log('done loading posts'); } //TODO: OUTPUT ERRORS/MESSAGES TO UX
            );
        }
        else {
            this.setMessage('Error: Template is not valid JSON', 'e');
            this.displaySubmitButton = true;
        }
    };
    //MESSGA EFORMATTING------------------------------------------------------------------------------------------------
    AdminComponent.prototype.setMessage = function (TheMessage, MessageType) {
        if (MessageType == "s") {
            this.message = TheMessage;
            this.hasError = false;
            this.messageStatus = 'success';
            this.class = 'alert alert-success';
            this.display = 'visible';
        }
        else if (MessageType == "e") {
            this.message = TheMessage;
            this.hasError = true;
            this.messageStatus = 'danger';
            this.class = 'alert alert-danger';
            this.display = 'visible';
        }
        else if (MessageType == "i") {
        }
        else {
        }
    };
    //setFeedbackMessage------------------------------------------------------------------------------------------------
    AdminComponent.prototype.setFeedbackMessage = function (TheMessage, MessageType) {
        //console.log('setFeedbackMessage');
        this.feedbackSent = true;
        if (MessageType == "s") {
            this.message2 = TheMessage;
            this.hasError2 = false;
            this.messageStatus2 = 'success';
            this.class2 = 'alert alert-success';
            this.display2 = 'visible';
        }
        else if (MessageType == "e") {
            this.message2 = TheMessage;
            this.hasError2 = true;
            this.messageStatus2 = 'danger';
            this.class2 = 'alert alert-danger';
            this.display2 = 'visible';
        }
        else if (MessageType == "i") {
        }
        else {
        }
    };
    //SIMPLE IS VALID JASON CHECK------------------------------------------------------------------------------------------------
    AdminComponent.prototype.IsJsonString = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    //----------------------------------------------------------------------------------------------------------------------------
    // getLogandOutput() {
    //   this._demoService.getLogandOutput(this.uuid).subscribe(
    //     data => {
    //       this.outputJSONs = data[0],
    //         this.logJSONs = data[1]
    //     }
    //   );
    // }
    //STATUS POLL----------------------------------------------------------------------------------------------------------------------------
    AdminComponent.prototype.startPolling = function () {
        var _this = this;
        //WAIT FOR THE UUID TO BE SET ...USUALLY A FEW SECONDS
        while (this.uuid == '') {
            console.log('waiting for uui...');
        }
        //CALL STAUS POLLABLE SERVICE WITH A SUBSCRIPTION TO CANCEL LATER
        this.statusSubscription = this._demoService.getStatustPoll(this.uuid, this.templateName).subscribe(function (data) {
            _this.displayRequestDiv = true, _this.statusTimeStamp = _this.getTimeStamp(), _this.doStatusCheck(data),
                _this.pollCounter++;
            _this.pollCounterString = _this.pollCounter.toString();
        });
        //CALL LOG POLLABLE SERVICE WITH A SUBSCRIPTION TO CANCEL LATER
        this.logSubscription = this._demoService.getLogPoll(this.uuid, this.templateName).subscribe(function (data) {
            _this.displayLogDiv = true, _this.logsTimeStamp = _this.getTimeStamp(), _this.logArr = data.logs;
        });
    };
    //----------------------------------------------------------------------------------------------------------------------------
    AdminComponent.prototype.doStatusCheck = function (data) {
        var _this = this;
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
                this._demoService.getOutputs(this.uuid, this.templateName).subscribe(function (data) { _this.displayOutputDiv = true, _this.outputsTimeStamp = _this.getTimeStamp(), _this.outputDic = data.outputs, _this.convertToArr(data.outputs); });
                //UNSUBSCRIBE FROM LOG POLL
                this.logSubscription.unsubscribe();
                this.setMessage('Provisioning complete OK', 's');
                this.pollCounterString = '';
                this.displaySubmitButton = true;
                didEnd = true;
            }
            else if (this.status == 'failed') {
                //TODO: DO FAIL CODE HERE...
                this.displaySubmitButton = true;
                this.pollCounterString = '';
                this.setMessage('Error: Provising failed, please check the logs', 'e');
                didEnd = true;
            }
            if (didEnd == true) {
                this.displayFeedback = true;
            }
        }
    };
    AdminComponent.prototype.convertToArr = function (Input) {
        //console.log('convertToArr');
        for (var i in Input) {
            console.log(i);
            console.log(Input[i]);
            this.outputsArr.push(i + ": " + Input[i]);
        }
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'admin-component',
            templateUrl: 'app/components/admin.component.html',
            styleUrls: ['app/components/admin.component.css'],
            providers: [reason_service_1.ReasonService]
        }), 
        __metadata('design:paramtypes', [reason_service_1.ReasonService, http_1.Http])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
// DEPLOYMENT_STATUSES = %i{
//   submitted
//   creating
//   created
//   failed
//   destroying
//   destroyed
// } 
//# sourceMappingURL=admin.component.js.map