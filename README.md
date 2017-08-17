# Ait

> Ait or Aisteach (ie) - Strange, unusual, curious, weird, funny

Programming language for visual and creative experiments on the web. Heavily
influenced by the Forth-family of languages.

The language and runtime is still in a very **experimental** state.

## Installation

Requirements: [Node v6 or above](https://nodejs.org)

### Recommended approach

Install with npm `npm install [-g] ait-lang`, use `-g` if you want to add it as a global executable.

### Build from source

Clone repo and run `npm i && npm run build` and an executable should appear in `ait-lang/bin`.

## Usage

After installing (or building from source) you can use ait-lang to interpret your `.ait`-files like this:

```
> ait-lang source.ait
```

### Browser

You can also run `ait-lang` in your browser. It involves a bit more setting up (this is still a work in progress):

```js
const fs = require('fs');

const Browser = require('ait-lang/runtimes/browser');
const src = fs.readFileSync('YOUR SOURCE HERE', 'utf8');

const runtime = Browser();
// Load some liberaries
Object.assign(runtime.lexicon, require('ait-canvas'));
Object.assign(runtime.lexicon, require('ait-dom'));

runtime.evaluate(src);

// Grab the canvas from the runtime
// It's a bit roundabout, working on a better solution
document.body.appendChild(runtime.scope['__aitCanvasContext'].body.canvas);
```

### Examples

The [Ait Playground](https://github.com/mollerse/ait-playground/) has some examples you could follow. It also has some examples of usage in the browser.

## Syntax and semantics

TODO

## Standard Library

These are the words currently shipping with the `ait-lang`-runtime.

### Math

The normal operators found in JavaScript works as words in Ait:
`+`, `-`, `*`, `/`. `%` exists as `mod` and unary `-` exists as `neg`.

Most of the methods and constants normally found on [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) in JavaScript exist in Ait:
`PI`, `E`, `random`, `abs`, `max`, `min`, `sqrt`, `cbrt`, `pow`, `floor`, `ceil`, `round`, `exp`, `sign`, `log`, `log10`, `cos`, `acos`, `cosh`, `acosh`, `sin`, `asin`, `sinh`, `asinh`, `tan`, `atan`, `atan2`, `tanh`, `atanh`.

In addition some helper words have been added:

#### random2
`lower upper random2`

Generates a random float between `lower` and `upper`.

#### succ
`n succ`

Generates the successor to `n`. Equivalent to `n 1 +`.

#### pred
`n pred`

Generates the predecessor to `n`. Equivalent to `n 1 -`.

### Logic
#### >
`a b >`

`true` if a is greater than b, `false` otherwise.

Desc
#### <
`a b <`

`true` if a is smaller than b, `false` otherwise.

Desc
#### =
`a b =`

`true` if a is equal to b, `false` otherwise. This uses `===` in JavaScript to determine equality.

Desc
#### !=
`a b !=`

`true` if a is not equal to b, `false` otherwise. This uses `!==` in JavaScript to determine equality.

Desc
#### >=
`a b >`

`true` if a is greater than or equal to b, `false` otherwise.

Desc
#### <=
`a b >`

`true` if a is smaller than or equal to b, `false` otherwise.

Desc
#### ||
`a b ||`

`true` if a or b is `true`, `false` otherwise.

Works the same way as JavaScripts `||` in that it will coerce operands to boolean values before comparing.

Desc
#### &&
`a b &&`

`true` if a and b is `true`, `false` otherwise.

Works the same way as JavaScripts `&&` in that it will coerce operands to boolean values before comparing.


Desc
#### small
`[aggr] small` or `n small`

`true` if aggregate `aggr` has 0 or 1 elements or if `n` is a small number (`-1`, `0` or `1`).

Desc
#### zero
`[aggr] zero` or `n zero`

`true` if aggregate `aggr` has 0 element or if `n` is the number `0`.

### String manipulation
Words for manipulating strings.

This module is unstable.

#### replace
`"string" "replacement" replace`

Replaces the first `%s`s in the string `"string"` with replacement `"replacement"`.

##### Example
```
"%s extra" "nothing" replace
```

Resulting in `"nothing extra"` being left on the stack.

#### replace2
`"string" "replacement" replace2`

Replaces the two first `%s`s in the string `"string"` with replacement `"replacement"`.

#### replace3
`"string" "replacement" replace3`

Replaces the three first `%s`s in the string `"string"` with replacement `"replacement"`.

### Stack shufflers
#### .
`a .`

Pops the top element off the stack and prints it to stdout.

#### dup
`a dup`

Duplicates the top element of the stack

#### dupd
`a b dupd`

`dip`'ed version of `dup`. Short-hand for `a b [dup] dip`.

#### pop
`a pop`

Pops the top element off the stack.

#### popd
`a b popd`

`dip`'ed version of `pop`. Short-hand for `a b [pop] dip`.

#### swap
`a b swap`

Swaps the top two elements of the stack.

#### swapd
`a b c swapd`

`dip`'ed version of `swap`. Short-hand for `a b c [swap] dip`.

#### rollup
`a b c rollup`

Rolls the 3rd element of the stack up to the top of the stack.

##### Example
```
1 2 3 rollup
```

Results in the stack looking like this: `2 3 1`.

#### rollupd
`a b c d rollupd`

`dip`'ed version of `rollup`. Short-hand for `a b c d [rollup] dip`.

#### rolldown
`a b c rolldown`

Rolls the 1st element of the stack up down 2 slots.

##### Example
```
1 2 3 rolldown
```

Results in the stack looking like this: `3 1 2`.

#### rolldownd
`a b c d rolldownd`

`dip`'ed version of `rolldown`. Short-hand for `a b c d [rolldown] dip`.

#### rotate
`a b c rotate`

Rotates the 1st and 3rd element of the stack.

##### Example
```
1 2 3 rotate
```

Results in the stack looking like this: `3 2 1`.

#### rotated
`a b c d rotated`

`dip`'ed version of `rotate`. Short-hand for `a b c d [rotate] dip`.

#### stack
`stack`

Pushes a copy of the current stack onto the stack.

#### unstack
`[aggr] unstack`

Replaces the current stack with aggregate `aggr`.

### Quotations

Words for working with quotations

#### exec
`[quot] exec`

Executes quotation `quot`.

##### Example
```
[1 1 +] exec
```

Results in `2` being left on the stack.

#### nullary
`[quot] nullary`

Executes quotation `quot` with arity 0. Reading as many elements of the stack as it needs, but does not consume any.

##### Example
```
1 1 [+] nullary
```

Results in `1 1 2` being left on the stack.

#### unary
`[quot] unary`

Executes quotation `quot` with arity 1. Reading as many elements of the stack as it needs, but only consumes 1.

##### Example
```
1 1 [+] unary
```

Results in `1 2` being left on the stack.

#### binary
`[quot] binary`

Executes quotation `quot` with arity 2. Reading as many elements of the stack as it needs, but only consumes 2.

##### Example
```
1 1 [+] unary
```

Results in `2` being left on the stack.

#### ternary
`[quot] ternary`

Executes quotation `quot` with arity 3. Reading as many elements of the stack as it needs, but only consumes 3.

##### Example
```
1 2 3 4 [ + + + ] ternary
```

Resulting in `1 10` being left on the stack.

#### dip
`[quot] dip`

Takes the top element of the stack, executes quotation `quot` and puts top element back on the stack.

##### Example
```
1 2 3 [+] dip
```

Results in `3 3` being left on the stack.

#### cleave
`el [qout1] [qout2] cleave`

Executes quotations `quot1` and `quot2` each with element `el` as the top of the stack.

##### Example
```
1 [1 +] [2 +]
```

Resulting in `2 3` being left on the stack.


### Aggregates

Words for working with aggregates

#### cons
`el [aggr] cons`

Conses `el` onto aggregate `aggr`.

##### Example
```
1 0 [] cons cons
```

Constructs a two-element vector from `0` and `1`, resulting in `[1 0]` being left on the stack.

#### swons
`[aggr] el swons`

Short-hand for `[aggr] el swap cons`.

#### append
`el [aggr] append`

Appends `el` at the end of aggregate `aggr`.

##### Example
```
0 [1] append
```

Appends `0` at the end of `[1]` resulting in `[1 0]` being left on the stack.

#### swappend
`[aggr] el swappend`

Short-hand for `[aggr] el swap append`.


#### uncons
`[aggr] uncons`

Unconses the first element of aggregate `aggr`, leaving `el` and `aggr` on the stack.

##### Example
```
[1 0] uncons
```

Unconses `1` from `[1 0]` leaving the stack with `1 [0]`.

#### unswons
`[aggr] unswons`

Short-hand for `[aggr] uncons swap`. Leaves result of uncons on the stack in the reverse order.

##### Example
```
[1 0] unswons
```

Unconses `1` from `[1 0]` leaving the stack with `[0] 1`.

#### concat
`[aggr1] [aggr2] concat`

Concats two aggregates. Follows the rules of `Array.prototype.concat` in JavaScript.

##### Example
```
[0] [1] concat
```

Concats aggregate `[0]` and aggregate `[1]` resulting in `[0 1]` being left on the stack.

#### enconcat
`el [aggr1] [aggr2] enconcat`

Concats aggregates `aggr1` and `aggr2` with `el` in between.

##### Example
```
1 [0] [2] enconcat
```

Concats aggregates `[0]` and `[2]` with `1` in between, resulting in `[0 1 2]` being left on the stack.

#### first
`[aggr] first`

Gets the first element of aggregate `aggr`.

##### Example
```
[0 1 2] first
```

Leaves `0` on the stack.

#### last
`[aggr] last`

Gets the last element of aggregate `aggr`.

##### Example
```
[0 1 2] last
```

Leaves `2` on the stack.

#### rest
`[aggr] rest`

Drops the first element and gives you the rest of aggreate `aggr`.

##### Example
```
[0 1 2] rest
```

Leaves `[1 2]` on the stack.

#### of
`i [aggr] of`

Gets the element of aggregate `aggr` at index `i`. Equivalent to `i [aggr] swap at`.

##### Example
```
1 [0 1 2] of
```

Leaves `1` on the stack.

#### at
`[aggr] i at`

Gets the element at index `i` of aggregate `aggr`. Equivalent to `[aggr] i swap of`.

##### Example
```
[0 1 2] 1 at
```

Leaves `1` on the stack.

#### ins
`el [aggr] i ins`

Inserts `el` in aggregate `aggr` at index `i`. Follows the rules of assigning to index in JavaScript, meaning you can get sparse aggregates.

##### Example
```
3 [0 1] 1 ins
```

Inserts `3` into `[0 1]` at index `1` resulting in `[0 3]` being left on the stack.

#### size
`[aggr] size`

Gets the size or length of aggregate `aggr`.

##### Example
```
[0 1 2] size
```

Leaves `3` on the stack.

#### drop
`[aggr] n drop`

Drops the `n` first elements of aggregate `[aggr]`.

##### Example
```
[0 1 2] 1 drop
```

Leaves `[1 2]` on the stack.

#### take
`[aggr] n take`

Takes the `n` first elements of aggregate `[aggr]`.

##### Example
```
[0 1 2] 2 take
```

Leaves `[0 1]` on the stack.

#### step
`[aggr] [s] step`

Executes quotation `s` with arity 1 once for every element of aggregate `aggr`. Quotation `s` has access to the variables `_i`, which is the index of the current step, and `_a` which is the aggregate.

##### Example
```
[1 2 3] [ 1 + ] step
```

Results in `2 3 4` being left on the stack.

#### map
`[aggr] [mapper] map`

Executes quotation `mapper` with arity 1 producing a new element for each element in aggregate `aggr`.

Quotation `mapper` has access to the variables `_i`, which is the index of the current step, and `_a` which is the aggregate.

##### Example
```
[1 2 3] [ 1 + ] map
```

Results in `[2 3 4]` being left on the stack.

#### map2
`[aggr1] [aggr2] [mapper] map2`

Executes quotation `mapper` with arity 2 producing a new element for each element in aggregate `aggr1` and `aggr2`. Aggregate `aggr1` must have an equal or greater number of elements than aggregate `aggr2`.

Quotation `mapper` has access to the variables `_i`, which is the index of the current step, `_a1`, which is the first aggregate, and `_a2` which is the second aggregate.

##### Example
```
[2 4 6] [1 2 3] [ / ] map2
```

Results in `[2 2 2]` being left on the stack.

#### fold
`[aggr] v0 [folder] fold`

Executes quotation `folder` with arity 2 producing a new value for each element in aggregate `aggr` with `v0` as the initial value.

Quotation `folder` has access to the variables `_i`, which is the index of the current step, and `_a` which is the aggregate.


##### Example
```
[1 2 3] 0 [ + ] fold
```

Results in `6` being left on the stack.

#### sort
`[aggr] sort`

Sorts the aggregate `aggr` in place using numerical comparison.

##### Example
```
[3 1 2] sort
```

Results in `[1 2 3]` being left on the stack.

#### sortBy
`[aggr] index sortBy`

Sorts aggregate `aggr` in place using numerical comparison on `index` of each element.

##### Example
```
[[1 3] [3 2] [2 1]] 1 sortBy
```

Results in `[[2 1] [3 2] [1 3]]` being left on the stack.

#### filter
`[aggr] [test] filter`

Filters the aggregate `aggr` by executing `test` with arity 1 for each element in aggregate.

Quotation `test` has access to the variables `_i`, which is the index of the current step, and `_a` which is the aggregate.

##### Example
```
[1 2 3 4 5 6] [2 mod 0 =] filter
```

Results in `[2 4 6]` being left on the stack.

#### split
`[aggr] [test] split`

Splits aggregate `aggr` into two aggregates according to the result of executing `test` for each element.

Quotation `test` has access to the variables `_i`, which is the index of the current step, and `_a` which is the aggregate.

##### Example
```
[1 2 3 4 5 6] [3 <] split
```

Results in `[1 2] [3 4 5 6]` being left on the stack.

#### some
`[aggr] [test] some`

Executes quotation `test` with arity 1 for each element in aggregate `aggr` and yields `true` if atleast one element passes the test.

Quotation `test` has access to the variables `_i`, which is the index of the current step, and `_a` which is the aggregate.

##### Example
```
[1 2 3 4 5] [3 =] some
```

Results in `true` being left on the stack.

#### all
`[aggr] [test] all`

Executes quotation `test` with arity 1 for each element in aggregate `aggr` and yields `true` if all elements passes the test.

Quotation `test` has access to the variables `_i`, which is the index of the current step, and `_a` which is the aggregate.

##### Example
```
[1 2 3 4 5] [3 =] all
```

Results in `false` being left on the stack.

### Control flow

Words for managing control flow.

#### cond
`test [quote]`

Executes `quote` if `test` is `true`.

##### Example
```
0 10 random2 5 < ['less than five']
```

Tells if a random number between `0` and `10` is lower than `5`.

#### branch
`test [t] [f]`

Executes `t` if `test` is `true` or `f` if `test` is `false`.

##### Example
```
0 10 random2 5 < ['less than five'] ['bigger than or equal to five'] ifte
```

Tells if a random number between `0` and `10` is lower or higher than `5`.

#### ifte
`[test] [t] [f] ifte`

Executes `test` with arity 0 to produce a boolean. Executes `t` if boolean is `true` or `f` if boolean is `false`.

Works like `branch` except that `test` can be a quotation.

##### Example
```
0 10 random2 [5 <] ['less than five'] ['bigger than or equal to five'] ifte
```

Tells if a random number between `0` and `10` is lower or higher than `5`.

### Iteration

Words for doing iterations and other looping.

#### while
`[ test ] [ step ] while`

Executes `test` with arity 0 to yield a boolean. Executes `step` if boolean is true.

##### Example
```
0
[ 10 < ]
[ 1 + ]
while
```

Will count up from 0 to 9 and stop, leaving 9 on the stack.

#### times
`count [ step ] times`

Executes `step` `count` times.

Inside `step` you will have access to the `_i`-variable, which has the value of the current step.

##### Example
```
0 10 [ 1 + ] times
```

Will add `1` to the top of the stack `10` times, leaving `10` on top of the stack.

### Recursion
Words for doing anonymous recursion

#### linrec
`[ test ] [ done ] [ generate ] [ collect ] linrec`

`linrec` takes 4 quotations off the stack and preforms linear recursion:
- `test` is executed with arity 0 to yield a boolean.
- `done` is executed if `test` yields `true`.
- `generate` is executed if `test` yields `false` and will continue the recursion with whatever `generate` leaves on the stack.
- `collect` is executed after the recursion-step is done.

##### Example
```
7 [ zero ] [ succ ] [ dup pred ] [ * ] linrec .
```

Will compute the factorial of `7`, which is `5040`.

#### tailrec
`[ test ] [ done ] [ step ] tailrec`

`tailrec` takes 3 quotations off the stack and preforms tail recursion:
- `test` is executed with arity 0 to yield a boolean.
- `done` is executed if `test` yields `true`.
- `step` is executed if `test` yields `false` and will continue the recursion with whatever `generate` leaves on the stack.

##### Example
```
0 [1 2 3 4 5] [zero] [ pop ] [ uncons [+] dip ] tailrec .
```

Will do a tail recursive sum of the elements in an aggregate.

#### binrec
`[ test ] [ done ] [ generate ] [ collect ] binrec`

`binrec` takes 4 quotations off the stack and preforms linear recursion:
- `test` is executed with arity 0 to yield a boolean.
- `done` is executed if `test` yields `true`.
- `generate` is executed if `test` yields `false` and will produce 2 values. Binrec then recurses twice with each value on the top of the stack.
- `collect` is executed after the recursion-step is done.

##### Example

```
[2 4 6 8 1 3 5 7 9] [ small ] [] [ uncons [>] split ] [ enconcat ] binrec .
```

Will preform quicksort on the aggregate.
