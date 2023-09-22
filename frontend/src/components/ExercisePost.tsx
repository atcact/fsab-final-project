import { Box, Divider, Text, VStack } from "@chakra-ui/react";

interface ExerciseProps {
  title: string;
  workout: string;
  time: number;
  body: string;
  postedAt: Date;
}

const ExercisePost = ({ title, workout, time, body, postedAt }: ExerciseProps) => {
  // TODO: Implement a component representing an already existing post
  return (
    <Box width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p={4}>
        <Text fontSize="xl" fontWeight={600}>
          {workout} - {time} minutes
        </Text>
      </Box>
      <Divider />
      <Box p={4}>
        <Text fontSize="md" fontWeight={600}>
          Details
        </Text>
        <VStack>
          <Text>
            {body}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};


export default ExercisePost;
