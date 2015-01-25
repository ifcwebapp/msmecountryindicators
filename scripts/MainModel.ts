///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/jqueryui/jqueryui.d.ts' />
///<reference path='../typings/googlemaps/google.maps.d.ts' />
///<reference path='../typings/highcharts/highcharts.d.ts' />
///<reference path='./sprintf.d.ts' />

module models {
    export class MainModel {
        map: google.maps.Map;
        bubbles: any[] = [];
        windows: google.maps.InfoWindow[] = [];
        ctaLayer: google.maps.KmlLayer = null;
        host: string;

        //db: TaffyInterface = TAFFY(models.CountryIndicatorData.rows);

        source: KnockoutObservable<number> = ko.observable(0);
        enterprise: KnockoutObservable<string> = ko.observable('MSMEs');
        category: KnockoutObservable<string> = ko.observable('Density');
        year: KnockoutObservable<number> = ko.observable(2010);

        kmlValue: KnockoutObservable<string> = ko.observable('');
        indicatorStyleValue: KnockoutObservable<string> = ko.observable('bubble');
        chartIndicatorValue: KnockoutObservable<string> = ko.observable('Manufacturing');
        bubbleIndicatorValue: KnockoutObservable<string> = ko.observable('Number of Enterprises');
        isChartSelectorVisible: KnockoutObservable<boolean> = ko.observable(false);
        isLegendVisible: KnockoutObservable<boolean> = ko.observable(false);
        //countries: KnockoutObservableArray<any> = ko.observableArray([]);
        countriesAndRegions: KnockoutObservableArray<any> = ko.observableArray([]);
        isExpanded: KnockoutObservable<boolean> = ko.observable(true);
        //selectedValues: KnockoutObservableArray<KnockoutObservable<SummaryItem>> = ko.observableArray<KnockoutObservable<SummaryItem>>();
        //selectedItems: KnockoutObservableArray<KnockoutObservable<SummaryItem>> = ko.observableArray();

        summaryDialog: any;
        summaryType: KnockoutObservable<string> = ko.observable('summary');
        shortPanelText: KnockoutComputed<string>;

        summaryData: KnockoutObservable<any> = ko.observable(models.CountryData.rows["ALB"]);

        linkText: KnockoutObservable<string> = ko.observable('Show link to this page');
        isLinkVisible: KnockoutObservable<boolean> = ko.observable(false);
        link: KnockoutComputed<string>;

        accChart: any;
        srvChart: any;
        srcChart: any;

        

