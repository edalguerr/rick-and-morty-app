import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-group',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter-group.component.html',
  styleUrls: ['./filter-group.component.scss'],
})
export class FilterGroupComponent {
  @Input({ required: true }) filter!: string;
  @Input({ required: true }) optionList!: any[];
  @Input({ required: true }) formControl!: FormControl;

  isActiveOption(value: string): boolean {
    return this.formControl?.value === value;
  }
}
