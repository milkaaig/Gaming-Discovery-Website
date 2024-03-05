import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers =() =>{
  const [users, setUser] = useState<User[]>([]);
  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();

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
  return {users, error, isLoading, setError, setUser};
}

export default useUsers;