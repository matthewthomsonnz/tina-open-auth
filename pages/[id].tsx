import Head from 'next/head'
/*
 ** Import helpers and GetStaticProps type
 */
import { getGithubPreviewProps, parseJson, getGithubFile } from 'next-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { usePlugin, useFormScreenPlugin } from 'tinacms'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Nav } from "../components/nav";
import { InlineForm, InlineGroup } from "react-tinacms-inline";

export default function Home({ file, preview, nav }) {
 const navFormOptions = {
  label: 'nav',
  fields: [...NAV_FIELDS],
  onSubmit: (values) => {
    alert(`Submitting ${values.title}`)
  }
}

const [navData, navForm] = useGithubJsonForm(nav, navFormOptions)
useFormScreenPlugin(navForm)
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
 
        <Nav data={navData.nav} />

      <main>
        <h1 className="title">
          {'title'}
        </h1>

      </main>
    </div>
  )
}

/*
 ** Fetch data with getStaticProps based on 'preview' mode
 */
//  export const getStaticProps: GetStaticProps = async function ({
//   preview,
//   previewData,
// }) {

 
//   return {
//     props: {
//       sourceProvider: null,
//       error: null,
//       preview: false,
//       file: {
//         fileRelativePath: 'content/home.json',
//         data: (await import('../content/home.json')).default,
//       },
//       nav: {
//         fileRelativePath: 'content/nav.json',
//         data: (await import('../content/nav.json')).default,
//       }
//     },
//   }
// }
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
  var test = (await import('../content/nav.json')).default
  var paths =test.nav.items.map((item)=>{

    return {params: {id: item.link}}
  })


  return {
    paths: paths,
    fallback: false // See the "fallback" section below
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
      }
    ],
  },
];
