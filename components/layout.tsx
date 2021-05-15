import {NAV_FIELDS } from '../blocks/NAV_FIELDS'
import {
    useGithubJsonForm,
    useGithubToolbarPlugins,
  } from 'react-tinacms-github'
  import { usePlugin, useFormScreenPlugin } from 'tinacms'
  import { GetStaticProps, GetStaticPaths } from 'next'
  import { Nav } from "../components/nav";

function MyComponent({children}) {
  console.log('yes');
  
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

  export default MyComponent;

