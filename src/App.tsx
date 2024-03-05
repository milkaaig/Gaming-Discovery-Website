import React, { useEffect, useState } from "react";
import { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

const App = () => {
  const [users, setUser] = useState<User[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAllUsers();

    request
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      }); 
    
  

    return () => {cancel};
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUser(users.filter((u) => u.id !== user.id));

    userService.deleteUser(user.id).catch((err) => {
      setError(err.message);
      setUser(originalUsers);
    });
  };

  const addUser = () => {
    const originalUser = [...users];
    const newUser = { id: 0, name: "Milka" };
    setUser([newUser, ...users]);
   
      userService.createUser(newUser).then(({ data: savedUser }) => setUser([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUser(originalUser);
      });
  };

  const updateUser = (user: User) => {
    const original = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUser(users.map((u) => (u.id == user.id ? updatedUser : u)));
    userService.updateUser(updatedUser).catch((err) => {
      setError(err);
      setUser(original);
    });
  };

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={() => addUser()}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-secondary mx-3"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  deleteUser(user);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
