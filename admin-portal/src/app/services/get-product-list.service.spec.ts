import { TestBed } from '@angular/core/testing';

import { GetProductListService } from './get-product-list.service';

describe('GetProductListService', () => {
  let service: GetProductListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProductListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
