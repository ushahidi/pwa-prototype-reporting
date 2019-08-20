const baseUrl = process.env.baseUrl;
const form_id = process.env.form_id;
console.log(form_id);

const fetchBearerToken = () => {
  return fetch(baseUrl + "/oauth/token", {
    method: "POST",
    body: JSON.stringify({
      scope: "*",
      client_secret: process.env.client_secret,
      client_id: process.env.client_id,
      grant_type: "client_credentials" //replace it with client_credentials
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "Something went wrong, response code is",
          response.status
        );
      }
    })
    .catch(err => console.error(err));
};

const fetchFormFields = () => {
  return fetch(
    baseUrl +
      "/api/v3/forms/" +
      form_id +
      "/attributes?order=asc&orderby=priority"
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "Something went wrong, response code is",
          response.status
        );
      }
    })
    .catch(err => console.error(err));
};

// Make a post request to Ushahidi sever
const postFormData = (formData, access_token) => {
  return fetch(baseUrl + "/api/v3/posts", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    }
  })
    .then(response => {
      return response;
    })
    .catch(error => console.log(error));
};

module.exports = {
  fetchBearerToken,
  fetchFormFields,
  postFormData
};
