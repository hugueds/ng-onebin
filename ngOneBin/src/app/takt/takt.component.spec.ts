import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaktComponent } from './takt.component';

describe('TaktComponent', () => {
  let component: TaktComponent;
  let fixture: ComponentFixture<TaktComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaktComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
