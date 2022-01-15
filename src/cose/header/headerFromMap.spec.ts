import { headerFromMap } from "./headerFromMap";

test("it finds the kid", () => {
  const map = new Map();
  map.set(4, "some_kid");

  expect(headerFromMap(map, 4)).toBe("some_kid");
});

test("throws error when no kid in map", () => {
  expect(() => {
    headerFromMap(new Map(), 4);
  }).toThrow("Map doesn't have key 4");
});
