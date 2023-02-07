import { Text, VStack, Box } from "@chakra-ui/react";
import { Menu } from "../model/Menu";

type Props = {
  menu: Menu;
};
export const MenuItem = ({ menu }: Props) => {
  return (
    <Box
      key={menu.uuid}
      borderWidth="1px"
      borderRadius="md"
      backgroundColor={"gray.100"}
      shadow="md"
      p={2}
      w="sm"
    >
      <VStack>
        <Box>
          <Text color="#3d2900" fontWeight={"bold"} fontSize="md">
            {menu.name}
            {menu.size && <>（{menu.size}）</>}
          </Text>
        </Box>
        <Text fontSize="md" color="#3d2900" fontWeight={"bold"}>
          {menu.price}円
        </Text>
      </VStack>
    </Box>
  );
};
