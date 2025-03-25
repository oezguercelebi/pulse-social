import { Container, Heading, Text, Flex, Button } from '@radix-ui/themes';

export default function Home() {
  return (
    <Container size="3" className="py-24">
      <Flex direction="column" align="center" justify="center" gap="4">
        <Heading size="9" align="center">Pulse</Heading>
        <Text size="5" align="center" className="max-w-2xl">
          A minimalist social platform where users can share short-form thoughts and updates with their followers in real-time.
        </Text>
        <Flex gap="4" mt="4">
          <Button size="3" variant="solid">
            Sign Up
          </Button>
          <Button size="3" variant="outline">
            Learn More
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
} 