import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

import CompsLayout from '@/components/layouts/Layout'
import withAdminRoute from '@/_hocs/withAdminRouter'
import useUsers from '@/_hooks/allUsers'
import CompsLoading from '@/components/Loading'

// a list of Users associated with their profiles  ---> offcanvas
// once I click the user, I can view their user and profile attributes

function VerificationPage () {

  const [show, setShow ] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { allUsers, isAllUsersLoading } = useUsers()

  if ( !allUsers ) return null
  if ( isAllUsersLoading ) return <CompsLoading />

  const handleUserInfo = (userId) => {
    console.log(userId)
  }


  return (
    <CompsLayout>
      <div id="contact-page-wrapper">
        <Button variant="animated-arrow" onClick={handleShow} className="me-2" />
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div>
                List of users
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="overflow-auto">
              {
                allUsers && allUsers.map((item, i) => (
                  <div key={item.id} className="d-flex justify-content-between m-3">
                    <button type="button" className="btn btn-light" onClick={() => handleUserInfo(item.id)}>{item.email}</button>
                  </div>
                ))
              }

            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <div id="verification-page-container" className="container">
          <div>

          </div>
        </div>
      </div>
    </CompsLayout>
  )
}

export default withAdminRoute(VerificationPage)