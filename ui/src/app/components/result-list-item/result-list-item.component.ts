import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-list-item',
  templateUrl: './result-list-item.component.html',
  styleUrls: ['./result-list-item.component.css']
})
export class ResultListItemComponent {
  @Input() id: number = 0; // Unique identifier
  @Input() loanname: string = '';
  @Input() date: string = '';
  @Input() interest: number | null = null;
  @Input() amounttopay: number | null = null;
  @Input() amounttopaymonthly: number | null = null;
  @Input() result: string = '';

  getResultClass() {
    return this.result === 'SUCCESS' ? 'success' : 'failed';
  }

  formatedDate(stringDate: string) {
    return stringDate.split("-").reverse().join("/");;
  }
}