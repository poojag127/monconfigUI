import { TestBed, inject } from '@angular/core/testing';

import { CavmonConfigService } from './cavmon-config.service';

describe('CavmonConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CavmonConfigService]
    });
  });

  it('should be created', inject([CavmonConfigService], (service: CavmonConfigService) => {
    expect(service).toBeTruthy();
  }));
});
