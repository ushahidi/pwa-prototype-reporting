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