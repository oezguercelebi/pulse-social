'use client';

import { useState } from 'react';
import { Box, Button, Card, Flex, Heading, TextArea } from '@radix-ui/themes';
import { PaperPlane, ImageSquare } from '@phosphor-icons/react';

export default function CreatePage() {
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postContent.trim()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would send data to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reset form after success
      setPostContent('');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Failed to create post', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Heading size="6" mb="4">Create a Pulse</Heading>
      
      <Card size="2">
        <form onSubmit={handleSubmit}>
          <Box mb="4">
            <TextArea 
              placeholder="What's happening? (280 chars max)" 
              value={postContent}
              onChange={e => setPostContent(e.target.value)}
              maxLength={280}
              style={{ minHeight: 150 }}
            />
            <Flex justify="between" align="center" mt="2">
              <Button variant="ghost" type="button">
                <ImageSquare weight="regular" size={20} />
              </Button>
              <Box style={{ fontSize: '0.875rem', color: 'var(--gray-10)' }}>
                {postContent.length}/280
              </Box>
            </Flex>
          </Box>
          
          <Flex justify="end">
            <Button 
              disabled={!postContent.trim() || isSubmitting} 
              type="submit"
              style={{ backgroundColor: '#4c8bf5' }}
            >
              <PaperPlane weight="fill" size={18} />
              <Box ml="1">Pulse it</Box>
            </Button>
          </Flex>
        </form>
      </Card>
    </div>
  );
}
