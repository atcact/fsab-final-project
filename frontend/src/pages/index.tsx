import {Button, Container, HStack, Spacer, Text, VStack} from "@chakra-ui/react"
import { useState } from "react";
import NewPostModal from "@/components/NewPostModal";
import Post from "@/components/Post";

export default function Home() {
  const [newPostDialog, setNewPostDialog] = useState(false);

  return (
    <div>
      <NewPostModal
        isOpen={newPostDialog}
        onClose={() => setNewPostDialog(false)}
      />
      <Container maxW="container.sm">
        <HStack my={10}>
          <Text fontSize="5xl" fontWeight={800}>
            Posts
          </Text>
          <Spacer />
          <Button onClick={() => setNewPostDialog(true)}>New</Button>
        </HStack>
        <VStack width="100%">
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp!"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp!"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp!"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp!"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp"
            postedAt={new Date()}
          />
          <Post
            title="Cool Post"
            body="Welcome to Full Stack @ Brown bootcamp"
            postedAt={new Date()}
          />
        </VStack>
      </Container>
    </div>
  );
}
