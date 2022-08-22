import React, { createContext, useContext } from 'react';

const SiteContext = createContext();

const SiteContextProvider = ({ children, data }) => {
  return <SiteContext.Provider value={{ ...data }}>{children}</SiteContext.Provider>;
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContextProvider, SiteContext };
export default useSiteContext;
