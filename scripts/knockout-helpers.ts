///<reference path='../typings/knockout/knockout.d.ts' />
///<reference path='arrays.ts' />
module koh {

    export function append<a>(values: KnockoutObservableArray<a>, value: a) : KnockoutObservableArray<a> {
        values.push(value);
        return values;
    }

    export function appendFew<a>(target: KnockoutObservableArray<a>, source: a[]) : KnockoutObservableArray<a> {
        na.use(source, value => append(target, value));
        return target;
    }



} 