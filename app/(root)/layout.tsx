import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen py-10 px-8 mx-auto w-full max-w-screen-2xl ">
      {children}
    </div>
  );
};

export default layout;
