import { TestBed, inject } from '@angular/core/testing';

import { CustomerSearchService } from './customer-search.service';

describe('CustomerSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerSearchService]
    });
  });

  it('should be created', inject([CustomerSearchService], (service: CustomerSearchService) => {
    expect(service).toBeTruthy();
  }));
});
