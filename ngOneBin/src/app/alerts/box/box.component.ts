import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() delivered: boolean;
  @Input() partName: string;
  @Input() partNumber: string;
  

  constructor() { }

  ngOnInit() {
  }

  sendDeliver(part){
    console.log(part)
    this.delivered = false;
  }

}
