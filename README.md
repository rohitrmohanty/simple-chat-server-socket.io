# Simple Chat Server using WebSockets (Socket.io)

This is an implementation of a simple chat server using web_sockets. Made with the help of [Leon Watson's Tutorial](https://www.youtube.com/watch?v=84GXJANOYFw) for the initial login.

## Getting Started

Cloning the repository will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

**NodeJS** previously installed on the system is a must as npm is used to download the dependencies. If you're using Linux, use the following command

```
sudo apt-get install nodejs
```

For other operating systems, check the NodeJS website(http://nodejs.org) for details on installing node on **your current Operating System**.

### Installing

After moving into the folder where you want the project, clone the project using the following command, inserting your username where specified

```
git clone https://github.com/rohitrmohanty/simple-chat-server-socket.io.git
```

Move into the root directory of the project, and use the following command to install all the required dependencies for the Backend.

```
npm install
```

After installing all the dependencies, **go to server.js and insert your Database URL where specified. It has to be a MongoDB Url**. After completing the setup, use the following command to start the server
```
npm start
```

* The backend server will be running by default on port **3231**.


## Deployment

*Add additional notes about how to deploy this on a live system.*

## Built With

* [NodeJS](http://nodejs.org/) 				- The web framework used as the backbone for the entire application, and also for running the backend server.
* [ExpressJS](https://expressjs.com/) - Used to define the routes of the application backend.
* [Socket.io](https://socket.io/) 		- Used to develop the FrontEnd of the application.
* [MongoDB](https://mongodb.com/) 		- Used as the database of the application for storing the data and querying through it.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

Please read [LICENSE](LICENSE) for details on the license for reusing the code.

## Versioning

We use Git (https://github.com) for versioning. For the versions available, see the tags on this repository.

## Authors

* Rohit R. Mohanty