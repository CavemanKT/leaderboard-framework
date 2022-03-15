import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderForm = ({ values, errors, touched, isSubmitting }) => {
  const [pickedStage1Val, setPickedStage1Val] = useState(null)
  const handlePickedStage1Ref = (value) => {
    setPickedStage1Val(value)
    console.log(value)
  }
  return (
    <Form>
      <div role="group" aria-labelledby="my-radio-group1">
        <label className="m-3">
          <Field type="radio" name="pickedStage1" value="preRevenue" className="m-3" onClick={() => handlePickedStage1Ref('preRevenue')} />
          pre-revenue
        </label>
        <label className="m-3">
          <Field type="radio" name="pickedStage1" value="postRevenue" className="m-3" onClick={() => handlePickedStage1Ref('postRevenue')} />
          post-revenue
        </label>
      </div>
  
      {
        pickedStage1Val === 'preRevenue' && (
          <div>

            <div className="mt-4">Stage: </div>
            <div role="group" aria-labelledby="my-radio-group2">
              <div>
                <label>
                  <Field type="radio" name="pickedStage2" value="idea validation" className="m-3" />
                  idea validation
                </label>
              </div>
              <div>
                <label>
                  <Field type="radio" name="pickedStage2" value="product development" className="m-3" />
                  product development
                </label>
              </div>
              <div>
                <label>
                  <Field type="radio" name="pickedStage2" value="product live" className="m-3" />
                  product live
                </label>
              </div>
            </div>
            <div className="form-group mt-5">
              <label htmlFor="totalWaitingList">Total waiting list</label>
              <Field
                placeholder="amount of emails"
                id="totalWaitingList"
                className={`w-50 form-control ${(errors.totalWaitingList && touched.totalWaitingList ? ' is-invalid' : '')}`}
                name="totalWaitingList"
                type="number"
              />
              <ErrorMessage component="div" className="invalid-feedback" name="totalWaitingList" />
            </div>
          </div>

        )
      }
  

      {
        pickedStage1Val === 'postRevenue' && (
          <div>
            <div className="form-group mt-5">
              <label htmlFor="revenueType" style={{ display: 'block' }}>
                Revenue Type
              </label>
              <select
                name="revenueType"
                value={values.revenueType}
                // onChange={handleChange}
                // onBlur={handleBlur}
                style={{ display: 'block' }}
              >
                <option value="" label="Select a revenue type" />
                <option value="MRR" label="MRR" />
                <option value="one time purchase" label="one time purchase" />
                <option value="mixed" label="mixed" />
              </select>
            </div>
            <div className="form-group mt-5">
              <label htmlFor="MRR">MRR:</label>
              <Field
                placeholder="$"
                id="MRR"
                className={`w-50 form-control ${(errors.MRR && touched.MRR ? ' is-invalid' : '')}`}
                name="MRR"
                type="number"
                
              />
              <ErrorMessage component="div" className="invalid-feedback" name="MRR" />
            </div>
            <div className="form-group mt-5">
              <label htmlFor="Revenue">Revenue:</label>
              <Field
                placeholder="$"
                id="Revenue"
                className={`w-50 form-control ${(errors.Revenue && touched.Revenue ? ' is-invalid' : '')}`}
                name="Revenue"
                type="number"
              />
              <ErrorMessage component="div" className="invalid-feedback" name="Revenue" />
            </div>
          </div>
        )
      }
      <div className="mt-5">
        <div className="form-group mt-5">
          <label htmlFor="Q1">What did you achieve this week?</label>
          <Field
            id="Q1"
            className={`w-50 form-control ${(errors.Q1 && touched.Q1 ? ' is-invalid' : '')}`}
            name="Q1"
            type="text"
            component="textarea"
          />
          <ErrorMessage component="div" className="invalid-feedback" name="Q1" />
        </div>
        <div className="form-group mt-5">
          <label htmlFor="Q2">What are the plans for next week?</label>
          <Field
            id="Q2"
            className={`w-50 form-control ${(errors.Q2 && touched.Q2 ? ' is-invalid' : '')}`}
            name="Q2"
            type="text"
            component="textarea"
          />
          <ErrorMessage component="div" className="invalid-feedback" name="Q2" />
        </div>
      </div>
      <button className="btn btn-success mt-3" type="submit" disabled={isSubmitting}>Submit</button>
    </Form>

  )
}
  


RenderForm.propTypes = {
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
  isSubmitting: PropTypes.bool.isRequired,
}

const createReportFormSchema = yup.object().shape({
  characterName: yup.string().required('Required'),
})

const createReportForm = ({ onSubmit }) => (
  <Formik
    initialValues={{
      pickedRadio: '',
    }}
    validationSchema={createReportFormSchema}
    onSubmit={onSubmit}
    component={RenderForm}
  />
)

createReportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default createReportForm
