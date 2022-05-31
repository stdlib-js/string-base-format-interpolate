// Copyright (c) 2022 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./mod.d.ts" />
var e=function(e){return"number"==typeof e};function r(e){var r,i="";for(r=0;r<e;r++)i+="0";return i}var i=function(e,i,a){var t=!1,n=i-e.length;return n<0||(function(e){return"-"===e[0]}(e)&&(t=!0,e=e.substr(1)),e=a?e+r(n):r(n)+e,t&&(e="-"+e)),e},a=e,t=i,n=String.prototype.toLowerCase,s=String.prototype.toUpperCase;var o=function(e){var r,i,o;switch(e.specifier){case"b":r=2;break;case"o":r=8;break;case"x":case"X":r=16;break;default:r=10}if(i=e.arg,o=parseInt(i,10),!isFinite(o)){if(!a(i))throw new Error("invalid integer. Value: "+i);o=0}return o<0&&("u"===e.specifier||10!==r)&&(o=4294967295+o+1),o<0?(i=(-o).toString(r),e.precision&&(i=t(i,e.precision,e.padRight)),i="-"+i):(i=o.toString(r),o||e.precision?e.precision&&(i=t(i,e.precision,e.padRight)):i="",e.sign&&(i=e.sign+i)),16===r&&(e.alternate&&(i="0x"+i),i=e.specifier===s.call(e.specifier)?s.call(i):n.call(i)),8===r&&e.alternate&&"0"!==i.charAt(0)&&(i="0"+i),i};var c=function(e){return"string"==typeof e},p=e,l=Math.abs,g=String.prototype.toLowerCase,f=String.prototype.toUpperCase,d=String.prototype.replace,u=/e\+(\d)$/,h=/e-(\d)$/,w=/^(\d+)$/,b=/^(\d+)e/,v=/\.0$/,m=/\.0*e/,k=/(\..*[^0])0*e/;function y(e){var r,i="";for(r=0;r<e;r++)i+=" ";return i}var E=o,x=c,S=function(e){var r,i,a=parseFloat(e.arg);if(!isFinite(a)){if(!p(e.arg))throw new Error("invalid floating-point number. Value: "+i);a=e.arg}switch(e.specifier){case"e":case"E":i=a.toExponential(e.precision);break;case"f":case"F":i=a.toFixed(e.precision);break;case"g":case"G":l(a)<1e-4?((r=e.precision)>0&&(r-=1),i=a.toExponential(r)):i=a.toPrecision(e.precision),e.alternate||(i=d.call(i,k,"$1e"),i=d.call(i,m,"e"),i=d.call(i,v,""));break;default:throw new Error("invalid double notation. Value: "+e.specifier)}return i=d.call(i,u,"e+0$1"),i=d.call(i,h,"e-0$1"),e.alternate&&(i=d.call(i,w,"$1."),i=d.call(i,b,"$1.e")),a>=0&&e.sign&&(i=e.sign+i),i=e.specifier===f.call(e.specifier)?f.call(i):g.call(i)},$=function(e,r,i){var a=r-e.length;return a<0?e:e=i?e+y(a):y(a)+e},V=i,F=String.fromCharCode,C=isNaN,R=Array.isArray;function I(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}var T=function(e){var r,i,a,t,n,s,o,c,p;if(!R(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(s="",o=1,c=0;c<e.length;c++)if(a=e[c],x(a))s+=a;else{if(r=void 0!==a.precision,!(a=I(a)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+c+"`. Value: `"+a+"`.");for(a.mapping&&(o=a.mapping),i=a.flags,p=0;p<i.length;p++)switch(t=i.charAt(p)){case" ":a.sign=" ";break;case"+":a.sign="+";break;case"-":a.padRight=!0,a.padZeros=!1;break;case"0":a.padZeros=i.indexOf("-")<0;break;case"#":a.alternate=!0;break;default:throw new Error("invalid flag: "+t)}if("*"===a.width){if(a.width=parseInt(arguments[o],10),o+=1,C(a.width))throw new TypeError("the argument for * width at position "+o+" is not a number. Value: `"+a.width+"`.");a.width<0&&(a.padRight=!0,a.width=-a.width)}if(r&&"*"===a.precision){if(a.precision=parseInt(arguments[o],10),o+=1,C(a.precision))throw new TypeError("the argument for * precision at position "+o+" is not a number. Value: `"+a.precision+"`.");a.precision<0&&(a.precision=1,r=!1)}switch(a.arg=arguments[o],a.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(a.padZeros=!1),a.arg=E(a);break;case"s":a.maxWidth=r?a.precision:-1;break;case"c":if(!C(a.arg)){if((n=parseInt(a.arg,10))<0||n>127)throw new Error("invalid character code. Value: "+a.arg);a.arg=C(n)?String(a.arg):F(n)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(a.precision=6),a.arg=S(a);break;default:throw new Error("invalid specifier: "+a.specifier)}a.maxWidth>=0&&a.arg.length>a.maxWidth&&(a.arg=a.arg.substring(0,a.maxWidth)),a.padZeros?a.arg=V(a.arg,a.width||a.precision,a.padRight):a.width&&(a.arg=$(a.arg,a.width,a.padRight)),s+=a.arg||"",o+=1}return s};export{T as default};
//# sourceMappingURL=mod.js.map
