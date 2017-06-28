import {Injectable} from '@angular/core';
import {DataService} from 'forcejs';

@Injectable()
export class PropertyService {

    service: any;

    constructor() {
        this.service = DataService.getInstance();
    }

    /*
     Prettify objects returned from Salesservice. This is optional, but it allows us to keep the templates independent
     from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
     */
    prettifyProperty(property) {
        let prettyProperty: any = {
            id: property.Id,
            title: property.Title__c,
            address: property.Address__c,
            city: property.City__c,
            state: property.State__c,
            price: property.Price__c,
            priceFormatted: "$" + property.Price__c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            bedrooms: property.Beds__c,
            bathrooms: property.Baths__c,
            description: property.Description__c,
            picture: property.Picture__c,
            thumbnail: property.Thumbnail__c

        };
        if (property.Location__c) {
            prettyProperty.lat = property.Location__c.latitude;
            prettyProperty.long = property.Location__c.longitude;
        }
        prettyProperty.broker = property.Broker__r ?
        {
            id: property.Broker__r.Id,
            name: property.Broker__r.Name,
            title: property.Broker__r.Title__c,
            picture: property.Broker__r.Picture__c
        } : {};
        return prettyProperty;
    }

    prettifyFavorite(favorite) {
        return {
            id: favorite.Id,
            property: this.prettifyProperty(favorite.Property__r)
        };
    }

    findAll() {
        return this.service.query(`SELECT id,
                                   title__c,
                                   city__c,
                                   state__c,
                                   price__c,
                                   thumbnail__c,
                                   location__c
                            FROM property__c`)
            .then(response => response.records.map(this.prettifyProperty));
    }


    findById(id) {

        this.service.create('AppActivity__c', {
            Name: "Viewed a property",
            Property__c: id,
            User__c: this.service.getUserId()
        });

        return this.service.retrieve('Property__c', id,
            `id,
                                title__c,
                                address__c,
                                city__c,
                                state__c,
                                price__c,
                                picture__c,
                                beds__c,baths__c,
                                description__c,
                                broker__r.Id,
                                broker__r.Name,
                                broker__r.Title__c,
                                broker__r.Picture__c`)
            .then(this.prettifyProperty)
    }

    findByName(key) {
        return this.service.query(`SELECT id,
                                   title__c,
                                   address__c,
                                   city__c,
                                   state__c,
                                   price__c,
                                   thumbnail__c,
                                   location__c
                            FROM property__c 
                            WHERE title__c LIKE '%${key}%'
                            OR city__c LIKE '%${key}%'
                            OR address__c LIKE '%${key}%'`)
            .then(response => response.records.map(this.prettifyProperty));
    }

    getFavorites() {
        return this.service.query(`SELECT id,
                                   Property__r.Id,
                                   Property__r.Title__c,
                                   Property__r.City__c,
                                   Property__r.State__c,
                                   Property__r.Price__c,
                                   Property__r.Thumbnail__c
                            FROM favorite__c
                            WHERE user__c='${this.service.getUserId()}'`)
            .then(response => response.records.map(favorite => this.prettifyFavorite(favorite)));
    }

    favorite(property) {
        this.service.create('AppActivity__c', {
            Name: "Favorited a property",
            Property__c: property.id,
            User__c: this.service.getUserId()
        });

        return this.service.create('Favorite__c', {User__c: this.service.getUserId(), Property__c: property.id});
    }

    unfavorite(favorite) {
        this.service.create('AppActivity__c', {
            Name: "Unfavorited a property",
            Property__c: favorite.id,
            User__c: this.service.getUserId()
        });

        return this.service.del('Favorite__c', favorite.id);
    }

}
