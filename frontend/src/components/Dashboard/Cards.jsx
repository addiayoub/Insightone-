import { ArrowUp2 } from "iconsax-react";
import React from "react";

function Cards({ children }) {
  return (
    // <div className="container mx-auto m-8">
    //   <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">{children}</div>
    // </div>
    <div className="cards">{children}</div>
  );
}

export default Cards;
