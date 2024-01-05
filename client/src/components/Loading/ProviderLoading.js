import React, { useEffect, useState } from "react"
import { LoadingContext } from "./index"
import PropTypes from "prop-types"


export function LoadingProvider({children}){
    const [loading, setLoading] = useState(false);
    const toggleLoading = () => setLoading(!loading);

    useEffect(()=>{
      if(!loading){
        toggleLoading()
      }
    },[loading])

    console.log("Re-render loading", loading);

    return (
        <LoadingContext.Provider value={{ loading, setLoading: toggleLoading }}>
          {children}
        </LoadingContext.Provider>
      );
}

LoadingProvider.propTypes = {
    children: PropTypes.node.isRequired,
};