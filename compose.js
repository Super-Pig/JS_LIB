/**
 * 函数组合
 * @param  {...Function} args 
 * @returns 
 * 
 */
const compose = (...args) => value => args.reverse().reduce((res, fn) => fn(res), value)


// example:

/*
const add = n => n + 1
const double = n => n * 2
const f = compose(add, double)

const res = f(1)
console.log(res)
*/