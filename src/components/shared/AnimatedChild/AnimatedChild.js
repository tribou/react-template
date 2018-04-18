// @flow
type Props = {
  children: React$Element<*>
};

// No transition animations on web for now
const App = (props: Props) => props.children;

export default App;
