import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { Home, History, User2, LogOut, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const [expanded, setExpanded] = React.useState(true);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', icon: Home, path: '/dashboard' },
    { label: 'Profile', icon: User2, path: '/profile' },
    { label: 'History', icon: History, path: '/history' },
  ];

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: { xs: `translateX(${expanded ? 0 : '-100%'})`, md: 'none' },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: expanded ? '240px' : '64px',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.surface',
      }}
    >
      {/* Logo and brand */}
      <div className="logo-section">
        <ListItem
          sx={{
            p: 0,
            justifyContent: expanded ? 'space-between' : 'center',
          }}
        >
          <Typography
            component="h1"
            fontSize="lg"
            fontWeight="lg"
            startDecorator={<ChevronLeft />}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              width: expanded ? 'auto' : '40px',
              overflow: 'hidden',
            }}
          >
            {expanded ? 'Navigation' : 'D'}
          </Typography>
          <IconButton
            variant="plain"
            color="neutral"
            onClick={() => setExpanded(!expanded)}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {<ChevronRight />}
          </IconButton>
        </ListItem>
      </div>

      {/* Navigation items */}
      <List
        sx={{
          '--ListItem-radius': '8px',
          mt: 1,
          flexGrow: 1,
        }}
      >
        {navItems.map((item) => (
          <ListItem key={item.label}>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}
            >
              <item.icon />
              {expanded && <Typography>{item.label}</Typography>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Logout section */}
      <List
        sx={{
          '--ListItem-radius': '8px',
          mt: 'auto',
          borderTop: '1px solid',
          borderColor: 'divider',
          pt: 2,
        }}
      >
        <ListItem>
          <ListItemButton
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              '&:hover': { color: 'danger.plainColor' },
            }}
          >
            <LogOut />
            {expanded && <Typography>Logout</Typography>}
          </ListItemButton>
        </ListItem>
      </List>
    </Sheet>
  );
}
