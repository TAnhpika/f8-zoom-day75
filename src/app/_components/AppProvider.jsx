"use client";

import { createContext } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    console.log("App provider");

    return (
        <AppContext.Provider value={{ message: "Anh học Next" }}>
            {children}
        </AppContext.Provider>
    );
}
