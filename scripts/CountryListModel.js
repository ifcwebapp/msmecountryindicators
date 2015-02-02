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
            var regions = nm.toArray(models.CountryRegionMap.map, function (region, regionName) { return ({
                region: regionName,
                countries: nm.toArray(region, function (countryName, countryCode) { return ({
                    name: countryName,
                    code: countryCode,
                    url: encodeURI('data/MSME Country Indicators - ' + countryName + ' Summary' + '.xlsx')
                }); }),
                url: encodeURI('data/MSME Country Indicators - ' + regionName + ' Summary' + '.xlsx')
            }); });
            var countries = na.mapConcat(regions, function (region) { return region.countries; });
            var map = models.CountryRegionMap.map;
            var sorting = function (left, right) {
                return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1);
            };
            regions.sort();
            countries.sort(sorting);
            var grouppedCountries = nm.toArray(nm.toLookup(countries, function (country) { return nt.toFirstLetterOrDie(country.name, 'Unable to group country by the first letter of their names.'); }, function () { return []; }), function (countries, firstLetter) { return ({
                letter: firstLetter,
                countries: countries
            }); });
            var totalCountriesCount = na.fold(grouppedCountries, 0, function (group, result) { return group.countries.length + result; });
            var choppedGrouppedCountries = nc.map(na.fold(grouppedCountries, { count: 0, current: [], final: [] }, function (group, draft) { return draft.count + group.countries.length > totalCountriesCount / 1.8 ? ({ count: group.countries.length, current: [group], final: na.append(draft.final, draft.current) }) : ({ count: draft.count + group.countries.length, current: na.append(draft.current, group), final: draft.final }); }), function (draft) { return na.append(draft.final, draft.current); });
            koh.appendFew(me.regions1, na.removeFirstFewAsMappedLikeUnsafe(regions, function (region) { return region.region; }, ['South Asia', 'Middle East & North Africa', 'Sub-Saharan Africa'], na.areSame));
            koh.appendFew(me.regions2, na.removeFirstFewAsMappedLikeUnsafe(regions, function (region) { return region.region; }, ['Europe & Central Asia', 'East Asia & Pacific', 'Latin America & Caribbean', 'High income: OECD', 'High income: non-OECD'], na.areSame));
            koh.appendFew(me.countries1, choppedGrouppedCountries[0]);
            koh.appendFew(me.countries2, choppedGrouppedCountries[1]);
        }
        CountryListModel.prototype.getUrlParameter = function (name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        };
        return CountryListModel;
    })();
    models.CountryListModel = CountryListModel;
})(models || (models = {}));
//# sourceMappingURL=CountryListModel.js.map