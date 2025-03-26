'use client';

import { useState } from 'react';
import { Flex, Box, Heading, Button, Avatar, Separator } from '@radix-ui/themes';
import Link from 'next/link';
import {
  House,
  Timer,
  MagnifyingGlass,
  BookmarkSimple,
  PencilSimpleLine,
  Pulse,
} from "@phosphor-icons/react";
import { CreatePostModal } from '@/components/features/create-post-modal';

export function Sidebar() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <Box 
      className="h-screen sticky top-0 left-0 w-64 bg-white shadow-sm"
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      {/* Logo section (Home) - using flex-none to maintain size */}
      <Box className="flex-none">
        <Flex align="center" justify="center" py="5" px="4">
          <Link href="/" aria-label="Home">
            <Flex align="center" justify="center">
              <Pulse weight="duotone" size={32} color="#4c8bf5" />
            </Flex>
          </Link>
        </Flex>
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
            <Link href="/" className="text-center">
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
            <Box className="text-center" style={{ marginBottom: 0 }}>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
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
            </Box>
          </Flex>
        </nav>
        
        {/* Bottom spacing flex */}
        <Box className="flex-1" />
      </Flex>
      
      {/* User profile section - using flex-none to maintain size */}
      <Box className="flex-none">
        <Link href="/profile">
          <Flex p="4" align="center" className="hover:bg-gray-50 justify-center">
            <Avatar
              size="3"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
              fallback="A"
              radius="full"
            />
          </Flex>
        </Link>
      </Box>
      
      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </Box>
  );
}
