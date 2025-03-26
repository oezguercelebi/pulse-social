import { Flex, Box, Heading, Button, Avatar, Separator } from '@radix-ui/themes';
import Link from 'next/link';

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
            <Heading size="5" as="h1">Pulse</Heading>
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
            gap="3"
            className="w-full px-4 items-center"
          >
            <Link href="/timeline" className="w-full text-center">
              <Button variant="ghost" className="w-3/4 mx-auto">
                Timeline
              </Button>
            </Link>
            <Link href="/discover" className="w-full text-center">
              <Button variant="ghost" className="w-3/4 mx-auto">
                Discover
              </Button>
            </Link>
            <Link href="/bookmarks" className="w-full text-center">
              <Button variant="ghost" className="w-3/4 mx-auto">
                Bookmarks
              </Button>
            </Link>
            <Link href="/create" className="w-full text-center">
              <Button variant="solid" className="w-3/4 mx-auto">
                New Pulse
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