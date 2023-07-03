
Welcome to the **Recess E-commerce Shop**! This project is a web application built using Vite.ts, a fast and opinionated web development build tool.

Getting Started
---------------

To get started with the project, follow the steps below:

1.  **Clone the repository** to your local machine using the following command:
    
    shell
    
    ```shell
    git clone https://github.com/fdagreat/recess-shop.git
    ```
    
2.  **Navigate to the project directory**:
    
    shell
    
    ```shell
    cd recess-shop
    ```
    
3.  **Install dependencies** by running the following command:
    
    shell
    
    ```shell
    yarn install
    ```
    
4.  **Start the development server**:
    
    shell
    
    ```shell
    yarn run dev
    ```
    
    This will start the development server and provide you with a local URL (usually `http://localhost:3000`) where you can access the application in your browser.

5. **Build the application**:
    
    shell
    
    ```shell
    yarn run build
    ```
    
    This will build the application for production and output the result in the `dist/` directory.

6. **Deploying**:

    Make sure you have enabled GitHub Pages for your repository. Then, run the following command to deploy the application to GitHub Pages:

    shell

    ```shell
    yarn run predeploy  
    ``` 

    then run

    shell

    ```shell
    yarn run deploy
    ```
    

    This will build the application and push the result to the `gh-pages` branch of your repository.



Project Structure
-----------------

The project structure is organized as follows:

```
recess-shop/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── pocketbase/
│   ├── router/
│   ├── styles/
│   ├── utils/
│   └── App.tsx
│   └── main.ts
│   └── vite-env.d.ts
├── .gitignore
├── .gitattributes
├── package.tson
├── README.md
└── vite.config.ts
└── tsconfig.json
```

*   **`public/`**: Contains the static assets for the project, including the main `index.html` file and the `favicon.ico` file.
    
*   **`src/`**: Contains the source code of the project.
    
    *   **`assets/`**: Holds the project's assets such as images, fonts, etc.
    *   **`components/`**: Contains reusable UI components used throughout the application.
    *   **`context/`**: Contains the React Contexts used in the application.
    *   **`hooks/`**: Contains the custom React Hooks used in the application.
    *   **`pages/`**: Contains the different pages/views of the application.
    *   **`pocketbase/`**: Contains the Pocketbase SDK and related utilities. which is used to handle the authentication and data storage logic for the application.
    *   **`router/`**: Handles the routing logic for the application.
    *   **`styles/`**: Contains the global styles for the application.
    *   **`utils/`**: Contains various utility functions used throughout the application.
    *   **`main.ts`**: The entry point of the application.
*   **`.gitignore`**: Specifies which files and directories should be ignored by Git.
    
*   **`package.tson`**: Lists the project dependencies and contains various scripts for building, testing, and running the application.
    
*   **`README.md`**: The file you are currently reading, providing an overview of the project and instructions for getting started.
    
*   **`vite.config.ts`**: The configuration file for Vite.ts.
    

Acknowledgements
----------------

We would like to acknowledge the following resources that were instrumental in the development of this project:

*   [Vite.ts](https://vitejs.dev) - The fast and opinionated web development build tool.
*   [React](https://reactjs.org) - A JavaScript library for building user interfaces.
*   [Ant Design](https://ant.design) - A design system for enterprise-level products. We used it to build the UI components for the application.
*   [Pocketbase](https://pocketbase.io) - A backend-as-a-service platform that provides a simple and secure way to build and scale your applications.
*   [React Router](https://reactrouter.com) - A collection of navigational components that compose declaratively with your application.
Contact
-------

If you have any questions or need further assistance, feel free to reach out to us at [support@recess-ecommerce.com](mailto:support@recess-ecommerce.com).
