import { Box, Divider, Text, VStack } from "@chakra-ui/react";

interface SuggestionProps {
    ft: number;
    inch: number;
    lbs: number;
    goal: string;
    suggestion: string;
    createdAt: Date;
  }
  
  const SuggestionPost = ({ ft, inch, lbs, goal, suggestion, createdAt }: SuggestionProps) => {
    // TODO: Implement a component representing an already existing post
    return (
      <Box width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box p={4}>
          <Text fontSize="xl" fontWeight={600}>
            Workout Plan 
          </Text>
          {/* <Text fontSize="3xs" fontWeight={600}>
            {new Date()}
          </Text> */}
        </Box>
        <Divider />
        <Box p={4}>
          <VStack>
            <Text>
              Height: {ft}ft{inch}in -  Weight: {lbs}lbs
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
      </Box>
    );
  };

  export default SuggestionPost;