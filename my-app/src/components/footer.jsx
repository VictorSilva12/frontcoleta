import React from 'react'
import '../styles/footer.css'
const Footer = () => (
   <div>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
   </div>
)
export default Footer