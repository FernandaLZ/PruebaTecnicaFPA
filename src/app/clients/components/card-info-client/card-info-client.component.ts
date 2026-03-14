import { Component, input, signal } from '@angular/core';
import { ClientResponseEXT } from '../../interfaces/client-interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'client-card-info-client',
  imports: [CommonModule],
  templateUrl: './card-info-client.component.html',
  styleUrl: './card-info-client.component.scss'
})
export class CardInfoClientComponent {
  client = input.required<ClientResponseEXT>();

}
