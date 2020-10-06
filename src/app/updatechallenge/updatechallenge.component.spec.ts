import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatechallengeComponent } from './updatechallenge.component';

describe('UpdatechallengeComponent', () => {
  let component: UpdatechallengeComponent;
  let fixture: ComponentFixture<UpdatechallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatechallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatechallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
