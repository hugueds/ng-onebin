import { Directive, HostBinding, HostListener, Input, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[popActive]'
})

export class PopActiveDirective implements OnInit, OnChanges{

 
  @Input() a;

  constructor() {     

  }

  ngOnInit(){
    
    
  }

  ngOnChanges(){
    
  }
  
  @HostBinding('style.backgroundColor') bgColor;


  @HostListener('onpopidchanged') verifyOrder(){
    
  }

}
