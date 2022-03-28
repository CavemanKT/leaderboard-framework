import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderForm = ({ errors, touched, isSubmitting }) => (
    <Form>
      <div className="form-group">
        <label htmlFor="sender">From: </label>
        <Field
          id="url"
          className={`form-control ${(errors.sender && touched.sender ? ' is-invalid' : '')}`}
          name="sender"
          type="email"
          disabled
        />

        <ErrorMessage component="div" className="invalid-feedback" name="sender" />
      </div>

      <div className="form-group">
        <label htmlFor="recipient">To: </label>
        <Field
          id="url"
          className={`form-control ${(errors.recipient && touched.recipient ? ' is-invalid' : '')}`}
          name="recipient"
          type="email"
          disabled
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
          type="textarea"
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
  recipient: yup.string().email().required('Required'),
  title: yup.string().required('Required'),
  content: yup.string().required('Requied')
})

const FormMailbox = ({ onSubmit, recipient, sender }) => (
        <Formik
            initialValues={{
            sender,
            recipient,
            title: '',
            content: ''
            }}
            validationSchema={mailboxSchema}
            onSubmit={onSubmit}
            component={RenderForm}
        />
)

FormMailbox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  recipient: PropTypes.string,
  sender: PropTypes.string
}

export default FormMailbox