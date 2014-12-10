///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/jqueryui/jqueryui.d.ts' />
///<reference path='../typings/highcharts/highcharts.d.ts' />
///<reference path='../typings/sprintf/sprintf.d.ts' />
var models;
(function (models) {
    var CountryModel = (function () {
        function CountryModel(host) {
            var _this = this;
            this.source = ko.observable(0);
            //enterprise: KnockoutObservable<string> = ko.observable('MSMEs');
            this.noData = 'No data';
            this.countries = ko.observableArray([]);
            this.isSourcesVisible = ko.observable(false);
            this.summaryData = ko.observable(models.CountryData.rows["ALB"]);
            //enterpriseData: KnockoutObservable<any> = ko.observable(null);
            this.enterpriseDataCommonSource = ko.observable(this.noData);
            this.enterpriseDataCommonSources = ko.observableArray([]);
            this.enterpriseDataValueAddedSource = ko.observable(this.noData);
            this.enterpriseDataValueAddedSources = ko.observableArray([]);
            this.enterpriseDataEnterpriseCountMicro = ko.observable(this.noData);
            this.enterpriseDataEnterpriseCountSme = ko.observable(this.noData);
            this.enterpriseDataEnterpriseCountMsme = ko.observable(this.noData);
            this.enterpriseDataEnterpriseDensityMicro = ko.observable(this.noData);
            this.enterpriseDataEnterpriseDensitySme = ko.observable(this.noData);
            this.enterpriseDataEnterpriseDensityMsme = ko.observable(this.noData);
            this.enterpriseDataEmploymentPersentMicro = ko.observable(this.noData);
            this.enterpriseDataEmploymentPersentSme = ko.observable(this.noData);
            this.enterpriseDataEmploymentPersentMsme = ko.observable(this.noData);
            this.enterpriseDataEnterprisePersentMicro = ko.observable(this.noData);
            this.enterpriseDataEnterprisePersentSme = ko.observable(this.noData);
            this.enterpriseDataEnterprisePersentMsme = ko.observable(this.noData);
            this.enterpriseDataEmploymentCountMicro = ko.observable(this.noData);
            this.enterpriseDataEmploymentCountSme = ko.observable(this.noData);
            this.enterpriseDataEmploymentCountMsme = ko.observable(this.noData);
            this.enterpriseDataValueAddedMicro = ko.observable(this.noData);
            this.enterpriseDataValueAddedSme = ko.observable(this.noData);
            this.enterpriseDataValueAddedMsme = ko.observable(this.noData);
            this.showEnterpriseCommonData = ko.computed(function () {
                return _this.enterpriseDataEnterpriseCountMicro() != _this.noData || _this.enterpriseDataEnterpriseCountSme() != _this.noData || _this.enterpriseDataEnterpriseCountMsme() != _this.noData || _this.enterpriseDataEnterpriseDensityMicro() != _this.noData || _this.enterpriseDataEnterpriseDensitySme() != _this.noData || _this.enterpriseDataEnterpriseDensityMsme() != _this.noData || _this.enterpriseDataEmploymentPersentMicro() != _this.noData || _this.enterpriseDataEmploymentPersentSme() != _this.noData || _this.enterpriseDataEmploymentPersentMsme() != _this.noData || _this.enterpriseDataEnterprisePersentMicro() != _this.noData || _this.enterpriseDataEnterprisePersentSme() != _this.noData || _this.enterpriseDataEnterprisePersentMsme() != _this.noData || _this.enterpriseDataEmploymentCountMicro() != _this.noData || _this.enterpriseDataEmploymentCountSme() != _this.noData || _this.enterpriseDataEmploymentCountMsme() != _this.noData;
            });
            this.showEnterpriseValueAddedData = ko.computed(function () {
                return _this.enterpriseDataValueAddedMicro() != _this.noData || _this.enterpriseDataValueAddedSme() != _this.noData || _this.enterpriseDataValueAddedMsme() != _this.noData;
            });
            var me = this;
            me.host = host;

            //var enterpriseParam = me.getUrlParameter('enterprise');
            //if (enterpriseParam != "null") {
            //    me.enterprise(enterpriseParam);
            //}
            var sourceParam = me.getUrlParameter('source');
            if (sourceParam != "null") {
                me.source(parseInt(sourceParam));
            }

            var infos = models.CountryData.rows;
            for (var info in infos) {
                me.countries.push({ name: infos[info][0].CountryName, code: infos[info][0].CountryCode });
            }

            var getVal = function (a, pName, i) {
                if (typeof i === "undefined") { i = 13; }
                if (a[pName] != null) {
                    return a[pName][i];
                } else {
                    return me.noData;
                }
            };

            var getVal2 = function (a, source, entp, i) {
                if (typeof i === "undefined") { i = 13; }
                var pName = source + entp;
                if (a[pName] != null) {
                    return _this.numberWithCommas(a[pName][i]);
                } else {
                    if (source != 0 && a[0 + entp] != null && a[0 + entp][0] == source) {
                        return _this.numberWithCommas(a[0 + entp][i]);
                    } else {
                        return me.noData;
                    }
                }
            };

            me.showSources = function () {
                me.isSourcesVisible(!me.isSourcesVisible());
            };

            me.showSummary = function (obj, ev) {
                var d = models.CountryData.rows[obj.code];
                me.summaryData(d);
                var ed = $.grep(models.CountryIndicatorData.rows, function (e, i) {
                    return e["Key"] == obj.code;
                });
                if (ed.length > 0) {
                    var val = ed[0]["Value"];
                    for (var c in val) {
                        if (c != "Vallue added") {
                            var p;
                            for (var first in val[c]) {
                                p = first;
                                break;
                            }
                            me.enterpriseDataCommonSource(getVal(val[c], p, 6));
                        } else {
                            var p;
                            for (var first in val[c]) {
                                p = first;
                                break;
                            }
                            me.enterpriseDataValueAddedSource(getVal(val[c], p, 6));
                        }
                    }

                    if (me.enterpriseDataCommonSource() != me.noData) {
                        var srcs = models.CountryIndicatorSources.rows[obj.code];
                        if (srcs != null) {
                            var src = srcs[me.enterpriseDataCommonSource()];
                            if (src != null) {
                                me.enterpriseDataCommonSources.removeAll();
                                $.each(src["Sources"], function (i, e) {
                                    me.enterpriseDataCommonSources.push(_this.urlify(e));
                                });
                            }
                        }
                    }

                    if (me.enterpriseDataValueAddedSource() != me.noData && me.enterpriseDataValueAddedSource() != me.enterpriseDataCommonSource()) {
                        var srcs = models.CountryIndicatorSources.rows[obj.code];
                        if (srcs != null) {
                            var src = srcs[me.enterpriseDataValueAddedSource()];
                            if (src != null) {
                                me.enterpriseDataValueAddedSources.removeAll();
                                $.each(src["Sources"], function (i, e) {
                                    me.enterpriseDataValueAddedSources.push(_this.urlify(e));
                                });
                                //me.enterpriseDataValueAddedSources.push(src["Sources"]);
                            }
                        }
                    }

                    if (val['Number of Enterprises'] != null) {
                        var num = val['Number of Enterprises'];
                        me.enterpriseDataEnterpriseCountMicro(getVal2(num, me.source(), 'Micro'));
                        me.enterpriseDataEnterpriseCountSme(getVal2(num, me.source(), 'SMEs'));
                        me.enterpriseDataEnterpriseCountMsme(getVal2(num, me.source(), 'MSMEs'));
                    }

                    if (val['Density'] != null) {
                        var num = val['Density'];
                        me.enterpriseDataEnterpriseDensityMicro(getVal2(num, me.source(), 'Micro'));
                        me.enterpriseDataEnterpriseDensitySme(getVal2(num, me.source(), 'SMEs'));
                        me.enterpriseDataEnterpriseDensityMsme(getVal2(num, me.source(), 'MSMEs'));
                    }

                    if (val['Employment'] != null) {
                        var num = val['Employment'];
                        me.enterpriseDataEmploymentPersentMicro(getVal2(num, me.source(), 'Micro'));
                        me.enterpriseDataEmploymentPersentSme(getVal2(num, me.source(), 'SMEs'));
                        me.enterpriseDataEmploymentPersentMsme(getVal2(num, me.source(), 'MSMEs'));
                    }

                    if (val['Vallue added'] != null) {
                        var num = val['Vallue added'];
                        me.enterpriseDataValueAddedMicro(getVal2(num, me.source(), 'Micro'));
                        me.enterpriseDataValueAddedSme(getVal2(num, me.source(), 'SMEs'));
                        me.enterpriseDataValueAddedMsme(getVal2(num, me.source(), 'MSMEs'));
                    }

                    if (val['Number of Employees'] != null) {
                        var num = val['Number of Employees'];
                        me.enterpriseDataEmploymentCountMicro(getVal2(num, me.source(), 'Micro'));
                        me.enterpriseDataEmploymentCountSme(getVal2(num, me.source(), 'SMEs'));
                        me.enterpriseDataEmploymentCountMsme(getVal2(num, me.source(), 'MSMEs'));
                    }

                    if (val['Size Breakdown'] != null) {
                        var num = val['Size Breakdown'];
                        me.enterpriseDataEnterprisePersentMicro(getVal2(num, me.source(), 'Micro'));
                        me.enterpriseDataEnterprisePersentSme(getVal2(num, me.source(), 'SMEs'));
                        me.enterpriseDataEnterprisePersentMsme(getVal2(num, me.source(), 'MSMEs'));
                    }
                }
            };

            var countryCode = me.getUrlParameter('country');

            if (countryCode != "null") {
                me.showSummary({ code: countryCode }, null);
            }

            me.refreshData = function () {
                me.showSummary({ code: countryCode }, null);
                return true;
            };
        }
        CountryModel.prototype.numberWithCommas = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        CountryModel.prototype.urlify = function (text) {
            //var urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
            var urlRegex = /(\b(?:(?:https?|ftp|file|[A-Za-z]+):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$]))/gi;
            return text.replace(urlRegex, function (url) {
                return '<a target="_blank" href="' + url + '">' + url + '</a>';
            });
        };

        CountryModel.prototype.getUrlParameter = function (name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        };
        return CountryModel;
    })();
    models.CountryModel = CountryModel;
})(models || (models = {}));
