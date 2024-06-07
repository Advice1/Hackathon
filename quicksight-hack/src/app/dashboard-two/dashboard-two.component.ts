import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {createEmbeddingContext} from "amazon-quicksight-embedding-sdk";

@Component({
  selector: 'app-dashboard-two',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './dashboard-two.component.html',
  styleUrl: './dashboard-two.component.css'
})
export class DashboardTwoComponent implements OnInit{

  constructor(private http: HttpClient) { }

  loadingError = false;
  dashboard:WritableSignal<any> = signal('');

  ngOnInit() {
    this.GetDashboardURL();
  }

  GetDashboardURL() {
    this.http.get("https://26f7jbchia.execute-api.us-east-1.amazonaws.com/dev")
      .pipe(
        take(1),
      )
      .subscribe((data: any) => {
        console.log(data.body.url3);
        this.Dashboard( data.body.url3)});
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
