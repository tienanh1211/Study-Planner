# Collaborative Study Planner: Organize, Collaborate, Communicate

![Study Planner](https://img.shields.io/badge/Study%20Planner-v1.0.0-blue.svg)
[![GitHub Releases](https://img.shields.io/badge/Releases-Check%20Here-brightgreen)](https://github.com/tienanh1211/Study-Planner/releases)

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Design](#system-design)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The Collaborative Study Planner is a full-stack application that enables students to manage their study groups effectively. This platform allows users to organize their tasks, communicate in real-time, and collaborate seamlessly. With a user-friendly interface and powerful features, this application aims to enhance the study experience for all users.

## Key Features

- **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens). This ensures that only authorized users can access their study groups.

- **Study Group Management:** Users can create new study groups, view a list of their existing groups, and access detailed pages for each group. This makes it easy to keep track of different study sessions.

- **Real-time Chat:** Each study group has a dedicated chat room powered by Socket.io. This allows group members to communicate instantly, fostering collaboration and quick decision-making.

- **Collaborative Task Calendar:** The application features a shared, interactive calendar using `react-big-calendar`. Group members can create, view, and manage tasks in one central location, helping everyone stay on track.

- **Modern UI/UX:** The platform boasts a clean and modern aesthetic, utilizing a "glassmorphism" design that enhances user experience while maintaining functionality.

- **MERN Stack:** Built with MongoDB, Express.js, React, and Node.js, this application leverages a robust technology stack for modern web development.

## System Design

The system is designed with scalability and user experience in mind. The architecture separates the front-end and back-end, allowing for easy updates and maintenance. The following components are integral to the system:

- **Front-End:** Developed using React, the front-end offers a responsive design that works well on both desktop and mobile devices. It interacts with the back-end through RESTful APIs.

- **Back-End:** The back-end is built with Node.js and Express.js, providing a robust server environment. It handles user authentication, data management, and real-time communication.

- **Database:** MongoDB is used for data storage, allowing for flexible and scalable data management. The database schema is designed to support users, study groups, tasks, and chat messages.

- **Real-Time Communication:** Socket.io is integrated for real-time chat functionality, ensuring that messages are delivered instantly to all group members.

## Technologies Used

- **Front-End:**
  - React
  - Redux (for state management)
  - react-big-calendar
  - Socket.io-client

- **Back-End:**
  - Node.js
  - Express.js
  - MongoDB
  - Socket.io

- **Tools:**
  - JWT for authentication
  - Git for version control
  - Postman for API testing

## Installation

To set up the Collaborative Study Planner locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/tienanh1211/Study-Planner.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd Study-Planner
   ```

3. **Install Dependencies:**
   - For the front-end:
     ```bash
     cd client
     npm install
     ```
   - For the back-end:
     ```bash
     cd server
     npm install
     ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the server directory and add the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the Application:**
   - Start the back-end server:
     ```bash
     cd server
     npm start
     ```
   - Start the front-end:
     ```bash
     cd client
     npm start
     ```

The application should now be running on `http://localhost:3000`.

## Usage

Once the application is running, you can access it via your web browser. The following steps outline how to use the main features:

1. **User Registration and Login:**
   - Navigate to the registration page and create an account.
   - After registration, log in using your credentials.

2. **Creating a Study Group:**
   - After logging in, go to the "My Groups" section.
   - Click on "Create New Group" and fill in the required details.
   - You can invite other users to join your group.

3. **Managing Tasks:**
   - Go to your study group's page.
   - Use the collaborative calendar to add tasks. Click on a date to create a new task and assign it to group members.

4. **Real-time Chat:**
   - Access the chat room within your study group.
   - Send messages to group members in real-time.

## Contributing

Contributions are welcome! If you want to improve the Collaborative Study Planner, please follow these steps:

1. **Fork the Repository:** Click the "Fork" button at the top right of the page.

2. **Create a New Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes:** Implement your feature or fix a bug.

4. **Commit Your Changes:**
   ```bash
   git commit -m "Add your commit message"
   ```

5. **Push to Your Fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request:** Go to the original repository and click on "New Pull Request."

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please reach out:

- **Email:** your-email@example.com
- **GitHub:** [your-github-profile](https://github.com/your-github-profile)

For the latest releases, check out the [Releases](https://github.com/tienanh1211/Study-Planner/releases) section.