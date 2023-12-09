import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation/translation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  baseMessage = 'app.components.navbar';
  menuItems = [
    {
      path: '/',
      label: `${this.baseMessage}.characters`,
    },
    {
      path: '/locations',
      label: `${this.baseMessage}.locations`,
    },
    {
      path: '/episodes',
      label: `${this.baseMessage}.episodes`,
    },
  ];
  isActiveMobileMenu = false;
  langInputValue = false;

  constructor(private translationService: TranslationService) {
    this.langInputValue =
      this.translationService.getSelectedLanguage() === 'es';
  }

  onSwitchLanguage({ target: { checked } }: any) {
    this.translationService.setLanguage(checked ? 'es' : 'en');
  }

  onShowMobileMenu(...show: any) {
    this.isActiveMobileMenu = !show || !this.isActiveMobileMenu;
  }
}
