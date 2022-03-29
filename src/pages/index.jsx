/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-indent */
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Table from 'react-bootstrap/Table'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import Button from '@mui/material/Button'
import { Col, Row, Form } from 'react-bootstrap'
import CompsLayout from '@/components/layouts/Layout'
import useProfile from '@/_hooks/profile'
import useUser from '@/_hooks/user'
import useProfiles from '@/_hooks/allProfiles'


const row = ['DOMAIN', 'FOUNDED', 'COUNTRY', 'CATEGORY', 'SCORE']


export default function Home() {
  const router = useRouter()
  const [domainName, setDomainName] = useState(null)
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const [someList, setSomeList] = useState(null)
  const { user } = useUser()
  const {profile} = useProfile()
  const { allProfiles } = useProfiles()

  if(user && user?.Profile && !user?.Profile?.weeklyReportFilled){
    router.push('/report/weeklyUpdateForm')
  }

  const handleDomainSearchSubmit = (e, domainName) => {

  }

  const handleExpanding = (event) =>{
    setShow(!show)
    setTarget(event.target)
  } 

  const handleRadioValue = (event) => {
    setSomeList(event.target.value)
  }

  return (
    <CompsLayout>
      <div className="container mt-5 mb-5">
        <div id="table-container" className="row">
          <div id="table-heading" className="mb-5">
            <h3 className="text-center">Leader Board</h3>
          </div>

        {
          profile?.id && (
            <div className="d-flex justify-content-around">
              {/* the search bar is using tailwind css at the moment */}
              <form id="channel-form" onSubmit={(e) => handleDomainSearchSubmit(e, domainName)}>
                <div className="input-field col s6 flex justify-center">
                  <input
                    type="text"
                    placeholder="Enter Channel Name"
                    id="channel-input"
                    className="outline-none focus:border-b-2 m-8 h-28 w-1/2 text-3xl"
                    value={domainName || ''}
                    onChange={(e) => {
                      e.preventDefault()
                      setDomainName(e.target.value)
                    }}
                  />

                  <button
                    type="button"
                    className="outline border rounded p-4 hover:cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault()
                      handleDomainSearchSubmit(e, domainName)
                    }}
                  >
                    Search
                  </button>
                </div>
              </form>
              {/* need to fix the filter btn after the completion of weekly update form */}
              <div ref={ref} className="notification-section">
                {/* button for multi-select & move tasks to another list */}
                <Button
                  type="button"
                  className="btn btn-primary ms-5 h-100"
                  onClick={() => {
                    handleExpanding()
                  }}
                >Filter
                </Button>
                {/* overlay for showing choices of other lists */}
                <Overlay
                  show={show}
                  target={target}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                  className="notification-container"
                >
                  <Popover id="popover-contained" className="pop-over-position position-absolute">
                    <Popover.Header as="h3">
                      Select one list
                    </Popover.Header>
                    <Popover.Body>
                      <Form>
                        <fieldset>
                          <Form.Group as={Row} className="mb-1">
                            <Col sm={10}>
                              <div>asdfasdf</div>
                              {
                                {/* todos.map((someTodoList) => (
                                  <div key={someTodoList.id} className="m-1">
                                    <Form.Check
                                      label={someTodoList.name}
                                      type="radio"
                                      id={someTodoList.id}
                                      name="radio"
                                      value={`${someTodoList.id}`}
                                      onChange={handleRadioValue}
                                    />
                                  </div>
                                )) */}
                              }
                            </Col>
                          </Form.Group>
                        </fieldset>
                      </Form>
                      <div>
                        <Button
                          variant="contained"
                          size="medium"
                          className="mt-4"
                          onClick={() => {
                            handleConfirmMovingToAnotherList()
                            setShow(selectedFromHook)
                          }}
                        >Confirm
                        </Button>
                      </div>
                    </Popover.Body>
                  </Popover>
                </Overlay>
              </div>
            </div>
          )
        }

          <div className="col col-lg-12 col-md-12 col-sm-12 col-md-auto">
            <Table responsive>
              <thead>
                <tr>
                  <th />
                  {
                      row.map((item) => (
                        <th key={item}>
                          {item}
                        </th>
                      ))
                    }
                </tr>
              </thead>
              <tbody>
                {
                  allProfiles && allProfiles.map((item, i) => (
                    <tr key={item.id} className="border-bottom">
                      <td className="id-style d-flex align-items-center justify-content-center mt-2">{i + 1}</td>
                      <td>{item.domain}</td>
                      <td>{item.founded}</td>
                      <td>{item.country}</td>
                      <td>{item.category}</td>
                      <td>{item.score}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      {
        profile && (
          <div className="text-center my-5 container">
            <button className="btn btn-info mx-3 leaderboard-btn-width">1</button>
            <button className="btn btn-info mx-3 leaderboard-btn-width">previous</button>
            <button className="btn btn-info mx-3 leaderboard-btn-width">next</button>
            <button className="btn btn-info mx-3 leaderboard-btn-width">10</button>
          </div>
        )
      }

    </CompsLayout>
  )
}


// export async function getStaticProps() {
//   const someProfiles = await Profile.findAndCountAll({
//     order:[
//       ['updatedAt', 'DESC']
//     ],
//     limit: 8,
//     offset: 0
//   })

//   return {
//     props:{
//       someProfiles
//     }
//   }
// }

