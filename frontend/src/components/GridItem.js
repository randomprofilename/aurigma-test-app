import React, { useState } from "react";

const GridItem = ({ children }) => {
  const [ hovered, setHovered ] = useState(false);

  return <div     
    style= {{ background: hovered ? "linear-gradient(0deg, rgba(45,172,253,0.3) 0%, rgba(45,57,253,0.3) 100%)" : undefined }} 
    onMouseEnter={() => setHovered(true)} 
    onMouseLeave={() => setHovered(false)}
  >
    {children}
  </div>
}

export default GridItem;