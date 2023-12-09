import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header-template',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.scss'],
})
export class HeaderTemplateComponent {
  @Input() title: string = 'app.components.headerTemplate.title';
  @Input() description: string = 'app.components.headerTemplate.description';
}
