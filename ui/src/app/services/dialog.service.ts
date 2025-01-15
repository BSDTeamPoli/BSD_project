import { Injectable } from '@angular/core';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class DeleteDialogService {

    private deleteDialogComponent!: DeleteDialogComponent;

    constructor() { }

    setDeleteDialogComponent(deleteDialogComponent: DeleteDialogComponent) {
        this.deleteDialogComponent = deleteDialogComponent;
    }

    openDeleteDialog() {
        this.deleteDialogComponent.openModal();
    }

}