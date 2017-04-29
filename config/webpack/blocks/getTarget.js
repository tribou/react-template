// @flow


function getTarget (target/* : string */) {

  return (context/* : Object */) => {

    return {
      target,
    }

  }

}


module.exports = getTarget
