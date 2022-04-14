import React, { useState } from "react";
import "./actionMenuDropdown.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { ActionMenuItems } from "../../utils/actionMenuItems";
import { CheckInList, GetList } from "../../utils/userUtils";
import { useAuth } from "../../context/authContext";
import { ActionMenuItemType } from "../../utils/types";

function ActionMenuDropdown({ item }: { item: string }) {
  const [dropDownDisplay, setDropDownDisplay] = useState(false);
  const location = useLocation();
  const { authState } = useAuth();
  const actionMenu: ActionMenuItemType[] = ActionMenuItems(location.pathname);
  return (
    <div
      className="dropdown-action"
      tabIndex={0}
      onBlur={() => setDropDownDisplay(false)}
    >
      <BsThreeDotsVertical
        onClick={() => setDropDownDisplay(!dropDownDisplay)}
        className="three-dots"
      />
      {dropDownDisplay && (
        <div className="dropdown-list">
          {actionMenu.map((action) => {
            const value = action.name;
            if (action.alterAction !== undefined)
              return (
                <div
                  key={action.action}
                  className="dropdown-option"
                  onClick={() =>
                    !CheckInList(GetList(authState, value!), item)
                      ? action.actionFunction(item)
                      : action.alterActionFunction!(item)
                  }
                >
                  <span>
                    <action.icon />
                  </span>
                  {!CheckInList(GetList(authState, value!), item)
                    ? action.action
                    : action.alterAction}
                </div>
              );
            return (
              <div
                key={action.action}
                className="dropdown-option"
                onClick={() => action.actionFunction(item)}
              >
                <span>
                  <action.icon />
                </span>
                {action.action}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ActionMenuDropdown;
