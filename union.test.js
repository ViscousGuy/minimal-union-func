const union = require("./union");

test("handles primitive values", () => {
  expect(union([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]);
  expect(union(["a"], ["b"])).toEqual(["a", "b"]);
  expect(union([1], ["1", 1])).toEqual([1, "1"]);
});

test("handles objects and nested objects", () => {
  expect(union([{ a: { b: 10 } }], [{ a: { b: 20 } }])).toEqual([
    { a: { b: 10 } },
    { a: { b: 20 } },
  ]);
  expect(
    union(
      [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, 2],
      [{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, "2"]
    )
  ).toEqual([{ b: 10, c: { z: { t: 5, _t: 5 }, f: [4] } }, 2, "2"]);
});

test("handles empty arrays", () => {
  expect(union([], [1, 2, 3])).toEqual([1, 2, 3]);
  expect(union([1, 2, 3], [])).toEqual([1, 2, 3]);
});

test("handles mixed types", () => {
  expect(union([1, "1", true], [false, 1, "1"])).toEqual([1, "1", true, false]);
});
