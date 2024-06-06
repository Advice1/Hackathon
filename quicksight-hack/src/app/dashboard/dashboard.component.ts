import {Component, OnInit} from '@angular/core';
import {HttpClient,HttpClientModule} from "@angular/common/http";
import {take} from "rxjs";
import {createEmbeddingContext, EmbeddingContext} from "amazon-quicksight-embedding-sdk";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  loadingError = false;
  dashboard: any;

  ngOnInit() {
    this.GetDashboardURL();
  }

  public GetDashboardURL() {
    this.http.get("https://fakestoreapi.com/products/1")
      .pipe(
        take(1),
      )
      .subscribe((data: any) => {
        console.log(data);
        this.Dashboard("https://angular.dev/guide/forms/reactive-forms")});
  }

  public async Dashboard(embeddedURL: any) {
    let containerDiv = document.getElementById("dashboardContainer") || '';
    const frameOptions = {
      url: embeddedURL,
      container: containerDiv,
      height: "850px",
      width: "100%",
      resizeHeightOnSizeChangedEvent: true,
    }
    const embeddingContext = await createEmbeddingContext();
    this.dashboard = embeddingContext.embedDashboard(frameOptions);
  }
}
