import { TestBed, inject } from '@angular/core/testing';

import { MixService } from './mix.service';

describe('MixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MixService]
    });
  });

  it('should be created', inject([MixService], (service: MixService) => {
    expect(service).toBeTruthy();
  }));
});
