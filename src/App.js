import React from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Login from './componets/login'
import FriendList from './componets/friendList'
import AddFriend from './componets/addFriend'
import Logout from './componets/logout'
function App() {
  return (
    <div className="App">
      <div>
      <h1>
        friends
        </h1>
        <nav>
          <a href='/'>Login</a>
          <a href='/friendList'>Friend list</a>
          <a href='/addFriend'>Add Friend</a>
          <a href='/logout'>Logout</a>
        </nav>
      </div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/friendList' element={<FriendList/>}/>
        <Route path='/addFriend' element={<AddFriend/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </div>
  );
}

export default App;
