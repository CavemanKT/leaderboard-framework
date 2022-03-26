import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderForm = ({ values, errors, touched, isSubmitting, handleChange, handleBlur }) => (
  <Form>
    <div className="form-group">
      <label htmlFor="domain">Domain Name</label>
      <Field
        id="url"
        className={`form-control ${(errors.domain && touched.domain ? ' is-invalid' : '')}`}
        name="domain"
        type="url"
        placeholder='http://itch.io'
      />
      <ErrorMessage component="div" className="invalid-feedback" name="domain" />
    </div>

    <div className='mt-3'>
      <div className="form-group mt-3">
        <label htmlFor="founded">Founded in</label>
        <Field
          id="founded"
          className={`form-control ${(errors.founded && touched.founded ? ' is-invalid' : '')}`}
          name="founded"
          type="number"
        />
        <ErrorMessage component="div" className="invalid-feedback" name="country" />
      </div>
      {
        errors.founded && touched.founded && (
          <div className='text-danger'>
            {errors.founded}
          </div>
        )
      }

    </div>
    <button className="btn btn-info mt-2" type="submit" disabled={isSubmitting}>Update</button>
  </Form>
)
RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired
}

const editProfileSchema = yup.object().shape({
  domain: yup.string().url().required('Required'),
  founded: yup.number().min(1000).max(new Date().getFullYear()).integer()
    .nullable(false)
    .required('please enter four digit'),
  country: yup.string().required('required'),
  category: yup.string().required('required'),
})

const FormsEditProfile1 = ({ onSubmit, profile }) => (
  <Formik
    initialValues={{
      domain: profile?.domain,
      founded: profile?.founded,
      country: profile?.country,
      category: profile?.category,
    }}
    validationSchema={editProfileSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)
FormsEditProfile1.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default FormsEditProfile1
