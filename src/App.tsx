import axios, { AxiosError, CanceledError } from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  interface User {
    id: number;
    name: string;
  }
  const [users, setUser] = useState<User[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    {/* 
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      }); */}
    
    const fetchUser = async () => {

      try{
        const response = await axios
        .get<User[]>("https://jsonplaceholder.typicode.com/users"
         ,{
        signal: controller.signal});

        setUser(response.data);
        setLoading(false);
      

      }
      catch(err){
        setError((err as AxiosError).message)
        setLoading(false)
      }

    };

    return () => controller.abort();
  }, []);

  const deleteUser = (user: User) => {
    const originalUsers = [...users];
    setUser(users.filter((u) => u.id !== user.id));

    axios
      .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
      .catch((err) => {
        setError(err.message);
        setUser(originalUsers);
      });
  };

  const addUser = () => {
    const originalUser = [...users];
    const newUser = { id: 0, name: "Milka" };
    setUser([newUser, ...users]);
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then(({ data: savedUser }) => setUser([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUser(originalUser);
      });
  };

  const updateUser = (user: User) => {
    const original = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUser(users.map((u) => (u.id == user.id ? updatedUser : u)));
    axios
      .patch(
        "https://jsonplaceholder.typicode.com/users/" + user.id,
        updateUser
      )
      .catch((err) => {
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
