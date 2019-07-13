import React from "react";
import Link from "next/link";

export default class Form extends React.Component {
  state = {
    title: "",
    description: "",
    textField: ""
  };

  // Make state targets equal to the value of input fields
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  
  // Handler for when the submit button is pressed
  onSubmit = e => {
    e.preventDefault();

    console.log(this.state);

    // Make a post request to Ushahidi sever
    fetch("https://rominacsvsms.ushahidi.io/posts/create/14", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(`Success!!! \n ${data}`);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      title: "",
      description: "",
      textField: ""
    });
  };

  render() {
    return (
      <form>
        <div>
          <label for="title">Title</label>
          <input
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={e => this.change(e)}
          />
        </div>

        <div>
          <label for="description"> Description</label>
          <input
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={e => this.change(e)}
          />
        </div>
        <div>
          <label for="textField">Text Field</label>
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
