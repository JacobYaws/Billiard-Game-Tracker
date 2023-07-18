import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/NavBar';
import Home from './pages/Home';

// Creates a link to graphql at the /graphql endpoint.
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Exports a new ApolloClient that will include the graphql link and cache for localstorage.
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// This is the function to render the webpage. ApolloProvider is setup to server the client. Switch is used to toggle between pages depending on the endpoint. 
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route render={() => <h1 className='display-2'>Wrong Page!</h1>} />
          </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;