// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./mod.d.ts" />
function e(e){return"number"==typeof e}function r(e){var r,i="";for(r=0;r<e;r++)i+="0";return i}function i(e,i,a){var t=!1,n=i-e.length;return n<0||(function(e){return"-"===e[0]}(e)&&(t=!0,e=e.substr(1)),e=a?e+r(n):r(n)+e,t&&(e="-"+e)),e}var a=String.prototype.toLowerCase,t=String.prototype.toUpperCase;function n(r){var n,s,o;switch(r.specifier){case"b":n=2;break;case"o":n=8;break;case"x":case"X":n=16;break;default:n=10}if(s=r.arg,o=parseInt(s,10),!isFinite(o)){if(!e(s))throw new Error("invalid integer. Value: "+s);o=0}return o<0&&("u"===r.specifier||10!==n)&&(o=4294967295+o+1),o<0?(s=(-o).toString(n),r.precision&&(s=i(s,r.precision,r.padRight)),s="-"+s):(s=o.toString(n),o||r.precision?r.precision&&(s=i(s,r.precision,r.padRight)):s="",r.sign&&(s=r.sign+s)),16===n&&(r.alternate&&(s="0x"+s),s=r.specifier===t.call(r.specifier)?t.call(s):a.call(s)),8===n&&r.alternate&&"0"!==s.charAt(0)&&(s="0"+s),s}var s=Math.abs,o=String.prototype.toLowerCase,c=String.prototype.toUpperCase,p=String.prototype.replace,g=/e\+(\d)$/,l=/e-(\d)$/,f=/^(\d+)$/,d=/^(\d+)e/,h=/\.0$/,u=/\.0*e/,w=/(\..*[^0])0*e/;function b(r){var i,a,t=parseFloat(r.arg);if(!isFinite(t)){if(!e(r.arg))throw new Error("invalid floating-point number. Value: "+a);t=r.arg}switch(r.specifier){case"e":case"E":a=t.toExponential(r.precision);break;case"f":case"F":a=t.toFixed(r.precision);break;case"g":case"G":s(t)<1e-4?((i=r.precision)>0&&(i-=1),a=t.toExponential(i)):a=t.toPrecision(r.precision),r.alternate||(a=p.call(a,w,"$1e"),a=p.call(a,u,"e"),a=p.call(a,h,""));break;default:throw new Error("invalid double notation. Value: "+r.specifier)}return a=p.call(a,g,"e+0$1"),a=p.call(a,l,"e-0$1"),r.alternate&&(a=p.call(a,f,"$1."),a=p.call(a,d,"$1.e")),t>=0&&r.sign&&(a=r.sign+a),a=r.specifier===c.call(r.specifier)?c.call(a):o.call(a)}function v(e){var r,i="";for(r=0;r<e;r++)i+=" ";return i}var m=String.fromCharCode,k=Array.isArray;function y(e){return e!=e}function E(e){var r={};return r.specifier=e.specifier,r.precision=void 0===e.precision?1:e.precision,r.width=e.width,r.flags=e.flags||"",r.mapping=e.mapping,r}function x(e){var r,a,t,s,o,c,p,g,l,f,d,h,u;if(!k(e))throw new TypeError("invalid argument. First argument must be an array. Value: `"+e+"`.");for(c="",p=1,g=0;g<e.length;g++)if(t=e[g],"string"==typeof t)c+=t;else{if(r=void 0!==t.precision,!(t=E(t)).specifier)throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `"+g+"`. Value: `"+t+"`.");for(t.mapping&&(p=t.mapping),a=t.flags,l=0;l<a.length;l++)switch(s=a.charAt(l)){case" ":t.sign=" ";break;case"+":t.sign="+";break;case"-":t.padRight=!0,t.padZeros=!1;break;case"0":t.padZeros=a.indexOf("-")<0;break;case"#":t.alternate=!0;break;default:throw new Error("invalid flag: "+s)}if("*"===t.width){if(t.width=parseInt(arguments[p],10),p+=1,y(t.width))throw new TypeError("the argument for * width at position "+p+" is not a number. Value: `"+t.width+"`.");t.width<0&&(t.padRight=!0,t.width=-t.width)}if(r&&"*"===t.precision){if(t.precision=parseInt(arguments[p],10),p+=1,y(t.precision))throw new TypeError("the argument for * precision at position "+p+" is not a number. Value: `"+t.precision+"`.");t.precision<0&&(t.precision=1,r=!1)}switch(t.arg=arguments[p],t.specifier){case"b":case"o":case"x":case"X":case"d":case"i":case"u":r&&(t.padZeros=!1),t.arg=n(t);break;case"s":t.maxWidth=r?t.precision:-1,t.arg=String(t.arg);break;case"c":if(!y(t.arg)){if((o=parseInt(t.arg,10))<0||o>127)throw new Error("invalid character code. Value: "+t.arg);t.arg=y(o)?String(t.arg):m(o)}break;case"e":case"E":case"f":case"F":case"g":case"G":r||(t.precision=6),t.arg=b(t);break;default:throw new Error("invalid specifier: "+t.specifier)}t.maxWidth>=0&&t.arg.length>t.maxWidth&&(t.arg=t.arg.substring(0,t.maxWidth)),t.padZeros?t.arg=i(t.arg,t.width||t.precision,t.padRight):t.width&&(t.arg=(f=t.arg,d=t.width,h=t.padRight,u=void 0,(u=d-f.length)<0?f:f=h?f+v(u):v(u)+f)),c+=t.arg||"",p+=1}return c}export{x as default};
//# sourceMappingURL=mod.js.map