        constructor(host: string) {
            var _this = this;
            
            _this.host = host;
            //var countryParams = [ _this.getUrlParameter('country1'), _this.getUrlParameter('country2'), _this.getUrlParameter('country3')];
            var enterpriseParam = _this.getUrlParameter('enterprise');
            if (enterpriseParam != "null") {
                _this.enterprise(enterpriseParam);
            }
            var sourceParam = _this.getUrlParameter('source');
            if (sourceParam != "null") {
                _this.source(parseInt(sourceParam));
            }
            
            var mapOptions:google.maps.MapOptions = {
                zoom: 3,
                //center: new google.maps.LatLng(45.58329, 12.980347),
                center: new google.maps.LatLng(0.509535, 9.337073),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
                panControl: false,
                zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
                mapTypeControl: false,
                scrollwheel: false,
                minZoom: 1 
            }

            _this.map = new google.maps.Map($('#map-canvas')[0], mapOptions);

            google.maps.event.addListener(_this.map, 'zoom_changed', function () {
                _this.zoomChanged(_this.map);
                });

            _this.getKml();
            _this.initiateBubbles(_this);
            _this.showBubbles(this.map.getZoom(), this.map);

            //_this.countriesAndRegions.push(new SummaryItem(MsmeDevelopingData.rows, CountryIndicatorData.developmentCountries, 'development'));
            //var regionRows = MsmeRegionData.rows;
            //regionRows.sort(function (left, right) { return left[0] == right[0] ? 0 : (left[0] < right[0] ? -1 : 1) });
            //for (var i = 0; i < regionRows.length; i++) {
            //    var c = new SummaryItem(regionRows[i], CountryIndicatorData.regionRows[regionRows[i][0]], 'region');
            //    _this.countriesAndRegions.push(c);
            //}

            //var countryRows = MsmeData.rows;
            //countryRows.sort(function (left, right) { return left[0] == right[0] ? 0 : (left[0] < right[0] ? -1 : 1) });
            //for (var i = 0; i < countryRows.length; i++) {
            //    var c = new SummaryItem(countryRows[i], CountryIndicatorData.rows[countryRows[i][1]], 'country');
            //    //_this.countries.push(c);
            //    _this.countriesAndRegions.push(c);

            //}


            //_this.countries.sort(function (left, right) { return left.Name == right.Name ? 0 : (left.Name < right.Name ? -1 : 1) });
            //_this.countriesAndRegions.sort(function (left, right) { return left.Name == right.Name ? 0 : (left.Name < right.Name ? -1 : 1) });
            
            
            

            $('#scrollablePart').height($(window).height() - 110);
            _this.summaryDialog = $('#summary').dialog({
                autoOpen: false,
                modal: true,
                height: $(window).height() - 50,
                width: 1000,
                dialogClass: 'noTitleDialog'
            });

            ////_this.createCharts(_this);

            //for (var i = 0; i < 3; i++) {
            //    this.selectedValues.push(ko.observable(new SummaryItem(null, null, 'empty')));
            //}

            //if (countryParams[0] != "null") {
            //    _this.showInitSummaryDialog(_this, null, countryParams[0], countryParams[1], countryParams[2]);    
            //}


            _this.shortPanelText = ko.computed(() => {
                var b = _this.bubbleIndicatorValue();
                var c = _this.chartIndicatorValue();
                var k = _this.kmlValue();
                return '<strong>Layer:</strong> ' + $('#colorIndicator option:selected').text() + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Indicator:</strong>' + (!_this.isChartSelectorVisible() ? $('#bubbleIndicator option:selected').text() : $('#chartIndicator option:selected').text());
            });

            _this.link = ko.computed(() => {
                return "";//_this.host + '?country1=' + encodeURIComponent(_this.selectedValues()[0]().Name) + '&country2=' + encodeURIComponent(_this.selectedValues()[1]().Name) + '&country3=' + encodeURIComponent( _this.selectedValues()[2]().Name);
            });
        }

        private getUrlParameter(name) {
            return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
                );
        }

        showLink(data: MainModel) {
            if (data.isLinkVisible()) {
                data.linkText('Show link to this page');
            }
            else {
                data.linkText('Hide');
            }
            data.isLinkVisible(!data.isLinkVisible());
        }

        closeSummary(data: MainModel) {
            data.summaryDialog.dialog('close');
        }

        
        showSummaryDialog(data: MainModel, event: any, country?: string) {

            var d = models.CountryData.rows[country];
            data.summaryData(d);
            //if (country != undefined) {
            //    var c = $.grep(data.countriesAndRegions(), function (e, i) { return e.Name == country });
            //    if (c.length > 0) {
            //        data.selectedValues()[0](c[0]);
            //    }
            //}
            //else {
            //    var c = $.grep(data.countriesAndRegions(), function (e, i) { return e.Name == 'Afghanistan' });
            //    if (c.length > 0) {
            //        data.selectedValues()[0](c[0]);
            //    }
            //}
            //data.summaryType('summary');
            //data.onCountryChange(data, event);
            data.summaryDialog.dialog("open");
            
        }

        

        

        showSelectors() {
            this.isChartSelectorVisible(this.indicatorStyleValue() == "chart");
            
            //if (this.map.getZoom() > 3) {
                this.showBubbles(this.map.getZoom(), this.map);
            //}
        }

        showLegend() {
            $('div[id*="legend"]').hide();
            var val = this.chartIndicatorValue();
            $('div[id="legend' + val + '"]').show();
        }

        expandMenu(data: MainModel) {
            data.isExpanded(!data.isExpanded());
        }

