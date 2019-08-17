# pwa-prototype-reporting
A playground for a PWA for reporting only purposes. This project started as an experimental prototype to migrate the functionality of Ushahidi survey submissions into a small standalone project that can be deployed anywhere and in the future could be linked to any ushahidi.io deployment chosen by the user.

# Offline support
- Supports loading the form while offline if you have used the app in the past
- Saving form responses while offline and syncing the response with the backend when the user is online

# Dynamic attribute loading
- Loads the deployment attributes for any ushahidi v3 form

# Getting set up for development

## Libraries/Packages/Dependencies

First you'll need nodejs installed,
npm takes care of the rest of our dependencies.

* nodejs v6

### Install, build and run a local dev server
1. Clone the repo

    ```git clone https://github.com/ushahidi/pwa-prototype-reporting.git```

2. Navigate to project root

    ```cd pwa-prototype-reporting```

4. Install Packages

    ``` npm install ```

## Creating a dotenv file
The app needs to point to the hostname where the backend expects to receive HTTP requests. This has to be set before building the client.

In order to set up all that, create a file at the location /var/www/pwa-prototype-reporting/.env . Use the following contents as an example:

```
BACKEND_URL=http://ushahidi-backend
   client_secret='35e7f0bca957836d05ca0492211b0ac707671261'
client_id = 'ushahidiui' 
```
## How to run this?

To run the app run the command below in your terminal.

```npm run dev```


### I'm a developer, should I contribute to Ushahidi 3.x?

Yes! Development moves pretty quickly but the tech stack is getting more and more stable. If you're keen to help build something awesome, [jump on board](https://www.ushahidi.com/support/get-involved)..

## Contributing to this project:

This project is built on Next.js. To learn more about Next.JS refer to [the official documentation of Next](https://nextjs.org/docs). 

1. Fork this repository to your own GitHub account and then clone it to your local device.

2. Install packages ```npm install```

3. Configure the env file.

3. Run ```npm run dev``` to run the app. The app will run on localhost:3000

4. ```Master``` branch contains all the changes that has been released.

4. To contribute you can start working on any of the open issues and submit a pull request on a new branch.

## Contact
 If you're interested in contributing to this project, reach out to the community [here](https://gitter.im/ushahidi/Community)
