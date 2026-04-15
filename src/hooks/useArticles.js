
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export const useArticles = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) setError(error.message)
      else setArticles(data || [])
      setLoading(false)
    }
    fetchArticles()
  }, [])

  return { articles, loading, error }
}