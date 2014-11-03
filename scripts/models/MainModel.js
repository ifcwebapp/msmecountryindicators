///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/jqueryui/jqueryui.d.ts' />
///<reference path='../typings/googlemaps/google.maps.d.ts' />
///<reference path='../typings/highcharts/highcharts.d.ts' />
///<reference path='../typings/sprintf/sprintf.d.ts' />
var models;
(function (models) {
    var MainModel = (function () {
        function MainModel(host) {
            this.bubbles = [];
            this.windows = [];
            this.ctaLayer = null;
            this.source = ko.observable(0);
            this.enterprise = ko.observable('Micro');
            this.category = ko.observable('Density');
            this.year = ko.observable(2010);
            this.kmlValue = ko.observable('');
            this.indicatorStyleValue = ko.observable('bubble');
            this.chartIndicatorValue = ko.observable('Manufacturing');
            this.bubbleIndicatorValue = ko.observable('Number of Enterprises');
            this.isChartSelectorVisible = ko.observable(false);
            this.isLegendVisible = ko.observable(false);
            //countries: KnockoutObservableArray<any> = ko.observableArray([]);
            this.countriesAndRegions = ko.observableArray([]);
            this.isExpanded = ko.observable(true);
            this.summaryType = ko.observable('summary');
            this.summaryData = ko.observable(models.CountryData.rows["ALB"]);
            this.linkText = ko.observable('Show link to this page');
            this.isLinkVisible = ko.observable(false);
            var _this = this;

            _this.host = host;
            var countryParams = [_this.getUrlParameter('country1'), _this.getUrlParameter('country2'), _this.getUrlParameter('country3')];

            var mapOptions = {
                zoom: 2,
                center: new google.maps.LatLng(45.58329, 12.980347),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                streetViewControl: false,
                panControl: false,
                zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
                mapTypeControl: false,
                scrollwheel: false,
                minZoom: 1
            };

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
            _this.shortPanelText = ko.computed(function () {
                var b = _this.bubbleIndicatorValue();
                var c = _this.chartIndicatorValue();
                var k = _this.kmlValue();
                return '<strong>Layer:</strong> ' + $('#colorIndicator option:selected').text() + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Indicator:</strong>' + (!_this.isChartSelectorVisible() ? $('#bubbleIndicator option:selected').text() : $('#chartIndicator option:selected').text());
            });

            _this.link = ko.computed(function () {
                return "";
            });
        }
        MainModel.prototype.getUrlParameter = function (name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        };

        MainModel.prototype.showLink = function (data) {
            if (data.isLinkVisible()) {
                data.linkText('Show link to this page');
            } else {
                data.linkText('Hide');
            }
            data.isLinkVisible(!data.isLinkVisible());
        };

        MainModel.prototype.closeSummary = function (data) {
            data.summaryDialog.dialog('close');
        };

        MainModel.prototype.showSummaryDialog = function (data, event, country) {
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
        };

        MainModel.prototype.showSelectors = function () {
            this.isChartSelectorVisible(this.indicatorStyleValue() == "chart");

            //if (this.map.getZoom() > 3) {
            this.showBubbles(this.map.getZoom(), this.map);
            //}
        };

        MainModel.prototype.showLegend = function () {
            $('div[id*="legend"]').hide();
            var val = this.chartIndicatorValue();
            $('div[id="legend' + val + '"]').show();
        };

        MainModel.prototype.expandMenu = function (data) {
            data.isExpanded(!data.isExpanded());
        };

        MainModel.prototype.showBubbles = function (zoom, map) {
            //var selector = $('#bubbleIndicator');
            var _this = this;
            var selectedText = $('#bubbleIndicator option:selected').text().trim();
            var isCountry = true;
            var id = this.bubbleIndicatorValue();
            var isBubble = (this.indicatorStyleValue() == "bubble");
            var chartData = this.chartIndicatorValue();
            var alpha = {};
            var betta = {};
            var scaledZoom = zoom != 3 ? zoom - 3 : 1;
            if (isCountry) {
                switch (id) {
                    case "Number of Enterprises":
                        alpha.index = 5;
                        alpha.value = 50 / 10000;
                        break;
                }

                switch (chartData) {
                    case "sectors":
                        betta.index = 22;
                        betta.categories = ['Manufacturing', 'Trade', 'Services', 'Agri/Other'];
                        betta.indexes = [6, 7, 8, 9];
                        break;
                }
            }

            for (var i = 0; i < this.bubbles.length; i++) {
                var bubble = this.bubbles[i];

                if (isBubble) {
                    if (bubble.data.Value[id] != undefined && bubble.data.Value[id][_this.source() + _this.enterprise()] != undefined) {
                        var record = bubble.data.Value[id][_this.source() + _this.enterprise()];
                        bubble.setIcon({
                            path: google.maps.SymbolPath.CIRCLE,
                            fillOpacity: 1,
                            fillColor: '#E6550D',
                            strokeOpacity: 0,
                            scale: alpha.value * Math.sqrt(parseInt(record[13])) + scaledZoom * 4
                        });

                        bubble.setTitle(selectedText + ": " + _this.numberWithCommas(record[13]) + " in " + record[3]);

                        bubble.setMap(map);
                    } else {
                        bubble.setMap(null);
                    }
                } else {
                    var categoryData = [];
                    for (var j = 0; j < betta.categories.length; j++) {
                        var c = betta.categories[j];
                        try  {
                            var d = bubble.data.Value[c][_this.source() + _this.enterprise()];
                            categoryData[j] = { category: c, year: d[3], value: d[13] };
                        } catch (e) {
                            categoryData[j] = { category: c, year: 0, value: 0 };
                        }
                    }

                    var total = 0;
                    categoryData.forEach(function (v, n) {
                        return total += v.value;
                    });

                    if (categoryData.filter(function (v, n) {
                        return v.year != 0;
                    }).length > 0) {
                        var dims = { width: 0, height: 0 };
                        try  {
                            dims = models.CountryIndicatorDataDimensions.rows[_this.source() + _this.enterprise()][bubble.data.Key]["sectors"];
                        } catch (e) {
                        }

                        bubble.setIcon({
                            //url: this.host + "images/" + chartData + "/" + bubble.data[1] + ".png",
                            url: this.host + "images/" + _this.source() + _this.enterprise() + "/" + bubble.data.Key + ".png",
                            //scaledSize: new google.maps.Size(bubble.data[betta.index - 1] / 4 * scaledZoom, bubble.data[betta.index] / 4 * scaledZoom)
                            scaledSize: new google.maps.Size(dims.width / 4 * scaledZoom, dims.height / 4 * scaledZoom)
                        });

                        //bubble.setTitle(sprintf('%s: %s\n%s: %s\n%s: %s\n%s: %s\n', betta.categories[3], bubble.data[betta.indexes[3]], betta.categories[2], bubble.data[betta.indexes[2]], betta.categories[1], bubble.data[betta.indexes[1]], betta.categories[0], bubble.data[betta.indexes[0]]));
                        var title = '';
                        for (var k = 0; k < betta.categories.length; k++) {
                            title += sprintf('%s: %s\n', betta.categories[k], categoryData[k].year != 0 ? categoryData[k].value + "% in " + categoryData[k].year : (total == 100 ? categoryData[k].value + '%' : 'No data'));
                        }
                        bubble.setTitle(title);
                        bubble.setMap(map);
                    } else {
                        bubble.setMap(null);
                    }
                }
            }
        };

        MainModel.prototype.hideBubbles = function () {
            for (var i = 0; i < this.bubbles.length; i++) {
                var bubble = this.bubbles[i];
                bubble.setMap(null);
            }
        };

        MainModel.prototype.zoomChanged = function (map) {
            var zoomLevel = map.getZoom();
            this.hideBubbles();
            this.showBubbles(zoomLevel, map);
        };

        MainModel.prototype.refreshData = function () {
            this.getKml();
            this.zoomChanged(this.map);
        };

        MainModel.prototype.getKml = function () {
            if (this.ctaLayer != null) {
                this.ctaLayer.setMap(null);
            }

            var kmlName = this.category() + "_" + this.enterprise() + "_" + this.source() + "_" + this.year() + ".kmz";
            kmlName = kmlName.replace(' ', '_');

            this.ctaLayer = new google.maps.KmlLayer(this.host + "kml/" + kmlName, {
                preserveViewport: true,
                screenOverlays: this.isLegendVisible()
            });
            this.ctaLayer.setMap(this.map);

            return true;
        };

        MainModel.prototype.numberWithCommas = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        MainModel.prototype.getCountryInfo = function (info) {
            var str = "<div style='width: 50px; overflow'><h2 style='white-space:nowrap'>" + info.Key + "              </h2></div>";

            //console.log(info[0] + ":" + models.CountryRegionMap.map[info[0]]);
            //var rowNum = 1;
            var data = models.CountryData.rows[info.Key];

            //if (info[5] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>#MSMEs</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[5]) + "</td></tr>"; }
            //if (info[20] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>Total credit gap, US$, millions</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[20]) + "</td></tr>"; }
            //if (info[19] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>Total deposit gap, US$, millions</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[19]) + "</td></tr>"; }
            //if (info[10] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td><strong>Access to finance as major/severe barrier</strong></td><td style='text-align:right'>" + this.numberWithCommas(info[10]) + "%</td></tr>"; }
            //if ((info[6] != null) || (info[7] != null) || (info[8] != null) || (info[9] != null)) {
            //    str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td colspan=2><strong>Access</strong></td></tr>";
            //    if (info[6] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Checking</strong></td><td style='text-align:right'>" + info[6] + "%</td></tr>"; }
            //    if (info[7] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Overdraft</strong></td><td style='text-align:right'>" + info[7] + "%</td></tr>"; }
            //    if (info[8] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Loan</strong></td><td style='text-align:right'>" + info[8] + "%</td></tr>"; }
            //    if (info[9] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Have Access to Credit</strong></td><td style='text-align:right'>" + info[9] + "%</td></tr>"; }
            //}
            //if ((info[11] != null) || (info[12] != null) || (info[13] != null) || (info[14] != null)) {
            //    str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td colspan=2><strong>How well served?</strong></td></tr>";
            //    if (info[11] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Does not need credit</strong></td><td style='text-align:right'>" + info[11] + "%</td></tr>"; }
            //    if (info[12] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Unserved</strong></td><td style='text-align:right'>" + info[12] + "%</td></tr>"; }
            //    if (info[13] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Underserved</strong></td><td style='text-align:right'>" + info[13] + "%</td></tr>"; }
            //    if (info[14] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Well served</strong></td><td style='text-align:right'>" + info[14] + "%</td></tr>"; }
            //}
            //if ((info[15] != null) || (info[16] != null) || (info[17] != null) || (info[18] != null)) {
            //    str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td colspan=2><strong>Source of Financing</strong></td></tr>";
            //    if (info[15] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Private Commercial Bank as Source of Financing</strong></td><td style='text-align:right'>" + info[15] + "%</td></tr>"; }
            //    if (info[16] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>State-owned Bank and/or Govt. Agency as Source of Financing</strong></td><td style='text-align:right'>" + info[16] + "%</td></tr>"; }
            //    if (info[17] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Non-bank Financial Institution as Source of Financing</strong></td><td style='text-align:right'>" + info[17] + "%</td></tr>"; }
            //    if (info[18] != null) { str += "<tr class='" + ((rowNum++) % 2 == 1 ? "odd" : "even") + "' ><td class='shift'><strong>Other Source of Financing</strong></td><td style='text-align:right'>" + info[18] + "%</td></tr>"; }
            //}
            //str += "</table>";
            return str;
        };

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
        MainModel.prototype.initiateBubbles = function (main) {
            if (this.bubbles.length == 0) {
                for (var i = 0; i < models.CountryIndicatorData.rows.length; i++) {
                    (function (i) {
                        var info = models.CountryIndicatorData.rows[i];

                        var countryCode = models.CountryIndicatorData.rows[i].Key;
                        var countryInfo = models.CountriesInfo.rows[countryCode];

                        //console.log(countryCode);
                        var bubble = new google.maps.Marker({
                            position: new google.maps.LatLng(countryInfo.Latitude, countryInfo.Longitude),
                            bubbleType: "country",
                            data: info
                        });

                        var infowindow = new google.maps.InfoWindow({
                            content: main.getCountryInfo(info)
                        });

                        google.maps.event.addListener(bubble, 'click', function () {
                            main.showSummaryDialog(main, null, countryCode);
                            //for (var j = 0; j < main.windows.length; j++) {
                            //    main.windows[j].close();
                            //}
                            //main.windows[i].open(main.map, main.bubbles[i]);
                        });

                        //google.maps.event.addListener(infowindow, 'domready', function () {
                        //    ko.applyBindings(main, $("#link" + info[1])[0]);
                        //});
                        main.bubbles.push(bubble);
                        main.windows.push(infowindow);
                    })(i);
                }
            }
        };
        return MainModel;
    })();
    models.MainModel = MainModel;
})(models || (models = {}));
