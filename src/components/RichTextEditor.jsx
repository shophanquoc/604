
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { Box, IconButton, Divider } from '@mui/material'
import { FormatBold, FormatItalic, FormatListBulleted, FormatListNumbered, Title, Image as ImageIcon, Undo, Redo } from '@mui/icons-material'
import { supabase } from '../supabaseClient'
import { useCallback } from 'react'

const RichTextEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: 'Nhập nội dung bài viết...' })
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'rich-editor-content' },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items
        if (!items) return false
        for (const item of Array.from(items)) {
          if (item.type.startsWith('image/')) {
            event.preventDefault()
            const file = item.getAsFile()
            if (file) uploadAndInsertImage(file)
            return true
          }
        }
        return false
      }
    }
  })

  const uploadAndInsertImage = useCallback(async (file) => {
    if (!editor) return
    const ext = file.name.split('.').pop() || 'png'
    const path = `content/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('images').upload(path, file)
    if (error) return
    const { data } = supabase.storage.from('images').getPublicUrl(path)
    editor.chain().focus().setImage({ src: data.publicUrl }).run()
  }, [editor])

  const addImageFromFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files?.[0]
      if (file) uploadAndInsertImage(file)
    }
    input.click()
  }

  if (!editor) return null

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: 1, bgcolor: '#fff' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, p: 0.5, borderBottom: '1px solid #eee' }}>
        <IconButton size="small" onClick={() => editor.chain().focus().toggleBold().run()}><FormatBold fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().toggleItalic().run()}><FormatItalic fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Title fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().toggleBulletList().run()}><FormatListBulleted fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().toggleOrderedList().run()}><FormatListNumbered fontSize="small" /></IconButton>
        <Divider orientation="vertical" flexItem />
        <IconButton size="small" onClick={addImageFromFile}><ImageIcon fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().undo().run()}><Undo fontSize="small" /></IconButton>
        <IconButton size="small" onClick={() => editor.chain().focus().redo().run()}><Redo fontSize="small" /></IconButton>
      </Box>
      <Box sx={{ minHeight: 200, p: 1.5, '& .ProseMirror': { outline: 'none', minHeight: 180 }, '& .ProseMirror img': { maxWidth: '100%', height: 'auto' } }}>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  )
}

export default RichTextEditor