import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReasonService {

public wsURL = '';
public ExampleKey1 = '';
public ExampleKey2 = '';
public GetStatustPollMilliSeconds  = 1000;
public GetLogPollMilliSeconds  = 1000;
public HomeURL  = '';


constructor(private http:Http) {

    //console.log('got to constructor(private http:Http) {');
    //get the configs from json file and set them....
    this.getConfigs()
}
    //----------------------------------------------------------------------------------------------------------------------------
    getConfigs(){

            this.http.get('Configs/Configs.json').map(res => res.json()).subscribe(value => {
            this.setConfigs(value[0]); 
        }, err => console.log(`Error: ${err}`), ()=>console.log('getConfigs run'));
        
    }
    //----------------------------------------------------------------------------------------------------------------------------
    setConfigs(configObject:any){

        this.wsURL = configObject.wsUrl
        
        //set other congifs as needed
        this.GetStatustPollMilliSeconds = configObject.GetStatustPollMilliSeconds
        this.GetLogPollMilliSeconds = configObject.GetLogPollMilliSeconds
        this.HomeURL = configObject.HomeURL;
    }

    //----------------------------------------------------------------------------------------------------------------------------
    doFeedbackPost(jsonData:any)  {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.wsURL}/feedback`,jsonData,options).map(res=>res.json());
    }

    //----------------------------------------------------------------------------------------------------------------------------
    doPost(productName:string, jsonTemplate:string)  {
        
        //return this.http.post('http://localhost:3000/products/'+ productName +'/deployments',jsonTemplate).map(res=>res.json());
        return this.http.post(`${this.wsURL}/products/${productName}/deployments`,jsonTemplate).map(res=>res.json());
    }

    //----------------------------------------------------------------------------------------------------------------------------
    getStatus(uuid:string, name:string) {

        //return this.http.get('http://localhost:3000/products/'+name+'/deployments/'+ uuid +'/status').map((res:Response) => res.json());
        return this.http.get(`${this.wsURL}/products/${name}/deployments/${uuid}/status`).map((res:Response) => res.json());
    }

    //SINGLE (OBSOLETE)----------------------------------------------------------------------------------------------------------------------------
    // getLogandOutput(uuid) {

    //     return Observable.forkJoin(
    //     this.http.get('http://localhost:3000/products/test/deployments/'+ uuid +'/status').map((res:Response) => res.json()),
    //     this.http.get('/app/shared/log.json').map((res:Response) => res.json())
    //     );
    // }

    //STATUS POLLING----------------------------------------------------------------------------------------------------------------------------
    getStatustPoll(uuid: string, name: string) {

        //return Observable.interval(1000).flatMapTo(this.http.get('http://localhost:3000/products/'+ name +'/deployments/'+ uuid +'/status').map((res:Response) => res.json()),);
         return Observable.interval(this.GetStatustPollMilliSeconds ).flatMapTo(this.http.get(`${this.wsURL}/products/${name}/deployments/${uuid}/status`).map((res:Response) => res.json()),);
    }

    //LOG POLLING--------------------------------------------------------------------------------------------------------------
    getLogPoll(uuid: string, name: string) {

        //return Observable.interval(1000).flatMapTo(this.http.get('http://localhost:3000/products/'+ name +'/deployments/'+ uuid +'/logs').map((res:Response) => res.json()),);
        return Observable.interval(this.GetLogPollMilliSeconds).flatMapTo(this.http.get(`${this.wsURL}/products/${name}/deployments/${uuid}/logs`).map((res:Response) => res.json()),);
    }

    //SINGLE GET TERRAFORM OUTPUTS--------------------------------------------------------------------------------------------------------------
    getOutputs(uuid:string, name:string) {

        //return this.http.get('http://localhost:3000/products/'+name+'/deployments/'+ uuid +'/outputs').map((res:Response) => res.json());
        return this.http.get(`${this.wsURL}/products/${name}/deployments/${uuid}/outputs`).map((res:Response) => res.json());
    }

    //PROVISIONING JSON TO BE REPLACED BY SERVICE CALL--------------------------------------------------------------------------------------------------------------
    getProvisioningOptions(){

            return `  {  
                            "OS": [
                            {
                                "ID": "RHEL6",
                                "Description": "RHEL-6.8_HVM_GA-20160503-x86_64-1-Hourly2-GP2",
                                "Default": "false",
                                "MinRootVolSize" : "8"
                            },
                                {"ID": "RHEL7",
                                "Description": "Red Hat Enterprise Linux 7.2 (HVM)",
                                "Default": "false",
                                "MinRootVolSize" : "8"
                            },
                                {"ID": "WIN2012R2",
                                "Description": "Microsoft Windows Server 2012 R2 Base",
                                "Default": "true",
                                "MinRootVolSize" : "30"
                            },
                                {"ID": "WIN2016",
                                "Description": "Microsoft Windows Server 2016 Base",
                                "Default": "false",
                                "MinRootVolSize" : "30"
                            }
                            ]
                            ,
                                "Size": [
                            {
                                "ID": "S",
                                "Description": "1 x vCPU 2GB RAM",
                                "Default": "true"
                            },
                                {"ID": "M",
                                "Description": "2 x vCPU 4GB RAM",
                                "Default": "false"
                            },
                                {"ID": "L",
                                "Description": "4 x vCPU 16GB RAM",
                                "Default": "false"
                            },
                                {"ID": "XL",
                                "Description": "8 x vCPU 32GB RAM",
                                "Default": "false"
                            }
                            ]
                            ,
                            "AdditionalDiskSizes": 
                            {
                                "Minimum": "1",
                                "Maximum": "500",
                                "Unit": "GB",
                                "Default": "30"
                            }
                            ,
                            "Subnet": [
                            {
                                "ID": "subnet-d329a3b7",
                                "Description": "Occam's RazorA",
                                "Default": "true"
                            },
                                {"ID": "subnet-c0830bb6",
                                "Description": "Occam's RazorB",
                                "Default": "false"
                            }
                            ]
                            
                        }`
        
    }


}
