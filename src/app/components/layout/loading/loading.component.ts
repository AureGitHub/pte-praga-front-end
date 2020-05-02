import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { LoadingService } from 'src/app/services/components/loading.service';


@Component({ selector: 'app-loading', templateUrl: 'loading.component.html',
styleUrls: [] })
export class LoadingComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    loading: Subject<boolean> = this.loadingService.isLoading;

    constructor(private loadingService: LoadingService) { }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
