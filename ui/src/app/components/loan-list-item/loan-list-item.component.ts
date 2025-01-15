import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loan-list-item',
  templateUrl: './loan-list-item.component.html',
  styleUrls: ['./loan-list-item.component.css']
})
export class LoanListItemComponent {
  @Input() id: number = 0; // Unique identifier
  @Input() name: string = ''; // Title to display on the left
  @Input() description: string = '';  // Optional endpoint to navigate to on click
  @Input() isSelected: boolean = false; // Whether or not this item is selected
  @Output() clicked = new EventEmitter<string>();

  onClick() {
    this.clicked.emit(this.id.toString());
  }
}