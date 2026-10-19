const PageHeading = ({ eyebrow, text, subText, action }) => {
    return (
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4'>
            <div>
                {eyebrow && <p className='eyebrow mb-2'>{eyebrow}</p>}
                <h1 className='page-heading'>{text}</h1>
                {subText && <p className='text-[var(--muted)] mt-2 max-w-2xl'>{subText}</p>}
            </div>
            {action}
        </div>
    )
}

export default PageHeading
