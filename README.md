# tolu-brnch

A light-weight chat application

# Website

https://branch-chat-tolu.herokuapp.com

# Table of Contents

1. <a href="#hosted-app">Hosted App</a>
2. <a href="#api-routes">API Routes</a>
3. <a href="#built-with">Built With</a>
4. <a href="#getting-started">Getting Started</a>
5. <a href="#installation">Installation</a>
6. <a href="#deployment">Deployment</a>
7. <a href="#api-endpoints">API endpoints</a>
8. <a href="#author">Author</a>

## Hosted App

https://branch-chat-tolu.herokuapp.com

## API Routes

https://branch-chat-tolu.herokuapp.com/api/v1

## Built With

- [NextJS](https://nextjs.org/)
- [MongoDB](https://mongodb.com/)
- [Html]()
- [CSS]()
- [TailwindCSS](https://www.tailwindcss.com/)

## Getting Started

**Development**

To clone and run this application, you'll need [Git](https://git-scm.com) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/tolulope-od/tolu-brnch.git
```

Refer to the [.env.sample](.env.sample) file for the required environment variables to get the application up and running.

**Production**

This application's frontend is served on [this](https://branch-chat-tolu.herokuapp.com) url and accomodates two types of users; a **customer** and an **agent**. All types of users share the same simple login page. A sample admin login credential as it's stored in the database is:

```gherkin
username: agent-47
password: Password-47
```

## Installation

To run this application in development mode, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Enter the project directory
$ cd tolu-brnch

# Install dependencies
$ npm install

# Start the development server
$ npm run dev

```

When the development server is up and running (i.e displays a success message on your command line), you can test the server response by visiting the following URL in your browser:

`http://localhost:3000/`

## Deployment

To build out the source code of this project into a browser-friendly and easily depolyable module, an npm script has been provided for that. Simply run the build script and deploy to the platform of your choice

```bash
# cd into project directory
$ cd tolu-brnch/

# run build script
$ npm run build
```

## API endpoints

| Method   |                    Endpoint                     |                Description                 |        Access         |
| :------- | :---------------------------------------------: | :----------------------------------------: | :-------------------: |
| `POST`   |              `/api/v1/auth`              |       Login a user        |
| `POST`   |              `/api/v1/messages`              |           Send a message           | Customers & Agents |
| `GET`   |               `/api/v1/messages`                |             Get messages              |        Customers & Agents         |


## Author

- **Tolulope Odueke**
