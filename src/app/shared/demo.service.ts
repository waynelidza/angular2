import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
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

        //return this.http.get('/app/shared/log.json').map((res:Response) => res.json())
        //this.http.get('/app/shared/ReasonConfig.json').map(res => res.json()).subscribe(value => {
            this.http.get('../../Configs/Configs.json').map(res => res.json()).subscribe(value => {
            this.setConfigs(value[0]); 
            //this.wsURL = value[0].wsUrl
            //alert(this.wsURL);
        }, err => console.log(`Error: ${err}`), ()=>console.log('getConfigs run'));
        
    }

    setConfigs(configObject){

        this.wsURL = configObject.wsUrl
        
        //set other congifs as needed
        this.GetStatustPollMilliSeconds = configObject.GetStatustPollMilliSeconds
        this.GetLogPollMilliSeconds = configObject.GetLogPollMilliSeconds
        this.HomeURL = configObject.HomeURL;
    }


    //----------------------------------------------------------------------------------------------------------------------------
    doPost(productName, jsonTemplate)  {
        
        //return this.http.post('http://localhost:3000/products/'+ productName +'/deployments',jsonTemplate).map(res=>res.json());
        return this.http.post(`${this.wsURL}/products/${productName}/deployments`,jsonTemplate).map(res=>res.json());
    }

    //----------------------------------------------------------------------------------------------------------------------------
    getStatus(uuid, name) {

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
    getOutputs(uuid, name) {

        //return this.http.get('http://localhost:3000/products/'+name+'/deployments/'+ uuid +'/outputs').map((res:Response) => res.json());
        return this.http.get(`${this.wsURL}/products/${name}/deployments/${uuid}/outputs`).map((res:Response) => res.json());
    }



}
