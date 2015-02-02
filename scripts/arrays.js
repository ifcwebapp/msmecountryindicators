var na;
(function (na) {
    function appendFew(target, source) {
        Array.prototype.push.call(target, source);
        return target;
    }
    na.appendFew = appendFew;
    function removeFirstFewAsMappedLikeOrDie(values, map, samples, areAlike) {
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
    na.removeFirstFewAsMappedLikeOrDie = removeFirstFewAsMappedLikeOrDie;
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