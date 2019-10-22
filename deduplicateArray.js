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

let times = [];

testMethod = (array, method) => {
 let t = Date.now();
 let r = method(array);
 if(r.length != 5)
   console.log("WRONG "+method.name+' '+r.slice(0, 10));
 times.push({ name: method.name, t: Date.now() - t });
}

useFilter = (arr) => {
 return arr.filter((elem, pos, array) => {
   return array.indexOf(elem) == pos;
 });
}
testMethod(ar, useFilter);

useSet = (arr) => {
 return [...new Set(arr)];
}
testMethod(ar, useSet);

useReduce = (arr) => {
 return arr.reduce((x, y) => x.includes(y) ? x : [...x, y], []);
}
testMethod(ar, useReduce);

useForIncludes = (arr) => {
 let uniq = [];
 for (val of arr) {
   if(!uniq.includes(val)) uniq.push(val);
 }
 return uniq;
}
testMethod(ar, useForIncludes);

useAssociative = (arr) => {
 let uniq = [];
 for (val of arr) {
   uniq[val] = 0;
 }
 return [...Object.keys(uniq)];
}
testMethod(ar, useAssociative);

justCopy = (arr) => {
 return arr.slice();
}
testMethod(ar, justCopy);

copyAndSort = arr => {
 return justCopy(arr).sort();
}
testMethod(ar, copyAndSort);

console.log("array length " + ar.length);
times.forEach(t => console.log(`${t.name}: ${t.t} ms.`));
