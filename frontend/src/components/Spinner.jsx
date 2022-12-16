import React from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

function Spinner() {
 

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "72vh"}}>
     <BeatLoader />
    </div>
  );
}

export default Spinner