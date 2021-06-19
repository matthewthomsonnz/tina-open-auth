export const THEME_FIELDS = [
    {
      label: "Theme",
      name: "theme.items",
      component: "group-list",
      itemProps: (item) => ({
        label: item.label,
      }),
      defaultItem: () => ({
        label: "arbitrary",
        link: "none",
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
  