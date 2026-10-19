import { useState } from 'react'
import { Drawer } from 'antd'
import { HiMenu, HiX } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { NavLinks } from '../../Utils/Navbar/NavLinks'
import { useCurrentOwner } from '../../Utils/useCurrentOwner'
import { useLogout } from '../../Utils/useLogout'
import Brand from './Brand'
import UserMenu from './UserMenu'

const Navbar = () => {
    const { pathname, hash } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const profile = useCurrentOwner()
    const logout = useLogout()

    const isActive = (path) => path.includes('#')
        ? `${pathname}${hash}` === path
        : pathname === path && !hash

    const closeMenu = () => setMenuOpen(false)

    const links = NavLinks.map((item) => (
        <Link key={item.path} to={item.path} onClick={closeMenu} className={`nav-link ${isActive(item.path) ? 'active' : ''}`}>
            {item.label}
        </Link>
    ))

    return (
        <header className='sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[var(--line)]'>
            <div className='container-x h-16 between-center gap-4'>
                <Link to='/' aria-label='FixTrack home'><Brand /></Link>
                <nav className='hidden md:flex items-center gap-1'>{links}</nav>
                <div className='hidden md:flex items-center gap-3'>
                    {profile ? (
                        <>
                            <Link to='/jobs' className='button-primary button-sm'>My Jobs</Link>
                            <UserMenu profile={profile} />
                        </>
                    ) : (
                        <>
                            <Link to='/login' className='nav-link'>Log in</Link>
                            <Link to='/sign-up' className='button-primary button-sm'>Get started</Link>
                        </>
                    )}
                </div>
                <button onClick={() => setMenuOpen(true)} className='md:hidden button-icon' aria-label='open menu'>
                    <HiMenu size={20} />
                </button>
            </div>
            <Drawer open={menuOpen} onClose={closeMenu} placement='right' width={300} closable={false} styles={{ body: { padding: 20 } }}>
                <div className='between-center mb-6'>
                    <Brand />
                    <button onClick={closeMenu} className='button-icon' aria-label='close menu'><HiX size={18} /></button>
                </div>
                <nav className='flex flex-col gap-1'>{links}</nav>
                <div className='flex flex-col gap-3 mt-6 pt-6 border-t border-[var(--line)]'>
                    {profile ? (
                        <>
                            <p className='text-sm text-[var(--muted)]'>Signed in as <span className='font-semibold text-[var(--ink)]'>{profile.name}</span></p>
                            <Link to='/jobs' onClick={closeMenu} className='button-primary'>My Jobs</Link>
                            <button onClick={() => { closeMenu(); logout() }} className='button-secondary'>Log out</button>
                        </>
                    ) : (
                        <>
                            <Link to='/sign-up' onClick={closeMenu} className='button-primary'>Get started</Link>
                            <Link to='/login' onClick={closeMenu} className='button-secondary'>Log in</Link>
                        </>
                    )}
                </div>
            </Drawer>
        </header>
    )
}

export default Navbar