        showBubbles(zoom: number, map: google.maps.Map) {
            //var selector = $('#bubbleIndicator');
            var _this = this;
            
            var isCountry = true;//(zoom > 3);
            var id = this.bubbleIndicatorValue();
            var isBubble = (this.indicatorStyleValue() == "bubble");
            var chartData = this.chartIndicatorValue();
            var alpha: any = {};
            var betta: any = {};
            var scaledZoom = zoom != 3 ? zoom - 3 : 1;
            if (isCountry) {

                switch (id) {
                    case "Number of Enterprises":
                    case "Number of Employees":
                        alpha.index = 5;
                        alpha.value = 50 / 10000;
                        break;
                    case "Density":
                        alpha.index = 5;
                        alpha.value = 1;
                        break;
                    case "Vallue added":
                        alpha.index = 5;
                        alpha.value = 1;
                        break;
                    case "Employment":
                    case "Size Breakdown":
                        alpha.index = 5;
                        alpha.value = 1;
                        break;
                }

                switch (chartData) {
                    case "sectors":
                        betta.index = 22;
                        betta.categories = ['Manufacturing', 'Trade', 'Services', 'Agri/Other'];
                        betta.indexes = [6,7,8,9];
                        break;
                }
            }
            

            for (var i = 0; i < this.bubbles.length; i++) {

                var bubble = this.bubbles[i];

                if (isBubble) {
                    if (bubble.data.Value[id] != undefined && bubble.data.Value[id][_this.source() + _this.enterprise()] != undefined) {
                        var record = bubble.data.Value[id][_this.source() + _this.enterprise()];
                        bubble.setIcon(
                        {
                            path: google.maps.SymbolPath.CIRCLE,
                            fillOpacity: 1,
                            fillColor: '#E6550D',
                            strokeOpacity: 0,
                            scale: alpha.value * Math.sqrt(parseInt(record[13])) + scaledZoom * 4 //pixels

                        });

                        //var bubbleTitle = selectedText + ": " + _this.numberWithCommas(record[13]) + " in " + record[3];
                        //if (selectedText != selectedTextMap) {
                        //    debugger;
                        //    switch (_this.category()) {
                        //        case "PopulationTotal":
                        //            bubbleTitle += ", " + selectedTextMap + ": " + _this.numberWithCommas(record[5]) + " in " + record[3];
                        //        break;
                        //    }
                        //}

                        //bubble.setTitle(bubbleTitle);

                        bubble.setMap(map);
                    } else {
                        bubble.setMap(null);
                    }
                } else {
                    var categoryData = [];
                    for (var j = 0; j < betta.categories.length; j++) {
                        var c = betta.categories[j];
                        try {
                            var d = bubble.data.Value[c][_this.source() + _this.enterprise()];
                            categoryData[j] = { category: c, year: d[3], value: d[13] };
                        } catch (e) {
                            categoryData[j] = { category: c, year: 0, value: 0 };
                        } 
                    }

                    var total = 0;
                    categoryData.forEach((v: any, n: number) => total += v.value);

                    if (categoryData.filter((v: any, n: number) => v.year != 0).length > 0) {
                        var dims = { width: 0, height: 0 };
                        try {
                            dims = CountryIndicatorDataDimensions.rows[_this.source() + _this.enterprise()][bubble.data.Key]["sectors"];    
                        } catch (e) {

                        } 
                        
                        bubble.setIcon(
                            {
                                //url: this.host + "images/" + chartData + "/" + bubble.data[1] + ".png",
                                url: this.host + "images/" + _this.source() + _this.enterprise() + "/" + bubble.data.Key + ".png",
                                //scaledSize: new google.maps.Size(bubble.data[betta.index - 1] / 4 * scaledZoom, bubble.data[betta.index] / 4 * scaledZoom)
                                scaledSize: new google.maps.Size(dims.width / 4 * scaledZoom, dims.height / 4 * scaledZoom)
                            }
                        );
                        //bubble.setTitle(sprintf('%s: %s\n%s: %s\n%s: %s\n%s: %s\n', betta.categories[3], bubble.data[betta.indexes[3]], betta.categories[2], bubble.data[betta.indexes[2]], betta.categories[1], bubble.data[betta.indexes[1]], betta.categories[0], bubble.data[betta.indexes[0]]));
                        var title = '';
                        for (var k = 0; k < betta.categories.length; k++) {
                            title += sprintf('%s: %s\n', betta.categories[k], categoryData[k].year != 0
                                ? categoryData[k].value + "% in " + categoryData[k].year
                                : (total == 100
                                    ? categoryData[k].value + '%'
                                    : 'No data'));
                        }
                        bubble.setTitle(title);
                        bubble.setMap(map);
                    } else {
                        bubble.setMap(null);
                    }

                }
            }
            
        }

