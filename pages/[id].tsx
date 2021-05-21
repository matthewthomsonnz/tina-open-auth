import Head from 'next/head'

import { getGithubPreviewProps, parseJson, getGithubFile } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { usePlugin, useFormScreenPlugin } from 'tinacms'
import { GetStaticProps, GetStaticPaths } from 'next'
import { InlineForm, InlineGroup } from "react-tinacms-inline";
import GraphBlock from './../blocks/GraphBlock'
import InfoBlock from './../blocks/InfoBlock'

import { Graph } from '../components/Graph';

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
        onSubmit: async () => {
          console.log('fff');
          
        },
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

  useGithubToolbarPlugins()
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <h1 className="title">
          {data.title}
        </h1>
        {data.items.map(function (item, index) {
          switch (item._template) {
            case "InfoBlock":
              return (
                <div className="block" style={{backgroundColor:item.backgroundColor, color: item.textColorOverride}}>
                  <div className="container">
                  {item.label}
                {item.link}
                </div>
              </div>
              );
              break;
              case "GraphBlock":
                return (
                  <div className="block" style={{backgroundColor:item.backgroundColor, color: item.textColorOverride}}>
                  <div className="container">

                  <Graph 
                  title='Probability'
                  graphStyle='line'
                  colorA='rgba(188, 225, 98, 1)'
                  datasetA={[40, 20, 50, 45, 10, 10, 20]}
                  colorB='rgba(195, 138, 255, 1)'
                  datasetB={[70, 65, 60, 55, 50, 45, 40]}
                  xAxisLabel='(in minutes)'
                  datasetBLabel='Confidence level'
                /></div>
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
  params
}) {
  
  if (preview) {
    const homeFile = await getGithubFile({
      ...previewData,
      fileRelativePath: `content/${params.id}.json`,
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
console.log('start');

  var data = (await import(`../content/${params.id}.json`))
  console.log('below');
  
  console.log(data);
  data = data.default
  // if (typeof window === 'undefined' &&)
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: `content/${params.id}.json`,
        data: data,
      },
      nav: {
        fileRelativePath: 'content/nav.json',
        data: (await import('../content/nav.json')).default,
      },
    },
  }
}
export const getStaticPaths: GetStaticPaths = async function () {
  var nav = (await import('../content/nav.json')).default
  var paths =nav.items.map((item)=>{

    return {params: {id: item.link}}
  })


  return {
    paths: paths,
    fallback: false // See the "fallback" section below
  };
  }
