import Head from 'next/head'

import { getGithubPreviewProps, parseJson, getGithubFile } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { usePlugin, useFormScreenPlugin } from 'tinacms'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Nav } from "../components/nav";
import { InlineForm, InlineGroup } from "react-tinacms-inline";


import { Graph } from '../components/Graph';

const InfoBlock = {
  label: "Info",
  name: "info",
  // defaultItem: {
  //   title: "",
  //   center: false,
  //   underline: true,
  // },
  fields: [
    {
      name: "label", label: "Label", component: "text"},
      { name: "backgroundColor", label: "Background color", component: "color"},
      { name: "textColorOverride", label: "Text color override", component: "color"},
      { name: "fsdfdsf", label: "Fsdfdsf", component: "text"},
  ],
}

const GraphBlock = {
  label: "Graph",
  name: "graph",
  fields: [
    {
      name: "label", label: "Label", component: "text"},
      { name: "backgroundColor", label: "Background color", component: "color"},
      { name: "textColorOverride", label: "Text color override", component: "color"},
  ],
}
export default function Home({ file, preview, nav }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      {
        name: "items",
        label: "Repeater Items",
        component: "blocks",
        // itemProps: (item) => ({
        //   label: item.label,
        // }),

        templates: {
          InfoBlock,
          GraphBlock
        },

      },
    ],
    onSubmit: (values) => {
      alert(`Submitting ${values.title}`)
    }
  }

  
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  const navFormOptions = {
    label: 'nav',
    fields: [...NAV_FIELDS],
    onSubmit: (values) => {
      alert(`Submitting ${values.title}`)
    }
  }
  const [navData, navForm] = useGithubJsonForm(nav, navFormOptions)
  useFormScreenPlugin(navForm)

  useGithubToolbarPlugins()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Nav data={navData.nav} />
     
      <main>
        <h1 className="title">
          {data.title}
        </h1>
        {data.items.map(function (item, index) {
          switch (item._template) {
            case "InfoBlock":
              return (
                <div className="block" style={{backgroundColor:item.backgroundColor, color: item.textColorOverride}}>
                  {item.label}
                {item.link}
              </div>
              );
              break;
              case "GraphBlock":
                return (
                  <div className="block" style={{backgroundColor:item.backgroundColor, color: item.textColorOverride}}>
   <Graph 
  title='Probability'
  graphStyle='line'
  colorA='rgba(188, 225, 98, 1)'
  datasetA={[40, 20, 50, 45, 10, 10, 20]}
  colorB='rgba(195, 138, 255, 1)'
  datasetB={[70, 65, 60, 55, 50, 45, 40]}
  xAxisLabel='(in minutes)'
  datasetBLabel='Confidence level'
/>
                </div>
                );
                break;
            default:
              break;
          }
          

              })}
      </main>

    </div>
  )
}

export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    const homeFile = await getGithubFile({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson
    });
    const nav = await getGithubFile({
      ...previewData,
      fileRelativePath: "content/nav.json",
      parse: parseJson
    })
    return {props: {
      file: homeFile,
      nav,
      preview:true
    }};
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
      nav: {
        fileRelativePath: 'content/nav.json',
        data: (await import('../content/nav.json')).default,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async function () {


  var test = (await import('../content/nav.json')).default;
var paths =test.nav.items.map((item)=>{
  return {params: {id: item.link}}
})
    return {
      paths,
      fallback: true
    };
  }

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
    name: "nav.items",
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
