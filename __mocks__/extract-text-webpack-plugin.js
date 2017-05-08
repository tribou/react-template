// @flow

const ExtractTextPlugin = jest.genMockFromModule('extract-text-webpack-plugin')

ExtractTextPlugin.extract = (extract) => {

  // return the extract object to store in snapshot
  return { extract }

}

module.exports = ExtractTextPlugin
