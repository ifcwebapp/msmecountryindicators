///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/jqueryui/jqueryui.d.ts' />
///<reference path='../typings/highcharts/highcharts.d.ts' />
///<reference path='./sprintf.d.ts' />

module models {
    export class CountryModel {
        host: string;
        source: KnockoutObservable<number> = ko.observable(0);
        //enterprise: KnockoutObservable<string> = ko.observable('MSMEs');
        noData = 'No data';
        countries: KnockoutObservableArray<any> = ko.observableArray([]);
        showSummary: any;
        summaryDialog: any;
        refreshData: any;
        showSources: any;
        
        isSourcesVisible = ko.observable(true);
        summaryData: KnockoutObservable<any> = ko.observable(models.CountryData.rows["ALB"]);
        name = ko.observable('');

        cats = ['Number of Enterprises', 'Density', 'Employment', 'Vallue added', 'Number of Employees', 'Size Breakdown', 'Manufacturing', 'Trade', 'Agri/Other', 'Services'];

        url = ko.computed(() => {
            return encodeURI('data/MSME Country Indicators - ' + this.name() + ' Summary' + '.xlsx');
        });
        //enterpriseData: KnockoutObservable<any> = ko.observable(null);
        enterpriseDataCommonSource = ko.observable(this.noData);
        enterpriseDataCommonSourceYear = ko.observable(this.noData);
        enterpriseDataCommonSources = ko.observableArray([]);
        enterpriseDataValueAddedSource = ko.observable(this.noData);
        enterpriseDataValueAddedSourceYear = ko.observable(this.noData);
        enterpriseDataValueAddedSources = ko.observableArray([]);

        enterpriseDataEnterpriseCountMicro = ko.observable(this.noData);
        enterpriseDataEnterpriseCountSme = ko.observable(this.noData);
        enterpriseDataEnterpriseCountMsme = ko.observable(this.noData);
        enterpriseDataEnterpriseDensityMicro = ko.observable(this.noData);
        enterpriseDataEnterpriseDensitySme = ko.observable(this.noData);
        enterpriseDataEnterpriseDensityMsme = ko.observable(this.noData);
        enterpriseDataEmploymentPersentMicro = ko.observable(this.noData);
        enterpriseDataEmploymentPersentSme = ko.observable(this.noData);
        enterpriseDataEmploymentPersentMsme = ko.observable(this.noData);

        enterpriseDataEnterprisePersentMicro = ko.observable(this.noData);
        enterpriseDataEnterprisePersentSme = ko.observable(this.noData);
        enterpriseDataEnterprisePersentMsme = ko.observable(this.noData);
        enterpriseDataEmploymentCountMicro = ko.observable(this.noData);
        enterpriseDataEmploymentCountSme = ko.observable(this.noData);
        enterpriseDataEmploymentCountMsme = ko.observable(this.noData);

        enterpriseDataValueAddedMicro = ko.observable(this.noData);
        enterpriseDataValueAddedSme = ko.observable(this.noData);
        enterpriseDataValueAddedMsme = ko.observable(this.noData);

        sectorBreakdownManufacturingMicro = ko.observable(this.noData);
        sectorBreakdownManufacturingSme = ko.observable(this.noData);
        sectorBreakdownManufacturingMsme = ko.observable(this.noData);

        sectorBreakdownTradeMicro = ko.observable(this.noData);
        sectorBreakdownTradeSme = ko.observable(this.noData);
        sectorBreakdownTradeMsme = ko.observable(this.noData);

        sectorBreakdownAgriMicro = ko.observable(this.noData);
        sectorBreakdownAgriSme = ko.observable(this.noData);
        sectorBreakdownAgriMsme = ko.observable(this.noData);

        sectorBreakdownServicesMicro = ko.observable(this.noData);
        sectorBreakdownServicesSme = ko.observable(this.noData);
        sectorBreakdownServicesMsme = ko.observable(this.noData);

        msmeDefinitions = ko.observable([this.noData, this.noData, this.noData, this.noData, this.noData, this.noData, this.noData, this.noData, this.noData]);
        msmeDefinitionSource = ko.observable(this.noData);
        msmeDefinitionSourceYear = ko.observable(this.noData);
        

