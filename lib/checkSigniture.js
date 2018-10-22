const r = require('ramda');

log = y => x => {
    console.log(y + ':::');
    console.log(x);
    return x;
};

const fromFalse = x => fn => (x ? fn(x) : false);

// getArity :: (a -> ... -> b) -> Integer
const getArity = r.pipe(
    r.toString,
    r.match(/=>|function/g),
    r.length,
);

// splitTitile :: String -> [String]
const splitTitle = r.pipe(
    r.split('::'),
    r.map(r.trim),
);

// checkTitle :: String -> String -> [String]
const checkTitle = fnName => sg => (r.equals(fnName)(r.head(sg)) ? r.last(sg) : false);

// splitSigniture :: String -> [String]
const splitParameters = sg =>
    sg
        ? r.pipe(
              r.split('->'),
              r.map(r.trim),
          )(sg)
        : false;

// checkSigniture :: (a -> b) -> String -> Boolean
const checkParameters = fn => sg => r.equals(getArity(fn))(sg.length - 1);

// checkSigniture :: (a -> ... -> b) -> String -> Boolean
const checkSigniture = fn =>
    r.pipe(
        splitTitle,
        checkTitle(fn.name),
        splitParameters,
        checkParameters(fn),
    );

module.exports = checkSigniture;
