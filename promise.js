/**
 * Promise
 * 
 * Promise/A+:  https://promisesaplus.com/
 * 
 * 1. Promise 是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
 * 2. Promise 中有三种状态，分别为 fulfilled, rejected, pending
 *      pending -> fulfilled
 *      pending -> rejected
 *      一旦状态确定就不可更改
 * 3. resolve 和 reject 
 *      resolve: fulfilled
 *      reject: rejected
 * 4. then 方法内部做的事情就是判断状态，如果状态是成功，调用成功的回调函数；如果状态是失败，调用失败的回调函数。
 *      then 方法是定义在原型对象中的
 * 5. then 成功回调有一个参数，表示成功之后的值
 *      then 失败回调有一个参数，表示失败的原因
 * 6. 同一个 promise 对象下面的 then 方法是可以被调用多次的
 * 7. then 方法是可以被链式调用的，后面 then 方法的回调函数拿到的值是上一个 then 方法的回调函数的返回值 
 */
const STATUS = {
    PENDING: Symbol('PENDING'),
    FULFILLED: Symbol('FULFILLED'),
    REJECTED: Symbol('REJECTED'),
}

class MyPromise {
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    // 状态
    status = STATUS.PENDING

    // 成功之后的值
    value = undefined

    // 失败之后的原因
    reason = undefined

    // 成功回调
    successCallbacks = []

    // 失败回调
    failCallbacks = []

    resolve = (value) => {
        if (this.status === STATUS.PENDING) {
            this.status = STATUS.FULFILLED
            this.value = value

            while (this.successCallbacks.length) {
                this.successCallbacks.shift()()
            }
        }
    }

    reject = (reason) => {
        if (this.status === STATUS.PENDING) {
            this.status = STATUS.REJECTED
            this.reason = reason

            while (this.failCallbacks.length) {
                this.failCallbacks.shift()()
            }
        }
    }

    then = (successCallback, failCallback) => {
        if (!(successCallback instanceof Function)) {
            successCallback = item => item
        }

        if (!(failCallback instanceof Function)) {
            failCallback = reason => { throw reason }
        }

        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === STATUS.PENDING) {
                this.successCallbacks.push(() => {
                    try {
                        const x = successCallback(this.value)

                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })

                this.failCallbacks.push(() => {
                    try {
                        const x = failCallback(this.reason)

                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            if (this.status === STATUS.FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = successCallback(this.value)

                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }

            if (this.status === STATUS.REJECTED) {
                setTimeout(() => {
                    try {
                        const x = failCallback(this.reason)

                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
        })

        return promise2
    }

    static all = (array) => {
        const result = []
        let successCount = 0

        return new MyPromise((resolve, reject) => {
            const addData = (key, value) => {
                result[key] = value
                successCount++

                if (successCount === array.length) {
                    resolve(result)
                }
            }

            array.forEach((item, index) => {
                if (item instanceof MyPromise) {
                    item.then(value => {
                        addData(index, value)
                    }, reject)
                } else {
                    addData(index, item)
                }
            })
        })
    }

    static resolve = value => {
        return new MyPromise(resolve => {
            if (value instanceof MyPromise) {

            } else {
                return resolve(value)
            }
        })
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaning cycle detected for promise #<Promise>'))
    }

    /**
     * 判断 x 的值是普通值还是 promise 对象
     * 如果是普通值，直接调用 resolve
     * 如果是 promise 对象，查看 promise 对象返回的结果
     * 再根据 promise 对象返回的结果，决定调用 resolve 还是调用 reject
    */
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}


// const p1 = new Promise((resolve, reject) => setTimeout(() => reject(1), 1000))

// const p = Promise.resolve(p1)

// p.then(console.log, console.log)