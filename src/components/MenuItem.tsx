import { Center, Stack, Text, VStack, ListItem } from "@chakra-ui/react";
import { Menu } from "../model/Menu";

type Props = {
  menu: Menu;
};
export const MenuItem = ({ menu }: Props) => {
  return (
    <>
      <ListItem
        key={menu.uuid}
        borderWidth="1px"
        p="4"
        mt="4"
        borderRadius="md"
        backgroundColor={"gray.100"}
        shadow="md"
      >
        <Stack>
          <Center>
            <VStack>
              <Text color="#3d2900" fontWeight={"bold"} fontSize="md">
                {menu.name}
              </Text>
              <Text fontSize="md" color="#3d2900" fontWeight={"bold"}>
                {menu.price}円
              </Text>
            </VStack>
          </Center>
        </Stack>
      </ListItem>
    </>
  );
};
