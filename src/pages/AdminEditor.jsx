
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabaseClient'
import {
  Box, Button, TextField, Typography, MenuItem, Select, FormControl,
  InputLabel, AppBar, Toolbar, Avatar, IconButton, CircularProgress
} from '@mui/material'
import { ArrowBack, Save, AddPhotoAlternate, Close } from '@mui/icons-material'
import RichTextEditor from '../components/RichTextEditor'

const AdminEditor = () => {
  const { type, id } = useParams()
  const isNew = id === 'new'
  const navigate = useNavigate()
  const { isAdmin, loading: authLoading } = useAuth()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [headerImage, setHeaderImage] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [years, setYears] = useState('')
  const [info, setInfo] = useState('')
  const [avatar, setAvatar] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !isAdmin) navigate('/login')
  }, [authLoading, isAdmin])

  useEffect(() => {
    if (!isNew && id) {
      supabase.from(type).select('*').eq('id', id).single().then(({ data, error }) => {
        if (error || !data) return
        if (type === 'leaders') {
          setName(data.name || '')
          setRole(data.role || '')
          setYears(data.years || '')
          setInfo(data.info || '')
          setAvatar(data.avatar || '')
        } else {
          setTitle(data.title || '')
          setContent(data.content || '')
          setHeaderImage(data.image || '')
          if (type === 'articles') setCategory(data.category || '')
        }
      })
    }
  }, [id, type, isNew])

  const uploadImage = async (file) => {
    const ext = file.name.split('.').pop() || 'png'
    const path = `headers/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(path, file)
    if (error) { setError('Lỗi upload: ' + error.message); return null }
    return supabase.storage.from('images').getPublicUrl(path).data.publicUrl
  }

  const handleImageChange = async (e, setter) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await uploadImage(file)
    if (url) setter(url)
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    let payload

    if (type === 'leaders') {
      if (!name || !role) { setError('Vui lòng điền họ tên và chức vụ'); setSaving(false); return }
      payload = { name, role, years: years || null, info: info || null, avatar: avatar || null }
    } else {
      if (!title) { setError('Vui lòng điền tiêu đề'); setSaving(false); return }
      payload = { title, content, image: headerImage || null }
      if (type === 'articles') payload.category = category || null
    }

    const result = isNew
      ? await supabase.from(type).insert(payload)
      : await supabase.from(type).update(payload).eq('id', id)

    setSaving(false)
    if (result.error) {
      setError('Lỗi: ' + result.error.message)
    } else {
      navigate('/admin')
    }
  }

  if (authLoading) return <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>
  if (!isAdmin) return null

  const typeLabels = { articles: 'Bài viết', activities: 'Hoạt động', leaders: 'Lãnh đạo' }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button startIcon={<ArrowBack />} onClick={() => navigate('/admin')}>Quay lại</Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave} disabled={saving}>
            {saving ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 700, mx: 'auto', p: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          {isNew ? 'Thêm' : 'Sửa'} {typeLabels[type]}
        </Typography>

        {error && <Box sx={{ color: 'error.main', mb: 2 }}>{error}</Box>}

        {type === 'leaders' ? (
          <>
            {/* Avatar */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" mb={1}>Ảnh đại diện</Typography>
              {avatar ? (
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
                  <IconButton size="small" sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'error.main', color: '#fff', '&:hover': { bgcolor: 'error.dark' } }}
                    onClick={() => setAvatar('')}><Close sx={{ fontSize: 14 }} /></IconButton>
                </Box>
              ) : (
                <Button variant="outlined" component="label" startIcon={<AddPhotoAlternate />}>
                  Chọn ảnh
                  <input hidden type="file" accept="image/*" onChange={(e) => handleImageChange(e, setAvatar)} />
                </Button>
              )}
            </Box>
            <TextField label="Họ tên *" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField label="Chức vụ *" fullWidth margin="normal" value={role} onChange={(e) => setRole(e.target.value)} />
            <TextField label="Nhiệm kỳ" fullWidth margin="normal" value={years} onChange={(e) => setYears(e.target.value)} placeholder="VD: 2020-2025" />
            <Typography variant="subtitle2" mt={2} mb={1}>Thông tin</Typography>
            <RichTextEditor content={info} onChange={setInfo} />
          </>
        ) : (
          <>
            {/* Header Image */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" mb={1}>Ảnh tiêu đề</Typography>
              {headerImage ? (
                <Box sx={{ position: 'relative' }}>
                  <Box component="img" src={headerImage} sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 1 }} />
                  <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'error.main', color: '#fff' }}
                    onClick={() => setHeaderImage('')}><Close /></IconButton>
                </Box>
              ) : (
                <Button variant="outlined" component="label" startIcon={<AddPhotoAlternate />} sx={{ height: 120, width: '100%' }}>
                  Chọn ảnh tiêu đề
                  <input hidden type="file" accept="image/*" onChange={(e) => handleImageChange(e, setHeaderImage)} />
                </Button>
              )}
            </Box>
            <TextField label="Tiêu đề *" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
            {type === 'articles' && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Danh mục</InputLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Danh mục">
                  <MenuItem value="tin-tuc">Tin tức</MenuItem>
                  <MenuItem value="thong-bao">Thông báo</MenuItem>
                  <MenuItem value="su-kien">Sự kiện</MenuItem>
                </Select>
              </FormControl>
            )}
            <Typography variant="subtitle2" mt={2} mb={1}>Nội dung</Typography>
            <RichTextEditor content={content} onChange={setContent} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default AdminEditor