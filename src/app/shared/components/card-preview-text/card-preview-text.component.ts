import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-preview-text',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './card-preview-text.component.html',
  styleUrl: './card-preview-text.component.scss',
})
export class CardPreviewTextComponent {
  @Input() data: any;
  @Input() detailMessages!: { title: string; description: string; additional?:string };
}
