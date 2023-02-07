import { Heading } from "@chakra-ui/react";

type Props = {
  title: string;
};
function AboutTitle({ title }: Props) {
  return (
    <Heading size="md" color="#3d2900">
      {title}
    </Heading>
  );
}

export default AboutTitle;
