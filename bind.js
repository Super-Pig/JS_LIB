/**
 * 模拟实现 Function.prototype.bind
 * @param {*} ctx 
 * @param  {...any} bindArgs 
 * @returns 
 */
Function.prototype._bind = function (ctx, ...bindArgs) {
    let self = this

    return function () {
        return self.apply(ctx, bindArgs)
    }
}

// example

/*

let obj1 = {
    age: '2',
};
let obj2 = {
    age: '88',
    getInfo: function (name) {
        return `${name} 今年${this.age} 岁`;
    },
};
let p = obj2.getInfo._bind(obj1, '小明');
console.log(p());

*/