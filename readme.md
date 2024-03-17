# Full-Stack CRUD APP

## About

I have divided the folder structure in two section frontend and backend. Frontend involved Login and Registration on Landing Page. Registration has two user Admin and User. Admin has the authority of viewing all the users present in User Database and role of deleting the users. User can only update it's profile and view it's own info.



## Core Structure

    fsja
      ├── backend
      │   ├── Prisma
      │   │   > Shcema.prisma
      │   │
      │   ├── Controllers
      │   │   > auth.controller.js
      │   │   > user.controller.js
      │   │
      │   ├── Routes
      │   │   > api.routes.js
      │   │
      │   ├── Middleware
      │   │   > auth.middleware.js
      │   │   > role.middleware.js
      │   │
      │   ├── config
      │   │   > db.config.js
      │   │
      │   ├── validations
      │   │   > customErrorReporter.js
      │   │   > uservalidation.js
      │   │
      │   └── utils
      │       > fileUploadLimit.js
      │ 
      │
      ├── frontend
      │   │   > App.jsx
      │   │  
      │   ├── Components
      │   │   > Home Page
      │   │   > Login 
      │   │   > Registration
      │   │   > User Page -- Protected routes
      │   │   > Admin Page -- Protected routes
      │   │   > Not found Page
      │   
      │     
      └── README.md (you are here)

## Stack

### Backend

- API
  - NodeJS
  - Express
- Database
  - MySql
- ORM
  - Prisma
- Validation
  - Vine.js
  - Jwt
  - Bcrypt.js
- File Upload
  - Express-file-upload
- CORS setup

### Frontend

- Frontend
  - React
  - vite
  - React Router
  - Material UI
  - React-toastify


## Setup and Running

- Clone repository `git clone -b main https://github.com/Gmishra2000/fullstack-crud-app`

- **Backend**

  - Info
  - Switch to `backend` directory `cd backend/`
 - Configuration
  - Create local environment file `.env` taking referenced from `.env-example`
  - Setup
    - Install packages using `npm i`
  - Run
    - Start API server: `npm start` (http://localhost:8000)

- **Frontend**

  - Switch to `frontend` directory `cd frontend/`
  - Configuration
    - Modify `environment.js` for
      -Change API Base Url if you have backend running on other PORT
  - Setup
    - Install dependencies: `npm install`
  - Run
    - Start Web server: `npm start`, browse at http://localhost:5173


## Screenshots

View all screenshots [here].

<table>
  <tbody>
    <tr>
      <td colspan="2">Landing</td>
    </tr>
    <tr>
      <td>
        <img alt="Landing" src="./assets/Home.jpeg" />
      </td>
      <td>
        <img alt="Landing" src="./assets/login.jpeg" />
      </td>
    </tr>
    <tr>
      <td colspan="2">Web</td>
    </tr>
    <tr>
      <td>
        <img alt="Web" src="./assets/registration.jpeg" />
      </td>
      <td>
        <img alt="Web" src="./assets/admin.jpeg" />
      </td>
    </tr>
    <tr>
      <td colspan="2">web</td>
    </tr>
    <tr>
      <td>
        <img alt="Mobile" src="./assets/user.jpeg" />
      </td>
    
    </tr>
  </tbody>
</table>

## Authors

- Chandan Mishra - [GitHub](https://github.com/Gmishra2000) )
