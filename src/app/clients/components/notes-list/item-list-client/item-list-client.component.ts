import { Component, input, output } from '@angular/core';
import { Note } from '../../../interfaces/client-interfaces';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'item-list-client',
  imports: [FontAwesomeModule],
  templateUrl: './item-list-client.component.html',
  styleUrl: './item-list-client.component.scss'
})
export class ItemListClientComponent {
  note = input.required<Note>();
  delete = output<number>();

  faTrash = faTrash;

  deleteNote(noteId:number) {
    console.log('Deleting note with ID:', noteId);
    this.delete.emit(noteId);

  }

}
