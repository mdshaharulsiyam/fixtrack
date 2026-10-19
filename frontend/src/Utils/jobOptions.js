export const JOB_STATUSES = ['Received', 'Diagnosing', 'Repairing', 'Ready', 'Delivered']

export const JOB_CATEGORIES = ['screen', 'battery', 'water damage', 'software', 'charging port']

export const JOB_CODE_PATTERN = /^FX-\d{4}$/i

export const STATUS_STYLES = {
    Received: { pill: 'bg-slate-100 text-slate-700 ring-slate-200', dot: 'bg-slate-400', bar: 'bg-slate-400' },
    Diagnosing: { pill: 'bg-amber-50 text-amber-700 ring-amber-200', dot: 'bg-amber-500', bar: 'bg-amber-500' },
    Repairing: { pill: 'bg-blue-50 text-blue-700 ring-blue-200', dot: 'bg-blue-500', bar: 'bg-blue-500' },
    Ready: { pill: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500', bar: 'bg-emerald-500' },
    Delivered: { pill: 'bg-violet-50 text-violet-700 ring-violet-200', dot: 'bg-violet-500', bar: 'bg-violet-500' },
}

export const STATUS_MESSAGES = {
    Received: 'We have received your phone and it is waiting for a technician.',
    Diagnosing: 'A technician is checking your phone to find the problem.',
    Repairing: 'Your phone is being repaired.',
    Ready: 'Your phone is ready. Please come to the shop to collect it.',
    Delivered: 'Your phone has been handed back to you. Thank you!',
}

export const getNextStatus = (status) => {
    const index = JOB_STATUSES.indexOf(status)
    return index === -1 ? null : JOB_STATUSES[index + 1] || null
}

export const formatCost = (value) => new Intl.NumberFormat().format(value || 0)

export const formatDate = (value) => value ? new Date(value).toLocaleString() : ''

export const formatShortDate = (value) => value
    ? new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
    : ''
