/// <reference path="../typings/tsd.d.ts" />
module models {
    export class MapInfoModel {
        noData = 'No data';
        countryName: string;
        main: MainModel;
        info: any;
        year: number;
        enterpriseDataEnterpriseCount = ko.observable(this.noData);
        enterpriseDataEnterpriseDensity = ko.observable(this.noData);
        enterpriseDataEmploymentPersent = ko.observable(this.noData);
        enterpriseDataEnterprisePersent = ko.observable(this.noData);
        enterpriseDataEmploymentCount = ko.observable(this.noData);
        enterpriseDataValueAdded = ko.observable(this.noData);

        sectorBreakdownManufacturing = ko.observable(this.noData);
        sectorBreakdownTrade = ko.observable(this.noData);
        sectorBreakdownAgri = ko.observable(this.noData);
        sectorBreakdownServices = ko.observable(this.noData);

        enterpriseDataCommonSource = ko.observable(this.noData);
        enterpriseDataCommonSourceYear = ko.observable(this.noData);
        enterpriseDataValueAddedSource = ko.observable(this.noData);
        enterpriseDataValueAddedSourceYear = ko.observable(this.noData);

        showEnterpriseCommonData = ko.computed(() => {
            return this.enterpriseDataEnterpriseCount() != this.noData ||
                this.enterpriseDataEnterpriseDensity() != this.noData ||
                this.enterpriseDataEmploymentPersent() != this.noData ||
                this.enterpriseDataEnterprisePersent() != this.noData ||
                this.enterpriseDataEmploymentCount() != this.noData;
        });

        showEnterpriseValueAddedData = ko.computed(() => {
            return this.enterpriseDataValueAdded() != this.noData;
        });

        showSectorDistributionData = ko.computed(() => {
            return this.sectorBreakdownManufacturing() != this.noData ||
                this.sectorBreakdownTrade() != this.noData ||
            this.sectorBreakdownAgri() != this.noData ||
            this.sectorBreakdownServices() != this.noData;
        });

        constructor(host: string, main: MainModel, info: any) {
            this.info = info;
            this.main = main;
            this.countryName = models.CountriesInfo.rows[info.Key] != undefined ? models.CountriesInfo.rows[info.Key].Name : info.Key;
            this.year = 2010;
            var countryModel = new models.CountryModel(main.host, main.source().toString(), info.Key);
            this.enterpriseDataEnterpriseCount(this.getDataFromCountryModel(countryModel, "enterpriseDataEnterpriseCount", main.enterprise()));
            this.enterpriseDataEnterprisePersent(this.getDataFromCountryModel(countryModel, "enterpriseDataEnterprisePersent", main.enterprise()));
            this.enterpriseDataEnterpriseDensity(this.getDataFromCountryModel(countryModel, "enterpriseDataEnterpriseDensity", main.enterprise()));
            this.enterpriseDataEmploymentCount(this.getDataFromCountryModel(countryModel, "enterpriseDataEmploymentCount", main.enterprise()));
            this.enterpriseDataEmploymentPersent(this.getDataFromCountryModel(countryModel, "enterpriseDataEmploymentPersent", main.enterprise()));
            this.enterpriseDataValueAdded(this.getDataFromCountryModel(countryModel, "enterpriseDataValueAdded", main.enterprise()));

            this.sectorBreakdownManufacturing(this.getDataFromCountryModel(countryModel, "sectorBreakdownManufacturing", main.enterprise()));
            this.sectorBreakdownTrade(this.getDataFromCountryModel(countryModel, "sectorBreakdownTrade", main.enterprise()));
            this.sectorBreakdownAgri(this.getDataFromCountryModel(countryModel, "sectorBreakdownAgri", main.enterprise()));
            this.sectorBreakdownServices(this.getDataFromCountryModel(countryModel, "sectorBreakdownServices", main.enterprise()));

            this.enterpriseDataCommonSource(countryModel.enterpriseDataCommonSource());
            this.enterpriseDataCommonSourceYear(countryModel.enterpriseDataCommonSourceYear());
            this.enterpriseDataValueAddedSource(countryModel.enterpriseDataValueAddedSource());
            this.enterpriseDataValueAddedSourceYear(countryModel.enterpriseDataValueAddedSourceYear());
        }

        getDataFromCountryModel(model: CountryModel, type: string, enterprise: string) {
            switch (type) {
                case "enterpriseDataEnterpriseCount":
                    return this.getDataFromTriplet(
                        model.enterpriseDataEnterpriseCountMicro(),
                        model.enterpriseDataEnterpriseCountSme(),
                        model.enterpriseDataEnterpriseCountMsme(),
                        enterprise);
                case "enterpriseDataEnterprisePersent":
                    return this.getDataFromTriplet(
                        model.enterpriseDataEnterprisePersentMicro(),
                        model.enterpriseDataEnterprisePersentSme(),
                        model.enterpriseDataEnterprisePersentMsme(),
                        enterprise);
                case "enterpriseDataEnterpriseDensity":
                    return this.getDataFromTriplet(
                        model.enterpriseDataEnterpriseDensityMicro(),
                        model.enterpriseDataEnterpriseDensitySme(),
                        model.enterpriseDataEnterpriseDensityMsme(),
                        enterprise);
                case "enterpriseDataEmploymentCount":
                    return this.getDataFromTriplet(
                        model.enterpriseDataEmploymentCountMicro(),
                        model.enterpriseDataEmploymentCountSme(),
                        model.enterpriseDataEmploymentCountMsme(),
                        enterprise);
                case "enterpriseDataEmploymentPersent":
                    return this.getDataFromTriplet(
                        model.enterpriseDataEmploymentPersentMicro(),
                        model.enterpriseDataEmploymentPersentSme(),
                        model.enterpriseDataEmploymentPersentMsme(),
                        enterprise);
                case "enterpriseDataValueAdded":
                    return this.getDataFromTriplet(
                        model.enterpriseDataValueAddedMicro(),
                        model.enterpriseDataValueAddedSme(),
                        model.enterpriseDataValueAddedMsme(),
                        enterprise);
                case "sectorBreakdownManufacturing":
                    return this.getDataFromTriplet(
                        model.sectorBreakdownManufacturingMicro(),
                        model.sectorBreakdownManufacturingSme(),
                        model.sectorBreakdownManufacturingMsme(),
                        enterprise);
                case "sectorBreakdownTrade":
                    return this.getDataFromTriplet(
                        model.sectorBreakdownTradeMicro(),
                        model.sectorBreakdownTradeSme(),
                        model.sectorBreakdownTradeMsme(),
                        enterprise);
                case "sectorBreakdownAgri":
                    return this.getDataFromTriplet(
                        model.sectorBreakdownAgriMicro(),
                        model.sectorBreakdownAgriSme(),
                        model.sectorBreakdownAgriMsme(),
                        enterprise);
                case "sectorBreakdownServices":
                    return this.getDataFromTriplet(
                        model.sectorBreakdownServicesMicro(),
                        model.sectorBreakdownServicesSme(),
                        model.sectorBreakdownServicesMsme(),
                        enterprise);
            }
        }

        getDataFromTriplet(a: string, b: string, c: string, enterprise: string) {
            switch (enterprise) {
                case "Micro":
                    return a;
                case "SMEs":
                    return b;
                case "MSMEs":
                    return c;
            }

            return this.noData;
        }
    }
}