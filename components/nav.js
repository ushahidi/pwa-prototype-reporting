import React from 'react'
import Link from 'next/link'

export default class Form extends React.Component {
  state = {
    title: "",
    description: "",
    textField: ""
  };

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
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
        <input
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={e => this.change(e)}
        />
        <br />
        <input
          name="textField"
          placeholder="Text Field"
          value={this.state.textField}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </form>
    );
  }
}


