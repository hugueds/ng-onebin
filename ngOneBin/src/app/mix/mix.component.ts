import { Component, OnInit, OnChanges } from '@angular/core';
import { MixService } from "app/services/mix.service";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.css']
})

export class MixComponent implements OnInit, OnChanges {

  private popids: string[];
  entrancePopid: string = '';
  index: Number = 0;

  test2:any = [];

  constructor(private _mixService: MixService) {

  }

  ngOnInit() {
    this._mixService.getMix().subscribe(pops => {
      this.popids = pops;      
      this._mixService.getEntrance().subscribe(pop => {
        this.entrancePopid = pop;              
      });
    });


  }

  ngOnChanges() {
    console.log(this);
  }

  test() {
    console.log(this.index);
  }

  updateStyle() {
    return this.index;
  }

}
