import {NAV_FIELDS } from '../blocks/NAV_FIELDS'
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
      return {
        title: form.title,
        path: form.path,
      }
    },
  })    
function MyComponent({children}) {

  if (!children.props.nav) return children;
    const navFormOptions = {
        label: 'nav',
        fields: [...NAV_FIELDS],
        onSubmit: () => {
          alert('Saving...')
        },
      }
      
      const [navData, navForm] = useGithubJsonForm(children.props.nav, navFormOptions)

// console.log(navForm);
// console.log(navForm.submit);
// console.log(navForm.onSubmit);
// console.log(navForm.handleSubmit);

      
      useFormScreenPlugin(navForm)

  
     
    return <> <Nav data={navData} />{children}</> 
  }

  export default withPlugin(MyComponent, [ CreatePageButton]);

