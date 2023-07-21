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
    this.loaderService.activeSubsject.subscribe(value => {
      this.isActive = value;
    });
  }
}
