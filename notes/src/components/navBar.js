import React from 'react';


class NavBar extends React.Component{

render()
{

    return (

        <nav>
        <div className="nav-wrapper indigo darken-2">
         <a href="/signup" className="brand-logo center"><i className="material-icons">note_add</i>Notes</a>
        </div>
      </nav>

    )
}



}

export default NavBar;
