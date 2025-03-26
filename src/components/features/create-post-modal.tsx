'use client';

import { useState } from 'react';
import { Box, Button, Dialog, Flex, TextArea, TextField } from '@radix-ui/themes';
import { PaperPlane, X, ImageSquare } from '@phosphor-icons/react';

type CreatePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
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
      
      // Reset form and close modal on success
      setPostContent('');
      onClose();
    } catch (error) {
      console.error('Failed to create post', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog.Root open={isOpen} onOpenChange={open => !open && onClose()}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Flex justify="between" align="center" mb="4">
          <Dialog.Title>Create a Pulse</Dialog.Title>
          <Dialog.Close>
            <Button variant="ghost" color="gray" onClick={onClose}>
              <X weight="bold" />
            </Button>
          </Dialog.Close>
        </Flex>
        
        <Dialog.Description size="2" mb="4">
          Share your thoughts in 280 characters or less.
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Box mb="4">
            <TextArea 
              placeholder="What's happening? (280 chars max)" 
              value={postContent}
              onChange={e => setPostContent(e.target.value)}
              maxLength={280}
              style={{ minHeight: 120 }}
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
          
          <Flex justify="end" gap="3">
            <Button 
              variant="soft" 
              color="gray" 
              onClick={onClose} 
              type="button"
            >
              Cancel
            </Button>
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
      </Dialog.Content>
    </Dialog.Root>
  );
}