        hideBubbles() {
            for (var i = 0; i < this.bubbles.length; i++) {
                var bubble = this.bubbles[i];
                bubble.setMap(null);
            }
        }

        zoomChanged(map: google.maps.Map) {
            var zoomLevel = map.getZoom();
            this.hideBubbles();
            this.showBubbles(zoomLevel, map);
            
        }

        refreshData() {
            this.getKml();
            this.zoomChanged(this.map);
            return true;
        }

        getKml() {
            if (this.ctaLayer != null) {
                this.ctaLayer.setMap(null);
            }
            var kmlName = "";
            if (this.category() == "Density" ||
                this.category() == "Employment" ||
                this.category() == "Vallue added" ||
                this.category() == "Size Breakdown" ||
                this.category() == "Firm Size by Number" ||
                this.category() == "Firm Size by Assets" ||
                this.category() == "Firm Size by Sales") {
                kmlName = this.category() + "_" + this.enterprise() + "_" + this.source() /* + "_" + this.year()*/ + ".kmz?v=1";
                kmlName = kmlName.replace(/\s/g, '_');
            } else {
                kmlName = this.category() + ".kmz";
            }
            this.ctaLayer = new google.maps.KmlLayer(this.host + "kml/" + kmlName, {
                preserveViewport: true,
                screenOverlays: this.isLegendVisible(),
                suppressInfoWindows: true,
                clickable: false
            });
            this.ctaLayer.setMap(this.map);

            return true;
        }

