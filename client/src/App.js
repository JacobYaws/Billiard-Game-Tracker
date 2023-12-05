import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/NavBar/NavBar';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
// import {LobbyContainer, LobbySidebar} from './components/Lobby/Lobbycomponents';
import Game from './pages/Game';
// import Gamestart from './pages/Gamestart';

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
      <main>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/lobby/:lobbyId" component={Lobby} />
          {/* <Route 
          // path="/lobbies/:lobbyId" 
          element={<Lobby />} /> */}
          <Route exact path="/game" component={Game} />
          <Route path="/users/:userId"/>
          <Route render={() => <h1 className='display-2'>Wrong Page!</h1>} />
          </Switch>
    </main>

      </>
    </Router>
    </ApolloProvider>

  );
}

export default App;