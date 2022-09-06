/**
 * 模拟实现 Function.prototype.apply
 * @param {*} ctx 
 * @param {*} args 
 * @returns 
 */
Function.prototype._apply = function (ctx, args = []) {
    if (!Array.isArray(args)) {
        throw new Error('CreateListFromArrayLike called on non-object')
    }

    const fn = Symbol()
    const context = ctx || window
    context[fn] = this

    const res = context[fn](...args)

    return res
}

// example
/*
let obj2 = {
    a: 2,
};
let obj1 = {
    a: 1,
    getName: function (b, c) {
        console.log(this.a);
        console.log(b);
        console.log(c);
        return this.a + b + c;
    },
};

console.log(obj1.getName._apply(obj2, [3, 4])); 

*/