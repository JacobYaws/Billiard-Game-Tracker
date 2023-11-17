import React, { useState } from 'react';
// import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Navbar, Nav, Container, Modal, Tab, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// Change these to imports of whatever page will be shown on the homepage
// import ThoughtList from '../components/ThoughtList';       
// import ThoughtForm from '../components/ThoughtForm';
// import Login from '../components/Login';
// import Signup from '../components/Signup';
// import UserList from '../components/UserList/UserList' uncomment for userList

// import { QUERY_USERS } from '../utils/queries';

const Home = () => {
  // const { loading, data } = useQuery(QUERY_USERS); Uncomment for userList
  // const users = data?.users || []; uncomment for userList
  const [showModal, setShowModal] = useState(false);

  return (
    // <main>
    //   <div className="flex-row justify-center">
    //     <div
    //       className="col-12 col-md-10 mb-3 p-3"
    //       style={{ border: '1px dotted #1a1a1a' }}
    //     >
    //       {/* <ThoughtForm /> */}
    //     </div>
    //     <div className="col-12 col-md-8 mb-3">
    //       <Button variant="success">Start a new game</Button>
        
    //       {/* {loading ? (
    //         <div>Loading...</div>
    //       ) : (
    //         <UserList
    //           users={users}
    //           title="Some Feed for Thought(s)..."
    //         />
    //       )} */}
    //       {Auth.loggedIn() ? (
    //             <Card style={{ width: '18rem' }}>
    //             {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
    //             <Card.Body>
    //               <Card.Title>Previous Match</Card.Title>
    //               <Card.Text>
    //                 Make this show the stats of the previous n (10) games, overall stats, handicap score, etc.
    //               </Card.Text>
    //               <Button variant="primary">Go somewhere</Button>
    //             </Card.Body>
    //           </Card>
    //           ) : (
    //             <Nav.Link >Login/Sign Up</Nav.Link>
    //           )}
    //     </div>
    //   </div>
    // </main>
      
      <>
      {Auth.loggedIn() ? (
        
      <Container fluid>
        
      <Button variant="success" onClick={() => setShowModal(true)}>Select a game to play</Button>

      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='game-selector-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='standard'>
          <Modal.Header closeButton>
            <Modal.Title id='game-selector'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='standard'>Standard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='nineball'>9-Ball</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to='/cutthroat' eventKey='cutthroat'>Cutthroat</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                {/* <LoginForm handleModalClose={() => setShowModal(false)} /> */}
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                {/* <SignUpForm handleModalClose={() => setShowModal(false)} /> */}
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    
      </Container>
      ) : (
        <Container fluid>
          Welcome to cutthroat. Please login or signup to start playing.
        </Container>
        
      )}
      </>
  );
};

export default Home;