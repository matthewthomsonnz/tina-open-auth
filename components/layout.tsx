import { NAV_FIELDS } from '../blocks/NAV_FIELDS'
import { API_FIELDS } from '../blocks/API_FIELDS'
import { THEME_FIELDS } from '../blocks/THEME_FIELDS'
import {
    useGithubJsonForm,
    useGithubToolbarPlugins,
  } from 'react-tinacms-github'
  import { usePlugin, useFormScreenPlugin ,withPlugin} from 'tinacms'
  import { GetStaticProps, GetStaticPaths } from 'next'
  import { Nav } from "../components/nav";
  import slugify from "react-slugify"
  import { JsonCreatorPlugin } from "./jsonButton"
  
  const CreatePageButton = new JsonCreatorPlugin({
    label: "New Page",
    filename(form) {
      let slug = slugify(form.title.toLowerCase())
      return `content/${slug}.json`
    },
    fields: [
      { name: "title", label: "Title", component: "text" },
      { name: "path", label: "Path", component: "text" },
    ],
    data(form) {
      return { title: form.title,  path: form.path, }
    },
  })    
function MyComponent({children}) {
  if (!children.props.theme) return children; // future me:  this is for a cryptic error you may encounter

  const navFormOptions = { label: 'nav', fields: [...NAV_FIELDS], onSubmit: () => { alert('Saving...') }  }
  const apiFormOptions = { label: 'api', fields: [...API_FIELDS],   onSubmit: () => { alert('Saving...')}  }
  const themeFormOptions = { label: 'theme', fields: [...THEME_FIELDS],   onSubmit: () => { alert('Saving...')}  }
  
  const [navData, navForm] = useGithubJsonForm(children.props.nav, navFormOptions)
  const [apiData, apiForm] = useGithubJsonForm(children.props.api, apiFormOptions)
  const [themeData, themeForm] = useGithubJsonForm(children.props.theme, themeFormOptions)
      
      useFormScreenPlugin(navForm)
      useFormScreenPlugin(apiForm)
      useFormScreenPlugin(themeForm)
     
    return <> <Nav data={navData} />{children}</> 
  }

  export default withPlugin(MyComponent, [ CreatePageButton]);

