export const API_FIELDS = [
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
      name: "api.items",
      component: "group-list",
      itemProps: (item) => ({
        label: item.label,
      }),
      defaultItem: () => ({
        label: "Nav Link",
        link: "/",
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
  