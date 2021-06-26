const GraphBlock = {
    label: "Graph",
    name: "graph",
    fields: [
      {
        name: "label", label: "Label", component: "text"},
        { name: "backgroundColor", label: "Background color", component: "color"},
        { name: "textColorOverride", label: "Text color override", component: "color"},
        { name: "api", label: "which api", component: "number"},
        { name: "xAxis", label: "xAxis data pointer", component: "text"},
        { name: "yAxis", label: "yAxis data pointer", component: "text"},
        { name: "limit", label: "limit", component: "number"},
    ],
  }

  export default GraphBlock 