import _ from 'lodash'

export const detectSums = (array) => {
  // if input array undefinded throw error else make string input into array
  !array ? sumErrors.notArray() : array = processString(array)

  // if input array length <= 2, return empty array
  if(array.length <= 2) return []

  // calc sums 
  let results = array.map((item, i) => {
    return [...calcSums(array, i)]
  }).flat()

  // filter out any arrays containing negative integers
  let filteredResults = results.filter(subArray => !checkForNegs(subArray))

  // remove redundant arrays
  for(let i = 0; i <= filteredResults.length-1; i++){
    let thisArray = filteredResults[i]
    removeRedundantArray(filteredResults, thisArray)
  };

  // construct sum objects
  let resultObjects = filteredResults.map(item => {
    return (
      {
        pA: item[0],
        pB: item[1],
        sum: item[2],
      }
    )
  })

  // sort sum objects in ascending order
  resultObjects = resultObjects.sort(compareObjectsSort)

  return resultObjects
}

const sumErrors = {
  notArray: function(){
    throw new Error('Input is not an array')
  },
  noSums: function(){
    throw new Error('No sums found')
  },
  notEnoughData: function(){
    throw new Error('Please enter at least three(3) points of data.')
  },
}

// process string input into array
export function processString(input){
  switch (typeof input) {
    case 'string':
          // strip string  
          input = input.replace(/\s/g,'')
          // split into array
          input = input.split('')
          // trim array to only contain data
          input = _.pull(input, '[', ',', ']', ' ')
          // convert string characters into numbers
          input = input.map(Number)
          // return modified input as array of numbers
          return input
  
    default:
      return input
  }
}

// checks array for negatives and returns bool
export function checkForNegs(arr){
  return arr.filter(item => item < 0).length > 0
}

// processes val to find sums
export function calcSums(arr, i){
  // element to check against
  let item = arr[i]
  // removes current item via array index matching and splice
  let remainingVals = removeFromArray(arr, i)

  // adds item to each val of remaining values and returns sum
  let sums = addToEachInArray(remainingVals, item)

  // removes sums that are not present in the remaining values
  let filteredSums = sums.filter(el => remainingVals.includes(el))

  // return deep arrays of sums involving this element
  return [...returnResults(filteredSums, remainingVals, arr, i)]
}

// removes target from its array using index value
export function removeFromArray(arr, i){
  arr = arr.filter((el, ii) => {
    if(ii!==i){
        return true
      } else {
        return false
    } 
  })

  return arr
}

// adds target item to each value in passed array
export function addToEachInArray(arr, item){
  arr = arr.map(el => {
    let addItem = addNums(item)
    return addItem(el)
  })

  return arr
}

// curried function for adding values
export function addNums(a){ 
  return function(b){
      return a + b
  }
}

// processess sum equation into array and sorts values
export function returnResults(filteredSums, remainingVals, arr, i){
  // array variable to store results
  let output = []
  
  filteredSums = filteredSums.forEach((item2, ii) => {
    // index of working val
    let index1 = i;

    // checks if values of working val and 2nd addend indexes are equal. 
    // if true, returns index of the value from remaining vals, plus one, instead. 
    // if false, returns 2nd addend from original array 
    let index2 = arr[i] === filteredSums[ii] - arr[i] ? remainingVals.indexOf(filteredSums[ii] - arr[i])+1 : arr.indexOf(filteredSums[ii] - arr[i]);
    
    // index of sum in original array
    let index3 = arr.indexOf(filteredSums[ii])

    // sorts addends to be ascending order
    let addends = [index1, index2]
    addends = addends.sort()

    // pushes sorted array to output variable
    output.push([addends[0], addends[1], index3])
  })

  // return sorted arrays of results
  return output
}

// removes redundant array from parent array via splice and returns modified array
export function removeRedundantArray(arr, thisArray){
  arr.forEach((item, i) => {
    if(thisArray !== item && arrayIsRedundant(thisArray, item)){
      arr.splice(i, 1)
    }
  })

  return arr
}

//compares array data and returns true if same sum. 
export function arrayIsRedundant(arr1, arr2){
  return (arr1[0] + arr1[1]) === (arr2[0] + arr2[1])
}

// compares 1st and 2nd vals of objects for sorting 
export function compareObjectsSort(obj1, obj2){
  return (obj1.pA <= obj2.pA && obj1.pB <= obj2.pB) ?  -1 : 1
}

export function calculateResult(input) {
  const parsedInput = input.split(',').map(i => parseInt(i.trim(), 10));
  let error = null;
  let result = '';
  try {
    result = detectSums(input);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error }
}
