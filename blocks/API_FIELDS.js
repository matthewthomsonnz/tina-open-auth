export const API_FIELDS = [
    {
      label: "APIs",
      name: "api.items",
      component: "group-list",
      itemProps: (item) => ({
        label: item.label,
      }),
      defaultItem: () => ({
        label: "Endpoint",
        link: "https://",
      }),
      onSubmit: () => {
        console.log('saved');
      },
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
  