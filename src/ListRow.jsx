import React from "react";
import "./App.css";

function ListRow(props) {
  return (
    <ul className="dataList">
      <li>{/* <input type="checkbox" className="listCheckBox" /> */}</li>
      <li>Name</li>
      <li>Email</li>
      <li>Last seen</li>
    </ul>
  );
}

export default ListRow;
