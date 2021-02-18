import { Grid, Image, Spacer, Text, Table } from "@geist-ui/react";
import SignFileArchitecture from "../../assets/signFileArchitecture.png";
import VerifyFileArchitecture from "../../assets/verifyFileArchitecture.png";
import ReviewsImage from "../../assets/reviews.svg";

function About() {
  // const codes = `
  // const addSignature = (typingPattern, docsZip, password) => {
  //   hash(docsZip);
  //   embedPatternWithHash(typingPattern);
  //   addOptionalPassword(password);

  //   return secureZip;
  // }`;

  const tableData = [
    {
      strength: <Text b>Unique Embed Design</Text>,
      reasoning:
        "It gets embedded with the documents of ANY type to protect its integrity using sha512 algorithm",
    },
    {
      strength: <Text b>Security</Text>,
      reasoning: `Adds a digital signature over your data. If someone changes the data - the signature won't be valid`,
    },
    {
      strength: <Text b>More Security</Text>,
      reasoning: `Allows user to add a password protection layer, if they want it more secure`,
    },
    {
      strength: <Text b>Plagarism</Text>,
      reasoning:
        "Easy validation of your content will help reduce data copying and modification",
    },
    {
      strength: <Text b>Data privacy</Text>,
      reasoning:
        "Well its a feature of typingDNA not our proprietry feature. But still we uphold it",
    },
  ];

  return (
    <Grid.Container justify="space-between" gap={4}>
      <Grid sm={10}>
        <Image src={ReviewsImage} />
      </Grid>
      <Grid sm={14}>
        <Grid.Container>
          <Grid sm={24}>
            <Text p b size={35} type="success" autoCapitalize="none">
              What's different in this product?
            </Text>
          </Grid>
          <Spacer />
          <Grid sm={24}>
            <Table data={tableData}>
              <Table.Column prop="strength" label="strength" width={150} />
              <Table.Column prop="reasoning" label="reasoning" />
            </Table>
          </Grid>
        </Grid.Container>
      </Grid>
      <Spacer y={1} />
      <Grid sm={24}>
        <Grid.Container>
          <Grid sm={24}>
            <Text p b size={35} type="success">
              PRODUCT ARCHITECTURE
            </Text>
          </Grid>
          <Spacer />
          <Grid sm={24}>
            <Text h3 type="warning">
              Files Signature Embed Architecture
            </Text>
          </Grid>
          <Grid sm={24}>
            <Image src={SignFileArchitecture} />
          </Grid>
          <Spacer />
          <Grid sm={24}>
            <Text h3 type="warning">
              Files Signature Verification Architecture
            </Text>
          </Grid>
          <Grid sm={24}>
            <Image src={VerifyFileArchitecture} />
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
}

export default About;
