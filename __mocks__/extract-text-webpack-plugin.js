// @flow

const ExtractTextPlugin = jest.genMockFromModule("extract-text-webpack-plugin");

ExtractTextPlugin.extract = extract =>
  // return the extract object to store in snapshot
  ({ extract });

module.exports = ExtractTextPlugin;
