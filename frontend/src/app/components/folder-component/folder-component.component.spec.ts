import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderComponentComponent } from './folder-component.component';

describe('FolderComponentComponent', () => {
  let component: FolderComponentComponent;
  let fixture: ComponentFixture<FolderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
