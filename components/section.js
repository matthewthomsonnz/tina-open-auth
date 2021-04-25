import * as React from "react";

export const Section = ({ variant = "default", children }) => {

  let variantClasses = `relative transition duration-150 ease-out text-gray-800 dark:text-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 body-font overflow-hidden`;

  if (variant === "tint") {
    variantClasses = `relative transition duration-150 ease-out text-gray-700 dark:text-gray-100 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 body-font overflow-hidden`;
  }

  if (variant === "primary") {
    variantClasses = `relative transition duration-150 ease-out text-gray-700 dark:text-gray-100 bg-700 bg-gradient-to-br from-500 to-300 dark:from-500 dark:to-700 body-font overflow-hidden`;
  }

  return <section className={variantClasses}>{children}</section>;
};

export const SectionFields = [
  {
    name: "color",
    label: "Color",
    component: "select",
    options: [
      {
        label: "Default",
        value: "default",
      },
      {
        label: "Tint",
        value: "tint",
      },
      {
        label: "Primary",
        value: "primary",
      },
    ],
  },
];
