import React, { createContext } from "react";

export const LoadingContext = createContext({
    loading: false,
    setLoading: () => {},
});