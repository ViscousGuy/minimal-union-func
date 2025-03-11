// Create a deep equality function to compare objects and arrays
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// Create the union function
function union(arr1, arr2) {
  const result = [];

  function addUnique(item) {
    if (!result.some((el) => deepEqual(el, item))) {
      result.push(item);
    }
  }

  arr1.forEach(addUnique);
  arr2.forEach(addUnique);

  return result;
}

// Export the union function
module.exports = union;

// Run the function directly if executed as a script
if (require.main === module) {
  console.log(
    union(
      [1, 2, { name: "john" }, [{ name: "john" }]],
      [{ name: "john" }, [{ name: "john" }]]
    )
  );
}
