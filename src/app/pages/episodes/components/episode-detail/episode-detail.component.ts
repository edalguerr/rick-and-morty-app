import { Component } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { CardPreviewTextComponent } from "../../../../shared/components/card-preview-text/card-preview-text.component";

@Component({
    selector: 'app-episode-detail',
    standalone: true,
    templateUrl: './episode-detail.component.html',
    styleUrl: './episode-detail.component.scss',
    imports: [CardPreviewTextComponent]
})
export class EpisodeDetailComponent {
  locationData: any;

  constructor(dialogRef: DialogRef) {
    if (dialogRef && dialogRef?.data) this.locationData = dialogRef.data;
  }
}
