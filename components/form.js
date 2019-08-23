import React from "react";
import { fetchBearerToken, fetchFormFields, postFormData } from "./fetchCalls";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      tempData: {},
      token: {
        accessToken: "",
        expiresIn: 0,
        refreshToken: "",
        tokenType: ""
      },
      formFields: [],
      formData: {}
    };
  }

  isTokenValid() {
    let isValid = false;

    const currentTime = new Date().getTime();
    const tokenFetchTime = this.state.token.fetching_time;
    const expirationTime = this.state.token.expires_in;

    if (currentTime < tokenFetchTime + expirationTime) {
      isValid = true;
    }

    return isValid;
  }


  getToken() {
    return new Promise((resolve, reject) => {
      let token = JSON.parse(localStorage.getItem("Bearer Token"));
      if (!token || !this.isTokenValid()) {
        fetchBearerToken().then(data => {
          if (!data || data.error) {
            // TODO: Add error message for user
            reject(data);
            return;
          }
          this.setState({
            token: { ...data, fetching_time: new Date().getTime() }
          })
          localStorage.setItem("Bearer Token", JSON.stringify(this.state.token));
          resolve(data);
        });
      } else {
        this.setState({ token: token });
        resolve(token);
      }
    }) 
  }

  getFormFields() {
    this.getToken().then(response => {
      // Fetch the data form fields from API, use it in state
      let formFields = JSON.parse(localStorage.getItem("Form Fields"));
      if (!(Array.isArray(formFields) && formFields.length)) {
        fetchFormFields().then(data =>
          this.setState({
            formFields: data.results
          })
        );
        localStorage.setItem("Form Fields", JSON.stringify(this.state.formFields));
      } else {
        this.setState({
          formFields: formFields
        });
      }
    }).catch(err => {
      console.error("Could not get an access token from localStorage or the server");
    })
  }

  isOnlineEvent = e => {
    let formDataArray = JSON.parse(
      localStorage.getItem("Failed Form Submission Data")
    );

    let failedPosts = [];
    if (!formDataArray) {
      formDataArray = [];
    }
    
    formDataArray.map(formData => {
      postFormData(formData, this.state.token.access_token).then(response => {
        if (!response.ok) {
          failedPosts.push(formData);
        }
      });
    });

    if (failedPosts.length === 0) {
      localStorage.setItem(
        "Failed Form Submission Data",
        JSON.stringify(failedPosts)
      );
    } else {
      localStorage.removeItem("Failed Form Submission Data");
    }
  };

  componentDidMount() {
    this.getFormFields();
  }

  componentDidUpdate(prevProps, prevState) {
    window.addEventListener("online", this.isOnlineEvent);
  }

  // Handler html For when the submit button is pressed
  onSubmit = e => {
    e.preventDefault();
    let formDataArray = [];
    if (navigator.onLine) {
      postFormData(this.state.formData, this.state.token.access_token);
    } else {
      formDataArray = JSON.parse(
        localStorage.getItem("Failed Form Submission Data")
      );
      if (!formDataArray) {
        formDataArray = [];
      }
      formDataArray.push(this.state.formData);
      localStorage.setItem(
        "Failed Form Submission Data",
        JSON.stringify(formDataArray)
      );
    }
    this.setState({
      formData: {}
    });
  };

  // Make state targets equal to the value of input fields
  change = e => {
    let data = this.state.tempData;
    if (e.target.name === "title" || e.target.name === "description") {
      data = { ...data, [e.target.name]: e.target.value };
    } else {
      data = {
        ...data,
        values: {
          ...data.values,
          [e.target.name]: e.target.value
        }
      };
    }
    this.state.tempData = data;

    this.setState({
      formData: {
        ...this.state.formData,
        ...data
      }
    });
  };

  // Create an array of elements to be rendered in the form
  FormInputs = props => {
    return props.fields.map(field => {
      return (
        <div key={field.key}>
          <label className="background" htmlFor={field.label}>
            {field.label}
          </label>
          <input
            className="input"
            type={field.input}
            name={
              field.type === "title" || field.type === "description"
                ? field.type
                : field.key
            }
            placeholder={`Enter the ${field.type}`}
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
          <button className="button" onClick={e => this.onSubmit(e)}>
            Submit
          </button>
        </div>
      </form>
    );
  }
}