        numberWithCommas(x: any) {
            
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        getCountryInfoModel(info: any, main: MainModel) {
            return new models.MapInfoModel(this.host, main, info);
            
        }

        //getCountryInfo(info: any, main: MainModel) {
        //    var titleReplacements = {
        //        "Number of Enterprises": "Enterprises (absolute #)", "Density": "Enterprises density (per 1000 people)", "Employment": "Employment (% of total)", "Vallue added": "Value added to the economy (% of total)",
        //        "Size Breakdown": "Enterprises (% of total)", "Number of Employees": "Employment (absolute #)"
        //    };

        //    var countryName = models.CountriesInfo.rows[info.Key] != undefined ? models.CountriesInfo.rows[info.Key].Name : info.Key;

        //    var str = "<div style='width: 350px;'><h1 style='white-space:nowrap; float: left; margin:0'>" + countryName + "</h1><a style='float: right' href='country.html?country=" + info.Key + "&source=" + main.source() + "'>Country Page</a><table></div>";
        //    str += "<div class='clear'></div><div><strong>Year: </strong>[Year]</div><div><strong>Source: </strong>[Source]</div>";
        //    //console.log(info[0] + ":" + models.CountryRegionMap.map[info[0]]);
        //    //var rowNum = 1;
        //    var data = models.CountryData.rows[info.Key];

        //    str += "<table style='width: 250px;'><tr><th></th><th>" + main.enterprise() + "</th></tr>";
        //    //str += "<table style='width: 250px;'><tr><th></th><th>Micro</th><th>SMEs</th><th>MSMEs</th></tr>";
        //    var str2 = "<table style='width: 250px;'><tr><th></th><th>" + main.enterprise() + "</th></tr>";

        //    var year = "";
        //    var source = "";
        //    var rowNum = 1;
        //    var enterprise = main.enterprise();
        //    var src = main.source();
        //    //var enterprises = ["Micro", "SMEs", "MSMEs"];
            
        //    for (var key in info.Value) {
        //        var title = titleReplacements[key] != undefined ? titleReplacements[key] : key;
        //        if (key != 'Manufacturing' && key != 'Trade' && key != 'Services' && key != 'Agri/Other') {
        //            str += "<tr class='odd'><td><strong>" + title + "</strong></td>";

        //            var value = info.Value[key][src + enterprise] != undefined ? info.Value[key][src + enterprise][13] : "No data";

        //            if (value != "No data") {
        //                value = main.numberWithCommas(value);
        //                year = info.Value[key][src + enterprise][3];
        //                source = info.Value[key][src + enterprise][6];
        //            }
        //            str += "<td>" + value + "</td>";
        //            str += "</tr>";
        //        } else {
        //            str2 += "<tr class='odd'><td><strong>" + title + "</strong></td>";

        //            var value = info.Value[key][src + enterprise] != undefined ? info.Value[key][src + enterprise][13] : "No data";

        //            if (value != "No data") {
        //                value = main.numberWithCommas(value);
        //                year = info.Value[key][src + enterprise][3];
        //                source = info.Value[key][src + enterprise][6];
        //            }
        //            str2 += "<td>" + value + "</td>";
        //            str2 += "</tr>";
        //        }
        //    }
        //    //str += "<tr class='odd'><td><strong>Enterprises (% of total)</strong></td><td>[Placeholder]</td></tr>";
        //    //str += "<tr class='odd'><td><strong>Employment (absolute #)</strong></td><td>[Placeholder]</td></tr>";
        //    //str += "<tr class='odd'><td><strong>Employment (% of total)</strong></td><td>[Placeholder]</td></tr>";

        //    str = str.replace('[Year]', year);
        //    str = str.replace('[Source]', source);

        //    str += "</table><br/><br/>" + str2 + "</table><br/><br/><a href='javascript:void()' id='srcShow' onclick=\"$('#sources').show();$('#srcShow').hide();$('#srcHide').show();\" >Show data sources</a><a href='javascript:void()' id='srcHide' style='display:none' onclick=\"$('#sources').hide();$('#srcHide').hide();$('#srcShow').show();\" >Hide data sources</a><div id='sources' style='display:none'>[Sources placeholder]</div><br/><br/><br/><br/>";
        //    //if (info[5] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>#MSMEs</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[5]) + "</td></tr>"; }
        //    //if (info[20] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>Total credit gap, US$, millions</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[20]) + "</td></tr>"; }
        //    //if (info[19] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>Total deposit gap, US$, millions</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[19]) + "</td></tr>"; }
        //    //if (info[10] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>Access to finance as major/severe barrier</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[10]) + "%</td></tr>"; }
        //    //if ((info[6] != null) || (info[7] != null) || (info[8] != null) || (info[9] != null)) {
        //    //    str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td colspan=2><strong>Access</strong></td></tr>";
        //    //    if (info[6] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Checking</strong></td><td style='text-align:right'>" + info[6] + "%</td></tr>"; }
        //    //    if (info[7] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Overdraft</strong></td><td style='text-align:right'>" + info[7] + "%</td></tr>"; }
        //    //    if (info[8] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Loan</strong></td><td style='text-align:right'>" + info[8] + "%</td></tr>"; }
        //    //    if (info[9] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Access to Credit</strong></td><td style='text-align:right'>" + info[9] + "%</td></tr>"; }
        //    //}
        //    //if ((info[11] != null) || (info[12] != null) || (info[13] != null) || (info[14] != null)) {
        //    //    str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td colspan=2><strong>How well served?</strong></td></tr>";
        //    //    if (info[11] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Does not need credit</strong></td><td style='text-align:right'>" + info[11] + "%</td></tr>"; }
        //    //    if (info[12] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Unserved</strong></td><td style='text-align:right'>" + info[12] + "%</td></tr>"; }
        //    //    if (info[13] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Underserved</strong></td><td style='text-align:right'>" + info[13] + "%</td></tr>"; }
        //    //    if (info[14] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Well served</strong></td><td style='text-align:right'>" + info[14] + "%</td></tr>"; }
        //    //}
        //    //if ((info[15] != null) || (info[16] != null) || (info[17] != null) || (info[18] != null)) {
        //    //    str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td colspan=2><strong>Source of Financing</strong></td></tr>";
        //    //    if (info[15] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Private Commercial Bank as Source of Financing</strong></td><td style='text-align:right'>" + info[15] + "%</td></tr>"; }
        //    //    if (info[16] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>State-owned Bank and/or Govt. Agency as Source of Financing</strong></td><td style='text-align:right'>" + info[16] + "%</td></tr>"; }
        //    //    if (info[17] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Non-bank Financial Institution as Source of Financing</strong></td><td style='text-align:right'>" + info[17] + "%</td></tr>"; }
        //    //    if (info[18] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Other Source of Financing</strong></td><td style='text-align:right'>" + info[18] + "%</td></tr>"; }
        //    //}
        //    //str += "</table>";

        //    return str;
        //}

        //getRegionInfo(info: any) {
        //    var str = "<h2>" + info[0] + "</h2><a href='#' id='link" + info[1] + "' data-bind='click : function(data, event) { showSummaryDialog(data, event, \"" + info[0] + "\") }'>Show Summary</a><table>";
        //    //console.log(info[0] + ":" + models.CountryRegionMap.map[info[0]]);
        //    var rowNum = 1;
        //    if (info[5] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>#MSMEs</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[5]) + "</td></tr>"; }
        //    if (info[23] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>Total credit gap, US$, millions</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[23]) + "</td></tr>"; }
        //    if (info[25] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>Total deposit gap, US$, millions</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[25]) + "</td></tr>"; }
        //    if (info[10] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>Access to finance as major/severe barrier</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[10]) + "%</td></tr>"; }
        //    if ((info[6] != null) || (info[7] != null) || (info[8] != null) || (info[9] != null)) {
        //        str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td colspan=2><strong>Access</strong></td></tr>";
        //        if (info[6] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Checking</strong></td><td style='text-align:right'>" + info[6] + "%</td></tr>"; }
        //        if (info[7] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Overdraft</strong></td><td style='text-align:right'>" + info[7] + "%</td></tr>"; }
        //        if (info[8] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Loan</strong></td><td style='text-align:right'>" + info[8] + "%</td></tr>"; }
        //        if (info[9] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Access to Credit</strong></td><td style='text-align:right'>" + info[9] + "%</td></tr>"; }
        //    }
        //    if ((info[11] != null) || (info[12] != null) || (info[13] != null) || (info[14] != null)) {
        //        str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td colspan=2><strong>How well served?</strong></td></tr>";
        //        if (info[11] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Does not need credit</strong></td><td style='text-align:right'>" + info[11] + "%</td></tr>"; }
        //        if (info[12] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Unserved</strong></td><td style='text-align:right'>" + info[12] + "%</td></tr>"; }
        //        if (info[13] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Underserved</strong></td><td style='text-align:right'>" + info[13] + "%</td></tr>"; }
        //        if (info[14] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Well served</strong></td><td style='text-align:right'>" + info[14] + "%</td></tr>"; }
        //    }
        //    if ((info[18] != null) || (info[19] != null) || (info[20] != null) || (info[21] != null)) {
        //        str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td colspan=2><strong>Source of Financing</strong></td></tr>";
        //        if (info[18] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Private Commercial Bank as Source of Financing</strong></td><td style='text-align:right'>" + info[18] + "%</td></tr>"; }
        //        if (info[19] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>State-owned Bank and/or Govt. Agency as Source of Financing</strong></td><td style='text-align:right'>" + info[19] + "%</td></tr>"; }
        //        if (info[20] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Non-bank Financial Institution as Source of Financing</strong></td><td style='text-align:right'>" + info[20] + "%</td></tr>"; }
        //        if (info[21] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Other Source of Financing</strong></td><td style='text-align:right'>" + info[21] + "%</td></tr>"; }
        //    }
        //    str += "</table>";
        //    if (info[1] != 'LAAM') {
        //        str = "<div style='height: 200px'>" + str + "</div>";
        //    }
        //    return str;
        //}

        getFirstRecord(record: any, records: any, i: number, yearIndex: number) {
            if (record[i] == null) {
                for (var r in records) {
                    for (var a in records[r]) {
                        if (records[r][a][i] != null) {
                            return { val: records[r][a][i], year: records[r][a][yearIndex]};
                        }
                    }
                }
            } else {
                return { val: record[i], year: record[yearIndex] };
            }

            return { val: record[i], year: record[yearIndex] };
        }

        getRecord(main: MainModel, records: any, id: string, i: number, yearIndex: number) {
            if (records[id] != undefined && records[id][main.source() + main.enterprise()] != undefined) {
                var record = records[id][main.source() + main.enterprise()];
                if (record != undefined) {
                    return { val: record[i], year: record[yearIndex] };
                }
            }

            return { val: null, year: null };
        }

        initiateBubbles(main: MainModel) {
            
            if (this.bubbles.length == 0) {
                for (var i = 0; i < models.CountryIndicatorData.rows.length; i++) {
                    (i => {
                        
                        var info = models.CountryIndicatorData.rows[i];
                        
                        var countryCode = models.CountryIndicatorData.rows[i].Key;
                        var countryInfo = models.CountriesInfo.rows[countryCode];
                        //console.log(countryCode);
                        var bubble = new google.maps.Marker({
                            position: new google.maps.LatLng(countryInfo.Latitude, countryInfo.Longitude),
                            bubbleType: "country",
                            data: info
                            //map: map
                        });



                        var infowindow = new google.maps.InfoWindow({
                            content: ''//main.getCountryInfo(info, main)
                            //maxWidth: 200
                        });

                        google.maps.event.addListener(bubble, 'click', function () {
                            //main.showSummaryDialog(main, null, countryCode);
                            for (var j = 0; j < main.windows.length; j++) {
                                main.windows[j].close();
                            }

                            //main.windows[i].setContent(main.getCountryInfo(info, main));
                            $.get('mapInfo.html', data => {
                                
                                var node = $("#temp");
                                node.html(data);
                                var infoData = $("#infoData");
                                ko.applyBindings(main.getCountryInfoModel(info, main), infoData[0]);
                                var html = node.html();
                                main.windows[i].setContent(html);
                                main.windows[i].open(main.map, main.bubbles[i]);
                                
                            });
                            
                        });

                        google.maps.event.addListener(bubble, 'mouseover', () => {
                            var id = main.bubbleIndicatorValue();
                            var selectedText = $('#bubbleIndicator option:selected').text().trim();
                            var selectedTextMap = $('#category option:selected').text().trim();
                            if (info.Value[id] != undefined && info.Value[id][main.source() + main.enterprise()] != undefined) {
                                var record = info.Value[id][main.source() + main.enterprise()];
                                var bubbleTitle = selectedText + ": " + main.numberWithCommas(record[13]) + " in " + record[3];
                                if (selectedText != selectedTextMap) {
                                    var r = { val: null, year: null };
                                    var postfix = "";
                                    switch (main.category()) {
                                        case "PopulationTotal":
                                            r = main.getFirstRecord(record, info.Value, 5, 3);
                                            break;
                                        case "GNI":
                                            r = main.getFirstRecord(record, info.Value, 4, 3);
                                            break;
                                        case "IncomeGroup":
                                            r = main.getFirstRecord(record, info.Value, 7, 3);
                                            break;
                                        case "Size Breakdown":
                                            r = main.getRecord(main, info.Value, main.category(), 13, 3);
                                            postfix = "%";
                                            break;
                                        case "Density":
                                            r = main.getRecord(main, info.Value, main.category(), 13, 3);
                                            break;
                                        case "Employment":
                                            r = main.getRecord(main, info.Value, main.category(), 13, 3);
                                            break;
                                        case "Vallue added":
                                            r = main.getRecord(main, info.Value, main.category(), 13, 3);
                                            break;
                                        case "Firm Size by Number":
                                            r = main.getRecord(main, info.Value, main.category(), 13, 3);
                                            break;
                                        case "Firm Size by Assets":
                                            r = main.getRecord(main, info.Value, main.category(), 13, 3);
                                            break;
                                        case "Firm Size by Sales":
                                            r = main.getRecord(main, info.Value, main.category(), 13, 3);
                                            break;
                                        case "EnterpriseSurveysChecking":
                                            r = models.AdditionalIndicatorData.EnterpriseSurveysChecking[info.Key];
                                            break;
                                        case "EnterpriseSurveysCredit":
                                            r = models.AdditionalIndicatorData.EnterpriseSurveysCredit[info.Key];
                                            break;
                                        case "StartingBusinessRank":
                                            r = models.AdditionalIndicatorData.StartingBusinessRank[info.Key];
                                            break;
                                        case "DomesticCreditToPrivateSector":
                                            r = models.AdditionalIndicatorData.DomesticCreditToPrivateSector[info.Key];
                                            break;
                                        case "LaborForceTotal":
                                            r = models.AdditionalIndicatorData.LaborForceTotal[info.Key];
                                            break;
                                            
                                    }
                                    if (r != null && r.val != null) {
                                        bubbleTitle += ", " + selectedTextMap + ": " + main.numberWithCommas(r.val) + postfix + (r.year != "" ? " in " + r.year : "");
                                    }
                                }
                                bubble.setTitle(bubbleTitle);
                            }
                            
                        });



                        //google.maps.event.addListener(infowindow, 'domready', function () {
                        //    ko.applyBindings(main, $("#link" + countryCode)[0]);
                        //});

                        main.bubbles.push(bubble);
                        main.windows.push(infowindow);
                    })(i);

                }
            }
            
        }
        
    }
}