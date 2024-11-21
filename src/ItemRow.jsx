import React from "react";
import "./App.css";
import { useState } from "react";

function ItemRow(props) {
  return (
    <ul className="itemList">
      <li>
        <input
          type="checkbox"
          value={props.id}
          className="listCheckBox"
          checked={props.checkedRows.includes(props.id)}
          onChange={() => {
            props.handleCheckBoxChange(props.id);
          }}
        />
      </li>
      <li>
        <ul className="nameDataList">
          <li className="nameItem">{props.name}</li>
          <li className="roleItem">{props.role}</li>
        </ul>
      </li>
      <li>{props.email}</li>
      <li>{props.lastSeen}</li>
    </ul>
  );
}

export default ItemRow;
