import BaseRouter from './routes';
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import NavBar from './components/navBar'

  // app.get('/cors', (req, res) => {
  //   res.set('Access-Control-Allow-Origin', '*');
  //   res.send({ "msg": "This has CORS enabled 🎈" })
  //   })
class App extends React.Component {

  render(){


    return (
      <div>
      <Router>
        <BaseRouter/>
        
      </Router>
      </div>
    );

  }

  
}

export default App;


