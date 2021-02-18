import "./TypingDNA.css";
import { useEffect, useState } from "react";
import { tdna } from "./typingdna";
import {
  Row,
  Breadcrumbs,
  Spacer,
  Text,
  Button,
  Page,
  Col,
  Card,
  Grid,
  Image,
  Link,
  Display,
  Textarea,
  Input,
  Dot,
  Code,
} from "@geist-ui/react";
import { FileText } from "@geist-ui/react-icons";
import NumberEasing from "react-number-easing";
import { getColorForPercentage } from "../../helpers";
import typingPatternSample from "./typingPatternSample";
import UploadFile from "./UploadFile";
import SignFiles from "../../assets/sign-files.svg";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const agreementContent =
  "By clicking submit, I agree to use my typing dna to securely sign my documents and I understand none of my data is stored on the servers";

function TypingDNA() {
  const [typingScore, setTypingScore] = useState(88);
  const [password, setPassword] = useState("");
  const [fileBuffers, setFileBuffers] = useState([]);

  const getTypingPattern = () => {
    const typingPattern = tdna.getTypingPattern({
      type: 1,
      text: agreementContent,
      targetId: "typingRecorder",
    });
    return typingPattern.replace(",,", ",0,");
    // return typingPattern;
  };

  const sendTypingPattern = async () => {
    const typingPattern = getTypingPattern();
    const formData = new FormData();
    for (const fileBuffer of fileBuffers) {
      formData.append("docs", fileBuffer);
    }
    formData.append("password", password);
    formData.append("typingPattern", typingPattern || typingPatternSample);

    const res = await fetch("http://localhost:8080/api/dna/send", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <Grid.Container justify="space-between">
      <Grid xs={14}>
        <Grid.Container justify="flex-start">
          {/* <Grid>
            <Card shadow>
              <Card.Content>
                <h1
                  style={{
                    color: getColorForPercentage(typingScore / 100),
                  }}
                >
                  <NumberEasing
                    value={typingScore}
                    speed={3000}
                    decimals={1}
                    ease="cubicOut"
                  />
                  %
                </h1>
                <h3>Typing Match Score</h3>
              </Card.Content>
              <Card.Footer>
                <Link block href="/">
                  View calculation
                </Link>
              </Card.Footer>
            </Card>
          </Grid> */}
          <Grid sm={24}>
            <Text blockquote type="error">
              {agreementContent}
            </Text>
          </Grid>
          <Grid sm={24}>
            <Textarea
              placeholder="Type the above text here..."
              width="100%"
              id="typingRecorder"
            />
          </Grid>
          <Spacer />
          <Grid sm={24}>
            <Input
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            >
              <Dot type="warning">
                <Text small>Optional for securing zip files</Text>
              </Dot>
            </Input>
          </Grid>
          <Grid sm={24}>
            <Grid.Container justify="center">
              <Grid sm={24}>
                <Text b p type="success">
                  Upload documents here
                </Text>
              </Grid>
              <Grid sm={24}>
                <UploadFile setFileBuffers={setFileBuffers} />
              </Grid>
            </Grid.Container>
          </Grid>
          <Spacer />
          <Grid sm={24}>
            <Button
              auto
              shadow
              icon={<FileText />}
              type="secondary-light"
              style={{ width: "100%" }}
              onClick={sendTypingPattern}
            >
              Submit for signing
            </Button>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={7}>
        <Display width="30vw">
          <Image height={400} src={SignFiles} />
        </Display>
      </Grid>
    </Grid.Container>
  );
}

export default TypingDNA;
