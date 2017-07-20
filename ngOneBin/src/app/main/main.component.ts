import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from "app/services/configuration.service";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers : [ConfigurationService]
})
export class MainComponent implements OnInit {

  constructor(private _configService : ConfigurationService) { }

  ngOnInit() {
  }

}
