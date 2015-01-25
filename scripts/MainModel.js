var models;
(function (models) {
    var MainModel = (function () {
        function MainModel(host) {
            this.bubbles = [];
            this.windows = [];
            this.ctaLayer = null;
            this.source = ko.observable(0);
            this.enterprise = ko.observable('MSMEs');
            this.category = ko.observable('Density');
            this.year = ko.observable(2010);
            this.kmlValue = ko.observable('');
            this.indicatorStyleValue = ko.observable('bubble');
            this.chartIndicatorValue = ko.observable('Manufacturing');
            this.bubbleIndicatorValue = ko.observable('Number of Enterprises');
            this.isChartSelectorVisible = ko.observable(false);
            this.isLegendVisible = ko.observable(false);
            this.countriesAndRegions = ko.observableArray([]);
            this.isExpanded = ko.observable(true);
            this.summaryType = ko.observable('summary');
            this.summaryData = ko.observable(models.CountryData.rows["ALB"]);
            this.linkText = ko.observable('Show link to this page');
            this.isLinkVisible = ko.observable(false);
            var _this = this;
            _this.host = host;
            var enterpriseParam = _this.getUrlParameter('enterprise');
            if (enterpriseParam != "null") {
                _this.enterprise(enterpriseParam);
            }
            var sourceParam = _this.getUrlParameter('source');
            if (sourceParam != "null") {
                _this.source(parseInt(sourceParam));
            }
            var mapOptions = {
                zoom: 3,
                center: new google.maps.LatLng(0.509535, 9.337073),
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
            $('#scrollablePart').height($(window).height() - 110);
            _this.summaryDialog = $('#summary').dialog({
                autoOpen: false,
                modal: true,
                height: $(window).height() - 50,
                width: 1000,
                dialogClass: 'noTitleDialog'
            });
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
            }
            else {
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
            data.summaryDialog.dialog("open");
        };
        MainModel.prototype.showSelectors = function () {
            this.isChartSelectorVisible(this.indicatorStyleValue() == "chart");
            this.showBubbles(this.map.getZoom(), this.map);
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
            var _this = this;
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
                        bubble.setMap(map);
                    }
                    else {
                        bubble.setMap(null);
                    }
                }
                else {
                    var categoryData = [];
                    for (var j = 0; j < betta.categories.length; j++) {
                        var c = betta.categories[j];
                        try {
                            var d = bubble.data.Value[c][_this.source() + _this.enterprise()];
                            categoryData[j] = { category: c, year: d[3], value: d[13] };
                        }
                        catch (e) {
                            categoryData[j] = { category: c, year: 0, value: 0 };
                        }
                    }
                    var total = 0;
                    categoryData.forEach(function (v, n) { return total += v.value; });
                    if (categoryData.filter(function (v, n) { return v.year != 0; }).length > 0) {
                        var dims = { width: 0, height: 0 };
                        try {
                            dims = models.CountryIndicatorDataDimensions.rows[_this.source() + _this.enterprise()][bubble.data.Key]["sectors"];
                        }
                        catch (e) {
                        }
                        bubble.setIcon({
                            url: this.host + "images/" + _this.source() + _this.enterprise() + "/" + bubble.data.Key + ".png",
                            scaledSize: new google.maps.Size(dims.width / 4 * scaledZoom, dims.height / 4 * scaledZoom)
                        });
                        var title = '';
                        for (var k = 0; k < betta.categories.length; k++) {
                            title += sprintf('%s: %s\n', betta.categories[k], categoryData[k].year != 0 ? categoryData[k].value + "% in " + categoryData[k].year : (total == 100 ? categoryData[k].value + '%' : 'No data'));
                        }
                        bubble.setTitle(title);
                        bubble.setMap(map);
                    }
                    else {
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
            return true;
        };
        MainModel.prototype.getKml = function () {
            if (this.ctaLayer != null) {
                this.ctaLayer.setMap(null);
            }
            var kmlName = "";
            if (this.category() == "Density" || this.category() == "Employment" || this.category() == "Vallue added" || this.category() == "Size Breakdown" || this.category() == "Firm Size by Number" || this.category() == "Firm Size by Assets" || this.category() == "Firm Size by Sales") {
                kmlName = this.category() + "_" + this.enterprise() + "_" + this.source() + ".kmz?v=1";
                kmlName = kmlName.replace(/\s/g, '_');
            }
            else {
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
        };
        MainModel.prototype.numberWithCommas = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
        MainModel.prototype.getCountryInfoModel = function (info, main) {
            return new models.MapInfoModel(this.host, main, info);
        };
        MainModel.prototype.getFirstRecord = function (record, records, i, yearIndex) {
            if (record[i] == null) {
                for (var r in records) {
                    for (var a in records[r]) {
                        if (records[r][a][i] != null) {
                            return { val: records[r][a][i], year: records[r][a][yearIndex] };
                        }
                    }
                }
            }
            else {
                return { val: record[i], year: record[yearIndex] };
            }
            return { val: record[i], year: record[yearIndex] };
        };
        MainModel.prototype.getRecord = function (main, records, id, i, yearIndex) {
            if (records[id] != undefined && records[id][main.source() + main.enterprise()] != undefined) {
                var record = records[id][main.source() + main.enterprise()];
                if (record != undefined) {
                    return { val: record[i], year: record[yearIndex] };
                }
            }
            return { val: null, year: null };
        };
        MainModel.prototype.initiateBubbles = function (main) {
            if (this.bubbles.length == 0) {
                for (var i = 0; i < models.CountryIndicatorData.rows.length; i++) {
                    (function (i) {
                        var info = models.CountryIndicatorData.rows[i];
                        var countryCode = models.CountryIndicatorData.rows[i].Key;
                        var countryInfo = models.CountriesInfo.rows[countryCode];
                        var bubble = new google.maps.Marker({
                            position: new google.maps.LatLng(countryInfo.Latitude, countryInfo.Longitude),
                            bubbleType: "country",
                            data: info
                        });
                        var infowindow = new google.maps.InfoWindow({
                            content: ''
                        });
                        google.maps.event.addListener(bubble, 'click', function () {
                            for (var j = 0; j < main.windows.length; j++) {
                                main.windows[j].close();
                            }
                            $.get('mapInfo.html', function (data) {
                                var node = $("#temp");
                                node.html(data);
                                var infoData = $("#infoData");
                                ko.applyBindings(main.getCountryInfoModel(info, main), infoData[0]);
                                var html = node.html();
                                main.windows[i].setContent(html);
                                main.windows[i].open(main.map, main.bubbles[i]);
                            });
                        });
                        google.maps.event.addListener(bubble, 'mouseover', function () {
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
//# sourceMappingURL=MainModel.js.map