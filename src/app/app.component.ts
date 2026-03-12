import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  toggleDarkMode() {
    console.log('Toggling dark mode');
    const html = document.documentElement;

    html.classList.toggle('dark');

    console.log(html.classList);
  }

}
