'use client'

import React, { useState } from 'react'
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'
import { Edit, Check } from '@mui/icons-material'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'Hospital Admin',
    password: '********',
    email: 'admin@hms.com',
  })

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically send the updated data to your backend
    console.log('Updated data:', formData)
  }

  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          width: '100%',
          maxWidth: 500,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Manage Profile</b>
          </Typography>
          <Typography level="body-sm">General Info</Typography>
        </div>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name *</FormLabel>
            <Input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Change Password</FormLabel>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </FormControl>
          <Button
            sx={{ mt: 1 /* margin top */ }}
            type="submit"
            color="primary"
            disabled={!isEditing}
          >
            Submit
          </Button>
        </form>
        <IconButton
          variant="outlined"
          color={isEditing ? "success" : "neutral"}
          onClick={handleEdit}
          sx={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
          }}
        >
          {isEditing ? <Check /> : <Edit />}
        </IconButton>
      </Sheet>
    </CssVarsProvider>
  )
}