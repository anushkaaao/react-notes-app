import React from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CreateNotesForm from './createNotes';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import { Redirect } from 'react-router';
//import { Redirect } from 'react-router';

class Dashboard extends React.Component 
{

  constructor() {
    super();
    this.state = {title: '', content: '', data: [],
    isEditing: false,
    noteId: ''};
    
    
}


    // state = {
    //   title:'',
    //   content:'',
    //   data: [],
    //   isEditing: false,
    //   noteId: ''
    // }

    
    componentWillMount() {

      //console.log("here");
      if(!sessionStorage.isLoggedIn){
        alert("please login first!");
        window.location.href='/login';
        }

       axios.get(`https://notes-info.azurewebsites.net/notes/email/${window.sessionStorage.getItem("mail")}`).then(
        response => this.setState({data: response.data})
        );
    }

     deletePost(id) {
       axios.delete(`https://notes-manipulation.azurewebsites.net/notes/${id}`).then(response=> window.location.reload());
   }

    editPost(id) {
    axios.get(`https://notes-info.azurewebsites.net/notes/`+id).then((res) =>{
    this.setState({'isEditing': true, "noteId": res.data.id,"title":res.data.title,"content":res.data.content});
  })
   }

   colorScheme(x) {
     return x.length;
   }


   logout() {
     window.sessionStorage.clear();
     window.location.href = "/login";
   }

     render() {
          
        return (
            <div id="container">

 
            <nav>
            <div className="nav-wrapper indigo darken-2">
             <a href="/dashboard" className="brand-logo center"><i className="material-icons">note_add</i>Notes</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li key="logout"><a href="/login"><i className="material-icons" onClick={this.logout}>input</i>Logout</a></li>
             
              </ul>
            </div>
          </nav>


          
                <CreateNotesForm isEditing={this.state.isEditing} noteId = {this.state.noteId} />

                <br/>
                {this.state.data.map((x) => 
                  <div key={x.id} style={{"padding": "10px"}}>
                    <div style={{"float": "left", "width":"60%"}}>
                  <div>
                    <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      
                      id="panel1a-header"
                    >
                      <Typography>{x.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor:"lavender"}} >
                      <Typography  >
                       {x.content}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
</div>
                
                    </div>
                    <div style={{"float": "right", "width": "40%"}}>
                      <IconButton aria-label="delete"  color="secondary" onClick={() => this.deletePost(x.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton aria-label="update"  color="primary" style={{color:"black"}} onClick={() => this.editPost(x.id)}>
                        <BorderColorIcon/>
                      </IconButton>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    
                   
                  </div>
                  
                  )
                }
                 
                     </div>
        );
    }
}

export default Dashboard;