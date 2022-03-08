import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import { useState, useRef } from 'react'

import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import ModalsSignup from '@/components/modals/auth/signup'
import ModalsLogin from '@/components/modals/auth/login'

// img

// user
import useUser from '@/_hooks/user'

export default function CompsLayoutsNavbar() {
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)
  const [openSignupModal, setOpenSignupModal] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)

  const { user, apiSignup, apiLogin, apiLogout } = useUser()

  const handleSignupModal = () => {
    setOpenSignupModal(true)
  }

  const closeModalsSignup = () => {
    setOpenSignupModal(false)
  }

  const handleSignupSubmit = (values) => {
    apiSignup(values).then(() => {
      setOpenSignupModal(false)
    })
  }

  const handleLoginModal = () => {
    setOpenLoginModal(true)
  }

  const closeModalsLogin = () => {
    setOpenLoginModal(false)
  }

  const handleLoginSubmit = (values) => {
    apiLogin(values).then(() => {
      setOpenLoginModal(false)
    })
  }

  const handleLogout = () => {
    apiLogout()
  }

  const handleClick = (event) => {
    setShow(!show)
    setTarget(event.target)
  }

  return (
    <>
      <Navbar id="comps-layouts-navbar" bg="light" expand="lg">
        <Container>
          {/* <Image src={brandLogo} alt="brand-logo" width="250" height="250" /> */}
          <span>
            <div>
              <Navbar.Brand as={Link} href="/"><a className="navbar-brand font-color">SkilledUp</a></Navbar.Brand>
            </div>
            <div>
              <Navbar.Brand as={Link} href="/"><a className="navbar-brand font-color">Life</a></Navbar.Brand>
            </div>
          </span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto w-100">
              <Nav.Link as={Link} href="/about-us"><a className="nav-link">About Us</a></Nav.Link>
              { !user
              && (
                <>
                  <Nav.Link className="" onClick={() => handleSignupModal()}>Sign up</Nav.Link>
                  <Nav.Link className="" onClick={() => handleLoginModal()}>Log in</Nav.Link>
                </>
              )}
              {
              user && (
                <div className="d-flex justify-content-end w-100 p-2">
                  <div ref={ref}>
                    <Button onClick={handleClick}>{user.email}</Button>
                    <Overlay
                      show={show}
                      target={target}
                      placement="bottom"
                      container={ref}
                      containerPadding={20}
                    >
                      <Popover id="popover-contained">
                        <Popover.Body>
                          <ul className="list-unstyled text-center">
                            <li className="mb-2 rounded-3 btn-info">
                              <button className="btn">account</button>
                            </li>
                            <li className="mb-2 rounded-3 btn-info">
                              <button className="btn">profile</button>
                            </li>
                            <li className="mb-2 rounded-3 btn-info">
                              <button className="btn">report</button>
                            </li>
                            <li className="mb-2 rounded-3 btn-info">
                              <button className="btn">cms</button>
                            </li>
                            <li className="mb-2 rounded-3 btn-info">
                              <button className="btn">logout</button>
                            </li>
                          </ul>
                        </Popover.Body>
                      </Popover>
                    </Overlay>
                  </div>
                  <Nav.Link className="" onClick={handleLogout}>Log out</Nav.Link>
                </div>
              )
            }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {openSignupModal && <ModalsSignup close={closeModalsSignup} onSubmit={handleSignupSubmit} />}
      {openLoginModal && <ModalsLogin close={closeModalsLogin} onSubmit={handleLoginSubmit} />}
    </>
  )
}
