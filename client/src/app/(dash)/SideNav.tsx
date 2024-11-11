'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import Box from '@mui/joy/Box'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import IconButton from '@mui/joy/IconButton'
import Sheet from '@mui/joy/Sheet'
import { Home, Users, Settings, Menu } from 'lucide-react'

type NavItem = {
  title: string
  path: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { title: 'Home', path: '/dashboard', icon: Home },
  { title: 'Users', path: '/profile', icon: Users },
  { title: 'Settings', path: '/settings', icon: Settings },
]

export default function SideNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <Sheet
        className="SideNav"
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          width: 240,
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <NavContent pathname={pathname} />
      </Sheet>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{ display: { xs: 'flex', md: 'none' }, position: 'fixed', top: 8, left: 8 }}
      >
        <Menu />
      </IconButton>
      <Sheet
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          top: 0,
          left: open ? 0 : -240,
          width: 240,
          height: '100dvh',
          zIndex: 9999,
          transition: 'left 0.3s',
        }}
      >
        <NavContent pathname={pathname} />
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <Menu />
        </IconButton>
      </Sheet>
    </React.Fragment>
  )
}

function NavContent({ pathname }: { pathname: string }) {
  return (
    <List sx={{ flexGrow: 1 }}>
      <ListItem>
        <Typography level="h4" component="h1">
          Navigation
        </Typography>
      </ListItem>
      {navItems.map((item) => (
        <ListItem key={item.path}>
          <ListItemButton
            component={NextLink}
            href={item.path}
            selected={pathname === item.path}
          >
            <item.icon />
            <ListItemContent>
              <Typography>{item.title}</Typography>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}