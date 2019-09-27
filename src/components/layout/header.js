import React, { useState, useEffect } from "react"
import { Link } from 'gatsby'
import PropTypes from "prop-types"
import algoliasearch from 'algoliasearch'
import { InstantSearch, connectHits, SearchBox, Highlight } from 'react-instantsearch-dom'

import ThemeToggle from '../atoms/theme-toggle'

const Hit = (props) => {
  return (
    <Link to={props.hit.page} className="p-2 ais-Hit ais-clickable d-block">
      <span>{props.hit.title}</span>
        {/* <Highlight attribute="title" hit={props.hit} tagName="mark" /> */}

      <div className="ais-clickable">{props.hit.description}</div>
    </Link>
  )
}

const Hits = (props) => {
  const search_input_elem_lg = document.getElementsByClassName('ais-SearchBox-input')[0]
  const search_input_elem_sm = document.getElementsByClassName('ais-SearchBox-input')[1]
  let search_input_value = undefined

  if (search_input_elem_lg && search_input_elem_lg.value !== '') {
    search_input_value = search_input_elem_lg.value
  } else if (search_input_elem_sm && search_input_elem_sm.value !== '') {
    search_input_value = search_input_elem_sm.value
  }

  if (!search_input_value) {
    return (
      <React.Fragment/>
    )
  } else {
    return (
      <ol className="ais-Hits-list ais-clickable" style={{position: 'absolute'}}>
        {props.hits.map((hit, index) => {
          return (
            <React.Fragment key={`hit-${index}`} >
              <Hit hit={hit} />
              {props.hits.length - 1 !== index &&
                <hr className="my-0" />
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

const matchSearchBoxes = () => {
  const search_input_elem_lg = document.getElementsByClassName('ais-SearchBox-input')[0]
  const search_input_elem_sm = document.getElementsByClassName('ais-SearchBox-input')[1]

  if (search_input_elem_lg.value === search_input_elem_sm.value) {
    return
  } if (search_input_elem_lg.value) {
    search_input_elem_sm.value = search_input_elem_lg.value
  } else if (search_input_elem_sm.value) {
    search_input_elem_lg.value = search_input_elem_sm.value
  } else {
    search_input_elem_lg.value = ''
    search_input_elem_sm.value = ''
  }
}

const setupUI = () => {
  const search_input_elems = document.getElementsByClassName('ais-SearchBox-input')

  if (search_input_elems) {
    for (let i = 0; i < search_input_elems.length; i++) {
      search_input_elems[i].classList.add('w-100')
      search_input_elems[i].classList.add('ais-clickable')

      // UNCOMMENT TO REMOVE INPUT X BUTTON
      search_input_elems[i].removeAttribute('type')
    }
  }
}

const handleHitsDisplay = (e) => {
  if (!e.target.classList.contains('ais-clickable')) {
    const hits_list_elems = document.getElementsByClassName('ais-Hits-list')

    for (let i = 0; i < hits_list_elems.length; i++) {
      hits_list_elems[i].style.display = 'none'
    }
  } else {
    const hits_list_elems = document.getElementsByClassName('ais-Hits-list')

    for (let i = 0; i < hits_list_elems.length; i++) {
      hits_list_elems[i].style.display = ''
    }
  }
}

const handleSearchArrowUp = (active_element, hit_elements, count) => {
  if (count > 1) {
    active_element.blur()
    const new_count = --count
    hit_elements[new_count].setAttribute('tabindex', '-1')
    hit_elements[new_count].focus()
    return new_count
  } else if (count === 0) {
    document.getElementsByClassName('ais-SearchBox-input')[0].setAttribute('tabindex', '-1')
    document.getElementsByClassName('ais-SearchBox-input')[0].focus()
    return -1
  } else {
    active_element.blur()
    hit_elements[0].setAttribute('tabindex', '-1')
    hit_elements[0].focus()
    return 0
  }
}

const handleSearchArrowDown = (active_element, number_of_hits, hit_elements, count) => {
    if (count >= number_of_hits - 1) {
      active_element.blur()
      hit_elements[number_of_hits - 1].setAttribute('tabindex', '-1')
      hit_elements[number_of_hits - 1].focus()
      return number_of_hits - 1
    } else {
      active_element.blur()
      const new_count = ++count
      hit_elements[new_count].setAttribute('tabindex', '-1')
      hit_elements[new_count].focus()
      return new_count
    }
}

const handleKeyDown = (e, count=-1) => {
  const active_element = document.activeElement
  // console.log(active_element)
  const hit_elements = document.getElementsByClassName('ais-Hit')
  const number_of_hits = hit_elements.length

  if (number_of_hits !== 0 && e.target.classList.contains('ais-clickable') && e.keyCode === 38) {
    return handleSearchArrowUp(active_element, hit_elements, count)
  }

  if (number_of_hits !== 0 && e.target.classList.contains('ais-clickable') && e.keyCode === 40) {
    return handleSearchArrowDown(active_element, number_of_hits, hit_elements, count)
  }

  return -1
}

export default function Header() {
  useEffect(() => {
    setupUI()

    window.addEventListener('click', handleHitsDisplay)

    let count = -1
    document.addEventListener('keydown', (e) => {
      if(document.activeElement.classList.contains('ais-clickable') && [32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault()
      }

      // ensures hit elements are on DOM
      setTimeout(() => {
        count = handleKeyDown(e, count)
        console.log(count)
      }, 250)
    })

    let timeout = undefined
    if (typeof window !== `undefined`) {
      let throttled = false
      window.addEventListener('resize', () => {
        if (!throttled) {
          matchSearchBoxes()
          throttled = true
        }

        if (!timeout) {
          timeout = setTimeout(() => { throttled = false; clearTimeout(timeout); timeout = undefined }, 250)
        }
      })
    }

    return () => {
      if (typeof window !== `undefined`) {
        window.removeEventListener('resize', matchSearchBoxes)
        clearTimeout(timeout)
      }
    }
  }, [])

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
        <div id="search-container-lg" className="p-3 ml-auto search align-self-center ais-clickable">
          <InstantSearch
            searchClient={searchClient}
            indexName="dev_INDEX"
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
        <div id="search-container-sm" className="pt-0 pb-3 px-3 search align-self-center ais-clickable">
          <InstantSearch
            searchClient={searchClient}
            indexName="dev_INDEX"
          >
            <SearchBox translate={() => 'Search'} />
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