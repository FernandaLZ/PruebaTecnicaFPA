import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGripLines, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CLIENT_ROUTES } from '../../routes/clients/routes';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [FontAwesomeModule, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})

export class NavBarComponent {
  faGripLines:IconDefinition = faGripLines;
  clientRoutes = CLIENT_ROUTES;
  menuOpen = signal<boolean>(false);

  // Show or hide Menu option
  toggleMenu() {
    this.menuOpen.update(open => !open);
  }
  // Dark Mode
  toggleDarkMode() {
    const html: HTMLElement = document.documentElement;
    html.classList.toggle('dark');
  }

}
