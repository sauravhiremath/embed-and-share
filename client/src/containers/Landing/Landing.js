import "./Landing.css";
import { Image, Spacer, Text, Display, Page, Grid } from "@geist-ui/react";
import TwoFactor from "../../assets/two-fac.svg";

import TypingDNA from "../TypingDNA/TypingDnaView";
import About from "../About/About";

function Landing() {
  return (
    <div className="landing">
      <Page size="large" dotBackdrop>
        <Page.Header></Page.Header>
        <Page.Content>
          <Grid.Container>
            <Grid>
              <Text b type="secondary" className="header">
                Embed
              </Text>
              <Text b type="success" className="header">
                &
              </Text>
              <Text b type="secondary" className="header">
                Share
              </Text>
            </Grid>
          </Grid.Container>
          <Grid.Container gap={4}>
            <Grid md={12} sm={24}>
              <Display>
                <Image src={TwoFactor} style={{ maxWidth: "90vw" }} />
              </Display>
            </Grid>
            <Grid md={12} sm={24}>
              <Grid.Container direction="column">
                <Text h3>
                  Sign and lock your files and documents by embedding your
                  typing pattern
                </Text>
                <Text p type="secondary" size="1.15em">
                  Gone are the days, when your products/files/content was used
                  without any credit to you. Easily protect your content with
                  your typing pattern by embedding them in the metadata, and
                  reduce data theft.
                </Text>
                <Text p b type="warning" size="1.1em">
                  Are you a designer? A musician? A developer? The next business
                  tycoon? A freelancer? We got you covered
                </Text>
                <Text p type="secondary" size="1.15em">
                  Secure your content now! Your work belongs only to you, and
                  our mission is to ensure it stays that way
                </Text>
              </Grid.Container>
            </Grid>
          </Grid.Container>
          <Spacer y={3} />
          <TypingDNA />
          <Spacer y={3} />
          <About />
        </Page.Content>
      </Page>
    </div>
  );
}

export default Landing;
