import { stringify } from 'querystring';
import React, { Component } from 'react';
import "../../../styles/ProjectItems.scss";

class Projects extends React.Component<any, {name : string, description: string, author: string}> {

    constructor(props : {name : string, description: string, author: string}) {
        
        super(props);
         this.state = {
            name : props.name,
            description: props.description,
            author: props.author
        }

    }
    handleChange = (event : any) => {
        this.setState({name: event.target.value});
        this.setState({description: event.target.value});
        this.setState({author: event.target.value});
    };
    render() {
        return (
            <div className = "ProjectItem"> 
                <button className="ProjectItemHeader"> {this.state.name} </button>
                <p className = "ProjectItemDescription"> {this.state.description} </p>
                <button className = "ProjectItemAuthor"> {this.state.author} </button>  
                <button className = "ProjectItemEdit"> Edit </button>
                <button className = "ProjectItemDelete"> Delete </button>   
            </div>

        )
    }
}

export default Projects;