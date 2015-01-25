var models;
(function (models) {
    var MapInfoModel = (function () {
        function MapInfoModel(host, main, info) {
            var _this = this;
            this.noData = 'No data';
            this.enterpriseDataEnterpriseCount = ko.observable(this.noData);
            this.enterpriseDataEnterpriseDensity = ko.observable(this.noData);
            this.enterpriseDataEmploymentPersent = ko.observable(this.noData);
            this.enterpriseDataEnterprisePersent = ko.observable(this.noData);
            this.enterpriseDataEmploymentCount = ko.observable(this.noData);
            this.enterpriseDataValueAdded = ko.observable(this.noData);
            this.sectorBreakdownManufacturing = ko.observable(this.noData);
            this.sectorBreakdownTrade = ko.observable(this.noData);
            this.sectorBreakdownAgri = ko.observable(this.noData);
            this.sectorBreakdownServices = ko.observable(this.noData);
            this.enterpriseDataCommonSource = ko.observable(this.noData);
            this.enterpriseDataCommonSourceYear = ko.observable(this.noData);
            this.enterpriseDataValueAddedSource = ko.observable(this.noData);
            this.enterpriseDataValueAddedSourceYear = ko.observable(this.noData);
            this.showEnterpriseCommonData = ko.computed(function () {
                return _this.enterpriseDataEnterpriseCount() != _this.noData || _this.enterpriseDataEnterpriseDensity() != _this.noData || _this.enterpriseDataEmploymentPersent() != _this.noData || _this.enterpriseDataEnterprisePersent() != _this.noData || _this.enterpriseDataEmploymentCount() != _this.noData;
            });
            this.showEnterpriseValueAddedData = ko.computed(function () {
                return _this.enterpriseDataValueAdded() != _this.noData;
            });
            this.showSectorDistributionData = ko.computed(function () {
                return _this.sectorBreakdownManufacturing() != _this.noData || _this.sectorBreakdownTrade() != _this.noData || _this.sectorBreakdownAgri() != _this.noData || _this.sectorBreakdownServices() != _this.noData;
            });
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
        MapInfoModel.prototype.getDataFromCountryModel = function (model, type, enterprise) {
            switch (type) {
                case "enterpriseDataEnterpriseCount":
                    return this.getDataFromTriplet(model.enterpriseDataEnterpriseCountMicro(), model.enterpriseDataEnterpriseCountSme(), model.enterpriseDataEnterpriseCountMsme(), enterprise);
                case "enterpriseDataEnterprisePersent":
                    return this.getDataFromTriplet(model.enterpriseDataEnterprisePersentMicro(), model.enterpriseDataEnterprisePersentSme(), model.enterpriseDataEnterprisePersentMsme(), enterprise);
                case "enterpriseDataEnterpriseDensity":
                    return this.getDataFromTriplet(model.enterpriseDataEnterpriseDensityMicro(), model.enterpriseDataEnterpriseDensitySme(), model.enterpriseDataEnterpriseDensityMsme(), enterprise);
                case "enterpriseDataEmploymentCount":
                    return this.getDataFromTriplet(model.enterpriseDataEmploymentCountMicro(), model.enterpriseDataEmploymentCountSme(), model.enterpriseDataEmploymentCountMsme(), enterprise);
                case "enterpriseDataEmploymentPersent":
                    return this.getDataFromTriplet(model.enterpriseDataEmploymentPersentMicro(), model.enterpriseDataEmploymentPersentSme(), model.enterpriseDataEmploymentPersentMsme(), enterprise);
                case "enterpriseDataValueAdded":
                    return this.getDataFromTriplet(model.enterpriseDataValueAddedMicro(), model.enterpriseDataValueAddedSme(), model.enterpriseDataValueAddedMsme(), enterprise);
                case "sectorBreakdownManufacturing":
                    return this.getDataFromTriplet(model.sectorBreakdownManufacturingMicro(), model.sectorBreakdownManufacturingSme(), model.sectorBreakdownManufacturingMsme(), enterprise);
                case "sectorBreakdownTrade":
                    return this.getDataFromTriplet(model.sectorBreakdownTradeMicro(), model.sectorBreakdownTradeSme(), model.sectorBreakdownTradeMsme(), enterprise);
                case "sectorBreakdownAgri":
                    return this.getDataFromTriplet(model.sectorBreakdownAgriMicro(), model.sectorBreakdownAgriSme(), model.sectorBreakdownAgriMsme(), enterprise);
                case "sectorBreakdownServices":
                    return this.getDataFromTriplet(model.sectorBreakdownServicesMicro(), model.sectorBreakdownServicesSme(), model.sectorBreakdownServicesMsme(), enterprise);
            }
        };
        MapInfoModel.prototype.getDataFromTriplet = function (a, b, c, enterprise) {
            switch (enterprise) {
                case "Micro":
                    return a;
                case "SMEs":
                    return b;
                case "MSMEs":
                    return c;
            }
            return this.noData;
        };
        return MapInfoModel;
    })();
    models.MapInfoModel = MapInfoModel;
})(models || (models = {}));
//# sourceMappingURL=MapInfoModel.js.map