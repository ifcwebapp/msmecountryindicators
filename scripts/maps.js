var nm;
(function (nm) {
    function toMapOf() {
        return {};
    }
    nm.toMapOf = toMapOf;
    function toArray(values, map) {
        var result = [];
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                result.push(map(values[key], key));
            }
        }
        return result;
    }
    nm.toArray = toArray;
    function fold(values, result, fold) {
        for (var key in values) {
            if (values.hasOwnProperty(key)) {
                result = fold(values[key], key, result);
            }
        }
        return result;
    }
    nm.fold = fold;
    function claim(values, key, toDefault) {
        if (key in values) {
            return values[key];
        }
        else {
            return values[key] = toDefault();
        }
    }
    nm.claim = claim;
    function toLookup(values, toKey, toDefault) {
        var result = toMapOf();
        for (var index = 0, length = values.length; index < length; index++) {
            var value = values[index];
            var key = toKey(value);
            var claimed = claim(result, key, toDefault);
            claimed.push(value);
        }
        return result;
    }
    nm.toLookup = toLookup;
})(nm || (nm = {}));
//# sourceMappingURL=maps.js.map