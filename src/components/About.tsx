import { Container, Divider, Link, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AboutTitle from "./AboutTitle";

function About() {
  return (
    <Container centerContent bg="white" p={{ base: "2", md: "4" }}>
      <VStack>
        <AboutTitle title="このサイトについて" />

        <Text>個人で作成した、非公式のサイトです。</Text>

        <Divider />

        <AboutTitle title="メニューについて" />

        <Text>
          <Link href="https://www.doutor.co.jp/dcs/menu/" isExternal>
            <Text as="u">公式メニュー</Text>
          </Link>
          を参考にしています。
        </Text>
        <Text>
          実際のメニューとは異なる可能性があるので、正確な情報は公式サイトや店舗でご確認ください。
        </Text>
        <Text>
          モーニングセットは値段の計算方法が分からなかったので除外しています。（でも、モーニングセットは大好きです）
        </Text>

        <Divider />

        <AboutTitle title="免責事項" />

        <Text>
          当サイトを利用することで生じた損害に対し、一切の責任を負いかねます。
        </Text>

        <Divider />

        <RouterLink to="/">
          <Text as="u">Home</Text>
        </RouterLink>
      </VStack>
    </Container>
  );
}

export default About;
