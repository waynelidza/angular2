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
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/toPromise');
var ReasonService = (function () {
    function ReasonService(http) {
        this.http = http;
        this.wsURL = '';
        this.ExampleKey1 = '';
        this.ExampleKey2 = '';
        this.GetStatustPollMilliSeconds = 1000;
        this.GetLogPollMilliSeconds = 1000;
        this.HomeURL = '';
        //console.log('got to constructor(private http:Http) {');
        //get the configs from json file and set them....
        this.getConfigs();
    }
    //----------------------------------------------------------------------------------------------------------------------------
    ReasonService.prototype.getConfigs = function () {
        var _this = this;
        this.http.get('Configs/Configs.json').map(function (res) { return res.json(); }).subscribe(function (value) {
            _this.setConfigs(value[0]);
        }, function (err) { return console.log("Error: " + err); }, function () { return console.log('getConfigs run'); });
    };
    //----------------------------------------------------------------------------------------------------------------------------
    ReasonService.prototype.setConfigs = function (configObject) {
        this.wsURL = configObject.wsUrl;
        //set other congifs as needed
        this.GetStatustPollMilliSeconds = configObject.GetStatustPollMilliSeconds;
        this.GetLogPollMilliSeconds = configObject.GetLogPollMilliSeconds;
        this.HomeURL = configObject.HomeURL;
    };
    //----------------------------------------------------------------------------------------------------------------------------
    ReasonService.prototype.doFeedbackPost = function (jsonData) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.wsURL + "/feedback", jsonData, options).map(function (res) { return res.json(); });
    };
    //----------------------------------------------------------------------------------------------------------------------------
    ReasonService.prototype.doPost = function (productName, jsonTemplate) {
        //return this.http.post('http://localhost:3000/products/'+ productName +'/deployments',jsonTemplate).map(res=>res.json());
        return this.http.post(this.wsURL + "/products/" + productName + "/deployments", jsonTemplate).map(function (res) { return res.json(); });
    };
    //----------------------------------------------------------------------------------------------------------------------------
    ReasonService.prototype.getStatus = function (uuid, name) {
        //return this.http.get('http://localhost:3000/products/'+name+'/deployments/'+ uuid +'/status').map((res:Response) => res.json());
        return this.http.get(this.wsURL + "/products/" + name + "/deployments/" + uuid + "/status").map(function (res) { return res.json(); });
    };
    //SINGLE (OBSOLETE)----------------------------------------------------------------------------------------------------------------------------
    // getLogandOutput(uuid) {
    //     return Observable.forkJoin(
    //     this.http.get('http://localhost:3000/products/test/deployments/'+ uuid +'/status').map((res:Response) => res.json()),
    //     this.http.get('/app/shared/log.json').map((res:Response) => res.json())
    //     );
    // }
    //STATUS POLLING----------------------------------------------------------------------------------------------------------------------------
    ReasonService.prototype.getStatustPoll = function (uuid, name) {
        //return Observable.interval(1000).flatMapTo(this.http.get('http://localhost:3000/products/'+ name +'/deployments/'+ uuid +'/status').map((res:Response) => res.json()),);
        return Rx_1.Observable.interval(this.GetStatustPollMilliSeconds).flatMapTo(this.http.get(this.wsURL + "/products/" + name + "/deployments/" + uuid + "/status").map(function (res) { return res.json(); }));
    };
    //LOG POLLING--------------------------------------------------------------------------------------------------------------
    ReasonService.prototype.getLogPoll = function (uuid, name) {
        //return Observable.interval(1000).flatMapTo(this.http.get('http://localhost:3000/products/'+ name +'/deployments/'+ uuid +'/logs').map((res:Response) => res.json()),);
        return Rx_1.Observable.interval(this.GetLogPollMilliSeconds).flatMapTo(this.http.get(this.wsURL + "/products/" + name + "/deployments/" + uuid + "/logs").map(function (res) { return res.json(); }));
    };
    //SINGLE GET TERRAFORM OUTPUTS--------------------------------------------------------------------------------------------------------------
    ReasonService.prototype.getOutputs = function (uuid, name) {
        //return this.http.get('http://localhost:3000/products/'+name+'/deployments/'+ uuid +'/outputs').map((res:Response) => res.json());
        return this.http.get(this.wsURL + "/products/" + name + "/deployments/" + uuid + "/outputs").map(function (res) { return res.json(); });
    };
    ReasonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReasonService);
    return ReasonService;
}());
exports.ReasonService = ReasonService;
//# sourceMappingURL=demo.service.js.map