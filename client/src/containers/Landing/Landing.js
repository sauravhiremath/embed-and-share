import "./Landing.css";
import { useEffect, useState } from "react";
import {
  Row,
  Image,
  Spacer,
  Text,
  Display,
  Page,
  Card,
  Col,
} from "@geist-ui/react";
import Splash from "../../assets/splash.svg";
import TwoFactor from "../../assets/two-fac.svg";

import TypingDNA from "../TypingDNA/TypingDnaView";

function Landing() {
  return (
    <div className="landing">
      <Page size="large" dotBackdrop>
        <Page.Header></Page.Header>
        <Page.Content>
          <Row justify="start" align="middle">
            <Text h1 size="5vw" type="secondary">
              Sign
            </Text>
            <Text h1 size="5vw" type="success">
              &
            </Text>
            <Text h1 size="5vw" type="secondary">
              Share
            </Text>
          </Row>
          <Row justify="space-between" align="top">
            <Col span={12}>
              <Display width="30vw">
                <Image src={TwoFactor} />
              </Display>
            </Col>
            <Col span={10}>
              <Text h3>
                Sign your files and documents by embedding your typing pattern
              </Text>
              <Text p type="secondary" size="1.15em">
                Gone are the days, when your products/files/content was used
                without any credit to you. Easily sign your content with your
                typing pattern and embed them in the content, so no one can
                plagarize it.
              </Text>
              <Text p b type="warning" size="1.1em">
                Are you a designer? A musician? A developer? The next business
                tycoon?
              </Text>
              <Text p type="secondary" size="1.15em">
                Secure your content now. Your work belongs only to you, and our
                mission is to ensure it stays that way
              </Text>
            </Col>
          </Row>
          <Spacer y={5} />
          <TypingDNA />
          <Spacer y={1.5} />
        </Page.Content>
        <Page.Footer>
          © https://github.com/sauravhiremath/hex-cambridge-2021
        </Page.Footer>
      </Page>
    </div>
  );
}

export default Landing;
