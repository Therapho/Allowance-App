import { TestBed } from '@angular/core/testing';

import { Store } from './store';

describe('Store', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Store<string> = TestBed.get(Store);
    expect(service).toBeTruthy();
  });
});
