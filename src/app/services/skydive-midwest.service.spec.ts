import { TestBed } from '@angular/core/testing';

import { SkydiveMidwestService } from './skydive-midwest.service';

describe('SkydiveMidwestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkydiveMidwestService = TestBed.get(SkydiveMidwestService);
    expect(service).toBeTruthy();
  });
});
