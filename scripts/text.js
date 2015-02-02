var nt;
(function (nt) {
    function toLetters(value) {
        return value.split('');
    }
    nt.toLetters = toLetters;
    function toFirstLetterOrDie(value, failure) {
        if (value.length > 0) {
            return value.substr(0, 1);
        }
        else {
            throw new Error(failure + ' Unable to get the first letter. The string is empty.');
        }
    }
    nt.toFirstLetterOrDie = toFirstLetterOrDie;
})(nt || (nt = {}));
//# sourceMappingURL=text.js.map