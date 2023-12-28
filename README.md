# Data Graphs

[![Version](https://img.shields.io/github/v/tag/JakubKorytko/data-graphs?style=for-the-badge&label=version)](https://img.shields.io/github/v/tag/JakubKorytko/data-graphs?style=for-the-badge&label=version)
[![License](https://img.shields.io/github/license/JakubKorytko/data-graphs?style=for-the-badge)](https://img.shields.io/github/license/JakubKorytko/data-graphs?style=for-the-badge&label=license)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![React Testing-Library](https://img.shields.io/badge/-React_Testing_Library-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![PHPUnit](https://img.shields.io/badge/PHPUnit-white.svg?style=for-the-badge&logo=php&logoColor=%23777BB4)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![React Context](https://img.shields.io/badge/react_context-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Table of Contents

- [Data Graphs](#data-graphs)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Client installation](#client-installation)
    - [Server installation](#server-installation)
  - [Endpoints](#endpoints)
  - [Production build](#production-build)
    - [Build client](#build-client)
    - [Prepare server](#prepare-server)
  - [Tests](#tests)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [Contact](#contact)
  - [License](#license)
  - [TODO / Upcoming features](#todo--upcoming-features)

## Introduction

In an age of information overload, making sense of raw data has become a critical skill. Welcome to Data Graphs, your all-in-one solution for transforming mundane data sets into compelling visual stories.

In today's dynamic landscape, where data drives decision making across industries, the ability to effectively communicate insights is paramount. With Data Graphs, you can effortlessly create stunning data charts that not only reveal hidden patterns and trends, but also captivate your audience with visually compelling narratives.

## Prerequisites

**Note:** Versions stated below are the ones used during development. Other versions may work as well, but they have not been tested.

- [Node.js](https://nodejs.org/en/) `v20.10.0`
- [Yarn](https://yarnpkg.com/) `v1.22.21`
- [PHP](https://www.php.net/) `v8.2.4`
- [Composer](https://getcomposer.org/) `v2.5.5`
- [Laravel](https://laravel.com/) `v10.38.1`
- [Any database supported by Laravel](https://laravel.com/docs/10.x/database) `MariaDB v10.4.27 originally used`

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/JakubKorytko/data-graphs
    ```

1. Enter the project directory:

    ```bash
    cd data-graphs
    ```

**Note:** Install & run the client and the server apps (next steps) in separate terminals starting from the project directory.
Running the apps will freeze the terminal until you stop them.

### Client installation

1. Enter the client directory:

    ```bash
    cd client
    ```

1. Install dependencies:

    ```bash
    yarn install
    ```

1. Run the app in development mode:

    ```bash
    yarn dev
    ```

### Server installation

**Note:** The server app requires a database to work. Make sure you have one set up before proceeding and that it's running. You also need the database credentials for the environment variables.

1. Enter the server directory:

    ```bash
    cd server
    ```

1. Run the setup script:

    ```bash
    composer setup
    ```

1. Set the proper values in the `.env` file according to your environment. The most important ones are the database-related variables. (The rest can be left as they are in most cases.)

1. Run the server in development mode:

    ```bash
    composer serve
    ```

**Note:** Both the client and the server apps need to be running for the project to work.

## Endpoints

The client app is a single-page application and is available at the root URL (`/`).
It uses the server app for authentication and data storage.
There is no need to use the server app directly, but if you want to (or want to use the API for something else), here are the available endpoints:

- `GET /` - not used at the moment, displays "API is running" message
- `GET /status` - get the server status (returns `OK` if the server is running, status code: `200`)
- `GET /channels/read` - get all channels in form of a JSON array
- `POST /channels/create` - create a new channel, payload:
  - `name` - channel name (unique, required, string, min: 1, max: 65535)
  - `clients` - number of clients (required, integer, min: 0, max: 2147483647)
- `PUT /channels/update/{id}` - update a channel, payload:
  - `name` - channel name (unique, required, string, min: 1, max: 65535)
  - `clients` - number of clients (required, integer, min: 0, max: 2147483647)
- `DELETE /channels/delete/{id}` - delete a channel

## Production build

### Build client

1. Enter the client directory:

    ```bash
    cd client
    ```

1. Build the app for production:

    ```bash
    yarn build
    ```

The build will be located in the `client/dist` directory.\
You can run it using a `yarn preview` command from the `client` directory.

### Prepare server

1. Enter the server directory:

    ```bash
    cd server
    ```

1. Make sure that database credentials are set properly and that the database is running.

1. Run the following command:

    ```bash
    composer prod
    ```

1. Run the following command:

    ```bash
    yarn prod
    ```

1. Edit the `.env` file and set the `APP_ENV` variable to `production` and the `APP_DEBUG` variable to `false`.

The server is now ready to be deployed.\
You can run it using a `composer serve` command from the `server` directory.

## Tests

---

**As for the `v0.1.1` version, the tests do not cover the majority of the code, and most of the existing tests do not pass due to changes in the project structure. This will be fixed in the next patch.**

---

To run the client tests, use the following command **in the `client` directory**:

```bash
yarn test
```

Or, to run the server tests, use the following command **in the `server` directory**:

```bash
composer test
```

## Troubleshooting

If you are using Windows or your git client converts line endings to CRLF,
you may encounter the following error when trying to run the client app:

```bash
error Expected linebreaks to be 'LF' but found 'CRLF'  linebreak-style
```

This is caused by the fact that the project uses the eslint.
To fix this, you can either:

- change the line endings to LF (recommended)
  - by simply running `yarn eslint --fix` in the `client` directory
- disable (or change) the eslint rule
  - read more about it [here](https://eslint.style/rules/js/linebreak-style)

Note that if you change the line endings to LF and decide not to disable the eslint rule,
your editor or git client may convert them back to CRLF.
Make sure your editor and git config are set up correctly.

## Contributing

If you find issues or have suggestions for improvements,
feel free to open an issue or submit a pull request.
Contributions are welcome!

## Contact

If you have any questions, feel free to contact me at <jakub@korytko.me>.

## License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## TODO / Upcoming features

This is a list of features that lead to the `v0.2.0` release:

(This list is not exhaustive and may change at any time.
Patch versions may and probably will be released in the meantime.
Keep in mind that the order of the items is not necessarily the order in which they will be implemented.)

- [ ] Add more tests and fix the existing ones
- [ ] Add the authentication system
- [ ] Improve the UI
- [ ] Clean up the code
- [ ] Add new technologies (for both the client and the server) and refactor the code accordingly
- [ ] Change Laravel to JavaScript-based backend (probably Node.js)
- [ ] Implement CI/CD
- [ ] Look for and fix potential security issues, vulnerabilities, and bugs
