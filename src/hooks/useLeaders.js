import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export const useLeaders = () => {
    const [leaders, setLeaders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchLeaders = async() => {
            const { data, error } = await supabase
                .from('leaders')
                .select('*')
                .order('created_at', { ascending: false })
            if (error) setError(error.message)
            else setLeaders(data || [])
            setLoading(false)
        }
        fetchLeaders()
    }, [])

    return { leaders, loading, error }
}