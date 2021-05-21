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
 
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">
          {'title'}
        </h1>

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
