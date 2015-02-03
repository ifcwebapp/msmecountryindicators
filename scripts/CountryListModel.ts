///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='../typings/jquery/jquery.d.ts' />
///<reference path='../typings/jqueryui/jqueryui.d.ts' />
///<reference path='../typings/highcharts/highcharts.d.ts' />
///<reference path='./sprintf.d.ts' />
///<reference path='core.ts' />
///<reference path='arrays.ts' />
///<reference path='maps.ts' />
///<reference path='text.ts' />
///<reference path='knockout-helpers.ts' />

module models {
    export interface Country {
        name: string;
        code: string;
        url: string
    }
    export interface CountriesByLetter {
        letter: string;
        countries: Country[];
    }
    export class CountryListModel {
        host: string;
        countries1: KnockoutObservableArray<any> = ko.observableArray([]);
        countries2: KnockoutObservableArray<any> = ko.observableArray([]);
        regions: KnockoutObservableArray<any[][]> = ko.observableArray(<any[][][]>[]); // regions x columns x blocks
        sortby = ko.observable('Region');

        constructor(host: string) {
            var me = this;
            me.host = host;

            var regions = nm.toArray(
                models.CountryRegionMap.map,
                (region, regionName) => ({
                    region: regionName,
                    countries: nm.toArray(
                        region,
                        (countryName, countryCode) => ({
                            name: countryName,
                            code: countryCode,
                            url: encodeURI('data/MSME Country Indicators - ' + countryName + ' Summary' + '.xlsx')
                        })
                    ),
                    url: encodeURI('data/MSME Country Indicators - ' + regionName + ' Summary' + '.xlsx')
                })
            );
            var countries = na.mapConcat(regions, region => region.countries);
            
            var map = models.CountryRegionMap.map;

            var sorting = (left, right) => {
                return left.name == right.name ? 0 : (left.name < right.name ? -1 : 1);
            };


            regions.sort();
            countries.sort(sorting);
            
            var grouppedCountries : CountriesByLetter[] = nm.toArray(
                nm.toLookup(
                    countries,
                    country => nt.toFirstLetterOrDie(country.name, 'Unable to group country by the first letter of their names.'),
                    () => <Country[]>[]
                ),
                (countries, firstLetter) => ({
                    letter: firstLetter,
                    countries: countries
                })
            );

            var totalCountriesCount = na.fold(grouppedCountries, 0, (group, result) => group.countries.length + result);
            var choppedGrouppedCountries = nc.map(na.fold(
                grouppedCountries,
                { count: 0, current: <CountriesByLetter[]> [], final: <CountriesByLetter[][]>[] },
                (group, draft) => draft.count + group.countries.length > totalCountriesCount / 1.8
                    ? ({ count: group.countries.length, current: [group], final: na.append(draft.final, draft.current) })
                    : ({ count: draft.count + group.countries.length, current: na.append(draft.current, group), final: draft.final })
            ), draft => na.append(draft.final, draft.current));

            // top 2 columns of regions
            me.regions.push([
                na.removeFirstFewAsMappedLikeUnsafe(
                    regions,
                    region => region.region,
                    ['South Asia', 'Middle East & North Africa', 'Sub-Saharan Africa', 'East Asia & Pacific'],
                    na.areSame
                ),
                na.removeFirstFewAsMappedLikeUnsafe(
                    regions,
                    region => region.region,
                    ['Europe & Central Asia', 'Latin America & Caribbean'],
                    na.areSame
                )
            ]);

            // bottom 2 columns of regions
            me.regions.push([
                na.removeFirstFewAsMappedLikeUnsafe(
                    regions,
                    region => region.region,
                    ['High income: OECD'],
                    na.areSame
                ),
                na.removeFirstFewAsMappedLikeUnsafe(
                    regions,
                    region => region.region,
                    ['High income: non-OECD'],
                    na.areSame
                )
            ]);

            koh.appendFew(me.countries1, choppedGrouppedCountries[0]);
            koh.appendFew(me.countries2, choppedGrouppedCountries[1]);
        }

        private getUrlParameter(name) {
            return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        }
    }
}