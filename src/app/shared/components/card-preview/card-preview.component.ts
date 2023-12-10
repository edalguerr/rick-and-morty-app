import { Component, Input, Optional } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-card-preview',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss'],
})
export class CardPreviewComponent {
  @Input() data: any;
}
