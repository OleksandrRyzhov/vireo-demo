import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare function menuInit(): void;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'angular-app';
    constructor(private router: Router) {
        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                menuInit();
            }
        });
    }
}
