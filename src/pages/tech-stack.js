import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import Image from "../components/image"
import SEO from "../components/layout/seo"

const TechStackPage = () => (
  <Layout>
    <SEO title="Tech Stack" />
    <h1 className="mb-4">Tech Stack</h1>
    <h2>Web Development</h2>
    <hr />
    <section>
      <h3>Active</h3>
      <p>I currently prefer working in the <a href="https://jamstack.org" target="_blank" rel="noopener noreferrer">JAM Stack&nbsp;<sup><i className="fas fa-external-link-alt"></i></sup></a> and creating micro-services as needed.</p>
      <ul>
        <li>Digital Ocean</li>
        <li>Docker Compose</li>
        <li>Flask</li>
        <li>GatsbyJS</li>
        <li>Github</li>
        <li>GraphQL</li>
        <li>NGINX</li>
        <li>Netlify</li>
        <li>NodeJS</li>
        <li>PostgreSQL</li>
        <li>Sass</li>
      </ul>
      <h3>Also likes...</h3>
      <ul>
        <li>Vue</li>
      </ul>
      <h3>I'd prefer not to...</h3>
      <ul>
        <li>Angular</li>
        <li>Django</li>
        <li>REST APIs (GraphQL if at all possible)</li>
        <li>MySQL, MariaDB</li>
      </ul>
      <h3>Hates with a passion...</h3>
      <ul>
        <li>Drupal</li>
        <li>Moodle</li>
      </ul>
    </section>

    <h2>Scripting</h2>
    <hr />
    <section>
      <ul>
        <li>Python</li>
        <li>Bash</li>
        <li>Osascript</li>
      </ul>
    </section>

    <h2>Actively learning</h2>
    <hr />
    <section>
      <ul>
        <li>C</li>
      </ul>
    </section>

    <h2>Interested in learning</h2>
    <hr />
    <section>
      <ul>
        <li>Rust</li>
        <li>Rust</li>
      </ul>
    </section>

    <h2>API Experience</h2>
    <hr />
    <section>
      <ul>
        <li>Stripe</li>
        <li>Canvas LMS</li>
        <li>Vimeo</li>
      </ul>
    </section>
  </Layout>
)

export default TechStackPage
