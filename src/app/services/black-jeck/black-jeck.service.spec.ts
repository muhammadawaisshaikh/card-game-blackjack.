import { TestBed } from '@angular/core/testing';

import { BlackJeckService } from './black-jeck.service';

describe('BlackJeckService', () => {
  let service: BlackJeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackJeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
