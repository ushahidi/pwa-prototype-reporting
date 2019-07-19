import React from 'react';
import Link from 'next/link';
 
export default class Form extends React.Component {
    constructor() {
        super();
        this.state = { token: '', formFields: [], formData: {} };
    }
 
    // Make state targets equal to the value of input fields
    change = e => {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value
            }
        });
    };
 
    // Fetch the data form fields from API, use it in state
    componentDidMount() {
        fetch(
            'https://rominacsvsms.api.ushahidi.io/api/v3/forms/14/attributes?order=asc&orderby=priority'
        )
            .then(res => res.json())
            .then(data => {
                this.setState({
                    formFields: data.results
                });
            });
 
        if (!this.state.token) {
            fetch('https://rominacsvsms.api.ushahidi.io/oauth/token', {
                method: 'POST',
                body: JSON.stringify({
                    scope: '*',
                    client_secret: '35e7f0bca957836d05ca0492211b0ac707671261',
                    client_id: 'ushahidiui',
                    grant_type: 'password',
                    password: 'hellohello',
                    username: 'menidhikjha@gmail.com'
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'large-auth-string'
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    this.setState({ token: data });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
 
    // Handler htmlFor when the submit button is pressed
    onSubmit = e => {
        e.preventDefault();
 
        // Make a post request to Ushahidi sever
        fetch('https://rominacsvsms.api.ushahidi.io/api/v3/posts', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:  `Bearer ${this.state.token.access_token}`
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
            formData: {}
        });
    };
 
    // Create an array of elemets to be rendered in the form
    FormInputs = props => {
        return props.fields.map(field => {
            return (
                <div key={field.key}>
                    <label htmlFor={field.label}>{field.label}</label>
                    <input
                        type={field.input}
                        name={field.label}
                        placeholder={`Enter the ${field.label}`}
                        value={this.state.formData[`${field.label}`]}
                        onChange={e => this.change(e)}
                    />
                </div>
            );
        });
    };
 
    render() {
        return (
            <form>
                <this.FormInputs fields={this.state.formFields} />
                <div>
                    <button onClick={e => this.onSubmit(e)}>Submit</button>
                </div>
            </form>
        );
    }
}
