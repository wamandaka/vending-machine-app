import React from "react";
interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return <div className="max-w-7xl mx-auto pt-10 px-4">{children}</div>;
};

export default PageContainer;
