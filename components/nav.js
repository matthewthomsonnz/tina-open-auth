import * as React from "react";
import { InlineText, InlineGroup } from "react-tinacms-inline";

export const Nav = ({ data }) => {

  return (
      <InlineGroup
        focusRing={{ offset: -12 }}
        insetControls={true}
        name="nav"
        fields={NAV_FIELDS}
      >
        <div className="relative flex flex-col flex-wrap py-8 px-8 lg:px-12 2xl:px-16 mx-auto md:items-center md:flex-row">
          <a
            href="#"
            className="pr-2 lg:pr-8 mb-8 md:mb-0 focus:outline-none flex items-center"
          >
            <div className="inline-flex items-center">
              <div className={`mr-2`}>
                <InlineGroup name="wordmark" focusRing={false}>
                  {null}
                </InlineGroup>
              </div>
              <h2 className="font-bold tracking-tight transition duration-150 ease-out transform text-blueGray-500 dark:text-blueGray-200 lg:text-md text-bold">
                <InlineText focusRing={{ offset: 8 }} name="wordmark.name" />
              </h2>
            </div>
          </a>
          <div className="flex-grow md:flex md:justify-end">
            <nav className="flex flex-wrap items-center justify-between sm:justify-end text-base -mx-2 sm:-mx-6 md:mx-0">
              {data.items.map(function (item, index) {
                console.log(item);
                return (
                  <a
                    key={index}
                    href={item.link}
                    className={`mx-2 sm:mx-6 md:mx-8 text-sm tracking-wide font-semibold transition duration-150 ease-out text-gray-600 dark:text-gray-200`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </InlineGroup>
  );
};

export const NAV_FIELDS = [
  {
    label: "Wordmark",
    name: "wordmark",
    component: "group",
    fields: [
      {
        label: "Name",
        name: "name",
        component: "text",
      },
    ],
  },
  {
    label: "Nav Items",
    name: "items",
    component: "group-list",
    itemProps: (item) => ({
      label: item.label,
    }),
    defaultItem: () => ({
      label: "Nav Link",
      link: "/",
    }),
    fields: [
      {
        label: "Label",
        name: "label",
        component: "text",
      },
      {
        label: "Link",
        name: "link",
        component: "text",
      },
    ],
  },
];
