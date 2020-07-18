import React from 'react'
import Landing from '../../components/landing/Landing'

const Home = () => {
    return (
        <React.Fragment>
            {/* If is authenticated and profile view Dashboard else show landing page */}
            {/* Think about it */}
            <Landing />
        </React.Fragment>
    )
}

export default Home
