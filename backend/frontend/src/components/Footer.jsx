import React from 'react'
// import { Container, Grid } from "@mui/material"

function Footer() {
 const date =  new  Date().getFullYear()

  return (
    <footer className="bg-dark">
      <div className="container">
        <h6 className="text-center py-4 m-0">
          <span className="text-pri">Max</span>
          <span className="text-light">Shop &copy; {date}</span>
        </h6>
      </div>
    </footer>
  );
}

export default Footer














