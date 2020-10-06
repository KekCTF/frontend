import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatechallengeComponent } from './createchallenge.component';

describe('CreatechallengeComponent', () => {
  let component: CreatechallengeComponent;
  let fixture: ComponentFixture<CreatechallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatechallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatechallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
