import { TestBed, inject } from '@angular/core/testing';

import { CavmonMonitorsdataService } from './cavmon-monitorsdata.service';

describe('CavmonMonitorsdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CavmonMonitorsdataService]
    });
  });

  it('should be created', inject([CavmonMonitorsdataService], (service: CavmonMonitorsdataService) => {
    expect(service).toBeTruthy();
  }));
});
