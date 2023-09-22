import {Button, Container, HStack, Spacer, Text, VStack, Input} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import NewPostModal from "@/components/NewPostModal";
import Post from "@/components/Exercises";
import axios from "axios";

require("dotenv").config();

export default function Home() {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [LLMOutput, setLLMOutput] = useState("default")

function generateWorkout(promptWorkout: string) {
    const options = {
      method: 'POST',
      url: 'https://api.cohere.ai/v1/generate',
      headers: {
        accept: 'application/json', 
        'content-type': 'application/json', 
        authorization: process.env.API_KEY
      },
      data: {
        prompt: promptWorkout,
        max_tokens: 20, 
        truncate: 'END', 
        return_likelihoods: 'NONE'
      }
    };


  axios
    .request(options)
    .then(function (response) {
      setLLMOutput(response.data.generations.text);
    })
    .catch(function (error) {
      console.error(error);
    });
  }

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
    <Post 
      title={post.title}
      workout={post.workout}
      time={post.time}
      body={post.body}
      postedAt={post.postedAt}
    />
  );

  return (
    <div>
      <NewPostModal
        isOpen={newPostDialog}
        onClose={() => setNewPostDialog(false)}
      />
      <Container maxW="container.sm">
        <HStack my={10}>
          <Text fontSize="5xl" fontWeight={800}>
            Workout Tracker
          </Text>
          <Spacer />
          <Button onClick={() => setNewPostDialog(true)}>New</Button>
        </HStack>

        <VStack width="100%">
          {listPosts}
        </VStack>
      </Container>
    </div>
  );
}
