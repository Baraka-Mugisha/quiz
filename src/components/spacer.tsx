import React from "react";

const Spacer = ({ vertical = 0, horizontal = 0 }): any => {
  return (
    <div
      style={{
        marginTop: vertical,
        marginRight: horizontal,
      }}
    ></div>
  );
};

export default Spacer;
