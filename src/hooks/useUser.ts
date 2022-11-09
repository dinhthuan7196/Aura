import { useEffect, useCallback } from 'react';
import { useStore, store } from 'react-context-hook';
import jwtDecode from 'jwt-decode';

import Toaster from '@components/Toaster';

import { User, SignIn, FetchUsers } from '@dto/UserDTO';

import { STORES, URLS } from '@utils/constants';
import { actions } from '@utils/types';
import { api, catchError } from '@utils/api';

type SignInProps = actions & {
  payload: SignIn;
};

type UserProps = actions & {
  payload: User;
};

type InputResetPassword = {
  email: string;
  password?: string;
  code?: string;
};

type PasswordProps = actions & {
  payload: InputResetPassword;
  action: string;
};

export const useUser = () => {
  const [user, setUser] = useStore<User>(STORES.USER);
  const [users, setUsers] = useStore<User[]>(STORES.USERS);
  const [handling, setHandling] = useStore<boolean>(STORES.HANDLING, true);

  const accessToken = localStorage.getItem('access_token');
  const configs = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const getPropsDefault = (values: User) => ({
    id: values.id,
    first_name: values.first_name,
    last_name: values.last_name,
    name: values.name,
    nickname: values.nickname,
    username: values.username,
    email: values.email,
    roles: values.roles,
  });

  /* ------ Fetch Data First ------ */
  const getUsers = useCallback(
    async (props?: FetchUsers) => {
      if (!accessToken || (accessToken && users)) {
        return [];
      }
      try {
        const { data } = await api.get(URLS.User, {
          params: props || {},
          ...configs,
        });
        return data;
      } catch (error) {
        const { message } = catchError(error);
        // setToaster({
        //   message,
        //   type: 'error',
        // });
        throw new Error(message);
      }
    },
    [accessToken, users]
  );

  const fetchData = useCallback(async () => {
    if (accessToken && !users) {
      const _users = await getUsers();
      setUsers(_users);
    }
  }, [accessToken, users]);

  /* ------ Get Information By Token ------ */
  const getInformation = useCallback(async () => {
    if (accessToken && !user) {
      const decodeToken = jwtDecode<any>(accessToken);
      const { data } = decodeToken;
      try {
        const { data: resp } = await api.post(
          `${URLS.User}/${data.user?.id}`,
          data,
          configs
        );
        const getProps = getPropsDefault(resp);
        setUser(getProps as User);
        await fetchData();
      } catch (error) {
        const { message } = catchError(error);
        // setToaster({
        //   message,
        //   type: 'error',
        // });
        throw new Error(message);
      }
    }
    setHandling(false);
  }, [accessToken, user, handling]);

  /* ------ Actions List User ------ */
  const editUser = useCallback(
    async ({ payload }: UserProps) => {
      const { id, ...rest } = payload;
      let newUsers = users;
      /* id ? update_user : add_new_user */
      try {
        const { data } = await api.post(
          `${URLS.User}${id ? `/${id}` : ''}`,
          rest,
          configs
        );
        const props = getPropsDefault(data);
        if (id) {
          newUsers = newUsers.map((values) => {
            if (props.id === id) return props;
            return values;
          });
        } else {
          newUsers.push(props);
        }
        setUsers(newUsers);
        // setToaster({
        //   message: 'Edit User Success.',
        //   type: 'success',
        // });
      } catch (error) {
        const { message } = catchError(error);
        // setToaster({
        //   message,
        //   type: 'error',
        // });
        throw new Error(message);
      }
    },
    [accessToken]
  );

  const deleteUser = useCallback(
    async ({ payload }: UserProps) => {
      const { id, ...rest } = payload;
      let newUsers = users;
      if (id) {
        try {
          const { data } = await api.delete(`${URLS.User}/${id}`, {
            ...configs,
            data: {
              reassign: 1, // default value
              force: true, // default value
              ...rest,
            },
          });
          const { deleted } = data;
          if (deleted) {
            newUsers = newUsers.filter(({ id: uID }) => uID !== id);
            setUsers(newUsers);
            // setToaster({
            //   message: 'Delete User Success',
            //   type: 'success',
            // });
          }
        } catch (error) {
          const { message } = catchError(error);
          // setToaster({
          //   message,
          //   type: 'error',
          // });
          throw new Error(message);
        }
      } else {
        // setToaster({
        //   message: 'User not exist',
        //   type: 'error',
        // });
      }
    },
    [accessToken]
  );

  /* ------ Actions Account ------ */
  const signIn = useCallback(async ({ payload }: SignInProps) => {
    try {
      const { data } = await api.post(URLS.SignIn, payload);
      const { token } = data;
      if (token) {
        localStorage.setItem('access_token', token);
        // setToaster({
        //   message: 'Sign In Success.',
        //   type: 'success',
        // });
        Toaster({
          message: 'Sign In Success.',
          type: 'success',
        });
      } else {
        // setToaster({
        //   message: 'Missing Token.',
        //   type: 'error',
        // });
      }
    } catch (error) {
      const { message } = catchError(error);
      // setToaster({
      //   message,
      //   type: 'error',
      // });
      throw new Error(message);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('access_token');
    store.reset({});
  }, []);

  const actionsPassword = useCallback(
    async ({ payload, action }: PasswordProps) => {
      try {
        await api.post(`${URLS.ResetPassword}${action}`, payload);
        // setToaster({
        //   message: `${action.replace('-', ' ')} success.`,
        //   type: 'success',
        // });
      } catch (error) {
        const { message } = catchError(error);
        // setToaster({
        //   message,
        //   type: 'error',
        // });
        throw new Error(message);
      }
    },
    []
  );

  useEffect(() => {
    getInformation();
  }, [accessToken]);

  return {
    handling,
    user,
    users,
    getUsers,
    signIn,
    signOut,
    editUser,
    deleteUser,
    actionsPassword,
  };
};
