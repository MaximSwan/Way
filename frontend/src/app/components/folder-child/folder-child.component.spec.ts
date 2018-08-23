import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderChildComponent } from './folder-child.component';

describe('FolderChildComponent', () => {
  let component: FolderChildComponent;
  let fixture: ComponentFixture<FolderChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
