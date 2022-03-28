import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
// import { useRouter } from 'next/router'
// import { toast } from 'react-toastify';
import CompsLayout from '@/components/layouts/Layout'
import withAdminRoute from '@/_hocs/withAdminRouter'
import useUsers from '@/_hooks/allUsers'
import CompsLoading from '@/components/Loading'
import FormMailbox from '@/components/forms/admin/mailbox'
import useMailbox from '@/_hooks/admin/contact/mailbox'

function ContactPage () {
  const [show, setShow ] = useState(false)
  const [recipient, setRecipient] = useState(null)
  const [sender, setSender] = useState(null)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { allUsers, isAllUsersLoading } = useUsers()
  const { apiSendEmailToUser } = useMailbox()

  if ( !allUsers ) return null
  if ( isAllUsersLoading ) return <CompsLoading />

  const openMailbox = (recipientEmail, senderEmail) => {
    handleClose(true)
    setRecipient(recipientEmail)
    setSender(senderEmail)
    console.log(recipientEmail, senderEmail)
  }

  const handleSendEmail = (value) => {
    apiSendEmailToUser(value)
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
                    {item.email}
                    <button type="button" className="btn btn-dark" onClick={() => openMailbox(item.email, allUsers[allUsers.length - 1].email)}>Open mailbox</button>
                  </div>
                ))
              }

            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <div id="cantact-page-container" className="container">
          {
            recipient && (
              <>
                {/* using admin's email to submit automatically */}
                <FormMailbox
                  onSubmit={handleSendEmail}
                  recipient={recipient}
                  sender={sender}
                />
              </>
            )
          }
        </div>
      </div>
    </CompsLayout>
  )
}

export default withAdminRoute(ContactPage)