import Head from 'next/head'

import { getGithubPreviewProps, parseJson, getGithubFile } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { usePlugin, useFormScreenPlugin } from 'tinacms'
import { GetStaticProps, GetStaticPaths } from 'next'
import GraphBlock from './../blocks/GraphBlock'
import InfoBlock from './../blocks/InfoBlock'
import { useState, useEffect } from 'react'

import { Graph } from '../components/Graph';

export default function Home({ file, preview, nav, api }) {

  var apis = api.data.api.items.map((item)=>{
    return fetch(item.link).then((res)=>res.json())
  });

  var apiData = Promise.all(apis);

  var test = [];
  const [apiInfo, setapiInfo] = useState(test);

  useEffect(() => {
    apiData.then((data)=>{
      test = data;
      setapiInfo(test);
    })},[]);

  const formOptions = {
    label: 'Home Page',
    fields: [
      {
        name: "items",
        label: "Repeater Items",
        component: "blocks",
        itemProps: (item) => ({ label: item.label, }),
        onSubmit: async () => {  },
        templates: { InfoBlock, GraphBlock },
      },
    ],
    onSubmit: (values) => { alert(`Submitting ${values.title}`) }
  }
  
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)
  useGithubToolbarPlugins()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {data.items && data.items.map(function (item, index) {
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
              case "GraphBlock":
                return (
                  <div className="block" style={{backgroundColor:item.backgroundColor, color: item.textColorOverride}}>
                  <div className="container">
                    <Graph title={item.label} xAxis={item.xAxis} limit={item.limit} yAxis={item.yAxis} graphStyle='bar' colorA='rgba(188, 225, 98, 1)' datasetA={apiInfo[item.api]} colorB='rgba(195, 138, 255, 1)' datasetB={apiInfo[item.api]} xAxisLabel='(in minutes)' datasetBLabel='Confidence level' />
                  </div>
                </div>
                );
            default: break;
          }
        })}
      </main>
    </div>
  )
}

export async function getStaticProps({
  preview,
  previewData,
  params
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
    const api = await getGithubFile({
      ...previewData,
      fileRelativePath: "content/api.json",
      parse: parseJson
    })
    const theme = await getGithubFile({
      ...previewData,
      fileRelativePath: "content/theme.json",
      parse: parseJson
    })
    return {
      props: { file: homeFile, nav, api, theme, preview:true }
    };
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
      api: {
        fileRelativePath: 'content/api.json',
        data: (await import('../content/api.json')).default,
      },
      theme: {
        fileRelativePath: 'content/theme.json',
        data: (await import('../content/theme.json')).default,
      },
    },
  }
}