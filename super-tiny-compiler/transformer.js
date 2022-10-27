/*
 * Copyright © 2020-2022 Ocean Galaxy Inc. All Rights Reserved.
 * @Description: 
 * @LastEditors: garry彭
 * @LastEditTime: 2022-10-27 14:28:14
 */
const traverser = require("./traverser")

/**
 * 
 * @param {*} ast 
 * @returns 把 ast 转换成新的 ast
 */
function transformer(ast) {
    let newAst = {
        type: 'Program',
        body: []
    }

    ast._context = newAst.body

    traverser(ast, {
        NumberLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'NumberLiteral',
                    value: node.value
                })
            }
        },

        StringLiteral: {
            enter(node, parent) {
                parent._context.push({
                    type: 'StringLiteral',
                    value: node.value
                })
            }
        },

        CallExpression: {
            enter(node, parent) {
                let expression = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name
                    },
                    arguments: []
                }

                node._context = expression.arguments

                if (parent.type !== 'CallExpression') {
                    expression = {
                        type: 'ExpressionStatement',
                        expression
                    }
                }

                parent._context.push(expression)
            }
        }
    })

    return newAst
}

module.exports = transformer