import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportChecksComponent} from './import-checks.component';

describe('ImportChecksComponent', () => {
  let component: ImportChecksComponent;
  let fixture: ComponentFixture<ImportChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportChecksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImportChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
