import "./aboutus.css";
import { Grid, Image, Spacer, Text, Table } from "@geist-ui/react";
import SignFileArchitecture from "../../assets/signFileArchitecture.png";
import VerifyFileArchitecture from "../../assets/verifyFileArchitecture.png";
import ReviewsImage from "../../assets/reviews.svg";

function About() {
  const tableData = [
    {
      feature: <Text b>Unique Embed Design</Text>,
      information:
        "It gets embedded with the documents of ANY type to protect its integrity using the sha512 algorithm",
    },
    {
      feature: <Text b>Strong Encryption</Text>,
      information: `Adds a digital signature over your data. If someone changes the data - the signature won't be valid`,
    },
    {
      feature: <Text b>Highly secure</Text>,
      information: `Allows the user to add a password protection layer, if they want it more secure`,
    },
    {
      feature: <Text b>No Plagiarism</Text>,
      information:
        "Easy validation of your content will help reduce data copying and modification",
    },
    {
      feature: <Text b>Data privacy</Text>,
      information:
        "We do not ask for your personal information, neither store anything on our servers. Everything is truly yours",
    },
  ];

  return (
    <Grid.Container justify="space-between" gap={4}>
      <Grid md={10} sm={24} xs={24}>
        <Image src={ReviewsImage} style={{ maxWidth: "80vw" }} />
      </Grid>
      <Grid md={14} sm={24} xs={24}>
        <Grid.Container>
          <Grid xs={24}>
            <Text
              p
              b
              size={35}
              type="success"
              autoCapitalize="none"
              className="sub-header"
            >
              WHY USE THIS?
            </Text>
          </Grid>
          <Spacer />
          <Grid xs={24}>
            <Table data={tableData}>
              <Table.Column prop="feature" label="feature" width={150} />
              <Table.Column prop="information" label="information" />
            </Table>
          </Grid>
        </Grid.Container>
      </Grid>
      <Spacer y={1} />
      <Grid xs={24}>
        <Grid.Container>
          <Grid xs={24}>
            <Text p b size={35} type="success" className="sub-header">
              PRODUCT ARCHITECTURE
            </Text>
          </Grid>
          <Spacer />
          <Grid xs={24}>
            <Text h3 type="warning">
              Files Signature Embed Architecture
            </Text>
          </Grid>
          <Grid xs={24} id="architecture">
            <Image src={SignFileArchitecture} />
          </Grid>
          <Spacer />
          <Grid xs={24}>
            <Text h3 type="warning">
              Files Signature Verification Architecture
            </Text>
          </Grid>
          <Grid xs={24}>
            <Image src={VerifyFileArchitecture} />
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
}

export default About;
