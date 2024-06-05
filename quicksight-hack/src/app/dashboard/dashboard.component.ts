import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs";
import {createEmbeddingContext, EmbeddingContext} from "amazon-quicksight-embedding-sdk";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
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
    this.http.get("http://fakestoreapi.com")
      .pipe(
        take(1),
      )
      .subscribe((data: any) => this.Dashboard(data.url));
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
