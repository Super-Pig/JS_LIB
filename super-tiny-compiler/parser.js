/*
 * Copyright © 2020-2022 Ocean Galaxy Inc. All Rights Reserved.
 * @Description: 
 * @LastEditors: garry彭
 * @LastEditTime: 2022-10-27 14:11:33
 */
/**
 * 把 tokens 转换成 ast
 * @param {*} tokens 
 */
function parser(tokens) {
    let current = 0

    function walk() {
        let token = tokens[current]

        if (token.type === 'number') {
            current++

            return {
                type: 'NumberLiteral',
                value: token.value
            }
        }

        if (token.type === 'string') {
            current++

            return {
                type: 'StringLiteral',
                value: token.value
            }
        }

        if (token.type === 'paren' && token.value === '(') {
            token = tokens[++current]

            let node = {
                type: 'CallExpression',
                name: token.value,
                params: []
            }

            token = tokens[++current]

            while (token.type !== 'paren' ||
                (token.type === 'paren' && token.value !== ')')
            ) {
                node.params.push(walk())
                token = tokens[current]
            }

            current++

            return node
        }

        throw new TypeError(token.type)
    }

    const ast = {
        type: 'Program',
        body: []
    }

    while (current < tokens.length) {
        ast.body.push(walk())
    }

    return ast
}

module.exports = parser