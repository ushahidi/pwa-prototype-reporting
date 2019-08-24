import React from "react";
import { fetchBearerToken, fetchFormFields, postFormData } from "./fetchCalls";

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      isFormEmpty: null,
      showError: false,
      dataPosted: false,
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

  isTokenValid(token) {
    let isValid = false;
    const currentTime = new Date().getTime();
    const tokenFetchTime = token.fetching_time;
    const expirationTime = token.expires_in;

    if (currentTime < tokenFetchTime + expirationTime) {
      isValid = true;
    }

    return isValid;
  }

  getToken() {
    return new Promise((resolve, reject) => {
      let token = JSON.parse(localStorage.getItem("Bearer Token"));
      // if offline and there is *any* token, we return OK
      // this is because the offline mode won't do authentication for fetch
      // so it only cares that there is *some* token.
      if (!navigator.onLine && token) {
        resolve(token);
        return;
      }

      if (!token || !this.isTokenValid(token)) {
        fetchBearerToken().then(data => {
          if (!data || data.error) {
            this.setState({
              showError: true
            });
            reject(data);
            return;
          }
          this.setState({
            token: { ...data, fetching_time: new Date().getTime() }
          });
          localStorage.setItem(
            "Bearer Token",
            JSON.stringify(this.state.token)
          );
          resolve(data);
        });
      } else {
        this.setState({ token: token });
        resolve(token);
      }
    });
  }

  getFormFields() {
    this.getToken().then(res => {
      // Fetch the data form fields from API, use it in state
      let formFields = JSON.parse(localStorage.getItem("Form Fields"));
      if (!formFields) {
        formFields = [];
      }
      if (formFields.length === 0) {
        fetchFormFields().then(data => {
          this.setState({
            formFields: data.results
          });
          localStorage.setItem(
            "Form Fields",
            JSON.stringify(this.state.formFields)
          );
        });
      } else {
        this.setState({
          formFields: formFields
        });
      }
    });
  }

  isOnlineEvent = e => {
    let failedPosts = [];

    let formDataArray = JSON.parse(
      localStorage.getItem("Failed Form Submission Data")
    );

    if (!formDataArray) {
      formDataArray = [];
    }

    formDataArray.map(formData => {
      postFormData(formData, this.state.token.access_token).then(response => {
        if (response && !response.ok) {
          failedPosts.push(formData);
        } else {
          this.setState({
            dataPosted: true
          });
        }
      });
    });

    if (failedPosts.length !== 0) {
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

  isObjEmpty(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
  }

  // Handler html For when the submit button is pressed
  onSubmit = e => {
    e.preventDefault();
    if (this.isObjEmpty(this.state.formData)) {
      this.setState({
        isFormEmpty: true
      });
      return;
    }

    this.setState({
      isFormEmpty: false
    });

    let formDataArray = [];
    if (navigator.onLine) {
      postFormData(this.state.formData, this.state.token.access_token).then(
        res => {
          this.setState({
            dataPosted: true
          });
        }
      );
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
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    });
  };

  // Create an array of elements to be rendered in the form
  FormInputs = props => {
    return props.fields.map(field => {
      const getInputName = () => {
        return field.type === "title" || field.type === "description"
          ? field.type
          : field.key;
      };

      return (
        <div key={field.key}>
          <label className="background" htmlFor={field.label}>
            {field.label}
          </label>
          <input
            className="input"
            type={field.input}
            name={getInputName()}
            placeholder={`Enter the ${field.type}`}
            onChange={e => this.change(e)}
            value={this.state.formData[getInputName()]}
          />
        </div>
      );
    });
  };

  render() {
    const FormEmptyAlert = props => {
      return props.isEmpty ? (
        <div>The form is empty, please fill before you submit.</div>
      ) : null;
    };
    const ErrorOccurredAlert = props => {
      return props.showError ? <div>An unexpected error occurred.</div> : null;
    };

    const DataPostedSuccess = props => {
      return props.posted ? <div>Data was posted successfully.</div> : null;
    };

    return (
      <div>
        <form onSubmit={(e)=> this.onSubmit(e) } >
          <this.FormInputs fields={this.state.formFields} />
          <div>
            <input type="submit" className="button" value="Submit"/>
          </div>
        </form>

        <FormEmptyAlert isEmpty={this.state.isFormEmpty} />
        <ErrorOccurredAlert showError={this.state.showError} />
        <DataPostedSuccess posted={this.state.dataPosted} />
      </div>
    );
  }
}
