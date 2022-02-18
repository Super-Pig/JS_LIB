const map = (arr, fn) => {
    const res = []

    for (let value of arr) {
        res.push(fn(value))
    }

    return res
}


// example: 

/*
const res = map([1, 2, 3], item => item + 1)
console.log(res)
*/