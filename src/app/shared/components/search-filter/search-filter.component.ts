import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  @Input({ required: true }) formControl!: FormControl;
  @Input({ required: true }) searchInputMessages!: {
    label: string;
    placeholder: string;
  };
}
