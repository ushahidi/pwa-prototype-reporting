import React from "react";
import Link from "next/link";
import { fetchBearerToken, fetchFormFields, postFormData } from "./fetchCalls";

const baseUrl = process.env.baseUrl;

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
    let token = JSON.parse(localStorage.getItem("Bearer Token"));
    if (!token || !this.isTokenValid()) {
      fetchBearerToken().then(data => {
        if (data.error) {
          // TODO: Add error message for user
          return;
        }
        this.setState({
          token: { ...data, fetching_time: new Date().getTime() }
        })
      });
    } else {
      this.setState({ token: token });
    }
  }

  getFormFields() {
    // Fetch the data form fields from API, use it in state
    let formFields = JSON.parse(localStorage.getItem("Form Fields"));
    if (!(Array.isArray(formFields) && formFields.length)) {
      fetchFormFields().then(data =>
        this.setState({
          formFields: data.results
        })
      );
    } else {
      this.setState({
        formFields: formFields
      });
    }
  }

  isOnlineEvent = e => {
    let formDataArray = JSON.parse(
      localStorage.getItem("Failed Form Submission Data")
    );

    failedPosts = [];

    if (!formDataArray) {
      return;
    } else {
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
    }
  };

  componentDidMount() {
    this.getFormFields();
    this.getToken();
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem("Form Fields", JSON.stringify(this.state.formFields));
    localStorage.setItem("Bearer Token", JSON.stringify(this.state.token));
    window.addEventListener("online", this.isOnlineEvent);
  }

  // Handler html For when the submit button is pressed
  onSubmit = e => {
    e.preventDefault();
    let formDataArray = [];
    if (navigator.onLine) {
      postFormData(this.state.formData, this.state.token.access_token);
    } else {
      let formDataArray = JSON.parse(
        localStorage.getItem("Failed Form Submission Data")
      );
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
            value={this.state.formData[field.type]}
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
