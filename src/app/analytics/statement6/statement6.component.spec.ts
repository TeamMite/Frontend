import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Statement6Component } from './statement6.component';

describe('Statement6Component', () => {
  let component: Statement6Component;
  let fixture: ComponentFixture<Statement6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Statement6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Statement6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
