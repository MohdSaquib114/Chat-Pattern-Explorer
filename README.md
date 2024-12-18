# Project Introduction

This project uses the GROQ Cloud LLM to recognize patterns, group data, and visualize relationships.

# Setting up a Next.js Project Locally

Below are the steps to set it up locally.

## Prerequisites

Before starting, ensure you have the following installed on your system:

1. **Node.js**: Download and install [Node.js](https://nodejs.org/). It's recommended to use the LTS version.
2. **Git**: Ensure Git is installed. You can download it from [git-scm.com](https://git-scm.com/).
3. **Code Editor**: A code editor like [Visual Studio Code](https://code.visualstudio.com/) is recommended.

## Steps to Set Up the Project

### 1. Clone the Repository

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the URL of your project repository.

### 2. Navigate to the Project Directory

```bash
cd <project-name>
```

Replace `<project-name>` with the name of the project directory.

### 3. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 4. Set Up the Environment Variables

Create a `.env.local` file in the root of the project and add the following variable:

```env
NEXT_PUBLIC_GROQ_API_KEY=<your-api-key>
```

Replace `<your-api-key>` with the actual API key.

### 5. Start the Development Server

Run the development server with:

```bash
npm run dev
```

This will start the server at `http://localhost:3000`. Open this URL in your browser to view the application.

### 6. Build the Application (Optional)

To build the application for production, use:

```bash
npm run build
```

### 7. Run Production Server (Optional)

After building the application, you can start the production server with:

```bash
npm start
```

### 8. Lint and Format the Code (Optional)

To check for linting errors, run:

```bash
npm run lint
```

To format the code using Prettier, run:

```bash
npm run format
```

---

## Troubleshooting

- **Missing Dependencies**: If you encounter issues with missing dependencies, try deleting `node_modules` and reinstalling:

  ```bash
  rm -rf node_modules
  npm install
  ```

- **Environment Variables**: Ensure the `.env.local` file is correctly set up with the necessary variables.

If you encounter further issues, consult the project documentation or contact the project maintainer.

---

## Additional Notes

For more details about Next.js, visit the [Next.js documentation](https://nextjs.org/docs).

