# HelpDesk App

## Overview

The HelpDesk App is a web application designed to streamline and enhance customer support by providing a centralized interface for managing and responding to messages from multiple users on Facebook pages. The application is built using Next.js for the frontend, Express for the backend, and Firebase for authentication. Real-time updates of messages are facilitated through the use of Socket.IO.

## Features

1. **Unified Interface:** The app provides a common interface for managing messages from various users on Facebook pages, eliminating the need to share individual Facebook page credentials.

2. **Firebase Authentication:** User authentication is handled securely through Firebase, ensuring a seamless and secure login process using your company's credentials.

3. **Meta Messenger Integration:** The app integrates with Meta Messenger webhooks and APIs to retrieve and display messages from Facebook pages. This allows for efficient communication with users without the need for direct access to Facebook page credentials.

4. **Real-time Updates:** Utilizing Socket.IO, the app ensures real-time updates for incoming messages, providing a responsive and dynamic user experience.

## Demo Video

<!-- Embedding Video -->


https://github.com/sumedhiscoding/HelpDesk/assets/66994315/40c4cfa9-c585-4203-bcb6-8917c45846af





## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Firebase project set up for authentication.
- Meta Messenger API credentials.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/helpdesk-app.git
    ```

2. **Navigate to the frontend and backend directories:**

    ```bash
    cd helpdesk-app/frontend
    ```

    ```bash
    cd helpdesk-app/backend
    ```

3. **Install dependencies for both frontend and backend:**

    ```bash
    npm install
    ```

4. **Configure Firebase:**

    - Set up your Firebase project.
    - Obtain Firebase configuration details and update them in `frontend/src/firebaseConfig.js`.

5. **Configure Meta Messenger Integration:**

    - Obtain Meta Messenger API credentials.
    - Update the credentials in `backend/config.js`.

6. **Run the application:**

    - Start the backend server:

        ```bash
        npm start
        ```

    - Start the frontend application:

        ```bash
        npm run dev
        ```

    The application should now be accessible at `http://localhost:3000`.

## Usage

1. Open the application in your web browser.

2. Log in using your company's credentials through the Firebase authentication.

3. Navigate to the messaging interface to view and respond to messages from Facebook pages.

## Contributing

Contributions are welcome! Please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
