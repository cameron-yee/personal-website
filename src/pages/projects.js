import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"

const ProjectsPage = () => (
  <Layout>
    <SEO title="Projects" />
    <h1 className="mb-4">Projects</h1>
    <h2>Web</h2>
    <section>
      <ul>
        <li><a href="https://bscs.org" target="_blank" rel="noopener noreferrer">BSCS main website&nbsp;<sup><i className="fas fa-external-link-alt"></i></sup></a></li>
        <li><a href="https://3dmss.bscs.org" target="_blank" rel="noopener noreferrer">A Medical Mystery&nbsp;<sup><i className="fas fa-external-link-alt"></i></sup></a></li>
        <li><a href="https://mss-pdfs.bscs.org" target="_blank" rel="noopener noreferrer">Middle School Science PDFs&nbsp;<sup><i className="fas fa-external-link-alt"></i></sup></a></li>
      </ul>
    </section>
    <h2>Scripting</h2>
    <section>
      <ul>
        {/* eslint-disable-next-line */}
        <li><a href="#" target="_blank" rel="noopener noreferrer">CAPI&nbsp;<sup><i className="fas fa-external-link-alt"></i></sup></a></li>
      </ul>
    </section>
    <h2>Terminal</h2>
    <section>
      <ul>
        <li><a href="https://github/cameron-yee/timer" target="_blank" rel="noopener noreferrer">Terminal Timer&nbsp;<sup><i className="fas fa-external-link-alt"></i></sup></a></li>
      </ul>
    </section>
  </Layout>
)

export default ProjectsPage
