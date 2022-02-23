/**
 * 节流
 * @param {*} fn 需要执行的函数
 * @param {*} wait 多久执行一次
 * @returns 
 */
const throttle = (fn, wait) => {
    if (typeof fn !== 'function') {
        throw new Error('fn must be an function')
    }

    if (typeof wait === 'undefined') {
        wait = 400
    }

    let previous = 0
    let timer = null

    return function proxy(...args) {
        const now = Date.now()
        const interval = wait - (now - previous)
        const self = this

        if (interval <= 0) {
            clearTimeout(timer)
            timer = null

            fn.call(self, ...args)

            previous = now
        } else if (!timer) {
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null

                fn.call(self, ...args)

                previous = now
            }, interval)
        }
    }
}

//example

/*
const fn = throttle(console.log, 1)

for (let i = 0; i < 10000; i++) {
    fn(i)
}
*/
