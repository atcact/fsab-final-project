import { Box, Divider, Text, VStack, Flex, IconButton } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa"; 
import { useState } from "react";
import axios from "axios";

interface SuggestionProps {
    _id: string;
    ft: number;
    inch: number;
    lbs: number;
    goal: string;
    suggestion: string;
    createdAt: Date;
  }
  
  const SuggestionPost = ({ _id, ft, inch, lbs, goal, suggestion, createdAt }: SuggestionProps) => {
    const [isLoading, setIsLoading] = useState(false);

    function deleteSuggestion() {

      // Set isLoading to true while we make the API request.
      setIsLoading(true);

      axios
        .delete(`http://localhost:8080/suggestions/${_id}`)
        .then(function (response) {
          // handle success
          window.location.reload();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          setIsLoading(false);
        });
    }

    return (
      <Box width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box p={4}>
          <Text fontSize="xl" fontWeight={600}>
            Workout Plan 
          </Text>
        </Box>
        <Divider />
        <Box p={4}>
          <VStack>
            <Text>
              Height: {ft}ft {inch}in -  Weight: {lbs}lbs
            </Text>
            <Text>
            Goal: {goal}
            </Text>
            <Text>
            Workout Plan:
            </Text>
            <Text>
              {suggestion}
            </Text>
          </VStack>
        </Box>
        <Flex justify="flex-end" p={4}>
        <IconButton
          icon={<FaTimes />}
          onClick={() => deleteSuggestion()}
          aria-label="Delete"
          isLoading={isLoading}
        />
      </Flex>
      </Box>
    );
  };

  export default SuggestionPost;