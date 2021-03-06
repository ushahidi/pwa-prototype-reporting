# pwa-prototype-reporting
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
This project started as an experimental prototype to migrate the functionality of Ushahidi survey submissions into a small standalone project that can be deployed anywhere and in the future could be linked to any ushahidi.io deployment chosen by the user.

# Offline support
- Supports loading the form while offline if you have used the app in the past
- Saving form responses while offline and syncing the response with the backend when the user is online

# Dynamic attribute loading
- Loads the deployment attributes for any ushahidi v3 form

# Getting set up for development

## Libraries/Packages/Dependencies

First you'll need nodejs installed,
npm takes care of the rest of our dependencies.


### Install, build and run a local dev server
1. Clone the repo

    ```git clone https://github.com/ushahidi/pwa-prototype-reporting.git```

2. Navigate to project root

    ```cd pwa-prototype-reporting```

3. Install Packages

    ``` npm install ```

4. Creating a dotenv file

    The app needs to point to the hostname where the backend expects to receive HTTP requests. This has to be set before building the client.

    In order to set up all that, Create a new file named ".env" and copy the contents of env.example into it. The .env file has to be placed in the application's root directory (at the same level as dotenv example).

    ```
    base_url= https://pwa-prototype.api.ushahidi.io/
    client_secret='35e7f0bca957836d05ca0492211b0ac707671261'
    client_id = 'ushahidiui' 
    form_id= 1
    ```

5. How to run this?

    To run the app run the command below in your terminal.

    ```npm run dev```


## Contributing to this project:

1. This project is built on Next.js. To learn more about Next.JS refer to [the official documentation of Next](https://nextjs.org/docs). 

2. ```master``` branch contains all the changes that has been released.

3. To contribute you can start working on any of the open issues and submit a pull request on a new branch.

4. If you have any suggestions you can open an issue regarding the same.


# Deployment to zeit
If you want to deploy this application to Zeit, you can 
- Create an account in zeit.co
- `npm install -g now`
- run `now` and login to it
- run `now` to deploy it

### Pending: add other deployment instructions
Heroku, Netlify etc.

## Contact

 If you're interested in contributing to this project, reach out to the community [here](https://gitter.im/ushahidi/Community)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="http://nidhikjha.github.io"><img src="https://avatars3.githubusercontent.com/u/39872794?v=4" width="100px;" alt="Nidhi Kumari"/><br /><sub><b>Nidhi Kumari</b></sub></a><br /><a href="https://github.com/ushahidi/pwa-prototype-reporting/commits?author=NidhiKJha" title="Code">💻</a> <a href="https://github.com/ushahidi/pwa-prototype-reporting/commits?author=NidhiKJha" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Angamanga"><img src="https://avatars3.githubusercontent.com/u/8624777?v=4" width="100px;" alt="Anna Iosif"/><br /><sub><b>Anna Iosif</b></sub></a><br /><a href="#ideas-Angamanga" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!