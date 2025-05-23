/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var tape = require( 'tape' );
var formatTokenize = require( '@stdlib/string-base-format-tokenize' );
var PI = require( '@stdlib/constants-float64-pi' );
var PINF = require( '@stdlib/constants-float64-pinf' );
var NINF = require( '@stdlib/constants-float64-ninf' );
var formatInterpolate = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof formatInterpolate, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided an array', function test( t ) {
	var values;
	var i;

	values = [
		'abc',
		5,
		NaN,
		null,
		void 0,
		true,
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			formatInterpolate( value );
		};
	}
});

tape( 'the function throws an error if a format identifier object does not have a `specifier` property', function test( t ) {
	var values;
	var i;

	values = [
		{},
		{
			'precision': 3
		},
		{
			'width': 5
		}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			formatInterpolate( [ 'beep', value ], 'boop' );
		};
	}
});

tape( 'the function returns an empty string when provided an empty array', function test( t ) {
	var out = formatInterpolate( [] );
	t.strictEqual( out, '', 'returns an empty string' );
	t.end();
});

tape( 'the function returns concatenated strings when provided an array of strings without format identifier objects', function test( t ) {
	var tokens;
	var out;

	tokens = [
		'beep ',
		'boop'
	];
	out = formatInterpolate( tokens );
	t.strictEqual( out, tokens.join( '' ), 'returns expected string' );

	t.end();
});

tape( 'the function returns a formatted string (`s` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep' );
	expected = 'beep';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'boop' );
	expected = 'beep boop';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%s %s baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep', 'boop' );
	expected = 'beep boop baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`s` specifier, minimum width)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%6s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep' );
	expected = '  beep';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %6s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'boop' );
	expected = 'beep   boop';

	str = '%2s %2s baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep', 'boop' );
	expected = 'beep boop baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`s` specifier, variable width)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%*s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 6, 'beep' );
	expected = '  beep';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %*s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 6, 'boop' );
	expected = 'beep   boop';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%*s %*s baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 6, 'beep', 4, 'boop' );
	expected = '  beep boop baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`s` specifier, minimum width, left-justified)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%-6s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep' );
	expected = 'beep  ';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %-6s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'boop' );
	expected = 'beep boop  ';

	str = '%-2s %-2s baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep', 'boop' );
	expected = 'beep boop baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`s` specifier, precision)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%.2s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep' );
	expected = 'be';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %.2s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'boop' );
	expected = 'beep bo';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`s` specifier, precision, minimum width)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%6.2s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep' );
	expected = '    be';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %6.2s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'boop' );
	expected = 'beep     bo';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%6.8s %4.2s baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep', 'boop' );
	expected = 'beep bo   b';

	t.end();
});

tape( 'the function returns a formatted string (`s` specifier, precision, minimum width, zero-padded)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%06.2s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep' );
	expected = '0000be';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %06.2s';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'boop' );
	expected = 'beep 0000bo';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%06.8s %04.2s baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'beep', 'boop' );
	expected = 'beep bo00 b';

	t.end();
});

