import {Button, Container, HStack, Spacer, Text, VStack, Input} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import NewPostModal from "@/components/NewPostModal";
import NewPromptModal from "@/components/NewPromptModal";
import ExercisePost from "@/components/ExercisePost";
import SuggestionPost from "@/components/SuggestionPost";
import axios from "axios";


export default function Home() {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [newPrompt, setNewPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  function getPost() {
    // Set isLoading to true while we make the API request.
    setIsLoading(true);

    // TODO: Make a POST request with the form data to the /posts endpoint
    axios
      .get("http://localhost:8080/exercises", {})
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPost();
  }, []);

  const listPosts = items.map((post) =>
    <ExercisePost
      title={post.title}
      workout={post.workout}
      time={post.time}
      body={post.body}
      postedAt={post.postedAt}
    />
  );

  function getSuggestion() {
    // Set isLoading to true while we make the API request.
    setIsLoading(true);

    // TODO: Make a POST request with the form data to the /posts endpoint
    axios
      .get("http://localhost:8080/suggestions", {})
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getSuggestion();
  }, []);

  const listSuggestions = items.map((suggestion) =>
    <SuggestionPost
      ft={suggestion.ft}
      inch={suggestion.in}
      lbs={suggestion.lbs}
      goal={suggestion.goal}
      suggestion={suggestion.suggestion}
      createdAt={suggestion.createdAt}
    />
  );

  return (
    <div>
      <NewPostModal
        isOpen={newPostDialog}
        onClose={() => setNewPostDialog(false)}
      />
      <NewPromptModal
        isOpen={newPrompt}
        onClose={() => setNewPrompt(false)}
      />
      <Container maxW="container.sm">
        <HStack my={10}>
          <Text fontSize="5xl" fontWeight={800}>
            Workout Tracker
          </Text>
          <Spacer />
          <Button onClick={() => setNewPrompt(true)}>Workout Suggestion</Button>
          <Spacer />
          <Button onClick={() => setNewPostDialog(true)}>New</Button>
        </HStack>

        <VStack width="100%">
            {listSuggestions}
            {listPosts}
        </VStack>
      </Container>
    </div>
  );
}
