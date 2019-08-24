const base_url = process.env.base_url;
const form_id = process.env.form_id;
const scopes = [
  'posts',
  'country_codes',
  'media',
  'forms',
  'api',
  'tags',
  'savedsearches',
  'sets',
  'users',
  'stats',
  'layers',
  'config',
  'messages',
  'notifications',
  'webhooks',
  'contacts',
  'roles',
  'permissions',
  'csv'
].join(" ");
const fetchBearerToken = () => {
  const tokenRequest = {
    scope: scopes,
    client_secret: process.env.client_secret,
    client_id: process.env.client_id,
    grant_type: "client_credentials"
  };
  return fetch(base_url + "/oauth/token", {
    method: "POST",
    body: JSON.stringify(tokenRequest),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.error(err));
};

const fetchFormFields = () => {
  return fetch(
    base_url +
      "/api/v3/forms/" +
      form_id +
      "/attributes?order=asc&orderby=priority"
  ).then(response => {
    return response.json();
  })
  .catch(err => console.error(err));
};

// Make a post request to Ushahidi sever
const postFormData = (formData, access_token) => {
  let postData = {
    title: formData.title,
    content: formData.description,
    values: formData.values,
    form: {
      id: form_id
    }
  };
  
  return fetch(base_url + "/api/v3/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access_token}`
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
