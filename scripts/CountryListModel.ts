///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/jqueryui/jqueryui.d.ts' />
///<reference path='../typings/highcharts/highcharts.d.ts' />
///<reference path='./sprintf.d.ts' />

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

            for (var i = 0; i < regions.length; i++) {
                if (i % 2 == 0) {
                    me.regions1.push(regions[i]);
                } else {
                    me.regions2.push(regions[i]);
                };
            }

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