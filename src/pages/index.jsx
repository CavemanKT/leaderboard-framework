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
import useUser from '@/_hooks/user'
import useProfiles from '@/_hooks/allProfiles'

const row = ['DOMAIN', 'FOUNDED', 'COUNTRY', 'CATEGORY', 'SCORE']
const data = ['domain', 'founded', 'country', 'category', 'score']
const ORDER = {'A-Z' : 'ASC', 'Z-A': 'DESC'}

export default function Home() {
  const router = useRouter()
  const { query: {page}, push } = useRouter() 
  const [domainName, setDomainName] = useState(null)
  const ref = useRef(null)
  const pageNum = useRef(1)
  const qNum = useRef('')
  const subject = useRef('')
  const subjectOrder = useRef('')
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState(null)
  const { user } = useUser()
  const { allProfiles, allMeta } = useProfiles()

  if(user && user?.Profile && !user?.Profile?.weeklyReportFilled){
    router.push('/report/weeklyUpdateForm')
  }


  const handleQuery = (q) => {
    qNum.current=q
    console.log(qNum)
    push(`?page=${pageNum.current}&q=${q}`)
  }

  const handleExpanding = (event) =>{
    setShow(!show)
    setTarget(event.target)
  } 

  const handleRadioValue = (subjectValue, orderValue) => {
    subject.current = subjectValue
    subjectOrder.current = orderValue
    console.log(subject.current, subjectOrder.current, subjectValue, orderValue)
  }

  const handleFilterConfirm = () => {
    push(`?page=${pageNum.current}&q=${qNum.current}&subject=${subject.current}&order=${subjectOrder.current}`)
  }

  const goToPage = (num) => {
    pageNum.current = num
    console.log( page, num, pageNum, allMeta?.totalPage )
    if(allMeta?.totalPage && num <= allMeta?.totalPage) push(`?page=${allMeta?.totalPage}`)
    if(isNaN(num) == false && num <= allMeta?.totalPage){
      console.log(num)
      push(`?page=${num}&q=${qNum.current}`)
    }
    if(isNaN(num)) push(`?page=1&q=${qNum.current}`)
    if(num == 0 || num == -1) push(`?page=1&q=${qNum.current}`)
  }

  return (
    <CompsLayout>
      <div className="container mt-5 mb-5">
        <div id="table-container" className="row">
          <div id="table-heading" className="mb-5">
            <h3 className="text-center">Leader Board</h3>
          </div>

        {
          user && (
            <div className="d-flex justify-content-around">
              {/* the search bar is using tailwind css at the moment */}
              <form id="channel-form" onSubmit={(e) => handleDomainSearchSubmit(e, domainName)}>
                <div className="input-field col s-6 flex justify-center">
                  <input
                    type="text"
                    placeholder="Search Domain Name"
                    id="channel-input"
                    className="outline-none focus:border-b-2 m-8 h-28 w-1/2 text-3xl"
                    value={domainName || ''}
                    onChange={(e) => {
                      e.preventDefault()
                      setDomainName(e.target.value)
                      handleQuery(e.target.value)
                    }}
                  />
                </div>
              </form>
              {/* need to fix the filter btn after the completion of weekly update form */}
              <div ref={ref} className="notification-section">
                {/* button for multi-select & move tasks to another list */}
                <Button
                  type="button"
                  className="btn btn-primary ms-5 h-100"
                  onClick={(event) => {
                    handleExpanding(event)
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
                              <div>Order By</div>
                              {
                                data.map((item, i) => (
                                  <div key={i} className="m-1">
                                    <Form.Check
                                      label={item}
                                      type="radio"
                                      id={item}
                                      name="subjects"
                                      value={item}
                                      onChange={(e) => handleRadioValue(e.target.value, subjectOrder.current)}
                                    />
                                  </div>
                                ))
                              }
                              <div>Order</div>
                              {
                                Object.keys(ORDER).map((item, i) => (
                                  <div key={i} className="m-1">
                                    <Form.Check 
                                      label={item}
                                      type="radio"
                                      id={item}
                                      name="order"
                                      value={Object.values(ORDER)[i]}
                                      onChange={(e) => handleRadioValue(subject.current, e.target.value)}
                                    />
                                  </div>
                                ))
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
                            handleFilterConfirm()
                            setShow(!show)
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
          {
            user && (
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
            )
          }
                {
                  !user && (
                    <div className="text-center">
                      <h3>Login to see Leaderboard info.</h3>
                    </div>
                  )
                }
          </div>
        </div>
      </div>
      {
        user && (
          <div className="text-center my-5 container">
            <button className="btn btn-info mx-3 leaderboard-btn-width" onClick={() => goToPage(1)}>1</button>
            <button className="btn btn-info mx-3 leaderboard-btn-width" onClick={() => goToPage(Number(page) - 1)}>previous</button>
            <button className="btn btn-info mx-3 leaderboard-btn-width" onClick={() => goToPage(Number(page) + 1)}>next</button>
            <button className="btn btn-info mx-3 leaderboard-btn-width" onClick={() => goToPage(allMeta?.totalPage)}>10</button>
          </div>
        )
      }

    </CompsLayout>
  )
}



