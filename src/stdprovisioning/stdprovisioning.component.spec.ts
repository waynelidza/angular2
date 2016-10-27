/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StdprovisioningComponent } from './stdprovisioning.component';

describe('StdprovisioningComponent', () => {
  let component: StdprovisioningComponent;
  let fixture: ComponentFixture<StdprovisioningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdprovisioningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdprovisioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
