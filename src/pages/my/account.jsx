import React, { useState, useRef } from 'react'

import { useRouter } from 'next/router'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'

import FormPassword from '@/components/forms/auth/password'
import FormAccount from '@/components/forms/auth/account'

import CompsLayout from '@/components/layouts/Layout'
import useUser from '@/_hooks/user'

import withPrivateRoute from '@/_hocs/withPrivateRoute'

const accountPart = () => {
  const [ show, setShow ] = useState(false)
  const [target, setTarget] = useState(null)
  const ref = useRef(null)
  const [toggleAccountFields, setToggleAccountFields] = useState(true)
  const [togglePasswordFields, setTogglePasswordFields] = useState(false)
  const router = useRouter()
  const { user, apiAccountUpdate, apiPasswordUpdate, apiLogout } = useUser()
  
  const handleClick = (event) => {
    setShow(!show)
    setTarget(event.target)
  }

  const submitAccountUpdate = (value, id) => {
    console.log(value, id)
    apiAccountUpdate(value, id)
    router.push('/')
  }

  const submitPasswordUpdate = (value, id) => {
    console.log(value, id)
    apiPasswordUpdate(value, id).then((resp) => {
      apiLogout()
      router.push('/')
    })
  }

  const handleAccountFields = (event) => {
    setToggleAccountFields(true)
    setTogglePasswordFields(false)
    handleClick(event)
  }

  const handlePasswordFields = (event) => {
    setTogglePasswordFields(true)
    setToggleAccountFields(false)
    handleClick(event)
  }

  return (
    <CompsLayout>
      <div className="container mt-5">
        <div className="w-75 m-auto">
          <div>
            <div className="mb-5" ref={ref}>
              <Button onClick={handleClick}>OPTIONS</Button>
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
                        <Button className="btn-info" onClick={handleAccountFields}>change account</Button>
                      </li>
                      <li className="mb-2 rounded-3 btn-info">
                        <Button className="btn-info" onClick={handlePasswordFields}>change password</Button>
                      </li>
                    </ul>
                  </Popover.Body>
                </Popover>
              </Overlay>
            </div>
          </div>

          {
            toggleAccountFields && (
              <FormAccount
                onSubmit={(value) => submitAccountUpdate(value, user?.id)}
                user={user}
              />
            )
          }
          {
            togglePasswordFields && (
              <FormPassword 
                onSubmit={(value) => submitPasswordUpdate(value, user?.id)}
              />
            )
          }
        </div>
      </div>
    </CompsLayout>
  )
}

export default withPrivateRoute(accountPart)
