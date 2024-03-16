import {BASE_URL} from "../../evironment";
export class AuthService {

  async login({email,password,role}){
        try{
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method:'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password,role }),
                
              });
              
              // const authorizationHeader =  response.headers.get('Authorization');
              // console.log(authorizationHeader,"response header");
              
              const contentType = response.headers.get('Content-Type');
              let data;
              
              if (contentType && contentType.includes('application/json')) {
                data = await response.json();
              } else {
                data = await response.text();
              }
              
              if (!response.ok) {
                throw new Error(data.message);
              }
              return data;

        }catch(error){
            throw error;
        }
  }
  
  async register({ name, email, password, password_confirmation, dob, role }) {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, password_confirmation, dob, role }),
      });

      const contentType = response.headers.get('Content-Type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUserDetails() {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      const contentType = response.headers.get('Content-Type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      const contentType = response.headers.get('Content-Type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`http://localhost:8000/api/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      return true; // Success
    } catch (error) {
      throw error;
    }
  }

  async updateUser(updatedData) {
    const token = localStorage.getItem('token');
    console.log(updatedData);
    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const response = await fetch(`${BASE_URL}/api/update`, {
        method: 'PATCH',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const contentType = response.headers.get('Content-Type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      throw error;
    };
  };

}
const authService = new AuthService();

export default authService