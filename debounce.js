/**
 * 防抖
 * @param {*} fn 需要执行的函数
 * @param {*} wait 多久开始执行
 * @param {*} immediate true： 执行第一次； false：执行最后一次
 * @returns 
 */
const debounce = (fn, wait, immediate) => {
    if (typeof fn !== 'function') {
        throw new Error('fn must be an function')
    }

    if (typeof wait === 'undefined') {
        wait = 300
    }

    if (typeof wait === 'boolean') {
        immediate = wait
        wait = 300
    }

    if (typeof immediate !== 'boolean') {
        immediate = false
    }

    let timer = null

    return function proxy(...args) {
        let self = this
        let init = immediate && !timer

        clearTimeout(timer)

        timer = setTimeout(() => {
            clearTimeout(timer)
            timer = null

            !immediate && fn.call(self, ...args)
        }, wait)

        init && fn.call(self, ...args)
    }
}


// example

/*
const fn = debounce((message) => console.log(message), 1000, true)

for (let i = 0; i < 100; i++) {
    fn(i)
}
*/