import { testProgram, testProgramAssertOnTop } from './_runTest';

//PI
testProgram('PI', [Math.PI]);
//E
testProgram('E', [Math.E]);
//random
testProgramAssertOnTop('random', v => v < 1 && v > 0);
//random2
testProgramAssertOnTop('-5 5 random2', v => v < 5 && v > -5);
//'*'
testProgram('2 3 *', [6]);
//'/'
testProgram('2 3 /', [2 / 3]);
testProgram('6 2 /', [3]);
//'+'
testProgram('2 3 +', [5]);
//'-'
testProgram('2 3 -', [-1]);
testProgram('4 3 -', [1]);
//mod
testProgram('7 2 mod', [1]);
//neg
testProgram('5 neg', [-5]);
testProgram('-5 neg', [5]);
//abs
testProgram('-5 abs', [5]);
testProgram('5 abs', [5]);
//max
testProgram('2 3 max', [3]);
//min
testProgram('2 3 min', [2]);
//sqrt
testProgram('9 sqrt', [3]);
//cbrt
testProgram('27 cbrt', [3]);
//pow
testProgram('2 10 pow', [1024]);
//floor
testProgram('1.123123 floor', [1]);
//ceil
testProgram('1.123123 ceil', [2]);
//round
testProgram('1.12312131 round', [Math.round(1.12312131)]);
//exp
testProgram('0 exp', [1]);
//sign
testProgram('10 sign', [1]);
testProgram('-10 sign', [-1]);
testProgram('0 sign', [0]);
testProgram('-0 sign', [-0]);
testProgram('+0 sign', [0]);
//log
testProgram('1 log', [0]);
//log10
testProgram('10 log10', [1]);
//cos
testProgram('PI 2 * cos', [1]);
//acos
testProgram('1 acos', [0]);
testProgram('1.1 acos', [NaN]);
//cosh
testProgram('PI cosh', [Math.cosh(Math.PI)]);
//acosh
testProgram('1.1 acosh', [Math.acosh(1.1)]);
testProgram('0.1 acosh', [NaN]);
//sin
testProgram('PI 2 / sin', [1]);
//asin
testProgram('0 asin', [0]);
testProgram('1.1 asin', [NaN]);
//sinh
testProgram('PI sinh', [Math.sinh(Math.PI)]);
//asinh
testProgram('1.1 asinh', [Math.asinh(1.1)]);
testProgram('0.1 asinh', [Math.asinh(0.1)]);
//tan
testProgram('PI tan', [Math.tan(Math.PI)]);
//atan
testProgram('1.10 atan', [Math.atan(1.1)]);
//atan2
testProgram('5 6 atan2', [Math.atan2(5, 6)]);
//tanh
testProgram('5 tanh', [Math.tanh(5)]);
//atanh
testProgram('0 atanh', [0]);
testProgram('1.1 atanh', [NaN]);
//succ
testProgram('1 succ', [2]);
testProgram('2 succ', [3]);
//pred
testProgram('1 pred', [0]);
testProgram('2 pred', [1]);
