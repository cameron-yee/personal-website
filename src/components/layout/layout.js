/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import 'typeface-merriweather'
import 'typeface-montserrat'

import Header from "./header"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

// import "./layout.scss"

import '../../global-scss/index.scss'

export default function Layout(props) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="d-flex flex-column" style={{minHeight: '100vh'}}>
      <Container fluid className="d-flex flex-column p-0" style={{flexShrink: '0'}}>
      {/* <Container fluid> */}
        <Header siteTitle={data.site.siteMetadata.title} />
      </Container>
      <Container fluid className="d-flex flex-column" style={{flexGrow: '1'}}>
        <Row
          style={{
            flex: "1",
          }}
          className={props.className ? `p-3 ${props.className}` : "p-3"}
        >
          <main>{props.children}</main>
        </Row>
      </Container>
      <Container fluid className="d-flex flex-column p-0" style={{flexShrink: '0'}}>
        <footer className="d-flex justify-content-center p-3">
          © {new Date().getFullYear()}
        </footer>
      </Container>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}