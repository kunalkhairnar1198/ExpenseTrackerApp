import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap'
import classes from './UserProfile.module.css'
import { AuthContext } from '../../Store/auth-context'

const UserProfileNotify = () => {

  const authCtx = useContext(AuthContext)
  

  const completeProfileHandler =()=>{
    authCtx.iscompleteProfile(true)
  }

  return (
    <>
       <Alert variant="warning">
       <span className={classes.profile}>
               <h3>winners never quite. quitters never win</h3>
             <Alert>  
              <p>
                your profile is 64% completed. A complete Profile has
                <br />
                higher chances of landing a job <button onClick={completeProfileHandler}>Complete now</button>
              </p>
            </Alert>
        </span>        
        </Alert>
    </>
  )
}

export default UserProfileNotify
