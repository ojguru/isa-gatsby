import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'

import globalStyles from '../components/styles/global-styles'
import FontFace from '../components/styles/font-faces'
import Header from './header'
import Footer from './footer'
import ResourcesList from './resourceslist'
import Contact from './contact'
import usePages from '../hooks/usePages'
import PageIndexes from './page-indexes'
import Seo from '../components/seo'

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]')
}

const Layout = (props) => {
  //Si obj no es pasado en props, utiliza page;
  const [page] = usePages().filter((page) => page.uri === props.path)

  const { children, obj = page, data } = props

  const [resultsSearch, setResultsSearch] = useState()

  const {
    wp: { generalSettings: settings },
  } = useStaticQuery(graphql`
    query MyQuery {
      wp {
        id
        generalSettings {
          dateFormat
          description
          email
          language
          startOfWeek
          timeFormat
          timezone
          title
          url
        }
      }
    }
  `)

  useEffect(() => {
    // Carga el script de hubspot
    // const scripts = ['//js-na1.hs-scripts.com/20627890.js']
    // scripts.map((url) => {
    //   const script = document.createElement('script')
    //   script.src = url
    //   let jqueryScript = document.getElementsByTagName('script')
    //   let src = Array.from(jqueryScript).filter(
    //     (item) => item.src === script.src,
    //   )
    //   if (src.length === 0) {
    //     document.body.appendChild(script)
    //   }
    //   return url
    // })
  }, [])

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: 'en',
        }}
      >
        <title>{settings.title}</title>
        <meta name="description" content={settings.description} />
      </Helmet>

      <Seo {...props} />

      <FontFace />

      <Global styles={globalStyles({ settings })} />

      <Header {...{ setResultsSearch }} />

      <Main>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...{ resultsSearch, setResultsSearch },
            })
          }
          return child
        })}
        {/* 
          Se muestran recursos relacionados con el tipo de dato 
            - Se excluye el tipo pensum para los objetos de tipo WpCarrera. Ya que los pensums se muestran de una forma distinta en las carreras
        */}
        <ResourcesList
          items={obj?.recursos || []}
          exclude={obj?.type === 'WpCarrera' ? ['pensum'] : []}
        />
        {/* Se muestra información de contacto relacionada con el tipo de dato */}
        <Contact data={obj?.contacto} />
        {data && <PageIndexes data={data} />}
      </Main>

      <Footer />
    </>
  )
}

export default Layout

const Main = styled.main`
  overflow: hidden;
`
