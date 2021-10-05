import React from 'react';
import { Form, Input} from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class LoginForm extends React.Component 
{

    constructor() {
      super();
        this.state = {email: '', password: '', isLoggedIn: false, loginPressed: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

   handleSubmit(event) {
        event.preventDefault();
        this.setState({loginPressed: true});
        const user = {
            "email":this.state.email,
            "password":this.state.password,
            // "isLoggedIn":this.state.isLoggedIn
        };

        

        axios.post("https://login-info.azurewebsites.net/login", user).then(response => {  
            if(response.data==="success"){
            this.setState({isLoggedIn: true});
            //console.log(response);
            window.sessionStorage.setItem("mail", this.state.email);
            window.sessionStorage.setItem("isLoggedIn",true);
           // console.log(this.state.loginPressed, this.state.isLoggedIn);
            this.props.history.push("/dashboard");
            }            
            else{
              this.setState({isLoggedIn: false});
              alert("Wrong credentials, please try again!");
              this.setState({email: '', password: ''});
            }
          
          
        })
        ;

    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
 

    render() {
          
        return (
            <div >
         
            <nav>
        <div className="nav-wrapper indigo darken-2">
         <a href="/login" className="brand-logo center"><i className="material-icons">note_add</i>Notes</a>
        </div>
      </nav>

           <div className="row">
           <div className="col s4">
          
             <form onSubmit={this.handleSubmit} style={{borderWidth:"2px",borderColor:"black",borderBlockWidth:"2px"}}>
            
               <Form.Item className="input-field col s12" style={{
               left:"100%", marginTop:"30%"
              }}>
                 <i className="material-icons prefix">email</i>
                 <Input name="email" type="email" id="mail" value={this.state.email} onChange={this.handleInputChange}/>
                 <label>Enter email</label>
               </Form.Item>
               
               <Form.Item className="input-field col s12" style={{
                left:"100%"}}>
               <i className="material-icons prefix">vpn_key</i>
               <Input name="password" type="password" id="pw" value={this.state.password} onChange={this.handleInputChange}/>
               <label>Enter password</label>
             </Form.Item>

             <div/>
             <Form.Item className="button">
           
           <Button style={{
            left:"110%",marginTop:"30px", marginLeft:"10px"}}
             variant="contained"
             color="primary"
             type="Submit" 
             endIcon={<Icon>send</Icon>}
           >
             Login
           </Button>
           </Form.Item>
           
               </form>
               </div>
              

         </div>
         <br/>
         <div style={{marginLeft:"36%"}} >
           Not registered?
           <Link to="/signup">   Sign Up</Link>
           </div>
         
        </div>
        );
    }
}

export default LoginForm;