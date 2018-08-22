import { TestBed, inject } from '@angular/core/testing';

import { FolderServiceService } from './folder-service.service';

describe('FolderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FolderServiceService]
    });
  });

  it('should be created', inject([FolderServiceService], (service: FolderServiceService) => {
    expect(service).toBeTruthy();
  }));
});
