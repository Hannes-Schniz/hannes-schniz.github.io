import { TestBed } from '@angular/core/testing';

import { ShowSidenavService } from './show-sidenav.service';

describe('ShowSidenavService', () => {
  let service: ShowSidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSidenavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
