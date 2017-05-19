// @flow
import React from 'react'
import { Link } from 'react-router'
import history from 'src/helpers/history'

type ReactProps = {
  to: Object,
  className?: any,
  children?: React$Element<any>,
};

type Props = ReactProps;

const LinkReplace = (props: Props): React$Element<any> => {

  return (
    <Link
      className={props.className}
      onClick={() => {

        if (props.to.state && props.to.query) {

          history.replace({
            pathname: props.to.pathname,
            state: props.to.state,
            query: props.to.query,
          })

        }

        else if (props.to.state) {

          history.replace({
            pathname: props.to.pathname,
            state: props.to.state,
          })

        }

        else if (props.to.query) {

          history.replace({
            pathname: props.to.pathname,
            query: props.to.query,
          })

        }

        else {

          history.replace({
            pathname: props.to,
            state: { modal: '' },
          })

        }

      }
    }

    >
      {props.children}
    </Link>
  )

}

export default LinkReplace
