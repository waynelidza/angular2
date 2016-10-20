import { Component, Input } from '@angular/core'

@Component({
    selector: 'streaming-list-component',
    templateUrl: 'app/components/streaming-list/streaming-list.component.html',
    styleUrls: ['app/components/streaming-list/streaming-list.component.css'], 
})
export class StreamingListComponent{
    @Input() items:any;
    @Input() title:string;
    @Input() status:string;
    @Input('icon-type') iconType:string;
    @Input('is-visible') isVisible:boolean = true;        
}