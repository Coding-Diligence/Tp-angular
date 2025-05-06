import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NasaService } from '../../services/nasa.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-nasa-data',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './nasa-data.component.html',
  styleUrls: ['./nasa-data.component.scss']
})
export class NasaDataComponent {
  apodData: any;

  constructor(private nasaService: NasaService) {
    this.nasaService.getAstronomyPicture().subscribe(data => {
      this.apodData = data;
    });
  }
}