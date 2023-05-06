import { createContext, useState, useEffect, PropsWithChildren } from 'react';

import { onAuthStateChangeListener } from './firebase';
import { User } from 'firebase/auth';

type UserContext = {
  user: User | null;
};

export const UserContext = createContext<UserContext>({
  user: null,
});

export const UserProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [user, setUser] = useState<User | null>(null);
  const value = { user };

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener(async (user: User | null) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
