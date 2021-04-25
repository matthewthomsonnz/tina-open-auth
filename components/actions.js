import * as React from "react";
import { InlineGroup } from "react-tinacms-inline";

export const Actions = ({ actions }) => {

  return (
    <div className="w-full">
      <InlineGroup
        name=""
        focusRing={{ offset: { x: 16, y: 8 } }}
        insetControls={true}
        fields={ACTION_FIELDS}
      >
        <div className="flex flex-wrap items-center -mx-3 -my-2">
          {actions &&
            actions.map(function (action, index) {
              let element = null;
              if (action.type === "button") {
                element = (
                  <button
                    key={index}
                    
                    style={{
                      textShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      boxShadow: `0 0.5rem 3rem 0px rgba(var(--color-rgb-600),0.35)`,
                    }}
                  >
                    {action.label}
                    {action.icon && (
                  null
                    )}
                  </button>
                );
              }
              if (action.type === "link" || action.type === "linkExternal") {
                element = (
                  <a
                    key={index}
                    href="#"
                    className={`inline-flex items-center font-semibold mx-3 my-2 text-lg transition duration-150 ease-out text-600 dark:text-400 hover:text-400 dark:hover:text-500`}
                    style={{
                      textShadow: `0 3px 7px rgba(var(--color-rgb-400),0.2)`,
                    }}
                  >
                    {action.label}
                   
                  </a>
                );
              }
              return element;
            })}
        </div>
      </InlineGroup>
    </div>
  );
};

export const ACTION_FIELDS = [
  {
    label: "Actions",
    name: "actions",
    component: "group-list",
    itemProps: (item) => ({
      label: item.label,
    }),
    defaultItem: () => ({
      label: "Action Label",
      type: "button",
    }),
    fields: [
      {
        label: "Label",
        name: "label",
        component: "text",
      },
      {
        label: "Type",
        name: "type",
        component: "radio-group",
        variant: "button",
        options: [
          { label: "Button", value: "button" },
          { label: "Link", value: "link" },
        ],
      },
      {
        label: "Icon",
        name: "icon",
        component: "toggle",
      },
    ],
  },
];
