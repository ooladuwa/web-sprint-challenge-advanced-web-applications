import React, { useState } from "react";
import axios from "axios";
import EditMenu from "./EditMenu";
import Color from "./Color";
import axiosWithAuth from "../helpers/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  // const { push } = useHistory();
  // const { id } = useParams();

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.color}`, colorToEdit)
      .then((res) => {
        console.log(res);
        // push(`colors/${colorToEdit.color}`);
        updateColors([...colors, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteColor = (color) => {
    console.log(color);
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`, color)
      .then((res) => {
        console.log(res);
        filterColors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterColors = (id) => {
    updateColors(colors.filter((color) => color.id !== Number(id)));
  };

  const saveColors = () => {};
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <Color
            key={color.id}
            editing={editing}
            color={color}
            editColor={editColor}
            deleteColor={deleteColor}
          />
        ))}
      </ul>

      {editing && (
        <EditMenu
          colorToEdit={colorToEdit}
          saveEdit={saveEdit}
          setColorToEdit={setColorToEdit}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default ColorList;
