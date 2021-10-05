import React from 'react';
import { Form, Input} from 'antd';
import axios from 'axios';
//import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class CreateNotesForm extends React.Component 
{

    constructor(props) {
        super(props);
        this.state = {email: '', title: '', content: '', counter: 0,};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidUpdate() {
      let x = this.props.isEditing;
      if(x && this.state.counter === 0) {
        axios.get(`https://notes-info.azurewebsites.net/notes/${this.props.noteId}`).then(res => 
        this.setState({"email" : res.data.email, "title": res.data.title, "content": res.data.content}));
        x = false;
        this.setState({counter: 10});
      }
    }

    handleSubmit(event) {
      //  event.preventDefault();
        //console.log(this.state.content, this.state.email, this.state.title);
        const user = {
            "email":window.sessionStorage.getItem("mail"),
            "title":this.state.title,
            "content":this.state.content,
            
        };

        if(this.props.isEditing) {
       axios.put(`https://notes-manipulation.azurewebsites.net/notes/${this.props.noteId}`, user).then(response => {
            console.log(response);
        })
        ;
        this.setState({counter: 0}); 
        // this.props.history.replace("http://localhost:3000/dashboard");
        // //this.props.history.push("/dashboard");
        // this.props.history.go();
        window.location.href = "http://localhost:3000/dashboard";


        } else {


        axios.post("https://notes-manipulation.azurewebsites.net/notes", user).then(response => {
            //this.setState({[this.state.isLoggedIn]: true});
            console.log(response);

        })
        ;
      }
      this.setState({counter: 0});  //settiing counter to 0 as Here I am sending post not put

    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
          
        return (
            <div>
            

            <div className="row">
            <h5 style={{marginTop:"50px",marginLeft:"3%"}}>Hey, add a note?</h5>
            <div className="col s13" style={{textAlign:"center"}}>
           
              <form onSubmit={this.handleSubmit} >
            
                <Form.Item className="input-field col s4" style={{
                marginTop:"10%"
               }}>
                  <i className="material-icons prefix">title</i>
                  <Input name="title" type="text" id="title" value={this.state.title} onChange={this.handleInputChange}/>
                  <label>Title</label>
                </Form.Item>
                
                <Form.Item className="input-field col s5" style={{
                 marginTop:"10%"}}>
                <i className="material-icons prefix">text_fields</i>
                <textarea name="content" type="text" id="content" value={this.state.content} onChange={this.handleInputChange}/>
                <label>Content</label>
              </Form.Item>
 
              <div/>
              <Form.Item className="button">
            
            <Button style={{
            marginTop:"11%", marginLeft:"25px"}}
              variant="contained"
              color="primary"
              type="Submit" onSubmit={this.handleSubmit}
              endIcon={<Icon>save</Icon>}
            >
              Save
            </Button>
            </Form.Item>
            
                </form>
                </div>
               
 
          </div>
            


            
        </div>
        );
    }
}

export default CreateNotesForm;