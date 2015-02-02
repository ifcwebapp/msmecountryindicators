module na {
    
    export function appendFew<a>(target: a[], source: a[]): a[] {
        Array.prototype.push.call(target, source);
        return target;
    }
    
    export function removeFirstFewAsMappedLikeOrDie<a, b>(
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