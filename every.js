const every = (arr, fn) => {
    let res = true

    for (let value of arr) {
        if (!fn(value)) {
            res = false
            break;
        }
    }

    return res
}

// example: 

/*
const res = every([1, 2, 3], item => item > 1)
console.log(res)
*/