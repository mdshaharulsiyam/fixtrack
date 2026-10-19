import { Link } from 'react-router-dom'
import { FooterLinks } from '../../Utils/Navbar/NavLinks'
import Brand from './Brand'

const Footer = () => {
    return (
        <footer className='bg-[var(--night)] text-slate-400'>
            <div className='container-x py-14 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]'>
                <div className='max-w-sm'>
                    <Brand light />
                    <p className='mt-4 text-sm leading-relaxed'>
                        Repair job tracking for mobile repair shops. Shops log and update every job, and customers check their repair status online with a job code.
                    </p>
                </div>
                {FooterLinks.map((group) => (
                    <div key={group.title}>
                        <p className='text-sm font-semibold text-white mb-4'>{group.title}</p>
                        <ul className='space-y-3'>
                            {group.links.map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path} className='text-sm hover:text-white transition-colors'>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className='border-t border-white/10'>
                <div className='container-x py-6 text-xs'>
                    © {new Date().getFullYear()} FixTrack. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
