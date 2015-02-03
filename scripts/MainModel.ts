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
        countriesAndRegions: KnockoutObservableArray<any> = ko.observableArray([]);
        isExpanded: KnockoutObservable<boolean> = ko.observable(true);

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
            var enterpriseParam = _this.getUrlParameter('enterprise');
            if (enterpriseParam != "null") {
                _this.enterprise(enterpriseParam);
            }
            var sourceParam = _this.getUrlParameter('source');
            if (sourceParam != "null") {
                _this.source(parseInt(sourceParam));
            }

            var mapOptions: google.maps.MapOptions = {
                zoom: 3,
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

            $('#scrollablePart').height($(window).height() - 110);
            _this.summaryDialog = $('#summary').dialog({
                autoOpen: false,
                modal: true,
                height: $(window).height() - 50,
                width: 1000,
                dialogClass: 'noTitleDialog'
            });

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

            var _this = this;

            var isCountry = true;
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
                        betta.indexes = [6, 7, 8, 9];
                        break;
                }
            }


            for (var i = 0; i < this.bubbles.length; i++) {
                var info = models.CountryIndicatorData.rows[i];
                var bubble = this.bubbles[i];
                this.updateBubbleTitle(_this, info, bubble);

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

        updateBubbleTitle(main: MainModel, info: any, bubble: google.maps.Marker) {
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

        getFirstRecord(record: any, records: any, i: number, yearIndex: number) {
            if (record[i] == null) {
                for (var r in records) {
                    for (var a in records[r]) {
                        if (records[r][a][i] != null) {
                            return { val: records[r][a][i], year: records[r][a][yearIndex] };
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
                            var countryPageUrl = 'country.html?country=' + info.Key + '&source=' + main.source();
                            openUrlInNewWindow(countryPageUrl);
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

    function openUrlInNewWindow(url: string): void {
        var a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}