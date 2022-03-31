import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Table from 'react-bootstrap/Table'

import CompsLayout from '@/components/layouts/Layout'
import withAdminRoute from '@/_hocs/withAdminRouter'
import useUsers from '@/_hooks/allUsers'
import CompsLoading from '@/components/Loading'

// a list of Users associated with their profiles  ---> offcanvas
// once I click the user, I can view their user and profile attributes

function VerificationPage () {

  const [show, setShow ] = useState(false)
  const [userInfo, setUserInfo ] = useState(null)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { allUsers, isAllUsersLoading, apiUser } = useUsers()

  if ( !allUsers ) return null
  if ( isAllUsersLoading ) return <CompsLoading />

  const handleUserInfo = (userId) => {
    apiUser(userId).then((resp) => {
      console.log(resp.data)
      setUserInfo(resp.data)
    })
  }

  const settingVerifiedToTrue = () => {
    apiSetVerifiedToTrue()
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
                userInfo && (
                  <div id="profile-container" className="position-relative">
                    <div className="profile-wrapper row">
                      <div className="right-column col">
                        {/* Character info table */}
                        <Table responsive>
                          <thead className="d-flex justify-content-between">
                            <tr className="tr-font d-inline">
                              <th>User and Company Profile</th>
                            </tr>
                              <button className="btn btn-info m-3" onClick={settingVerifiedToTrue}>Verify</button>
                          </thead>
                          <tbody>
                            <tr className="d-flex flex-column">
                              <td className="d-flex justify-content-between">
                                <span>Company Website</span>
                                <span className="me-1">{userInfo.Profile.domain}</span>
                              </td>
                              <td className="d-flex justify-content-between">
                                <span>Emain</span>
                                <span className="me-1">{userInfo.email}</span>
                              </td>
                              <td className="d-flex justify-content-between">
                                <span>Founded in</span>
                                <span className="me-1">{userInfo.Profile.founded}</span>
                              </td>
                              <td className="d-flex justify-content-between">
                                <span>Category</span>
                                <span className="me-1">{userInfo.Profile.category}</span>
                              </td>
                              <td className="d-flex justify-content-between">
                                <span>Based in</span>
                                <span className="me-1">{userInfo.Profile.country}</span>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                )
              }
        </div>
      </div>
    </CompsLayout>
  )
}

export default withAdminRoute(VerificationPage)