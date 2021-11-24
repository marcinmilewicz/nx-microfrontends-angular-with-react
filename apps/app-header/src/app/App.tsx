import React from 'react';
import Header from './Header';

const defaultProps = {
  routes: [],
  onRouteClick: () => undefined,
};

const App = () => <Header {...defaultProps} />;

export default App;
