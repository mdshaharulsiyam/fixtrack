import { Avatar, Dropdown } from 'antd'
import { HiChevronDown, HiLogout } from 'react-icons/hi'
import { MdOutlineBuild } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../Utils/useLogout'

const UserMenu = ({ profile }) => {
    const navigate = useNavigate()
    const logout = useLogout()

    const items = [
        {
            key: 'profile',
            disabled: true,
            label: (
                <div className='py-1'>
                    <p className='font-semibold text-[var(--ink)]'>{profile.name}</p>
                    <p className='text-xs text-[var(--muted)]'>{profile.email}</p>
                </div>
            ),
        },
        { type: 'divider' },
        { key: 'jobs', icon: <MdOutlineBuild />, label: 'My repair jobs', onClick: () => navigate('/jobs') },
        { key: 'logout', icon: <HiLogout />, label: 'Log out', danger: true, onClick: logout },
    ]

    return (
        <Dropdown menu={{ items }} placement='bottomRight' trigger={['click']}>
            <button className='inline-flex items-center gap-2 rounded-full pl-1 pr-2 py-1 border border-[var(--line)] hover:border-[var(--ink)] transition-colors'>
                <Avatar size={30} style={{ backgroundColor: 'var(--primary)' }}>
                    {profile.name?.charAt(0).toUpperCase()}
                </Avatar>
                <span className='text-sm font-medium text-[var(--ink)] max-w-[120px] truncate'>{profile.name}</span>
                <HiChevronDown className='text-[var(--muted)]' />
            </button>
        </Dropdown>
    )
}

export default UserMenu
