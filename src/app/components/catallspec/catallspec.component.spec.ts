import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatallspecComponent } from './catallspec.component';

describe('CatallspecComponent', () => {
  let component: CatallspecComponent;
  let fixture: ComponentFixture<CatallspecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatallspecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatallspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
