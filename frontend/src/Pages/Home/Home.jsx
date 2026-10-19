import { useCurrentOwner } from '../../Utils/useCurrentOwner'
import Hero from '../../Components/Home/Hero'
import Audience from '../../Components/Home/Audience'
import HowItWorks from '../../Components/Home/HowItWorks'
import StatusJourney from '../../Components/Home/StatusJourney'
import Features from '../../Components/Home/Features'
import CallToAction from '../../Components/Home/CallToAction'

const Home = () => {
    const isLoggedIn = Boolean(useCurrentOwner())

    return (
        <>
            <Hero isLoggedIn={isLoggedIn} />
            <Audience isLoggedIn={isLoggedIn} />
            <HowItWorks />
            <StatusJourney />
            <Features isLoggedIn={isLoggedIn} />
            <CallToAction isLoggedIn={isLoggedIn} />
        </>
    )
}

export default Home
