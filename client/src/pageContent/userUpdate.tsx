import React from "react";
import { useParams } from "react-router-dom";
import { UpdateUserBox } from "../components/updateBox/updateUserBox";
import { UpdateUserPasswordBox } from "../components/updateBox/updatePasswordBox";

export default function UpdateUser() {
  const { updateType } = useParams();
  return (
    <>
      {updateType === "name" && <UpdateUserBox type="name" />}
      {updateType === "email" && <UpdateUserBox type="email" />}
      {updateType === "passwordUpdate" && <UpdateUserPasswordBox />}
    </>
  );
}
