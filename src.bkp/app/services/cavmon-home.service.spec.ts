import { TestBed, inject } from '@angular/core/testing';

import { CavmonHomeService } from './cavmon-home.service';

describe('CavmonHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CavmonHomeService]
    });
  });

  it('should be created', inject([CavmonHomeService], (service: CavmonHomeService) => {
    expect(service).toBeTruthy();
  }));
});
