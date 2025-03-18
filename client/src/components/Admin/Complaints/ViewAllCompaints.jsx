import React from 'react'
import AdminFooter from '../AdminFooter'
import AdminNavbar from '../AdminNavbar'
import ViewEntComplaints from './ViewEntComplaints'
import ViewInvComplaints from './ViewInvComplaints'

function ViewAllCompaints() {
  return (
    <>
        <AdminNavbar/>
        <div className='container' style={{minHeight:"80vh"}}>
            <div className="text-center ">
                <h4 className="  mt-3  inv_mainheading">View All</h4>
                <h3 className="inv_sub_h3">Complaints</h3>
                <div className="  mb-5  inv_hr_line "></div>
            </div>
       
        <ViewEntComplaints/>
        <ViewInvComplaints/>
        </div>
        <AdminFooter/>
    </>
  )
}

export default ViewAllCompaints