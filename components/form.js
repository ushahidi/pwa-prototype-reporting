import React from "react";
import Link from "next/link";

export default class Form extends React.Component {
  state = {
    title: "",
    description: "",
    textField: ""
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.setState({
      title: "",
      description: "",
      textField: ""
    });
    this.props.onChange({
      title: "",
      Description: "",
      textField: ""
    });
  };

  render() {
    return (
      
      <form>
      <div>
        <label for = "title" >Title</label> 
        <input
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={e => this.change(e)}
        />
        </div>
       
        <div>
        <label for = "description" >Description</label> 
        <input
          name=""description
          
          placeholder="Description"
          value={this.state.description}
          onChange={e => this.change(e)}
        />
        </div>
        <div>
        <label for = "textField" >Text Field</label> 
        <input
          name="textField"
          placeholder="Text Field"
          value={this.state.textField}
          onChange={e => this.change(e)}
        />
        </div>
        <div>
        <button onClick={e => this.onSubmit(e)}>Submit</button>
        </div>
      </form>
      
    );
  }
}
