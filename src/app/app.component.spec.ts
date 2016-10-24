/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';

import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterOutlet } from "@angular/router";
import {RouterLinkStubDirective, RouterOutletStubComponent } from '../testing/router-stubs'

describe('AppComponent with TCB', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({declarations: [AppComponent, RouterLinkStubDirective, RouterOutletStubComponent]});
    });

    it('should instantiate component', () => {
      let fixture = TestBed.createComponent(AppComponent);
      expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

    it('should have expected links', () => {
      let fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      let linkElements = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
      let links = linkElements.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

      expect(links.length).toBe(4);
      expect(links[1].linkParams).toBe('/admin');
      expect(links[2].linkParams).toBe('/std');
      expect(links[3].linkParams).toBe('/feedback');
    });
});
