# GL-Tracker-Website

Welcome to the **GL-Tracker-Website**! This project is a comprehensive solution for tracking intern data and managing projects efficiently. Leveraging MongoDB for dynamic data management and employing modern web technologies, this platform offers a robust and user-friendly experience.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features
- **Dynamic Intern Cards**: Seamlessly fetch and display intern data from MongoDB.
- **Project Management**: Track and manage projects assigned to interns.
- **Responsive Design**: Fully responsive layout using Bootstrap for a consistent experience across devices.
- **User-Friendly Interface**: Intuitive and clean interface for efficient navigation and management.

## Installation

### Prerequisites
- **Node.js** and **npm**: Ensure that Node.js and npm are installed on your machine. You can download and install them from [Node.js official website](https://nodejs.org/).
- **MongoDB**: Ensure MongoDB is installed and running locally. For installation instructions, refer to the [MongoDB installation guide](https://docs.mongodb.com/manual/installation/).

### Steps to Install

1. **Clone the Repository**
   ```bash
   git clone https://github.com/insha1234/GL-Tracker-Website.git
   cd GL-Tracker-Website
   ```

2. **Install Dependencies**
   Make sure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Set Up MongoDB**
   - Start MongoDB and create a new database named `internsDB` and add collections in it like 'interns','photos' and 'projects'.
   - Update the MongoDB connection string in the configuration file (e.g., `config/db.js`) if necessary to match your MongoDB setup.

4. **Run the Application**
   ```bash
   node server.js
   node loginserver.js
   ```
   - Open `index.html` in your browser to view and interact with the application.

## Usage
- Open the website in your browser to access the application.
- Navigate through the different sections to view and manage intern data and projects.
- Use the provided forms and interfaces to add, update, or delete intern and project information.

## Technologies Used
- **MongoDB**: Database management and storage.
- **Node.js**: Server-side scripting.
- **HTML**: Web page structure.
- **CSS**: Styling the web pages.
- **JavaScript**: Dynamic functionality.
- **Bootstrap**: Responsive design and layout.

## Contributing
We welcome contributions to enhance the GL-Tracker-Website. To contribute:

1. **Fork the Repository**
2. **Create a New Branch**
   ```bash
   git checkout -b feature-branch
   ```
3. **Make Changes and Commit**
   ```bash
   git commit -m 'Add new feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature-branch
   ```
5. **Create a Pull Request** on GitHub to merge your changes into the main repository.


