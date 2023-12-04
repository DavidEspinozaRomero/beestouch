import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterLayoutComponent } from './starter-layout.component';

describe('StarterLayoutComponent', () => {
  let component: StarterLayoutComponent;
  let fixture: ComponentFixture<StarterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarterLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
