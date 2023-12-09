import { Component, ComponentRef } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { CardPreviewComponent } from '../../../../shared/components/card-preview/card-preview.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
  imports: [CardPreviewComponent, TranslateModule],
})
export class CharacterDetailComponent {
  characterData: any;
  detailMessages: string = 'app.pages.characters.details.';

  constructor(dialogRef: DialogRef) {
    if (dialogRef && dialogRef?.data) this.characterData = dialogRef.data;
  }
}
