import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    private sub: any;
    public isPageloaderVisible = true;

    constructor(private slimLoader: SlimLoadingBarService, private router: Router) {
      
        this.sub = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.isPageloaderVisible = true;
                this.slimLoader.start();
            } else if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError) {
                this.slimLoader.complete();
                this.isPageloaderVisible = false;
            }
        }, (error: any) => {
            this.slimLoader.complete();
            this.isPageloaderVisible = false;
        });
    }

    ngOnDestroy(): any {
        this.sub.unsubscribe();
        this.isPageloaderVisible = false;
    }
}
