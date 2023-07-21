import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mesha-test-front';

  isActive = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    // Ativa a escuta do subject do loader
    setTimeout(() => {
      this.loaderService.activeSubsject.subscribe(value => {
        this.isActive = value;
      })
    }, 0);
  }
}
