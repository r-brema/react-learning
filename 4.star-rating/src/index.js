import React from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating
      maxRating={5}
      color="blue"
      defaultRating={3}
      message={["Terrible", "Bad", "Average", "Good", "Excellent"]}
      size={30}
    />
    <StarRating maxRating={10} color="red" />
  </React.StrictMode>
);
