import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabaseClient'
import {
  Box, Tabs, Tab, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Button, Typography,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Card, CardContent, CardActions, AppBar, Toolbar
} from '@mui/material'
import { Add, Edit, Delete, Logout } from '@mui/icons-material'

const tabConfig = {
  articles: { label: 'Bài viết', columns: [{ key: 'title', label: 'Tiêu đề' }, { key: 'category', label: 'Danh mục' }] },
  activities: { label: 'Hoạt động', columns: [{ key: 'title', label: 'Tiêu đề' }] },
  leaders: { label: 'Lãnh đạo', columns: [{ key: 'name', label: 'Họ tên' }, { key: 'role', label: 'Chức vụ' }, { key: 'years', label: 'Nhiệm kỳ' }] }
}

const tabKeys = Object.keys(tabConfig)

const Admin = () => {
  const { isAdmin, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [tabIndex, setTabIndex] = useState(0)
  const [data, setData] = useState([])
  const [deleteId, setDeleteId] = useState(null)

  const activeTab = tabKeys[tabIndex]

  useEffect(() => {
    if (!loading && !isAdmin) navigate('/login')
  }, [loading, isAdmin])


  const fetchData = async () => {
    const { data: rows } = await supabase
      .from(activeTab)
      .select('*')
      .order('created_at', { ascending: false })
    setData(rows || [])
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from(activeTab).delete().eq('id', deleteId)
    setDeleteId(null)
    fetchData()
  }

  if (loading) return <Box sx={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>Đang tải...</Box>
  if (!isAdmin) return null

  const columns = tabConfig[activeTab].columns
  
  useEffect(() => {
    fetchData()
  }, [activeTab])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      {/* Header */}
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold">Quản trị</Typography>
          <Button startIcon={<Logout />} onClick={() => { signOut(); navigate('/') }}>Thoát</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 900, mx: 'auto', p: 2 }}>
        {/* Tabs */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)}>
            {tabKeys.map((key) => <Tab key={key} label={tabConfig[key].label} />)}
          </Tabs>
          <Button variant="contained" startIcon={<Add />} size="small"
            onClick={() => navigate(`/admin/${activeTab}/new`)}>
            Thêm mới
          </Button>
        </Box>

        {/* Mobile Cards */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          {data.map((item) => (
            <Card key={item.id} sx={{ mb: 1 }}>
              <CardContent sx={{ pb: 0 }}>
                <Typography fontWeight="bold" noWrap>{item.title || item.name}</Typography>
                {activeTab === 'articles' && <Typography variant="caption" color="text.secondary">{item.category || '—'}</Typography>}
                {activeTab === 'leaders' && <Typography variant="caption" color="text.secondary">{item.role}</Typography>}
              </CardContent>
              <CardActions>
                <IconButton size="small" onClick={() => navigate(`/admin/${activeTab}/${item.id}`)}><Edit fontSize="small" /></IconButton>
                <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}><Delete fontSize="small" /></IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>

        {/* Desktop Table */}
        <TableContainer component={Paper} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => <TableCell key={col.key}>{col.label}</TableCell>)}
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col) => <TableCell key={col.key}>{item[col.key] || '—'}</TableCell>)}
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => navigate(`/admin/${activeTab}/${item.id}`)}><Edit fontSize="small" /></IconButton>
                    <IconButton size="small" color="error" onClick={() => setDeleteId(item.id)}><Delete fontSize="small" /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    Chưa có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Hủy</Button>
          <Button onClick={handleDelete} color="error">Xóa</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Admin