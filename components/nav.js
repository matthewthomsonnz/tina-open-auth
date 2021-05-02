import * as React from "react";
import { InlineText, InlineGroup } from "react-tinacms-inline";
import Link from 'next/link'

export const Nav = ({ data }) => {

  return (

        <div className="relative flex flex-col flex-wrap py-8 px-8 lg:px-12 2xl:px-16 mx-auto md:items-center md:flex-row">
          <div className="flex-grow md:flex md:justify-end">
<Link href="/">home</Link>

            <nav className="flex flex-wrap items-center justify-between sm:justify-end text-base -mx-2 sm:-mx-6 md:mx-0">
              {data.items.map(function (item, index) {
                console.log(item);
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className={`mx-2 sm:mx-6 md:mx-8 text-sm tracking-wide font-semibold transition duration-150 ease-out text-gray-600 dark:text-gray-200`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
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
