# REST/GraphiQL Client

This project is a comprehensive REST and GraphiQL client built with modern web technologies. It allows users to perform and manage HTTP and GraphQL requests efficiently, with features like query editing, response handling, and history management.

## Deployment

You can access the deployed application at: - [REST/GraphiQL live](https://graphql-final-task.netlify.app/)

## Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NextJs](https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Screenshots

Here are some screenshots of the application in action:

<div align="center">
  <img src="https://github.com/user-attachments/assets/69d9d2f9-b10b-4a71-a2cf-c4fc932fd457" alt="app" width="500"/>
  <img src="https://github.com/user-attachments/assets/e75f767e-48ca-4a0e-af3d-46cae99b9dbf" alt="app-restclient" width="500"/>
  <img src="https://github.com/user-attachments/assets/cd07d05d-0d6a-4758-9dd0-161a010155ce" alt="app-history" width="500"/>
</div>

## Features

- **User Authentication**: Secure Sign In and Sign Up with client-side validation.
- **Token Management**: Automatic redirection to the Main page when the login token expires.
- **RESTful Client**: Functional query editor with prettifying, base64-encoded request body, and method selector for all valid HTTP verbs.
- **GraphiQL Client**: Functional query editor with prettifying, operational documentation explorer, and base64-encoded request body.
- **Response Handling**: Read-only response section displaying HTTP status and code information.
- **History Management**: Ability to navigate to previously executed HTTP and GraphQL requests with restored method, URL, body, headers, and variables.
- **Internationalization**: Support for multiple languages (i18n).
- **User Interface**: Sticky header for easy navigation and user-friendly error display.
- **Testing**: Comprehensive test coverage using Jest, with more than 80% coverage.

### How to run locally

1. Clone the repo

```sh
  git clone https://github.com/lustrochka/Graphiql-app.git
```

2. Install NPM packages

```sh
  npm install
```

3. Start project

```sh
  npm run dev
```
