import {
  Flex,
  Box,
  Card,
  Heading,
  Text,
  Button,
  Tabs,
  Avatar,
  Separator,
  Badge,
  TextField,
  Container,
} from '@radix-ui/themes';

export default function ComponentsShowcase() {
  return (
    <Container size="3" className="py-6">
      <Heading size="8" mb="4">Component Showcase</Heading>
      <Separator size="4" mb="6" />
      
      <Tabs.Root defaultValue="buttons">
        <Tabs.List>
          <Tabs.Trigger value="buttons">Buttons</Tabs.Trigger>
          <Tabs.Trigger value="cards">Cards</Tabs.Trigger>
          <Tabs.Trigger value="forms">Forms</Tabs.Trigger>
        </Tabs.List>
        
        <Box pt="4">
          <Tabs.Content value="buttons">
            <Heading size="4" mb="4">Buttons</Heading>
            <Flex gap="4" wrap="wrap">
              <Button variant="solid">Solid Button</Button>
              <Button variant="soft">Soft Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </Flex>
            
            <Heading size="4" mt="6" mb="4">Button Sizes</Heading>
            <Flex gap="4" align="center">
              <Button size="1">Size 1</Button>
              <Button size="2">Size 2</Button>
              <Button size="3">Size 3</Button>
            </Flex>
          </Tabs.Content>
          
          <Tabs.Content value="cards">
            <Heading size="4" mb="4">Cards</Heading>
            <Flex gap="4" wrap="wrap">
              <Card size="2" style={{ width: 200 }}>
                <Flex direction="column" gap="2">
                  <Avatar
                    size="3"
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453"
                    fallback="A"
                  />
                  <Heading size="3">Card Title</Heading>
                  <Text size="2">This is a simple card example with avatar and text.</Text>
                  <Button size="1" variant="solid">Action</Button>
                </Flex>
              </Card>
              
              <Card size="2" style={{ width: 200 }}>
                <Flex direction="column" gap="2">
                  <Badge color="blue">Featured</Badge>
                  <Heading size="3">Featured Card</Heading>
                  <Text size="2">Cards can include badges, text, and other components.</Text>
                  <Button size="1" variant="soft">Learn More</Button>
                </Flex>
              </Card>
            </Flex>
          </Tabs.Content>
          
          <Tabs.Content value="forms">
            <Heading size="4" mb="4">Form Elements</Heading>
            <Flex direction="column" gap="4" style={{ maxWidth: 400 }}>
              <TextField.Root>
                <TextField.Input placeholder="Enter your name" />
              </TextField.Root>
              
              <TextField.Root>
                <TextField.Input placeholder="Enter your email" />
              </TextField.Root>
              
              <Button variant="solid">Submit</Button>
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Container>
  );
} 