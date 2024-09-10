import { Card, Flex, Stack, Text } from "@sanity/ui";

export function MyEnhancedNavbar(props) {
  return (
    <Stack>
      <Card padding={3} tone="caution">
        <Flex justify="center">
          <Text>Important Message: Please Read!</Text>
        </Flex>
      </Card>
      <>{props.renderDefault(props)}</>
    </Stack>
  );
}
