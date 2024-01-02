import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <>nav {children} footer</>;
};

export default layout;
