import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/components/alert.service';
import {MessageService} from 'primeng/api';





@Component({ selector: 'app-alert', templateUrl: 'alert.component.html',
styleUrls: ['./alert.component.scss'] })
export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;


    constructor(private alertService: AlertService, private messageService: MessageService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        this.messageService.add({severity: 'success', summary: '', detail: message.text});

                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        this.messageService.add({severity: 'error', summary: '', detail: message.text, life: message.life});
                        break;
                }

            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
