module na {
    
    export function appendFew<a>(target: a[], source: a[]): a[] {
        Array.prototype.push.apply(target, source);
        return target;

    }

    export function fold<a, r>(values: a[], result: r, fold: (value: a, result: r) => r) : r {
        for (var index = 0, length = values.length; index < length; index ++) {
            result = fold(values[index], result);
        }
        return result;
    }

    export function concat<a>(values:a[][]) : a[] {
        return fold(values, <a[]>[], (values, result) => appendFew(result, values));
    }

    export function map<a, b>(values: a[], map: (value: a) => b) : b[] {
        var result : b[] = [];
        for (var index = 0, length = values.length; index < length; index ++) {
            result.push(map(values[index]));

        }
        return result;
    }

    export function mapConcat<a, b>(values: a[], mapToFew: (value: a) => b[]) : b[] {
        return concat(map(values, mapToFew));
    }

    export function append<a>(values: a[], value: a) : a[] {
        values.push(value);
        return values;
    }
    
    export function removeFirstFewAsMappedLikeUnsafe<a, b>(
        values: a[],
        map: (value: a) => b,
        samples: b[],
        areAlike: (one: b, another: b) => boolean
    ) : a[] {
        var result: a[] = [];
        for (var sampleIndex = 0, samplesLength = samples.length; sampleIndex < samplesLength; sampleIndex++) {
            for (var index = 0, length = values.length; index < length; index++) {
                if (areAlike(samples[sampleIndex], map(values[index]))) {
                    result.push(values.splice(index, 1)[0]);
                    break;
                }
            }
        }
        return result;
    }

    export function areSame<a>(one: a, another: a) : boolean {
        return one === another;
    }

    export function use<a>(values: a[], use: (value: a) => void) : void {
        for (var index = 0, length = values.length; index < length; index ++) {
            use(values[index]);
        }
    }
}