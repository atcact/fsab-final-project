import { Box, Divider, Text, VStack } from "@chakra-ui/react";

interface Props {
  title: string;
  workout: string;
  time: number;
  body: string;
  postedAt: Date;
}

const Post = ({ title, workout, time, body, postedAt }: Props) => {
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

export default Post;
