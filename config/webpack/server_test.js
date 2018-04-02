// @flow
const serializer = require("jest-serializer-path");
const config = require("./server");

expect.addSnapshotSerializer(serializer);

it("matches snapshot", () => {
  expect(config).toMatchSnapshot();
});
