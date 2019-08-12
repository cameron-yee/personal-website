import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function ThemeToggle(props) {
  const switchTheme = (e) => {
      const icon = document.getElementById('theme-icon')

      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
        icon.classList.add('fa-sun')
        icon.classList.remove('fa-moon')
        icon.classList.add('dark')
        icon.classList.remove('light')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
        icon.classList.add('fa-moon')
        icon.classList.remove('fa-sun')
        icon.classList.add('light')
        icon.classList.remove('dark')
      }

  }

  useEffect(() => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]')
    const currentTheme = localStorage.getItem('theme')
    const icon = document.getElementById('theme-icon')

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme)

        if (currentTheme === 'dark') {
            toggleSwitch.checked = true
            icon.classList.add('fa-sun')
            icon.classList.remove('fa-moon')
            icon.classList.add('dark')
            icon.classList.remove('light')
        }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    return (() => { toggleSwitch.removeEventListener('change', switchTheme, false) })
  }, [])

  return (
    <div className={props.className ? `${props.className} theme-switch-wrapper` : `theme-switch-wrapper`}>
      <label className="theme-switch" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" />
        {/* <div className="slider round" > */}
          <i
            id="theme-icon"
            className="fas fa-moon theme-toggle light"
          ></i>
        {/* </div> */}
       </label>&nbsp;
    </div>
  )
}

ThemeToggle.propTypes = {
  className: PropTypes.string
}