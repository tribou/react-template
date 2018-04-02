# Component Structure

Every component should be composed according to the following structure:

```
src/components/
└── Sample
    ├── index.js
    ├── Sample.js
    ├── Sample_test.js
    └── Sample.style.css
```

The parts are defined and used as follows:

#### Component Directory

```
    src/components/
->  └── Sample
        ├── index.js
        ├── Sample.js
        ├── Sample_test.js
        └── Sample.style.css
```

A component is encapsulated by a parent directory of the same name.

#### Component Container

```
    src/components/
    └── Sample
---->   ├── index.js
        ├── Sample.js
        ├── Sample_test.js
        └── Sample.style.css
```

Every component requires a container which acts as an entry point to the
container. This is the file that is imported by `react-router` or other
components. A Component Container holds all of the redux logic to map the state
and action creators to the component's props as well as apply any selectors to
reduce the state. If the component does not require any redux or state mapping,
it should simply export the view component.

Component Containers ensure that each type of View Component is decoupled from
the redux state tree and can be standardized to accept the specific props
needed for rendering.

Here is an example Container with example state and action mappings:

```js
// @flow
import { connect } from "react-redux";
import type { RootReducerState } from "src/redux/modules";
import Todos from "./Todos";
import { setFilterCurrent, setFilterDone } from "src/redux/modules/todos";
import visibleTodos from "src/selectors/visibleTodos";

type StateProps = {
    +todos: Array<*>,
    +filter: string
};

function mapStateToProps(state: RootReducerState): StateProps {
    const { todos } = state;

    return {
        todos: visibleTodos(state),
        filter: todos.get("filter")
    };
}

type ActionProps = {
    setFilterCurrent: Function,
    setFilterDone: Function
};

export default connect(mapStateToProps, {
    setFilterCurrent,
    setFilterDone
})(Todos);

export type ReduxProps = StateProps & ActionProps;
```

If there is no state/container logic needed, here is an example container that
simply exports the view component:

```js
// @flow
import NotFound from "./NotFound";

export default NotFound;
```

This ensures that all components are imported uniformly by `react-router` and
other components.

#### Component Container Tests

```
    src/components/
    └── Sample
        ├── index.js
---->   ├── index_test.js
        ├── Sample.js
        ├── Sample_test.js
        └── Sample.style.css
```

Since all test files end in `_test.js`, tests can be created for container
components to verify that they are transforming the state according the the
props API required by the View Components. However, since FlowType provides
much of this validation and since selectors can be tested independently, these
may not be required unless custom logic is included in the Container.

#### View Component

```
    src/components/
    └── Sample
        ├── index.js
---->   ├── Sample.js
        ├── Sample_test.js
        └── Sample.style.css
```

A View Component is the traditional React component that exports a class or
stateless function which returns view elements according to the environment.
This is an incredibly powerful concept, because it allows the project to
include iOS and Android React Native components which can share the same
Container Components. Since the Containers have standardized the data props
required for rendering, View Components can focus on just implementing the view
elements needed by the platform.

#### View Component Tests

```
    src/components/
    └── Sample
        ├── index.js
        ├── Sample.js
---->   ├── Sample_test.js
        └── Sample.style.css
```

View Components can be easily tested using [Enzyme and Jest snapshotting][1].
Since this is incredibly easy to setup for view components and since an example
View Component test is created with the new component bootstrap script, it
should be done with most View Components by default.

Using [Enzyme][2] and [Jest][3] for snapshot testing enables shallow or full
rendering of the view elements into a JSON format which is then compared upon
subsequent runs to ensure the elements do not change during refactoring unless
the change is intended. If the change is intended and verified as correct, the
Jest tests can be run with a `-u` parameter to save the difference as a new
snapshot.

Here is an example snapshot test that can assert the view component handles its props API appropriately:

```js
// @flow

// Enzyme docs:
// http://airbnb.io/enzyme/docs/api/index.html

import React from "react";
import { shallow } from "enzyme";
import Template from "./Template";

it("<Template> renders the Template content", () => {
    const wrapper = shallow(<Template API_URL="" />);

    expect(wrapper).toMatchSnapshot();
});
```

Which produces the following snapshot that is saved in a `__snapshot__`
directory inside the component directory:

```js
exports[`test <Template> renders the Template content 1`] = `
<div
  className="template">
  Template
</div>
`;
```

#### Component CSS Module Styles

```
    src/components/
    └── Sample
        ├── index.js
        ├── Sample.js
        ├── Sample_test.js
---->   └── Sample.style.css
```

Web view component styles should be stored in [CSS Module][4] files ending in
`styles.css`.

#### React Native View Components

```
    src/components/
    └── Sample
        ├── index.js
        ├── Sample.js
        ├── Sample_test.js
---->   ├── Sample.android.js
---->   ├── Sample.ios.js
        └── Sample.style.css
```

React Native view components can be stored with a `.android.js` or `.ios.js`.
Since no View Component extension is specified in the Component Container
`import`, the React Native build process will automatically select the
appropriate component when building each platform. This enables easy sharing of
the container logic between Web and React Native platforms.

[1]: https://github.com/adriantoine/enzyme-to-json#usage
[2]: http://airbnb.io/enzyme/
[3]: https://facebook.github.io/jest/docs/tutorial-react.html
[4]: https://github.com/css-modules/css-modules
