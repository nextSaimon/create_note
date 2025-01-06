# Create Note App

## Overview

The **Create Note App** is a web application that allows users to create, manage, and organize their notes. It features a fully functional authentication system for secure access, ensuring that user data remains private and protected.

## Live Demo

Check out the app here: [Create Note Zeta](https://create-note-zeta.vercel.app/)

## Features

- **Authentication System**:
  - User registration and login using [Auth.js](https://authjs.dev/).
  - Secure password hashing.
  - Token-based authentication for user sessions.
- **Note Management**:
  - Create, edit, and delete notes.
  - View all notes in an organized manner.
- **Responsive Design**:
  - Fully responsive interface for use on desktops, tablets, and mobile devices.
- **Modern Tech Stack**:
  - Built with cutting-edge tools and frameworks for optimal performance and scalability.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/): A React-based framework for building web applications.
  - [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for styling.
- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction): Server-side functionality within the Next.js framework.
  - [MongoDB](https://www.mongodb.com/): Database for storing user and note data.
- **Authentication**:
  - [Auth.js](https://authjs.dev/): For secure and seamless authentication.
  - [JWT (JSON Web Tokens)](https://jwt.io/): For secure session management.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/nextSaimon/create_note.git
   cd create_note
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   AUTH_SECRET=your_auth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret_key
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

The app is deployed on [Vercel](https://vercel.com/). To deploy your own instance:

1. Push the repository to your GitHub account.
2. Import the project into Vercel.
3. Add the necessary environment variables in the Vercel dashboard.
4. Deploy the app with a single click.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any queries or support, feel free to contact:

- **Author**: Saimon
- **GitHub**: [nextSaimon](https://github.com/nextSaimon)
- **Email**: [saimonss5432@gmail.com](mailto:saimonss5432@gmail.com)

---

Thank you for using the **Create Note App**! We hope it helps you stay organized and productive.
