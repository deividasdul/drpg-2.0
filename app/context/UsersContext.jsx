"use client";

import { createContext, useEffect, useState } from "react";

export const UsersContext = createContext();

const BASE_PIXELA_URL = "https://pixe.la";

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const createUser = async (input) => {
    try {
      const response = await fetch(`${BASE_PIXELA_URL}/v1/users`, {
        method: "POST",
        body: JSON.stringify(input),
      });

      if (
        response.status != 400 &&
        response.status != 403 &&
        response.status != 404 &&
        response.status != 409
      ) {
        const data = {
          link: `${BASE_PIXELA_URL}/@${input.username}`,
          username: input.username,
          token: input.token,
        };
        await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify(data),
        });
        readUser();
      } else if (response.status == 500) {
        createUser();
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
      const response = await fetch(
        `${BASE_PIXELA_URL}/v1/users/${user.username}`,
        {
          method: "PUT",
          headers: {
            "X-USER-TOKEN": user.token,
          },
          body: JSON.stringify({ newToken: token }),
        }
      );
      // FIXME:
      if (
        response.status != 400 &&
        response.status != 403 &&
        response.status != 404
      ) {
        await fetch(`/api/users/${user.id}`, {
          method: "PUT",
          body: JSON.stringify({ token }),
        });
        readUser();
      } else if (response.status == 500) {
        updateUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await fetch(
        `${BASE_PIXELA_URL}/v1/users/${user.username}`,
        {
          method: "DELETE",
          headers: {
            "X-USER-TOKEN": `${user.token}`,
          },
        }
      );

      if (
        response.status != 400 &&
        response.status != 403 &&
        response.status != 404 &&
        response.status != 500 &&
        response.status != 503
      ) {
        await fetch(`/api/users/${user.id}`, {
          method: "DELETE",
        });
        readUser();
      } else {
        deleteUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/profiles`);
      const profile = await response.json();
      setUserProfile(profile);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    readUser();
    fetchProfile();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        user,
        createUser,
        readUser,
        updateUser,
        deleteUser,
        userProfile,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
