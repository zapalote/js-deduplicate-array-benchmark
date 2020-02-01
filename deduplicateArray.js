// A quick benchmark of some solutions to deduplicate an array
// see https://medium.com/@miguel.albrecht/performance-of-javascript-array-ops-2690aed47a50
// by Miguel Albrecht (zapalote.com
//
// Update: run also worst case scenario, large array with no duplicates at all.

testMethod = (array, method, assertedLength) => {
 let t = Date.now();
 let r = method(array);
 t = Date.now() - t;
 if(r.length != assertedLength)
   console.log("WRONG "+method.name+' '+r.slice(0,10));
 else
   console.log(`${method.name}: ${t} ms.`);
}

useFilter = (arr) => {
 return arr.filter((elem, pos, array) => {
   return array.indexOf(elem) == pos;
 });
}

useSet = (arr) => {
 return [...new Set(arr)];
}

useReduce = (arr) => {
 return arr.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
}

useForIncludes = (arr) => {
 let uniq = [];
 for (val of arr) {
   if(!uniq.includes(val)) uniq.push(val);
 }
 return uniq;
}

useAssociative = (arr) => {
 let uniq = [];
 for (val of arr) {
   uniq[val] = 0;
 }
 return [...Object.keys(uniq)];
}

// Scenario 1: lots of duplicates
let iter = 1000000;
let strings = ['Paris','New York','Paris','Berlin','Mumbai','San Diego','Berlin'];
let ar = [];

for(let i=0; i<iter; i++){
  ar.push(...strings);
}

console.log("S1 array length " + ar.length);
testMethod(ar, useFilter, 5);
testMethod(ar, useSet, 5);
testMethod(ar, useReduce, 5);
testMethod(ar, useForIncludes, 5);
testMethod(ar, useAssociative, 5);

// Scenario 2: hardly any or no duplicates at all
iter = 50000;
ar = [];

for(let i=0; i<iter; i++){
   ar.push(i);
}

console.log("S2 array length " + ar.length);
testMethod(ar, useFilter, iter);
testMethod(ar, useSet, iter);
testMethod(ar, useReduce, iter);
testMethod(ar, useForIncludes, iter);
testMethod(ar, useAssociative, iter);
