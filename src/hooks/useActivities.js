
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export const useActivities = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) setError(error.message)
      else setActivities(data || [])
      setLoading(false)
    }
    fetchActivities()
  }, [])

  return { activities, loading, error }
}