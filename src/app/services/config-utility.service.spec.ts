import { TestBed, inject } from '@angular/core/testing';

import { ConfigUtilityService } from './config-utility.service';

describe('ConfigUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigUtilityService]
    });
  });

  it('should be created', inject([ConfigUtilityService], (service: ConfigUtilityService) => {
    expect(service).toBeTruthy();
  }));
});
