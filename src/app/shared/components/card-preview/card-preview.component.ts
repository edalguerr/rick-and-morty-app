import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ICharacter } from '../../../state/state';

@Component({
  selector: 'app-card-preview',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss'],
})
export class CardPreviewComponent {
  @Input() data: any;
  @Input() isFavorite!: boolean;
  @Input() isDetails = false;
  @Output() onFavoriteEvent = new EventEmitter<ICharacter>();

  onFavorite(character: ICharacter, event: any): void {
    event.stopPropagation();
    this.onFavoriteEvent.emit(character);
  }
}
