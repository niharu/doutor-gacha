import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  List,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function About() {
  return (
    <Container
      centerContent
      p={{ base: "4", md: "6" }}
      maxWidth="lg"
      bg="white"
    >
      <>
        {/* <Heading size="lg" color="#3d2900" mb={3}>
          このサイトについて
        </Heading> */}

        <Box w="md">
          <Center>
            <Heading size="md" color="#3d2900">
              このサイトについて
            </Heading>
          </Center>

          <Text fontSize="md" mt={4}>
            個人で作成した、非公式のサイトです。
          </Text>

          <Center>
            <Heading size="md" color="#3d2900" mt={8}>
              メニューについて
            </Heading>
          </Center>

          <Text fontSize="md" mt={4}>
            <Link href="https://www.doutor.co.jp/dcs/menu/" isExternal>
              <Text as="u">公式メニュー</Text>
            </Link>
            を参考にしています。
          </Text>
          <Text fontSize="md" mt={2}>
            実際のメニューとは異なる可能性があるので、正確な情報は公式サイトや店舗でご確認ください。
          </Text>
          <Text fontSize="md" mt={2}>
            モーニングセットは値段の計算方法が分からなかったので除外しています。（でも、モーニングセットは大好きです）
          </Text>

          <Center>
            <Heading size="md" color="#3d2900" mt={8}>
              免責事項
            </Heading>
          </Center>

          <Text fontSize="md" mt={4}>
            当サイトを利用することで生じた損害に対し、一切の責任を負いかねます。
          </Text>
        </Box>
        <Center mt={3}>
          <RouterLink to="/">
            <Text as="u">Home</Text>
          </RouterLink>
        </Center>
      </>
    </Container>
  );
}

export default About;
