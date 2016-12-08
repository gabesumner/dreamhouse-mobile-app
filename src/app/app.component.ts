import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {PropertyListPage} from '../pages/property-list/property-list';
import {BrokerListPage} from '../pages/broker-list/broker-list';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {WelcomePage} from '../pages/welcome/welcome';
import {AboutPage} from '../pages/about/about';

import {OAuth, DataService} from 'forcejs';
// import OAuth from 'forcejs/oauth';
// import Service from 'forcejs/service';


export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = WelcomePage;

    appMenuItems: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    constructor(public platform: Platform) {

        this.initializeApp();

        this.appMenuItems = [
            {title: 'Properties', component: PropertyListPage, icon: 'home'},
            {title: 'Brokers', component: BrokerListPage, icon: 'people'},
            {title: 'Favorites', component: FavoriteListPage, icon: 'star'},
        ];

        this.helpMenuItems = [
            {title: 'Welcome', component: WelcomePage, icon: 'bookmark'},
            {title: 'About', component: AboutPage, icon: 'information-circle'},
        ];

    }

    initializeApp() {

        // Uncomment when using the *-service-salesforce services
        let oauth = OAuth.createInstance();
        oauth.login("3MVG9sG9Z3Q1Rlbc4tkIx2fI3ZYblYiG9oMxlbHO3gixLK8CcH.342BxX6L7NT8W4iND3lT9h52sAq1KtTIiz").then((oauthData) => {
            DataService.createInstance(oauthData, {proxyURL: "https://dev-cors-proxy.herokuapp.com/"});
        });

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleLightContent();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
