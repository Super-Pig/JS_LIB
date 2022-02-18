/**
 * 柯里化
 * @param {*} fn 
 */
const curry = fn => {
    return function curriedFn(...args) {
        if (args.length < fn.length) {
            return function () {
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        } else {
            return fn(...args)
        }
    }
}

// example:

/*
const getSum = (a, b, c)
const f = curry(getSum)
const res = f(1)(2)(3)
console.log(res)
*/