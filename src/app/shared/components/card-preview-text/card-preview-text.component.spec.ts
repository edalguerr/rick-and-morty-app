import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreviewTextComponent } from './card-preview-text.component';

describe('CardPreviewTextComponent', () => {
  let component: CardPreviewTextComponent;
  let fixture: ComponentFixture<CardPreviewTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPreviewTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPreviewTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
