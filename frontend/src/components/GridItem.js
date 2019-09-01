import React, { useState } from "react";

const GridItem = ({ children }) => {
  const [ hovered, setHovered ] = useState(false);

  return <div
    style= {{
      backgroundImage: hovered ? "linear-gradient(to top, #accbee 0%, #c7deff 100%)": undefined,
      borderRadius: "5px"
    }} 
    onMouseEnter={() => setHovered(true)} 
    onMouseLeave={() => setHovered(false)}
  >
    {children}
  </div>
}

export default GridItem;