import {Injectable} from '@angular/core';
import {HTTP_PROVIDERS, Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ReasonService {

constructor(private http:Http) {

}

    //----------------------------------------------------------------------------------------------------------------------------
    doPost(productName, jsonTemplate)  {
        
        return this.http.post('http://localhost:3000/products/'+ productName +'/deployments',jsonTemplate).map(res=>res.json());
    }

    //----------------------------------------------------------------------------------------------------------------------------
    getStatus(uuid, name) {

        return this.http.get('http://localhost:3000/products/'+name+'/deployments/'+ uuid +'/status').map((res:Response) => res.json());
    }

    //SINGLE ----------------------------------------------------------------------------------------------------------------------------
    getLogandOutput(uuid) {

        return Observable.forkJoin(
        this.http.get('http://localhost:3000/products/test/deployments/'+ uuid +'/status').map((res:Response) => res.json()),
        this.http.get('/app/shared/log.json').map((res:Response) => res.json())
        );
    }

    //STATUS POLLING----------------------------------------------------------------------------------------------------------------------------
    getStatustPoll(uuid: string, name: string) {

        return Observable.interval(1000).flatMapTo(
        this.http.get('http://localhost:3000/products/'+ name +'/deployments/'+ uuid +'/status').map((res:Response) => res.json()),
        );
    }

    //LOG POLLING--------------------------------------------------------------------------------------------------------------
    getLogPoll(uuid: string, name: string) {

        return Observable.interval(1000).flatMapTo(
        this.http.get('http://localhost:3000/products/'+ name +'/deployments/'+ uuid +'/logs').map((res:Response) => res.json()),
        );
    }

    //SINGLE GET TERRAFORM OUTPUTS--------------------------------------------------------------------------------------------------------------
    getOutputs(uuid, name) {

        return this.http.get('http://localhost:3000/products/'+name+'/deployments/'+ uuid +'/outputs').map((res:Response) => res.json());
    }

}
