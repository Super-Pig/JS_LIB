/**
 * 对函数结果做缓存
 * @param {*} fn 
 * @returns 
 */
const memorize = (fn) => {
    let cache = {}

    return function () {
        const key = JSON.stringify(arguments)

        cache[key] = cache[key] || fn.apply(this, arguments)

        return cache[key]
    }
}


// example:

/*
const add = (a, b) => a + b
const f = memorize(add)
console.log(f(1,2))
console.log(f(1,2)) // 这次调用传递的参数和上次相同，因此直接返回缓存的结果
*/