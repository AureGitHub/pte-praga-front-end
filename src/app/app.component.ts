import { Component, OnInit } from '@angular/core';

import { CarService } from './services/carservice';
import { MenuItem } from 'primeng/api/menuitem';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [CarService]
})
export class AppComponent implements OnInit {

    MenuItems: MenuItem[];
    activeItem: MenuItem;

    constructor(private carService: CarService) { }

    ngOnInit() {

        this.MenuItems = [
            {
                label: 'Home',
                icon: 'pi pi-home', routerLink: ['/']
            },
            {
                label: 'Weather',
                icon: 'fa fa-fw fa-sun-o', routerLink: ['/fetch-data']
            },
            {
                label: 'File Manager',
                icon: 'pi pi-file-o', routerLink: ['/files']
            },
            {
                label: 'Counters', icon: 'fa fa-fw fa-sitemap',
                items: [
                    {
                        label: 'Counter',
                        icon: 'fa fa-fw fa-list-ol', routerLink: ['/counter']
                    },
                    {
                        label: 'PrimeNG Counter',
                        icon: 'fa fa-fw fa-list-ol', routerLink: ['/prime']
                    },
                ]
            }
        ];

    }

}
