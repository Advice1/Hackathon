import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {take} from "rxjs";
import {createEmbeddingContext} from "amazon-quicksight-embedding-sdk";
import {ManuComponent} from "../manu/manu.component";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-dashboard-one',
  standalone: true,
  imports: [HttpClientModule,ManuComponent],
  templateUrl: './dashboard-one.component.html',
  styleUrl: './dashboard-one.component.css'
})
export class DashboardOneComponent implements OnInit{

  constructor(private http: HttpClient,private route:Router) { }

  loadingError = false;
  dashboard:WritableSignal<any> = signal('');

  ngOnInit() {
    this.GetDashboardURL();
  }


  public ConvertToPDF() {
    let element:any = document.getElementById("dashboardContainer"); // Assuming the main content is in an element with id "content-to-print"
    html2canvas(element, {
      scale: 2, // Increase the scale to improve image quality
      useCORS: true, // Enable CORS to handle external resources
    }).then((canvas) => {
      let pdf = new jsPDF("p", "mm", "a4");
      let width = pdf.internal.pageSize.getWidth();
      let height = canvas.height * (width / canvas.width);
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
      pdf.save("download.pdf");
    });
  }


  public GetDashboardURL() {
    this.http.get("https://26f7jbchia.execute-api.us-east-1.amazonaws.com/dev")
      .pipe(
        take(1),
      )
      .subscribe((data: any) => {
        console.log(data.body.url2);
        this.Dashboard( data.body.url2)});
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
