/**
 * 模拟实现 instanceof
 * a instanceof A
 */
const _instanceof = (instance, type) => {
    let proto = Object.getPrototypeOf(instance)

    while(proto) {
        if(proto.constructor === type){
            return true
        }

        proto = Object.getPrototypeOf(proto)
    }

    return false
}

// example

/*
class A { }

class B extends A { }

class C extends B { }

const c = new C()

console.log(_instanceof(c, A))
*/
