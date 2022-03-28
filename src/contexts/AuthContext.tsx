import React, { createContext, ReactNode, useState, useEffect } from "react";

import { auth, firebase } from "../services/firebase";

type AuthContextType = {
    user: TypeUser | undefined;
    loginWithGoogle: () => Promise<void>;
};
export const AuthContext = createContext({} as AuthContextType);

type TypeUser = {
    id: string;
    name: string;
    avatar: string;
};

type AuthContextProviderProps = {
    children: ReactNode;
};

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<TypeUser>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, photoURL, uid } = user;

                if (!displayName || !photoURL) {
                    throw new Error("Missing information from Google Account");
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL,
                });
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const loginWithGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error("Missing information from Google Account");
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
            });
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}
