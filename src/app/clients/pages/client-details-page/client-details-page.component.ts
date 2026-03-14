import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClientService } from './../../services/client.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../../../shared/interfaces/shared-interfaces';
import { CardInfoClientComponent } from "../../components/card-info-client/card-info-client.component";
import { ItemListClientComponent } from "../../components/notes-list/item-list-client/item-list-client.component";

@Component({
  selector: 'app-client-details-page',
  imports: [
    MatTooltipModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CardInfoClientComponent,
    ItemListClientComponent
],
  templateUrl: './client-details-page.component.html',
  styleUrl: './client-details-page.component.scss',
})
export default class ClientDetailsPageComponent {
  //Services and dependencies
  private activatedRoute = inject(ActivatedRoute);
  clientService = inject(ClientService);
  readonly dialog = inject(MatDialog);

  //FormControl
  formControl = new FormControl<string | null>(null, {
    validators: Validators.required,
  });

  //Params
  clientId = toSignal(
    this.activatedRoute.paramMap.pipe(
      map((params: ParamMap) => Number(params.get('idClient'))),
    ),
    { initialValue: 0 },
  );

  //Petitions
  clientResource = rxResource({
    request: () => ({ id: this.clientId() }),
    loader: ({ request }) => this.clientService.getClient(request.id),
  });
  noteResource = rxResource({
    request: () => ({ id: this.clientId() }),
    loader: ({ request }) => this.clientService.getNotesByClientId(request.id),
  });

  //Methods
  deleteNote(noteId: number) {
    const dataDialog: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this note?',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    };
    this.dialog
      .open(ConfirmDialogComponent, {
        data: dataDialog,
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.clientService.deleteNoteById(noteId, this.clientId()).subscribe({
            next: () => this.noteResource.reload(),
            error: (err) => console.error('Error deleting note:', err),
          });
        }
      });
  }

  addNote() {
    this.formControl.markAsTouched();
    if (this.formControl.invalid) return;
    this.clientService
      .addNoteByClientId(this.formControl.value!, this.clientId())
      .subscribe({
        next: () => {
          this.formControl.reset();
          this.noteResource.reload();
        },
        error: (err) => console.error('Error adding note:', err),
      });
  }
}
