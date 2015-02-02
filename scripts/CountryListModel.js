var models;
(function (models) {
    var CountryListModel = (function () {
        function CountryListModel(host) {
            this.countries1 = ko.observableArray([]);
            this.countries2 = ko.observableArray([]);
            this.regions1 = ko.observableArray([]);
            this.regions2 = ko.observableArray([]);
            this.sortby = ko.observable('Region');
            var me = this;
            me.host = host;
            var regions = [];
            var countries = [];
            var map = models.CountryRegionMap.map;
            var regionIndex = 0;
            for (var region in map) {
                regionIndex++;
                var regionCountries = [];
                regions.push({ region: region, countries: regionCountries, url: encodeURI('data/MSME Country Indicators - ' + region + ' Summary' + '.xlsx') });
                var ctrs = map[region];
                for (var c in ctrs) {
                    countries.push({ name: ctrs[c], code: c, url: encodeURI('data/MSME Country Indicators - ' + ctrs[c] + ' Summary' + '.xlsx') });
                    regionCountries.push({ name: ctrs[c], code: c, url: encodeURI('data/MSME Country Indicators - ' + ctrs[c] + ' Summary' + '.xlsx') });
                }
            }
            var sorting = function (left, right) {
                return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1);
            };
            regions.sort();
            countries.sort(sorting);
            var regions1 = na.removeFirstFewAsMappedLikeOrDie(regions, function (region) { return region.region; }, ['South Asia', 'Middle East & North Africa', 'Sub-Saharan Africa'], na.areSame);
            var regions2 = na.removeFirstFewAsMappedLikeOrDie(regions, function (region) { return region.region; }, ['Europe & Central Asia', 'East Asia & Pacific', 'Latin America & Caribbean', 'High income: OECD', 'High income: non-OECD'], na.areSame);
            for (var i = 0; i < regions.length; i++) {
                if (i % 2 == 0) {
                    me.regions1.push(regions[i]);
                }
                else {
                    me.regions2.push(regions[i]);
                }
                ;
            }
            koh.appendFew(me.regions1, regions1);
            koh.appendFew(me.regions2, regions2);
            for (var i = 0; i < countries.length; i++) {
                if (i % 2 == 0) {
                    me.countries1.push(countries[i]);
                }
                else {
                    me.countries2.push(countries[i]);
                }
                ;
            }
        }
        CountryListModel.prototype.getUrlParameter = function (name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        };
        return CountryListModel;
    })();
    models.CountryListModel = CountryListModel;
})(models || (models = {}));
//# sourceMappingURL=CountryListModel.js.map