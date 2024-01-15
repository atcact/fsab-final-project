
import {Button, Container, HStack, Spacer, Text, VStack, Input, Grid, GridItem, Box, Flex, Link} from "@chakra-ui/react"
import { useState, useEffect } from "react";
import NewPostModal from "@/components/NewPostModal";
import NewPromptModal from "@/components/NewPromptModal";
import ExercisePost from "@/components/ExercisePost";
import SuggestionPost from "@/components/SuggestionPost";
import axios from "axios";


export default function HomePage() {
  const [newPostDialog, setNewPostDialog] = useState(false);
  const [newPrompt, setNewPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [promptItems, setPromptItems] = useState<any[]>([]);

  function getPost() {
    // Set isLoading to true while we make the API request.
    setIsLoading(true);

    // TODO: Make a POST request with the form data to the /posts endpoint
    axios
      .get("http://localhost:8080/exercises", {})
      .then(function (response) {
        setItems(response.data.reverse());
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
      _id={post._id}
      title={post.title}
      workout={post.workout}
      time={post.time}
      body={post.body}
      postedAt={post.createdAt}
    />
  );

  function getSuggestion() {
    // Set isLoading to true while we make the API request.
    setIsLoading(true);
    
    axios
      .get("http://localhost:8080/suggestions", {})
      .then(function (response) {
        setPromptItems(response.data.reverse());
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

  const listSuggestions = promptItems.map((suggestion) =>
    <SuggestionPost
      _id={suggestion._id}
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
      <Grid
          templateRows='repeat(8, 1fr)'
          templateColumns='repeat(4, 1fr)'
          h='200px'
          gap='4'
        >
          <GridItem rowSpan={1} colSpan={4}>
              {/* <Box bg="teal.500" p={4} color="white">
              <Flex align="center">
                <Link as={RouterLink} to="/">
                  <Text fontSize="xl" fontWeight="bold">
                    Your Logo
                  </Text>
                </Link>
                <Spacer />
                <VStack spacing={4} direction="row">
                  <Link as={RouterLink} to="/">
                    Home
                  </Link>
                  <Link as={RouterLink} to="/about">
                    About
                  </Link>
                </VStack>
              </Flex>
            </Box>
            <Router>
              <Navbar />
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/about" component={AboutPage} />
              </Switch>
            </Router> */}
            <Text fontSize="5xl" fontWeight={800} align={"center"}>
              Workout Tracker
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <VStack width="100%">
              <Button onClick={() => setNewPrompt(true)}>Workout Suggestion</Button>
              {listSuggestions}
          </VStack>
          </GridItem>
          <GridItem colSpan={2}>
              <VStack width="100%">
                <Button onClick={() => setNewPostDialog(true)}>New</Button>
                {listPosts}
              </VStack>
          </GridItem>
          <GridItem rowSpan={1} colSpan={4}>
            Footer
          </GridItem>
      </Grid>

    </div>
  );
}
