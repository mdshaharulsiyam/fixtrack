import { MdOutlineBuild } from 'react-icons/md'

const Brand = ({ light }) => {
    return (
        <span className={`inline-flex items-center gap-2.5 font-extrabold text-xl tracking-tight ${light ? 'text-white' : 'text-[var(--ink)]'}`}>
            <span className='center-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-white shadow-[0_4px_12px_rgba(37,99,235,0.35)]'>
                <MdOutlineBuild size={19} />
            </span>
            <span>Fix<span className={light ? 'text-[#60A5FA]' : 'text-[var(--primary)]'}>Track</span></span>
        </span>
    )
}

export default Brand
