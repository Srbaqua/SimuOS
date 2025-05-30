import React from 'react'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg " data-bs-theme="dark" mt-auto>
      <div className="container-fluid navbar-brand " >
        <img src="/logoOS.jpg" alt="Logo" width="80" height="80" className="head d-inline-block align-text-top" />
        <span className="link-hover ms-2 fw-bold fs-4 ">SimuOS</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-1 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-1" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
        </div>
      </div>
    </nav>

  )
}

export default Header
