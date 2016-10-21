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

    //get the configs from json file and set them....
    this.getConfigs()
}
    //----------------------------------------------------------------------------------------------------------------------------
    getConfigs(){

            this.http.get('assets/Configs/Configs.json').map(res => res.json()).subscribe(value => {
                //console.log('xyz: '+value[0].wsUrl);
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
        
        return this.http.post(`${this.wsURL}/products/${productName}/deployments`,jsonTemplate).map(res=>res.json());
    }

    //----------------------------------------------------------------------------------------------------------------------------
    getStatus(uuid:string, name:string) {

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

         return Observable.interval(this.GetStatustPollMilliSeconds ).flatMapTo(this.http.get(`${this.wsURL}/products/${name}/deployments/${uuid}/status`).map((res:Response) => res.json()),);
    }

    //LOG POLLING--------------------------------------------------------------------------------------------------------------
    getLogPoll(uuid: string, name: string) {

        return Observable.interval(this.GetLogPollMilliSeconds).flatMapTo(this.http.get(`${this.wsURL}/products/${name}/deployments/${uuid}/logs`).map((res:Response) => res.json()),);
    }

    //SINGLE GET TERRAFORM OUTPUTS--------------------------------------------------------------------------------------------------------------
    getOutputs(uuid:string, name:string) {

        return this.http.get(`${this.wsURL}/products/${name}/deployments/${uuid}/outputs`).map((res:Response) => res.json());
    }

    //PROVISIONING JSON FROM FILE - TO BE REPLACED BY SERVICE CALL--------------------------------------------------------------------------------------------------------------
    getProvisioningOptions(){
       
       return  this.http.get("assets/Configs/ProvisioningOptions.json").map(res=>res.json());

    }


}
