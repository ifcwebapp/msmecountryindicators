module nm {

    export interface Map<a> {
        [key: string]: a;
    }

    export function toMapOf<a>() : Map<a> { return {}; }

    export function toArray<a, b>(values: Map<a>, map: (value: a, key: string) => b) : b[] {
        var result : b[] = [];
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                result.push(map(values[key], key));
            }
        }
        return result;
    }

    export function fold<a, r>(values: Map<a>, result: r, fold: (value: a, key: string, result: r) => r) : r {
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                result = fold(values[key], key, result);
            }
        }
        return result;
    }

    export function claim<a>(values: Map<a>, key: string, toDefault: () => a) : a {
        if (key in values) {
            return values[key];
        } else {
            return values[key] = toDefault();
        }
    }

    export function toLookup<a>(values: a[], toKey: (value: a) => string, toDefault: () => a[]) : Map<a[]> {
        var result = toMapOf<a[]>();
        for (var index = 0, length = values.length; index < length; index ++) {
            var value = values[index];
            var key = toKey(value);
            var claimed = claim(result, key, toDefault);
            claimed.push(value);
        }
        return result;
    }
} 