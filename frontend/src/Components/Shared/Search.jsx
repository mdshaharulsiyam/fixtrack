import { useEffect, useState } from 'react'
import { Input } from 'antd'
import { CiSearch } from 'react-icons/ci'

const SEARCH_DELAY = 400

const Search = ({ placeholder, handler }) => {
    const [value, setValue] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => handler(value.trim()), SEARCH_DELAY)
        return () => clearTimeout(timer)
    }, [value, handler])

    return (
        <Input
            allowClear
            value={value}
            onChange={(e) => setValue(e.target.value)}
            prefix={<CiSearch />}
            placeholder={placeholder || 'search here ...'}
        />
    )
}

export default Search
