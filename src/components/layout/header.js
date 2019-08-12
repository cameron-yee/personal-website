import React, { useState, useEffect } from "react"
import { Link } from 'gatsby'
import PropTypes from "prop-types"
import algoliasearch from 'algoliasearch'
import { InstantSearch, connectHits, SearchBox, Highlight } from 'react-instantsearch-dom'

import ThemeToggle from '../atoms/theme-toggle'

const Hit = (props) => {
  return (
    <Link to={props.hit.page}>
      <Highlight attribute="title" hit={props.hit} tagName="mark" />
    </Link>
  )
}

const Hits = (props) => {
  // console.log(props.hits)
  const search_input_elem = document.getElementsByClassName('ais-SearchBox-input')[0]
  let search_input_value = undefined

  if (search_input_elem) {
    search_input_value = document.getElementsByClassName('ais-SearchBox-input')[0].value
  }

  if (!search_input_value) {
    return (
      <React.Fragment/>
    )
  } else {
    return (
      <ol className="ais-Hits-list">
        {props.hits.map(hit => {
          return (
            <Hit hit={hit} key={`hit-${hit.objectId}`} />
          )
        })
        }
      </ol>
    )
  }
}

const CustomHits = connectHits(Hits)

export default function Header(props) {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )

  return (
    <header>
      <nav className="d-flex justify-content-start flex-wrap">
        {/* <h1 className="p-3">{props.siteTitle}</h1> */}
        <Link to="/" className="p-3 align-self-center">About</Link>
        <Link to="/tech-stack" className="p-3 align-self-center">Tech Stack</Link>
        <Link to="/projects" className="p-3 align-self-center">Projects</Link>
        <a href="https://github.com/cameron-yee" className="p-3 align-self-center" rel="noopener noreferrer" target="_blank">
          <i className="fab fa-github fa-2x github"></i>
        </a>

        <div className="p-3 ml-auto search">
          <InstantSearch
            searchClient={searchClient}
            indexName="dev_INDEX"
          >
            <SearchBox />
            <CustomHits />
          </InstantSearch>
        </div>

        <ThemeToggle className="p-3" />
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}