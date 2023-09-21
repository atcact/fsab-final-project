import { Box, Divider, Text, VStack } from "@chakra-ui/react";

interface Props {
  title: string;
  body: string;
  postedAt: Date;
}

const Post = ({ title, body, postedAt }: Props) => {
  // TODO: Implement a component representing an already existing post
  return (
    <Box width="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p={4}>
        <Text fontSize="xl" fontWeight={600}>
          {title}
        </Text>
        <Text fontSize="sm">{body}</Text>
      </Box>
      <Divider />
    </Box>
  );
};

export default Exercise;
