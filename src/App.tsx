import React from 'react';
import logo from './logo.svg';
import './App.less';
import { useAuth } from 'context/auth-context';
import { Authenticated } from './authenticated-app'
import { Unauthenticated } from './unauthenticated-app'
import { ErrorBoundary } from 'components/error-boundary';
import {FullPageErrorFallback} from 'components/lib'
function App() {
  const { user } = useAuth()
  console.log('user: ', user);
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      {user ? <Authenticated /> : <Unauthenticated />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
