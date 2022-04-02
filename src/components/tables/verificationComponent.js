import React from 'react'
import Table from 'react-bootstrap/Table'
import useTargetUser from '@/_hooks/targetUser'

export const ComponentVerification = ({userId}) => {
    const { targetUser, apiSetVerifiedToTrue} = useTargetUser(userId)
    
    const settingVerifiedToTrue = (USERID) => {
        apiSetVerifiedToTrue(USERID)
    }

    if (!targetUser || targetUser.role == 'admin') return null

  return (
    <div id="profile-container" className="position-relative my-5">
        <div className="profile-wrapper row">
            <div className="right-column col">
            {/* Character info table */}
            <Table responsive>
                <thead className="d-flex justify-content-between">
                    <tr className="tr-font d-inline">
                        <th>User and Company Profile</th>
                    </tr>
                    <button className="btn btn-info m-3" onClick={() => settingVerifiedToTrue(userId)}>Verify</button>
                </thead>
                <tbody>
                    <tr className="d-flex flex-column">
                        <td className="d-flex justify-content-between">
                            <span>Company Website</span>
                            <span className="me-1">{targetUser?.Profile?.domain}</span>
                        </td>
                        <td className="d-flex justify-content-between">
                            <span>Emain</span>
                            <span className="me-1">{targetUser?.email}</span>
                        </td>
                        <td className="d-flex justify-content-between">
                            <span>Founded in</span>
                            <span className="me-1">{targetUser?.Profile?.founded}</span>
                        </td>
                        <td className="d-flex justify-content-between">
                            <span>Category</span>
                            <span className="me-1">{targetUser?.Profile?.category}</span>
                        </td>
                        <td className="d-flex justify-content-between">
                            <span>Based in</span>
                            <span className="me-1">{targetUser?.Profile?.country}</span>
                        </td>
                        <td className="d-flex justify-content-between">
                            <span>Verified</span>
                            <span className="me-1">{targetUser.verified && targetUser.Profile.verified ? targetUser.verified.toString() : targetUser.verified.toString()}</span>
                        </td>
                    </tr>
                </tbody>
            </Table>
            </div>
        </div>
    </div>
  )
}
