import { Component } from '@angular/core';
import { Result } from '../../models/result';
import { ResultService } from '../../services/result.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-result-page',
  templateUrl: './my-result-page.component.html',
  styleUrl: './my-result-page.component.css'
})
export class MyResultPageComponent {
  fetchingResults = true;
  results: Result[] | undefined;

  constructor(private resultService: ResultService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.resultService.getResults().subscribe((data: any[]) => {
      this.results = data;
      this.fetchingResults = false;
    }, (error: any) => {
      this.fetchingResults = false;

      console.error('Error:', error);

      this.toastr.error('Error fetching results');
    });
  }
}
