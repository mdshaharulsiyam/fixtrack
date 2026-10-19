import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layout/Main'
import OwnerRoutes from '../PrivetRoutes/OwnerRoutes'
import Home from '../Pages/Home/Home'
import TrackJob from '../Pages/Track/TrackJob'
import Jobs from '../Pages/Jobs/Jobs'
import Login from '../Pages/Auth/Login'
import SignUp from '../Pages/Auth/SignUp'

export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/track',
                element: <TrackJob />,
            },
            {
                path: '/jobs',
                element: <OwnerRoutes><Jobs /></OwnerRoutes>,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
])
