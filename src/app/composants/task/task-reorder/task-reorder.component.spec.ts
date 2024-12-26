import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReorderComponent } from './task-reorder.component';

describe('TaskReorderComponent', () => {
  let component: TaskReorderComponent;
  let fixture: ComponentFixture<TaskReorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskReorderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
