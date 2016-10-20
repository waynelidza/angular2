import { Component, Input } from '@angular/core'

@Component({
    selector: 'streaming-list-component',
    templateUrl: './streaming-list.component.html',
    styleUrls: ['./streaming-list.component.css'], 
})
export class StreamingListComponent{
    @Input() items:any;
    @Input() title:string;
    @Input() status:string;
    @Input('icon-type') iconType:string;
    @Input('is-visible') isVisible:boolean = true;        
}