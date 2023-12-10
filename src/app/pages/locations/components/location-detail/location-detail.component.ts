import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CardPreviewTextComponent } from "../../../../shared/components/card-preview-text/card-preview-text.component";

@Component({
    selector: 'app-location-detail',
    standalone: true,
    templateUrl: './location-detail.component.html',
    styleUrl: './location-detail.component.scss',
    imports: [CommonModule, CardPreviewTextComponent]
})
export class LocationDetailComponent {
  locationData: any;    

  constructor(dialogRef: DialogRef) {
    if (dialogRef && dialogRef?.data) this.locationData = dialogRef.data;
  }
}
