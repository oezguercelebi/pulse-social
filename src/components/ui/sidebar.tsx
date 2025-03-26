'use client';

import { Flex, Box, Heading, Button, Avatar, Separator } from '@radix-ui/themes';
import Link from 'next/link';
import {
  House,
  Timer,
  MagnifyingGlass,
  BookmarkSimple,
  PencilSimpleLine,
} from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <Box 
      className="h-screen sticky top-0 left-0 w-64 bg-white shadow-sm border-r"
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      {/* Logo section (Home) - using flex-none to maintain size */}
      <Box className="flex-none">
        <Flex align="center" justify="center" py="5" px="4">
          <Link href="/" aria-label="Home">
            <Flex align="center" gap="2">
              <House weight="bold" size={24} />
              <Heading size="5" as="h1">Pulse</Heading>
            </Flex>
          </Link>
        </Flex>
        <Separator size="4" />
      </Box>
      
      {/* Navigation section - using flex-1 for dynamic spacing */}
      <Flex 
        direction="column" 
        className="flex-1 flex"
        style={{ minHeight: 0 }} // Prevents flex overflow issues
      >
        {/* Top spacing flex */}
        <Box className="flex-1" />
        
        {/* Navigation menu */}
        <nav className="w-full">
          <Flex 
            direction="column" 
            gap="2"
            className="items-center"
            style={{ 
              padding: '0',
              background: 'white',
              borderRadius: '30px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
              width: '48px',
              margin: '0 auto',
              overflow: 'hidden' // Contain hover states
            }}
          >
            <Link href="/timeline" className="text-center">
              <Button 
                variant="ghost" 
                className="rounded-full p-0" 
                style={{ 
                  width: '48px', 
                  height: '48px',
                  borderRadius: '50%'
                }}
              >
                <Flex align="center" justify="center">
                  <House weight="regular" size={24} />
                </Flex>
              </Button>
            </Link>
            <Link href="/discover" className="text-center">
              <Button 
                variant="ghost" 
                className="rounded-full p-0" 
                style={{ 
                  width: '48px', 
                  height: '48px',
                  borderRadius: '50%'
                }}
              >
                <Flex align="center" justify="center">
                  <MagnifyingGlass weight="regular" size={24} />
                </Flex>
              </Button>
            </Link>
            <Link href="/bookmarks" className="text-center">
              <Button 
                variant="ghost" 
                className="rounded-full p-0" 
                style={{ 
                  width: '48px', 
                  height: '48px',
                  borderRadius: '50%'
                }}
              >
                <Flex align="center" justify="center">
                  <BookmarkSimple weight="regular" size={24} />
                </Flex>
              </Button>
            </Link>
            <Link href="/create" className="text-center" style={{ marginBottom: 0 }}>
              <Button 
                style={{ 
                  backgroundColor: '#4c8bf5',
                  borderRadius: '50%',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  margin: 0
                }}
              >
                <PencilSimpleLine weight="fill" size={24} color="white" />
              </Button>
            </Link>
          </Flex>
        </nav>
        
        {/* Bottom spacing flex */}
        <Box className="flex-1" />
      </Flex>
      
      {/* User profile section - using flex-none to maintain size */}
      <Box className="flex-none">
        <Separator size="4" />
        <Link href="/profile">
          <Flex p="4" align="center" gap="3" className="hover:bg-gray-50">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
              fallback="A"
              radius="full"
            />
            <Box>
              <Heading size="2" as="h3">User Name</Heading>
              <Box className="text-sm text-gray-500">@username</Box>
            </Box>
          </Flex>
        </Link>
      </Box>
    </Box>
  );
}
