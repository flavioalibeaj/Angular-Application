import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  template: `
    <router-outlet />
    <ngx-spinner
      bdColor="rgba(51,51,51,0.8)"
      size="medium"
      color="#fff"
      [fullScreen]="true"
    >
      <p style="font-size: 20px; color: white">Loading...</p>
    </ngx-spinner>
  `,
})
export class AppComponent implements OnInit {
  title = 'angularApplication';

  constructor(
    private readonly _ngxSpinnerService: NgxSpinnerService,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof NavigationStart
        )
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this._ngxSpinnerService.show();
        }

        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            this._ngxSpinnerService.hide();
          }, 500);
        }
      });
  }
}
