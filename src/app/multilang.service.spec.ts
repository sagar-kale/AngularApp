import { TestBed } from '@angular/core/testing';

import { MultilangService } from './multilang.service';

describe('MultilangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MultilangService = TestBed.get(MultilangService);
    expect(service).toBeTruthy();
  });
});
