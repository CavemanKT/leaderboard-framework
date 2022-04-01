import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

import CompsLayout from '@/components/layouts/Layout'
import withAdminRoute from '@/_hocs/withAdminRouter'
import useUsers from '@/_hooks/allUsers'

import CompsLoading from '@/components/Loading'
import { ComponentVerification } from '@/components/tables/verificationComponent'

function VerificationPage () {

  const [show, setShow ] = useState(false)
  const [userInfo, setUserInfo ] = useState(null)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { allUsers, isAllUsersLoading } = useUsers()

  if ( !allUsers ) return null
  if ( isAllUsersLoading ) return <CompsLoading />

  const handleUserInfo = (userId) => {
    setUserInfo(userId)
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

        <div id="verification-page-container" className="container col col-md-8 col-sm-12 col-lg-6">
        {
          !userInfo && (
            <div className="m-5">
              <h3>
                choose the target user
              </h3>
            </div>
          )
        }
              {
                userInfo && (
                  <ComponentVerification 
                    userId={userInfo}
                  />
                )
              }
        </div>
      </div>
    </CompsLayout>
  )
}

export default withAdminRoute(VerificationPage)