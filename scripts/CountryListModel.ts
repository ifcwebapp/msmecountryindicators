///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/jqueryui/jqueryui.d.ts' />
///<reference path='../typings/highcharts/highcharts.d.ts' />
///<reference path='./sprintf.d.ts' />
///<reference path='arrays.ts' />
///<reference path='knockout-helpers.ts' />
module models {
    export class CountryListModel {
        host: string;
        countries1: KnockoutObservableArray<any> = ko.observableArray([]);
        countries2: KnockoutObservableArray<any> = ko.observableArray([]);
        regions1: KnockoutObservableArray<any> = ko.observableArray([]);
        regions2: KnockoutObservableArray<any> = ko.observableArray([]);
        //map = models.CountryRegionMap.map;
        sortby = ko.observable('Region');
        //showSummary: any;
        //summaryDialog: any;
        //summaryData: KnockoutObservable<any> = ko.observable(models.CountryData.rows["ALB"]);

        constructor(host: string) {
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

            var sorting = (left, right) => {
                return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1);
            };


            regions.sort();
            countries.sort(sorting);
            
            var regions1 = na.removeFirstFewAsMappedLikeOrDie(
                regions,
                region => region.region,
                ['South Asia', 'Middle East & North Africa', 'Sub-Saharan Africa'],
                na.areSame
            );
            var regions2 = na.removeFirstFewAsMappedLikeOrDie(
                regions,
                region => region.region,
                ['Europe & Central Asia', 'East Asia & Pacific', 'Latin America & Caribbean', 'High income: OECD', 'High income: non-OECD'],
                na.areSame
            );

            for (var i = 0; i < regions.length; i++) {
                if (i % 2 == 0) {
                    me.regions1.push(regions[i]);
                } else {
                    me.regions2.push(regions[i]);
                };
            }

            koh.appendFew(me.regions1, regions1);
            koh.appendFew(me.regions2, regions2);

            for (var i = 0; i < countries.length; i++) {
                if (i % 2 == 0) {
                    me.countries1.push(countries[i]);
                } else {
                    me.countries2.push(countries[i]);
                };
            }

            
        }

        

        private getUrlParameter(name) {
            return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        }
    }
}