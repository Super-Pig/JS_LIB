/**
 * 模拟实现 call 函数
 * @param {*} ctx 
 * @param  {...any} args 
 * @returns 
 */
Function.prototype._call = function (ctx, ...args) {
    let fn = Symbol()
    let context = ctx ? ctx : window
    context[fn] = this

    const res = context[fn](...args)

    delete context[fn]

    return res
}

// example

/*
const obj2 = {
    a: 2,
};

const obj1 = {
    a: 1,
    getName: function (b, c) {
        console.log(this.a);
        console.log(b);
        console.log(c);
        return this.a + b + c;
    },
};

console.log(obj1.getName._call(obj2, 3, 4));
*/