tape( 'the function returns a formatted string (`c` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%c';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 70 );
	expected = 'F';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %c';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 75 );
	expected = 'beep K';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%c %c baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 70, 75 );
	expected = 'F K baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`c` specifier, string arguments)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%c';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'b' );
	expected = 'b';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %c';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'boop' );
	expected = 'beep boop';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`c` specifier, minimum width)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%2c';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 80 );
	expected = ' P';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %4c';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 90 );
	expected = 'beep    Z';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%2c %c baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 80, 90 );
	expected = ' P Z baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`c` specifier, minimum width, left-justified)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%-2c';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 80 );
	expected = 'P ';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %-4c';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 90 );
	expected = 'beep Z   ';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%-2c %-c baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 80, 90 );
	expected = 'P  Z baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`d` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = '3';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.8 );
	expected = 'beep 5';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%d %d baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3, 5 );
	expected = '3 5 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`d` specifier, sign)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%+d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = '+3';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %+d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.8 );
	expected = 'beep +5';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%+d %+d baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3, 5 );
	expected = '+3 +5 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%+d %+d baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, -3, -5 );
	expected = '-3 -5 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`d` specifier, minimum width)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%2d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = ' 3';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %4d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep    5';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%2d %d baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.1, 5 );
	expected = ' 3 5 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`d` specifier, minimum width, left-justified)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%-2d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = '3 ';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %-4d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.2 );
	expected = 'beep 5   ';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%-3d baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3, 5 );
	expected = '3   baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`d` specifier, minimum width, zero-padded)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%02d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = '03';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %04d';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.1 );
	expected = 'beep 0005';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%02d %d baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3, 5 );
	expected = '03 5 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`f` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14 );
	expected = '3.140000';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.0 );
	expected = 'beep 5.000000';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%f %f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14, 5.0 );
	expected = '3.140000 5.000000 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%f %f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PINF, NINF );
	expected = 'infinity -infinity baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, NaN );
	expected = 'nan';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`F` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%F';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14 );
	expected = '3.140000';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %F';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.0 );
	expected = 'beep 5.000000';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%F %F baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14, 5.0 );
	expected = '3.140000 5.000000 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%F %F baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PINF, NINF );
	expected = 'INFINITY -INFINITY baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%F';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, NaN );
	expected = 'NAN';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`f` specifier, specified precision)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%.3f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PI );
	expected = '3.142';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %.3f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.0 );
	expected = 'beep 5.000';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%.10f %.10f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PINF, NINF );
	expected = 'infinity -infinity baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%0.10f %0.10f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PINF, NINF );
	expected = 'infinity -infinity baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%.4f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, NaN );
	expected = 'nan';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%0.4f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, NaN );
	expected = 'nan';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`f` specifier, variable precision)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%.*f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3, PI );
	expected = '3.142';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %.*f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3, 5.0 );
	expected = 'beep 5.000';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%.*f %.*f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3, PI, 3, PI );
	expected = '3.142 3.142 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%.*f %.*f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 10, PINF, 10, NINF );
	expected = 'infinity -infinity baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%0.*f %0.*f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 10, PINF, 10, NINF );
	expected = 'infinity -infinity baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%.*f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 4, NaN );
	expected = 'nan';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%0.*f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 4, NaN );
	expected = 'nan';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`g` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%g';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PI );
	expected = '3.14159';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %g';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 1.0003212e-10 );
	expected = 'beep 1.00032e-10';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%g %g baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PI, 1.0003212e-10 );
	expected = '3.14159 1.00032e-10 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`G` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%G';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PI );
	expected = '3.14159';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%3.G';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 100 );
	expected = '1E+02';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %G';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 1.0003212e-10 );
	expected = 'beep 1.00032E-10';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%G %G baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PI, 1.0003212e-10 );
	expected = '3.14159 1.00032E-10 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`G` specifier, alternate form)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%#G';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PI );
	expected = '3.14159';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%#3.G';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 100 );
	expected = '1.E+02'; // always contains a decimal point!
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %#G';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 1.0003212e-10 );
	expected = 'beep 1.00032E-10';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%#G %#G baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PI, 1.0003212e-10 );
	expected = '3.14159 1.00032E-10 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`f` specifier, minimum width)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%12f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14 );
	expected = '    3.140000';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %12f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.0 );
	expected = 'beep     5.000000';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`f` specifier, decimal precision)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%.3f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14 );
	expected = '3.140';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%.3f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PI );
	expected = '3.142';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %.3f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.0 );
	expected = 'beep 5.000';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`f` specifier, minimum width, decimal precision)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%8.3f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14 );
	expected = '   3.140';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %8.3f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.0 );
	expected = 'beep    5.000';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%8.3f %.3f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14, 5.0 );
	expected = '   3.140 5.000 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%10.10f %10.10f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PINF, NINF );
	expected = '  infinity  -infinity baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%8.4f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, NaN );
	expected = '     nan';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`f` specifier, minimum width, left-justified, decimal precision)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%-8.3f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14 );
	expected = '3.140   ';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %-8.3f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5.0 );
	expected = 'beep 5.000   ';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%-8.3f %.3f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3.14, 5.0 );
	expected = '3.140    5.000 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%-10.10f %10.10f baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, PINF, NINF );
	expected = 'infinity    -infinity baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%-8.4f';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, NaN );
	expected = 'nan     ';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`b` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = '11';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 101';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%b %b baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3, 5 );
	expected = '11 101 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`b` specifier, alternate form)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%#b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = '11';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %#b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 101';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%#b %#b baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3, 5 );
	expected = '11 101 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`b` specifier, minimum width)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%12b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = '          11';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %12b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep          101';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`b` specifier, minimum width, left-justified)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%-12b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = '11          ';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %-12b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 101         ';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`b` specifier, minimum width,  zero-padded)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%012b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 3 );
	expected = '000000000011';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %012b';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 000000000101';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`o` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%o';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = '14';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %o';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 5';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%o %o baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 8, 9 );
	expected = '10 11 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`o` specifier, alternate form)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%#o';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = '014';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %#o';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 05';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%#o %#o baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 8, 9 );
	expected = '010 011 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`x` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%x';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = 'c';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %x';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 5';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%x %x baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 14, 15 );
	expected = 'e f baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`x` specifier, alternate form)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%#x';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = '0xc';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %#x';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 0x5';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%#x %#x baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 14, 15 );
	expected = '0xe 0xf baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`X` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%X';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = 'C';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %X';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 5';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%X %X baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 14, 15 );
	expected = 'E F baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`X` specifier, alternate form)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%#X';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = '0XC';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %#X';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 5 );
	expected = 'beep 0X5';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%#X %#X baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 14, 15 );
	expected = '0XE 0XF baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`u` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%u';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = '12';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %u';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, -5 );
	expected = 'beep 4294967291';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%u %u baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 14, 15 );
	expected = '14 15 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`e` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%e';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = '1.200000e+01';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %e';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, -5 );
	expected = 'beep -5.000000e+00';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%e %e baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 14, 15 );
	expected = '1.400000e+01 1.500000e+01 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`e` specifier, minimum width, precision)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%12.2e';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = '    1.20e+01';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %12.2e';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, -5 );
	expected = 'beep    -5.00e+00';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%12.2e %12.2e baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 14, 15 );
	expected = '    1.40e+01     1.50e+01 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`E` specifier)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%E';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = '1.200000E+01';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %E';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, -5 );
	expected = 'beep -5.000000E+00';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%E %E baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 14, 15 );
	expected = '1.400000E+01 1.500000E+01 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`E` specifier, minimum width, precision)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%12.2E';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 12 );
	expected = '    1.20E+01';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = 'beep %12.2E';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, -5 );
	expected = 'beep    -5.00E+00';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%12.2E %12.2E baz';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 14, 15 );
	expected = '    1.40E+01     1.50E+01 baz';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});

tape( 'the function returns a formatted string (`s` specifier, positional arguments)', function test( t ) {
	var expected;
	var tokens;
	var actual;
	var str;

	str = '%2$s %1$s!';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'World', 'Hello' );
	expected = 'Hello World!';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%2$s %1$s %1$s!';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'World', 'Hello' );
	expected = 'Hello World World!';
	t.strictEqual( actual, expected, 'returns expected output' );

	str = '%3$s %2$s %1$s!';
	tokens = formatTokenize( str );
	actual = formatInterpolate( tokens, 'C', 'B', 'A' );
	expected = 'A B C!';
	t.strictEqual( actual, expected, 'returns expected output' );

	t.end();
});
