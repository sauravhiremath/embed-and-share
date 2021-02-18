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
  useToasts,
  Toggle,
} from "@geist-ui/react";
import { saveAs } from "file-saver";
import {
  FileText,
  Download,
  CheckCircle,
  CloudLightning,
} from "@geist-ui/react-icons";
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
  const [isLoading, setLoading] = useState(false);
  const [fileData, setFileData] = useState("");
  const [verificationMode, setVerificationMode] = useState(false);
  const [, setToast] = useToasts();

  const handleToast = (message) =>
    setToast({
      text: message,
      type: "success",
    });

  const getTypingPattern = () => {
    const typingPattern = tdna.getTypingPattern({
      type: 1,
      text: agreementContent,
      targetId: "typingRecorder",
    });

    if (!typingPattern) {
      return typingPatternSample.replace(",,", ",0,");
    }

    return typingPattern.replace(",,", ",0,");
    // return typingPattern;
  };

  const sendTypingPattern = async () => {
    setLoading(true);
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
      handleToast(data.message);
      setLoading(false);
      setFileData(data.signedFile);
      console.log(data);
    }
  };

  return (
    <Grid.Container justify="space-between">
      <Grid xs={15}>
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
          <Grid sm={24} alignItems="baseline">
            <Text h2>Demo</Text>
            <Spacer x={0.5} />
            <CheckCircle />
            <Spacer x={0.5} />
            {!verificationMode && (
              <Text h2 type="warning">
                - sign documents
              </Text>
            )}
            {verificationMode && (
              <Text h2 type="warning">
                - verify documents
              </Text>
            )}
            <Spacer x={0.5} />
            <Text small type="success">
              <Toggle
                size="large"
                checked={verificationMode}
                onChange={(e) => setVerificationMode(e.target.checked)}
              />
              {!verificationMode && "switch to verify mode"}
              {verificationMode && "switch to signing mode"}
            </Text>
          </Grid>
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
          {!verificationMode && (
            <Grid sm={24}>
              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              >
                <Dot type="warning">
                  <Text small>Optional for securing zip files</Text>
                </Dot>
              </Input>
            </Grid>
          )}
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
          {!verificationMode && (
            <Grid sm={24}>
              {fileData === "" && (
                <Button
                  auto
                  shadow
                  loading={isLoading}
                  icon={<FileText />}
                  type="secondary-light"
                  style={{ width: "100%" }}
                  onClick={sendTypingPattern}
                >
                  Submit for signing
                </Button>
              )}
              {fileData !== "" && (
                <Button
                  auto
                  shadow
                  type="success-light"
                  style={{ cursor: "pointer" }}
                  icon={<Download />}
                  onClick={() => {
                    const blobbedData = new Blob([
                      new Uint8Array(fileData.data).buffer,
                    ]);
                    saveAs(blobbedData, "my-secure-data.zip");
                  }}
                >
                  <Text h4>download signed files</Text>
                </Button>
              )}
            </Grid>
          )}
          {verificationMode && (
            <Grid sm={24}>
              {fileData === "" && (
                <Button
                  auto
                  shadow
                  loading={isLoading}
                  icon={<CloudLightning />}
                  type="secondary-light"
                  style={{ width: "100%" }}
                  onClick={sendTypingPattern}
                >
                  Check for verification
                </Button>
              )}
            </Grid>
          )}
        </Grid.Container>
      </Grid>
      <Grid xs={9}>
        <Grid.Container justify="flex-start">
          <Grid>
            <Display>
              <Image height={400} src={SignFiles} />
            </Display>
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
}

export default TypingDNA;
