module nc {
    export function map<a, b>(value: a, map: (value: a) => b) : b {
        return map(value);
    }
}