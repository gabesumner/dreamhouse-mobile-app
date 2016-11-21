import Service from 'forcejs/data';
import {Injectable} from '@angular/core';

@Injectable()
export class BrokerService {

    force: any;

    constructor() {
        this.force = Service.getInstance();
    }

    /*
     Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
     from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
     */
    prettifyBroker(broker) {
        return {
            id: broker.Id,
            name: broker.Name,
            title: broker.Title__c,
            picture: broker.Picture__c,
            phone: broker.Phone__c,
            mobilePhone: broker.Mobile_Phone__c,
            email: broker.Email__c
        }
    }

    findAll() {
        return this.force.query(`SELECT id,
                                   name,
                                   title__c,
                                   picture__c
                            FROM broker__c
                            ORDER BY name
                            LIMIT 50`)
            .then(response => response.records.map(this.prettifyBroker));
    }

    findById(id) {
        return this.force.retrieve('Broker__c', id,
                  `Id,
                  Name,
                  Title__c,
                  Picture__c,
                  Phone__c,
                  Mobile_Phone__c,
                  Email__c`)
            .then(this.prettifyBroker);
    }

}
