import React from "react";

interface Iprops {}
const Component: React.FC<Iprops> = (props) => {
  return (
    <div>
      hahah
      <style>
        {`
          color:red;
        `}
      </style>
    </div>
  );
};
export default Component;
