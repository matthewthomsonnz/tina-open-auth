import App from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
  GithubClient,
  GithubMediaStore,
  TinacmsGithubProvider,
} from 'react-tinacms-github'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from 'react-tinacms-github'
import { GetStaticProps } from 'next'
import { getGithubPreviewProps, parseJson, getGithubFile } from 'next-tinacms-github'
import { usePlugin, useFormScreenPlugin } from 'tinacms'
import MyComponent from '../components/layout'
import './../styles/global.css'
import './../styles/reset.css'

export default class Site extends App {
  cms: TinaCMS

  constructor(props) {
    super(props)


    const github = new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME, 
    })

    this.cms = new TinaCMS({
      enabled: !!props.pageProps.preview,
      apis: {
        github,
      },
      media: new GithubMediaStore(github),
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview,
    })

  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          onLogin={onLogin}
          onLogout={onLogout}
          error={pageProps.error}
        >

          <MyComponent>
            
          <Component {...pageProps} />
          </MyComponent>
          <EditLink cms={this.cms} />
        </TinacmsGithubProvider>
      </TinaProvider>
    )
  }
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch(`/api/preview`, { headers: headers })
  const data = await resp.json()

  if (resp.status == 200) window.location.href = window.location.pathname
  else throw new Error(data.message)
}

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export interface EditLinkProps {
  cms: TinaCMS
}

export const EditLink = ({ cms }: EditLinkProps) => {
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
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