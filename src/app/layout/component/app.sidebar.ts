import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu],
    templateUrl:"./sidebar.html"
})
export class AppSidebar {
    constructor(public el: ElementRef) {}
}
