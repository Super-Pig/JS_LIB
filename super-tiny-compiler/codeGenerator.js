/*
 * Copyright © 2020-2022 Ocean Galaxy Inc. All Rights Reserved.
 * @Description:    
 * @LastEditors: garry彭
 * @LastEditTime: 2022-10-27 14:38:07
 */
/**
 * 把 ast 转换成代码
 * @param {*} node 
 * @returns 
 */
function codeGenerator(node) {
    switch (node.type) {
        case 'Program':
            return node.body.map(codeGenerator).join('\n')
        case 'ExpressionStatement':
            return codeGenerator(node.expression) + ';'
        case 'CallExpression':
            return codeGenerator(node.callee) + '(' + node.arguments.map(codeGenerator).join(', ') + ')'
        case 'Identifier':
            return node.name
        case 'NumberLiteral':
            return node.value
        case 'StringLiteral':
            return '"' + node.value + '"'
        default:
            throw new TypeError(node.type)
    }
}

module.exports = codeGenerator