        showEnterpriseCommonData = ko.computed(() => {
            return  this.enterpriseDataEnterpriseCountMicro() != this.noData ||
                    this.enterpriseDataEnterpriseCountSme() != this.noData ||
                    this.enterpriseDataEnterpriseCountMsme() != this.noData ||
                this.enterpriseDataEnterpriseDensityMicro() != this.noData ||
                this.enterpriseDataEnterpriseDensitySme() != this.noData ||
                this.enterpriseDataEnterpriseDensityMsme() != this.noData ||
                this.enterpriseDataEmploymentPersentMicro() != this.noData ||
                this.enterpriseDataEmploymentPersentSme() != this.noData ||
                this.enterpriseDataEmploymentPersentMsme() != this.noData ||

                this.enterpriseDataEnterprisePersentMicro() != this.noData ||
                this.enterpriseDataEnterprisePersentSme() != this.noData ||
                this.enterpriseDataEnterprisePersentMsme() != this.noData ||
                this.enterpriseDataEmploymentCountMicro() != this.noData ||
                this.enterpriseDataEmploymentCountSme() != this.noData ||
                this.enterpriseDataEmploymentCountMsme() != this.noData;
        });

        showEnterpriseValueAddedData = ko.computed(() => {
            return this.enterpriseDataValueAddedMicro() != this.noData ||
                this.enterpriseDataValueAddedSme() != this.noData ||
                this.enterpriseDataValueAddedMsme() != this.noData;
        });

