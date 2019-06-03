import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericClearMemoryModalComponent } from './generic-clear-memory-modal.component';

describe('GenericClearMemoryModalComponent', () => {
  let component: GenericClearMemoryModalComponent;
  let fixture: ComponentFixture<GenericClearMemoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericClearMemoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericClearMemoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
