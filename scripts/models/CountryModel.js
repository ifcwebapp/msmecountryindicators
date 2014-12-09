///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/jqueryui/jqueryui.d.ts' />
///<reference path='../typings/highcharts/highcharts.d.ts' />
///<reference path='../typings/sprintf/sprintf.d.ts' />
var models;
(function (models) {
    var CountryModel = (function () {
        function CountryModel(host) {
            this.source = ko.observable(0);
            this.enterprise = ko.observable('MSMEs');
            this.countries = ko.observableArray([]);
            this.summaryData = ko.observable(models.CountryData.rows["ALB"]);
            var me = this;
            me.host = host;

            var enterpriseParam = me.getUrlParameter('enterprise');
            if (enterpriseParam != "null") {
                me.enterprise(enterpriseParam);
            }
            var sourceParam = me.getUrlParameter('source');
            if (sourceParam != "null") {
                me.source(parseInt(sourceParam));
            }

            var infos = models.CountryData.rows;
            for (var info in infos) {
                me.countries.push({ name: infos[info][0].CountryName, code: infos[info][0].CountryCode });
            }

            me.showSummary = function (obj, ev) {
                var d = models.CountryData.rows[obj.code];
                me.summaryData(d);
            };

            var countryCode = me.getUrlParameter('country');

            if (countryCode != "null") {
                me.showSummary({ code: countryCode }, null);
            }

            me.refreshData = function () {
                return true;
            };
        }
        CountryModel.prototype.getUrlParameter = function (name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        };
        return CountryModel;
    })();
    models.CountryModel = CountryModel;
})(models || (models = {}));