        constructor(host: string, src: string, cd: string) {
            var me = this;
            me.host = host;

            //var enterpriseParam = me.getUrlParameter('enterprise');
            //if (enterpriseParam != "null") {
            //    me.enterprise(enterpriseParam);
            //}
            
            
            var sourceParam = src != undefined ? src : me.getUrlParameter('source');
            if (sourceParam != "null") {
                me.source(parseInt(sourceParam));
            }

            var infos = models.CountryData.rows;
            for (var info in infos) {
                me.countries.push({ name: infos[info][0].CountryName, code: infos[info][0].CountryCode });
            }

            var getVal = (a: any, pName: string, i: number = 13) => {
                if (a[pName] != null) {
                    return a[pName][i];
                } else {
                    return me.noData;
                }
            };

            var getVal2 = (a: any, source: number, entp: string, i: number = 13) => {
                var pName = source + entp;
                if (a[pName] != null) {
                    return this.numberWithCommas(a[pName][i]);
                } else {
                    if (source != 0 && a[0 + entp] != null && a[0 + entp][0] == source) {
                        return this.numberWithCommas(a[0 + entp][i]);
                    } else {
                        return me.noData;
                    }
                }
            };

            me.showSources = () => {
                me.isSourcesVisible(!me.isSourcesVisible());
            }

            me.showSummary = (obj: any, ev: any) => {
                var d = models.CountryData.rows[obj.code];
                me.summaryData(d);
                var availableSources = [];
                var ed = $.grep(models.CountryIndicatorData.rows, (e: any, i: number) => {
                    return e["Key"] == obj.code;
                });
                if (ed.length > 0) {

                    var val = ed[0]["Value"];
                    
                    for (var c in val) {
                        for (var se in val[c]) {
                            if (availableSources.indexOf(se[0]) < 0 && me.cats.indexOf(c) >= 0) {
                                availableSources.push(se[0]);
                            }
                        }
                        //debugger;
                        if (c != "Vallue added") {
                            var p;
                            for (var first in val[c]) {
                                p = first;
                                break;
                            }
                            me.name(getVal(val[c], p, 2));
                            me.enterpriseDataCommonSource(getVal(val[c], p, 6));
                            me.enterpriseDataCommonSourceYear(getVal(val[c], p, 3));
                            
                        } else {
                            var p;
                            for (var first in val[c]) {
                                p = first;
                                break;
                            }
                            me.enterpriseDataValueAddedSource(getVal(val[c], p, 6));
                            me.enterpriseDataValueAddedSourceYear(getVal(val[c], p, 3));
                        }
                    }

                    var sourceSelect = $("#source");
                    for (var op in sourceSelect[0]) {
                        if (availableSources.indexOf(op) >= 0) {
                            $(sourceSelect[0][op]).removeAttr("disabled");
                        }
                    }

                    if (me.enterpriseDataCommonSource() != me.noData) {
                        var srcs = models.CountryIndicatorSources.rows[obj.code];
                        if (srcs != null) {
                            var src = srcs[me.enterpriseDataCommonSource()];
                            if (src != null) {
                                me.enterpriseDataCommonSources.removeAll();
                                $.each(src["Sources"], (i, e) => {
                                    me.enterpriseDataCommonSources.push(this.urlify(e));
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
                                $.each(src["Sources"], (i, e) => {
                                    me.enterpriseDataValueAddedSources.push(this.urlify(e));
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

                    if (val['Manufacturing'] != null) {
                        var num = val['Manufacturing'];
                        me.sectorBreakdownManufacturingMicro(getVal2(num, me.source(), 'Micro'));
                        me.sectorBreakdownManufacturingSme(getVal2(num, me.source(), 'SMEs'));
                        me.sectorBreakdownManufacturingMsme(getVal2(num, me.source(), 'MSMEs'));
                    }

                    if (val['Trade'] != null) {
                        var num = val['Trade'];
                        me.sectorBreakdownTradeMicro(getVal2(num, me.source(), 'Micro'));
                        me.sectorBreakdownTradeSme(getVal2(num, me.source(), 'SMEs'));
                        me.sectorBreakdownTradeMsme(getVal2(num, me.source(), 'MSMEs'));
                    }

                    if (val['Agri/Other'] != null) {
                        var num = val['Agri/Other'];
                        me.sectorBreakdownAgriMicro(getVal2(num, me.source(), 'Micro'));
                        me.sectorBreakdownAgriSme(getVal2(num, me.source(), 'SMEs'));
                        me.sectorBreakdownAgriMsme(getVal2(num, me.source(), 'MSMEs'));
                    }

                    if (val['Services'] != null) {
                        var num = val['Services'];
                        me.sectorBreakdownServicesMicro(getVal2(num, me.source(), 'Micro'));
                        me.sectorBreakdownServicesSme(getVal2(num, me.source(), 'SMEs'));
                        me.sectorBreakdownServicesMsme(getVal2(num, me.source(), 'MSMEs'));
                    }
                }
            };

            var countryCode = cd != undefined ? cd : me.getUrlParameter('country');

            if (countryCode != "null") {
                me.showSummary({ code: countryCode }, null);
                me.showMsmeDefinitions(countryCode);
            }

            me.refreshData = () => {
                me.showSummary({ code: countryCode }, null);
                me.showMsmeDefinitions(countryCode);
                return true;
            }

            
        }

        showMsmeDefinitions(countryCode: string) {
            this.msmeDefinitions([this.noData, this.noData, this.noData, this.noData, this.noData, this.noData, this.noData, this.noData, this.noData]);
            this.msmeDefinitionSource(this.noData);
            this.msmeDefinitionSourceYear(this.noData);
            var msmeCountryData = models.MsmeDefinitionsData.rows[countryCode];
            if (msmeCountryData[this.source()] != null) {
                var srcData = msmeCountryData[this.source()];
                for (var i = 0; i < srcData.length; i++) {
                    var l = srcData[i];
                    if (l[7] == "Micro") {
                        this.msmeDefinitions()[0] = l[8] != '' ? l[8] : this.noData;
                        this.msmeDefinitions()[1] = l[9] != '' ? l[9] : this.noData;
                        this.msmeDefinitions()[2] = l[10] != '' ? l[10] : this.noData;
                    }
                    if (l[7] == "Small") {
                        this.msmeDefinitions()[3] = l[8] != '' ? l[8] : this.noData;
                        this.msmeDefinitions()[4] = l[9] != '' ? l[9] : this.noData;
                        this.msmeDefinitions()[5] = l[10] != '' ? l[10] : this.noData;
                    }
                    if (l[7] == "Medium") {
                        this.msmeDefinitions()[6] = l[8] != '' ? l[8] : this.noData;
                        this.msmeDefinitions()[7] = l[9] != '' ? l[9] : this.noData;
                        this.msmeDefinitions()[8] = l[10] != '' ? l[10] : this.noData;
                    }

                    this.msmeDefinitionSource(l[4]);
                    this.msmeDefinitionSourceYear(l[3]);
                }
            }

            this.msmeDefinitions.valueHasMutated();
        }

        numberWithCommas(x: any) {

            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        private urlify(text) {
            //var urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
            var urlRegex = /(\b(?:(?:https?|ftp|file|[A-Za-z]+):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$]))/gi;
            return text.replace(urlRegex, (url) => {
                return '<a target="_blank" href="' + url + '">' + url + '</a>';
            });
        }

        private getUrlParameter(name) {
            return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        }
    }
} 