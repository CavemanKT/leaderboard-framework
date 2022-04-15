import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'
import useTargetUser from '@/_hooks/targetUser'

const RenderForm = ({ errors, touched, isSubmitting }) => (
    <Form>
      <div className="form-group">
        <label htmlFor="sender">From: </label>
        <Field
          id="sender"
          className={`form-control ${(errors.sender && touched.sender ? ' is-invalid' : '')}`}
          name="sender"
          type="email"
        />

        <ErrorMessage component="div" className="invalid-feedback" name="sender" />
      </div>

      <div className="form-group">
        <label htmlFor="senderPassword">Password: </label>
        <Field
          id="senderPassword"
          className={`form-control ${(errors.senderPassword && touched.senderPassword ? ' is-invalid' : '')}`}
          name="senderPassword"
          type="password"
        />

        <ErrorMessage component="div" className="invalid-feedback" name="senderPassword" />
      </div>

      <div className="form-group">
        <label htmlFor="recipient">To: </label>
        <Field
          id="recipient"
          className={`form-control ${(errors.recipient && touched.recipient ? ' is-invalid' : '')}`}
          name="recipient"
          type="email"
        />

        <ErrorMessage component="div" className="invalid-feedback" name="recipient" />
      </div>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <Field
          id="title"
          className={`form-control ${(errors.title && touched.title ? ' is-invalid' : '')}`}
          name="title"
          type="text"
        />
        <ErrorMessage component="div" className="invalid-feedback" name="title" />
      </div>

      <div className="form-group">
        <label htmlFor="content">Content</label>
        <Field
          id="content"
          className={`form-control ${(errors.content && touched.content ? ' is-invalid' : '')}`}
          name="content"
          as="textarea"
          type="text"
        />
        <ErrorMessage component="div" className="invalid-feedback" name="content" />
      </div>

      <button className="btn btn-success m-4" type="submit" disabled={isSubmitting}>Send</button>
    </Form>
)

RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

const mailboxSchema = yup.object().shape({
  senderPassword: yup.string().required('Required'),
  title: yup.string().required('Required'),
  content: yup.string().required('Requied')
})

const FormMailbox = ({ onSubmit, recipientId, senderEmail }) => {
  const { targetUser } = useTargetUser(recipientId)
  const ref = useRef(null)
  console.log(recipientId, targetUser?.id)

  if(!targetUser || targetUser.role == "admin") return null

  return (
      <Formik
        initialValues={{
        sender: senderEmail,
        senderPassword: '',
        recipient: targetUser?.email,
        title: '',
        content: ''
        }}
        validationSchema={mailboxSchema}
        onSubmit={onSubmit}
        component={RenderForm}
      />
  )
}

FormMailbox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  recipientId: PropTypes.number,
  senderEmail: PropTypes.string
}

export default FormMailbox