import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublikacijaPage } from './publikacija.page';

describe('PublikacijaPage', () => {
  let component: PublikacijaPage;
  let fixture: ComponentFixture<PublikacijaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublikacijaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublikacijaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
