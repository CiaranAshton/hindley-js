const r = require('ramda');

log = y => x => {
    console.log(y + ':::');
    console.log(x);
    return x;
};

const fromFalse = fn => x => (x ? fn(x) : false);

// getArity :: (a -> ... -> b) -> Integer
const getArity = r.pipe(
    r.toString,
    r.match(/=>|function/g),
    r.length,
);

// splitAndTrim :: String -> String -> [String]
const splitAndTrim = str =>
    r.pipe(
        r.split(str),
        r.map(r.trim),
    );

// checkTitle :: String -> [String] -> [String]
const checkTitle = fnName => sg => (r.equals(fnName)(r.head(sg)) ? r.last(sg) : false);

// checkSigniture :: (a -> b) -> String -> Boolean
const checkParameters = fn => sg => r.equals(getArity(fn))(sg.length - 1);

// checkSigniture :: (a -> ... -> b) -> String -> Boolean
const checkSigniture = fn =>
    r.pipe(
        splitAndTrim('::'),
        checkTitle(fn.name),
        fromFalse(splitAndTrim('->')),
        checkParameters(fn),
    );

module.exports = checkSigniture;
