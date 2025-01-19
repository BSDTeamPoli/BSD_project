import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { backendUrl } from "../constants";
import { Observable } from "rxjs";
import { Result } from "../models/result";

@Injectable({
    providedIn: 'root',
})
export class ResultService {
    constructor(private http: HttpClient) { }

    getResults() {
        return this.http.get(backendUrl.resultService.getResults) as Observable<
            Result[]
        >;
    }
};