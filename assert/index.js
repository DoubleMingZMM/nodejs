/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-08-27 17:19:49
 * @LastEditors: Daniel
 * @LastEditTime: 2019-08-27 18:02:04
 */
const assert = require('assert');


// 判断是否是真值，没有 message 则抛出 a,有的话则抛出 message，
// 他是 assert.ok()别名,这两个调用效果一致
// assert(false, '这是 assert 的错误信息1！');
// assert(undefined, '这是 assert 的错误信息2！');
// assert(null, '这是 assert 的错误信息3！');
// assert('', '这是 assert 的错误信息4！');
// assert(![], '这是 assert 的错误信息5！');
// assert(!{}, '这是 assert 的错误信息6！');
// assert.ok(!{}, '这是 assert 的错误信息7！');


// 比较是否相等 == 比较，没有错误信息就是 a 操作符 b
// assert.equal(1,2);
// assert.equal(1,'1');
// assert.equal(1,true);
// assert.equal(0,'');
// assert.equal(0,true, '这是 assert.equal 报错1');


// 比较底层有没有数据一样 == ，没有错误信息就是 a 操作符 b
// assert.deepEqual({a: 1}, {a: '1'});
// assert.deepEqual({a: 1}, {a: true});
// assert.deepEqual({a: 1}, {a: []});
// assert.deepEqual({a: 1}, {a: ['1']});
// assert.deepEqual({a: '1'}, {a: ['1']}, '这是 assert.deepEqual 的错1');


// 比较底层不相等 == ，没有错误信息就是 a 操作符 b
// assert.notDeepEqual({a: 1}, {a: '1'}, '这是 assert.notDeepEqual 的错1');
// assert.notDeepEqual({a: 1}, {a: '0'});


// 比较严格相等， === 
// assert.strictEqual(1,'1', '这是 assert.strictEqual 报错1');
// assert.strictEqual(1,1);


// 比较深层严格相等， === 
// assert.deepStrictEqual({a: 1},{a: '1'}, '这是 assert.deepStrictEqual 报错1');


// 比较深层严格不相等， === 
// assert.notDeepStrictEqual({a: 1},{a: 1}, '这是 assert.notDeepStrictEqual 报错1');
// assert.notDeepStrictEqual({a: 1},{a: '1'});


// 比较不相等， ==
// assert.notEqual(1,1, '这是 assert.notEqual 报错1');


// 比较严格不相等， ===
// assert.notStrictEqual(1,'1', '这是 assert.notStrictEqual 报错1');


// 测试 fail,参数依次是实际值，预期值，错误信息以及操作符（默认!=）
// assert.fail('a', 'b');
// assert.fail('a', 'a');
// assert.fail('a', 'a', undefined, '>');





