export const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/

export const CustomerFields = [
    {
        name: 'customer_name',
        label: 'Customer Name',
        placeholder: 'Karim Ahmed',
        required: true,
        message: 'please input the customer name',
    },
    {
        name: 'customer_phone',
        label: 'Customer Phone',
        placeholder: '+8801712345678',
        required: true,
        message: 'please input the customer phone',
        pattern: PHONE_PATTERN,
        patternMessage: 'enter a valid phone number',
    },
    {
        name: 'device',
        label: 'Device',
        placeholder: 'Samsung Galaxy A52',
        required: true,
        message: 'please input the device',
    },
]
