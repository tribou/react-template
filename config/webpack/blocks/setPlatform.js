// @flow

function setPlatform (platform/* : Platform */) {

  const blockFunction = (context/* : Object */, config/* : Object */) => {}

  blockFunction.pre = context => {

    // eslint-disable-next-line no-param-reassign
    context.platform = platform

  }

  return blockFunction

}


module.exports = setPlatform
