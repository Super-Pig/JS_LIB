/*
 * Copyright © 2020-2022 Ocean Galaxy Inc. All Rights Reserved.
 * @Description: 
 * @LastEditors: garry彭
 * @LastEditTime: 2022-10-27 14:37:37
 */
/**
 * 精简版编译器
 */
const tokenizer = require('./tokenizer')
const parser = require('./parser')
const transformer = require('./transformer')
const codeGenerator = require('./codeGenerator')

const input = '(add 1 (substract 2 3))'

const tokens = tokenizer(input)
const ast = parser(tokens)
const newAst = transformer(ast)
const output = codeGenerator(newAst)


console.log(output)