"use client";

import { createContext, useEffect, useState } from "react";

export const UsersContext = createContext();

const BASE_PIXELA_URL = "https://pixe.la";

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const createUser = async (input) => {
    try {
      await fetch(`${BASE_PIXELA_URL}/v1/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(input),
      });

      try {
        const userData = {
          link: `${BASE_PIXELA_URL}/@${input.username}`,
          username: input.username,
          token: input.token,
        };
        await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify(userData),
        });
        readUser();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const readUser = async () => {
    try {
      const response = await fetch("/api/users");
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (token) => {
    try {
      const _ = await fetch(
        `${BASE_PIXELA_URL}/v1/users/${user[0]?.username}`,
        {
          method: "PUT",
          headers: {
            "X-USER-TOKEN": user[0]?.token,
          },
          body: JSON.stringify({ newToken: token }),
        }
      );

      try {
        const data = {
          token: token,
          username: user[0].username,
        };
        await fetch("/api/users", {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(data),
        });
        readUser();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      for (let i = 0; i < 8; i++) {
        await fetch(`${BASE_PIXELA_URL}/v1/users/${user[0].username}`, {
          method: "DELETE",
          headers: {
            "X-USER-TOKEN": `${user[0]?.token}`,
          },
          body: JSON.stringify(user[0]?.username),
        });
      }

      try {
        await fetch("/api/users", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify(user[0]?.username),
        });
        readUser();
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [userProfile, setUserProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/profiles`);
      const profile = await response.json();
      setUserProfile(profile);
      console.log(profile);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    readUser();
    fetchProfile();
  }, []);

  // useEffect(() => {
  //   const loadData = async () => {
  //     await readUser();
  //     if (user.length > 0) {
  //       await fetchProfile();
  //     }
  //   };

  //   loadData();
  // }, []);

  return (
    <UsersContext.Provider
      value={{
        user,
        createUser,
        readUser,
        updateUser,
        deleteUser,
        profile: userProfile, // change userProfile to profile here
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
