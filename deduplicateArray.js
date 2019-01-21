// A quick benchmark of some solutions to deduplicate an array
// see https://medium.com/@miguel.albrecht/performance-of-javascript-array-ops-2690aed47a50
// by Miguel Albrecht (zapalote.com)
let iter = 1000000;
let strings = ['Paris','New York','Paris','Berlin','Mumbai','San Diego','Berlin'];
let ar = [];

for(let i=0; i<iter; i++){
 for(s of strings){
   ar.push(s);
 }
}

testMethod = (array, method) => {
 let t = Date.now();
 let r = method(array);
 if(r.length != 5)
   console.log("WRONG "+method.name+' '+r.slice(10));
 return { name: method.name, t: Date.now() - t };
}

useFilter = (arr) => {
 return arr.filter((elem, pos, array) => {
   return array.indexOf(elem) == pos;
 });
}
let t1 = testMethod(ar, useFilter);

useSet = (arr) => {
 return [...new Set(arr)];
}
let t2 = testMethod(ar, useSet);

useReduce = (arr) => {
 return arr.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
}
let t3 = testMethod(ar, useReduce);

useForIncludes = (arr) => {
 let uniq = [];
 for (val of arr) {
   if(!uniq.includes(val)) uniq.push(val);
 }
 return uniq;
}
let t0 = testMethod(ar, useForIncludes);

useAssociative = (arr) => {
 let uniq = [];
 for (val of arr) {
   uniq[val] = 0;
 }
 return [...Object.keys(uniq)];
}
let t4 = testMethod(ar, useAssociative);

console.log("array length " + ar.length);
console.log(`${t1.name}: ${t1.t} ms.`);
console.log(`${t2.name}: ${t2.t} ms.`);
console.log(`${t3.name}: ${t3.t} ms.`);
console.log(`${t0.name}: ${t0.t} ms.`);
console.log(`${t4.name}: ${t4.t} ms.`);
