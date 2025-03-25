import { Flex, Box, Heading, Button, Separator, Avatar } from '@radix-ui/themes';
import Link from 'next/link';

export function Navigation() {
  return (
    <Box>
      <Flex justify="between" align="center" py="4" px="6">
        <Flex align="center" gap="4">
          <Link href="/">
            <Heading size="5" as="h1">Pulse</Heading>
          </Link>
        </Flex>
        
        <Flex gap="4" align="center">
          <Link href="/components">
            <Button variant="ghost">Components</Button>
          </Link>
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Button variant="solid">Sign In</Button>
          <Avatar
            size="2"
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
            fallback="A"
            radius="full"
          />
        </Flex>
      </Flex>
      <Separator size="4" />
    </Box>
  );
} 