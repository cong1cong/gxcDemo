// var a = {b:1,c:2}
// var newA = a
// newA = {b:2,c:3}
// console.log(newA)
// console.log(a)

// // 这个深拷贝方法的缺陷就是忽略了undefined、symbol和函数
// const obj = {
//     name: 'A',
//     name1: undefined,
//     name3: function() {},
//     name4:  Symbol('A')
// }
// const obj2 = JSON.parse(JSON.stringify(obj));
// console.log(obj2); // {name: "A"}


// 手写循环递归深拷贝
function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
    if (typeof obj !== "object") return obj;
    // 是对象的话就要进行深拷贝
    if (hash.get(obj)) return hash.get(obj);
    let cloneObj = new obj.constructor();
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, cloneObj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 实现一个递归拷贝
        cloneObj[key] = deepClone(obj[key], hash);
      }
    }
    return cloneObj;
  }
  