var koh;
(function (koh) {
    function append(values, value) {
        values.push(value);
        return values;
    }
    koh.append = append;
    function appendFew(target, source) {
        na.use(source, function (value) { return append(target, value); });
        return target;
    }
    koh.appendFew = appendFew;
})(koh || (koh = {}));
//# sourceMappingURL=knockout-helpers.js.map