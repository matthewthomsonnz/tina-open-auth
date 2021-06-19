export const THEME_FIELDS = [
    {
      label: "Theme",
      name: "theme.items",
      itemProps: (item) => ({
        label: item.label,
      }),
      onSubmit: () => {
        console.log('saved');
      },
      fields: [
        { name: "background", label: "Background color", component: "color"},
        { name: "text", label: "Text color", component: "color"},
      ],
    },
  ];
  