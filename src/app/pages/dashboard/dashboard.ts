import { Component } from '@angular/core';
import { NotificationsWidget } from './components/notificationswidget';
import { StatsWidget } from './components/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { AppBaseComponent } from "../../components/app-base/app-base.component";

@Component({
    selector: 'app-dashboard',
    // imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
    template: `
        <app-base></app-base>
    `,
    imports: [AppBaseComponent]
})
export class Dashboard {}
