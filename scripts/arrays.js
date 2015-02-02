var na;
(function (na) {
    function appendFew(target, source) {
        Array.prototype.push.apply(target, source);
        return target;
    }
    na.appendFew = appendFew;
    function fold(values, result, fold) {
        for (var index = 0, length = values.length; index < length; index++) {
            result = fold(values[index], result);
        }
        return result;
    }
    na.fold = fold;
    function concat(values) {
        return fold(values, [], function (values, result) { return appendFew(result, values); });
    }
    na.concat = concat;
    function map(values, map) {
        var result = [];
        for (var index = 0, length = values.length; index < length; index++) {
            result.push(map(values[index]));
        }
        return result;
    }
    na.map = map;
    function mapConcat(values, mapToFew) {
        return concat(map(values, mapToFew));
    }
    na.mapConcat = mapConcat;
    function append(values, value) {
        values.push(value);
        return values;
    }
    na.append = append;
    function removeFirstFewAsMappedLikeUnsafe(values, map, samples, areAlike) {
        var result = [];
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
    na.removeFirstFewAsMappedLikeUnsafe = removeFirstFewAsMappedLikeUnsafe;
    function areSame(one, another) {
        return one === another;
    }
    na.areSame = areSame;
    function use(values, use) {
        for (var index = 0, length = values.length; index < length; index++) {
            use(values[index]);
        }
    }
    na.use = use;
})(na || (na = {}));
//# sourceMappingURL=arrays.js.map