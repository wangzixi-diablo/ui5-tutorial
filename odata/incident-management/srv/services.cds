using { sap.test.incidents as model } from '../db/schema';


service ProcessorService { 
    entity Incidents as projection on model.Incidents;

    @readonly
    entity Customers as projection on model.Customers;
}


service AdminService {
    entity Customers as projection on model.Customers;
    entity Incidents as projection on model.Incidents;
    }