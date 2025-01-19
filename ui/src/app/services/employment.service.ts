import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { backendUrl } from '../constants';
import { Employment } from '../models/employment';

@Injectable({
    providedIn: 'root',
})
export class EmploymentService {
    constructor(private http: HttpClient) { }

    getEmploymentDetails(id: string) {
        return this.http.get(backendUrl.employmentService.getEmployment + id) as any;
    }

    updateEmploymentDetails(id: string, employment: Employment) {
        return this.http.put(backendUrl.employmentService.saveEmployment + id, employment) as any;
    }
}