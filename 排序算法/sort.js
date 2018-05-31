
const sort = {}

// 冒泡排序
sort.bubble = function(arr) {
  const length = arr.length
  let temp
  let n = 0
  const start = new Date().getTime()
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  const end = new Date().getTime()
  console.log(end - start)
  return arr
}

// 选择排序
sort.selection = function(arr) {
  let min, temp
  const start = new Date().getTime()
  for (let i = 0; i <= arr.length - 2; i++) {
    min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        temp = arr[min]
        arr[min] = arr[j]
        arr[j] = temp
      }
    }
  }
  const end = new Date().getTime()
  console.log(end - start)
  return arr
}

function randomArr(n) {
  let arr = []
  for (let i = 0; i < n; i++) {
    arr[i] = Math.ceil(Math.random() * n)
  }
  return arr
}

// const arr = randomArr(10000)
// sort.bubble(arr)
// sort.selection(arr)

var p1 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fail')), 3000)
})

var p2 = new Promise((resolve, reject) => {
  // setTimeout(() => resolve(p1), 1000)
  resolve(p1);
})

p2.then(result => console.log(result)).catch(error => console.log(error))