///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/jqueryui/jqueryui.d.ts' />
///<reference path='../typings/highcharts/highcharts.d.ts' />
///<reference path='../typings/sprintf/sprintf.d.ts' />
var models;
(function (models) {
    var CountryListModel = (function () {
        function CountryListModel(host) {
            this.countries = ko.observableArray([]);
            this.summaryData = ko.observable(models.CountryData.rows["ALB"]);
            var me = this;
            me.host = host;

            var infos = models.CountryData.rows;
            for (var info in infos) {
                me.countries.push({ name: infos[info][0].CountryName, code: infos[info][0].CountryCode });
            }

            me.summaryDialog = $('#summary').dialog({
                autoOpen: false,
                modal: true,
                height: $(window).height() - 50,
                width: 1000,
                dialogClass: 'noTitleDialog'
            });

            me.showSummary = function (obj, ev) {
                var d = models.CountryData.rows[obj.code];
                me.summaryData(d);
                me.summaryDialog.dialog("open");
            };

            var countryCode = me.getUrlParameter('country');

            if (countryCode != "null") {
                me.showSummary({ code: countryCode }, null);
            }
        }
        CountryListModel.prototype.closeSummary = function (data) {
            data.summaryDialog.dialog('close');
        };

        CountryListModel.prototype.getUrlParameter = function (name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        };
        return CountryListModel;
    })();
    models.CountryListModel = CountryListModel;
})(models || (models = {}));
