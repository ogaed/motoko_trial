import { useState } from 'react';
// import { motoko_backend } from 'declarations/motoko_backend';
import { motoko_backend } from "../../declarations/motoko_backend";
import Login from './routes/Login';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Register from './routes/Register';
import Navbar from './components/Navbar';
import Dashboard from './routes/Dashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route 
              path='/dashboard' 
              element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )

}
export default App;

// function App() {
//   const [greeting, setGreeting] = useState('');

//   function handleSubmit(event) {
//     event.preventDefault();
//     const name = event.target.elements.name.value;
//     motoko_backend.greet(name).then((greeting) => {
//       setGreeting(greeting);
//     });
//     return false;
//   }

//   return (
//     <main>
//       <img src="/logo2.svg" alt="DFINITY logo" />
//       <br />
//       <br />
//       <form action="#" onSubmit={handleSubmit}>
//         <label htmlFor="name">Enter your name: &nbsp;</label>
//         <input id="name" alt="Name" type="text" />
//         <button type="submit">Click Me!</button>
//       </form>
//       <section id="greeting">{greeting}</section>
//     </main>
//   );
// }

// export default App;
