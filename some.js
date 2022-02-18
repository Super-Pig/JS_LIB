const some = (arr, fn) => {
    let res = false

    for (let value of arr) {
        if (fn(value)) {
            res = true
            break;
        }
    }

    return res
}

// example:

/*
const res = some([1, 2, 3], item => item > 1)
console.log(res)
*/