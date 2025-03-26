import { Container, Heading, Text, Flex } from '@radix-ui/themes';

export default function Home() {
  return (
    <Flex 
      className="h-screen overflow-hidden" 
      direction="column"
    >
      <Container size="3" className="py-6">
        <Heading size="8" mb="4">Welcome to Pulse</Heading>
        <Text size="3">
          This is the main content area of our application. The sidebar navigation is sticky and content is contained within the viewport height.
        </Text>
      </Container>
    </Flex>
  );
} 