import React, { useState, useEffect } from "react"
import { Link } from 'gatsby'
import PropTypes from "prop-types"
import algoliasearch from 'algoliasearch'
import { InstantSearch, connectHits, SearchBox, Highlight } from 'react-instantsearch-dom'

import ThemeToggle from '../atoms/theme-toggle'

const Hit = (props) => {
  return (
    <div className="p-2">
      <Link to={props.hit.page}>{props.hit.title}</Link>
        {/* <Highlight attribute="title" hit={props.hit} tagName="mark" /> */}

      <div>{props.hit.description}</div>
    </div>
  )
}

const Hits = (props) => {
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
      <ol className="ais-Hits-list" style={{position: 'absolute'}}>
        {props.hits.map((hit, index) => {
          return (
            <React.Fragment key={`hit-${index}`} >
              <Hit hit={hit} />
              {props.hits.length - 1 !== index &&
                <hr className="my-1" />
              }
            </React.Fragment>
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
    <React.Fragment>
      <header className="d-none d-md-flex justify-content-start">
        <nav className="d-flex">
          {/* <h1 className="p-3">{props.siteTitle}</h1> */}
          <Link to="/" className="p-3 align-self-center">About</Link>
          <Link to="/tech-stack" className="p-3 align-self-center">Tech Stack</Link>
          <Link to="/projects" className="p-3 align-self-center">Projects</Link>
          <a href="https://github.com/cameron-yee" className="p-3 align-self-center" rel="noopener noreferrer" target="_blank">
            <i className="fab fa-github fa-2x github"></i>
          </a>
        </nav>
        <div className="p-3 ml-auto search align-self-center">
          <InstantSearch
            searchClient={searchClient}
            indexName="dev_INDEX"
            placeholder="Test"
          >
            <SearchBox translate={() => 'Search'} />
            <CustomHits />
          </InstantSearch>
        </div>

        <ThemeToggle className="p-3 align-self-center" />
      </header>
      <header className="d-block d-md-none">
        <nav className="pb-0" style={{display: 'block'}}>
          {/* <h1 className="p-3">{props.siteTitle}</h1> */}
          <p><Link to="/" className="p-3 align-self-center">About</Link></p>
          <p><Link to="/tech-stack" className="p-3 align-self-center">Tech Stack</Link></p>
          <p><Link to="/projects" className="p-3 align-self-center">Projects</Link></p>
        </nav>
        <div className="pt-0 pb-3 px-3 search align-self-center">
          <InstantSearch
            searchClient={searchClient}
            indexName="dev_INDEX"
            placeholder="Test"
          >
            <SearchBox placeholder="TEST" />
            <CustomHits />
          </InstantSearch>
        </div>

        <div className="d-flex">
          <a href="https://github.com/cameron-yee" className="p-3 align-self-center" rel="noopener noreferrer" target="_blank">
            <i className="fab fa-github fa-2x github pt-3"></i>
          </a>
          <ThemeToggle className="p-3 align-self-end" />
        </div>
        <hr />
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}