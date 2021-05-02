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


import { Graph } from '../components/Graph';





export default function Home({ file, preview, nav, args }) {
  const formOptions = {
    label: 'Home Page',
    fields: [
      { name: 'title', component: 'text' },
      {
        name: "items",
        label: "Repeater Items",
        component: "group-list",
        // itemProps: (item) => ({
        //   label: item.label,
        // }),
        fields: [
          {
            name: "label",
            label: "Label",
            component: "text",
          },
          {
            name: "backgroundColor",
            label: "Background color",
            component: "color",
          },
          {
            name: "textColorOverride",
            label: "Text color override",
            component: "color",
          },
          {
            name: "fsdfdsf",
            label: "Fsdfdsf",
            component: "text",
          },
        ],
      },
    ],
    onSubmit: (values) => {
      alert(`Submitting ${values.title}`)
    }
  }

  /*
   ** Register a JSON Tina Form
   */
  const [data, form] = useGithubJsonForm(file, formOptions)
  usePlugin(form)

  const navFormOptions = {
    label: 'nav',
    fields: [...NAV_FIELDS],
    onSubmit: (values) => {
      alert(`Submitting ${values.title}`)
    }
  }

  /*
   ** Register a JSON Tina Form
   */
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
      <main>
        <h1 className="title">
          {data.title}
        </h1>
        {data.items.map(function (item, index) {
          console.log(item);
          
                return (
                  <div className="block" style={{backgroundColor:item.backgroundColor, color: item.textColorOverride}}>
                    {item.label}
                  {item.link}
                </div>
                );
              })}
      </main>


      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          color: ${preview && 'red'};
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .block {
          width: 100%;
          padding: 50px;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

/*
 ** Fetch data with getStaticProps based on 'preview' mode
 */
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
console.log('begin');

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
