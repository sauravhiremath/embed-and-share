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

const agreementContent1 =
  "By clicking submit, I agree to use my typing dna to securely sign my documents";
const agreementContent2 =
  "I understand none of my data is stored on the servers";
const agreementContent3 = "I abide by typing dna terms and conditions";

function TypingDNA() {
  const [typingScore, setTypingScore] = useState(undefined);
  const [password, setPassword] = useState("");
  const [fileBuffers, setFileBuffers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [fileData, setFileData] = useState("");
  const [verificationMode, setVerificationMode] = useState(false);
  const [userAgreementContent1, setUserAgreementContent1] = useState("");
  const [userAgreementContent2, setUserAgreementContent2] = useState("");
  const [userAgreementContent3, setUserAgreementContent3] = useState("");

  const [, setToast] = useToasts();

  const handleToast = (message, type) =>
    setToast({
      text: message,
      type: type || "success",
    });

  const getTypingPattern = (target) => {
    const text =
      target === 1
        ? agreementContent1
        : target === 2
        ? agreementContent2
        : agreementContent3;

    const typingPattern = tdna.getTypingPattern({
      type: 1,
      text,
      targetId: `typingRecorder${target}`,
    });

    if (!typingPattern) {
      return typingPatternSample.replace(",,", ",0,");
    }

    return typingPattern.replace(",,", ",0,");
    // return typingPattern;
  };

  const sendTypingPattern = async () => {
    setLoading(true);
    const typingPattern1 = getTypingPattern(1);
    const typingPattern2 = getTypingPattern(2);
    const typingPattern3 = getTypingPattern(3);

    const formData1 = new FormData();
    for (const fileBuffer of fileBuffers) {
      formData1.append("docs", fileBuffer);
    }
    formData1.append("password", password);
    formData1.append("typingPattern", typingPattern1);

    const res1 = await fetch("http://localhost:8080/api/dna/send", {
      method: "POST",
      body: formData1,
    });

    if (res1.status === 200) {
      const data1 = await res1.json();
      console.log(data1);
      const signedBuffer = new Blob([toArrayBuffer(data1.signedFile.data)]);

      const formData2 = new FormData();
      formData2.append("zipFile", signedBuffer, "my-secure-docs.zip");
      formData2.append("typingPattern", typingPattern2);

      const formData3 = new FormData();
      formData3.append("zipFile", signedBuffer, "my-secure-docs.zip");
      formData3.append("typingPattern", typingPattern3);

      await new Promise((r) => setTimeout(r, 1000));

      const res2 = await fetch("http://localhost:8080/api/dna/verify", {
        method: "POST",
        body: formData2,
      });

      await new Promise((r) => setTimeout(r, 1000));

      const res3 = await fetch("http://localhost:8080/api/dna/verify", {
        method: "POST",
        body: formData3,
      });

      if (res2.status === 200 && res3.status === 200) {
        const data2 = await res2.json();
        const data3 = await res3.json();

        console.log(data2);
        console.log(data3);
        setTypingScore(data3?.highConfidence * 100);
        handleToast(data1.message);
        handleToast(data2.message);
        handleToast(data3.message);
        setFileData(data1.signedFile);
        setLoading(false);
      } else {
        const { error } = await res2.json();
        handleToast(error || "Verification Failed. Kindly try again!", "error");
        setLoading(false);
      }
    } else {
      const { error } = await res1.json();
      handleToast(error || "Verification Failed. Kindly try again!", "error");
      setLoading(false);
    }
  };

  const verifyTypingPattern = async () => {
    setLoading(true);
    const typingPattern = getTypingPattern(1);
    const formData = new FormData();
    formData.append("zipFile", fileBuffers[0]);
    formData.append("typingPattern", typingPattern || typingPatternSample);

    const res = await fetch("http://localhost:8080/api/dna/verify", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      const data = await res.json();
      handleToast(data.message);
      setTypingScore(data.highConfidence * 100);
      setLoading(false);
      console.log(data);
    } else {
      const { error } = await res.json();
      handleToast(error || "Verification Failed. Kindly try again!", "error");
      setLoading(false);
    }
  };

  return (
    <Grid.Container justify="space-between">
      <Grid xs={15}>
        <Grid.Container justify="flex-start">
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
                onChange={(e) => {
                  setFileBuffers([]);
                  setPassword("");
                  setUserAgreementContent1("");
                  setUserAgreementContent2("");
                  setUserAgreementContent3("");
                  setLoading(false);
                  setFileData("");
                  setVerificationMode(e.target.checked);
                }}
              />
              {!verificationMode && "switch to verify mode"}
              {verificationMode && "switch to signing mode"}
            </Text>
          </Grid>
          <Grid sm={24}>
            <Text blockquote type="error">
              {agreementContent1}
            </Text>
          </Grid>
          <Grid sm={24}>
            <Input
              value={userAgreementContent1}
              onChange={(e) => setUserAgreementContent1(e.target.value)}
              placeholder="Type the above text here..."
              width="100%"
              id="typingRecorder1"
            />
          </Grid>
          <Grid sm={24}>
            <Text blockquote type="error">
              {agreementContent2}
            </Text>
          </Grid>
          <Grid sm={24}>
            <Input
              value={userAgreementContent2}
              onChange={(e) => setUserAgreementContent2(e.target.value)}
              placeholder="Type the above text here..."
              width="100%"
              id="typingRecorder2"
            />
          </Grid>
          <Grid sm={24}>
            <Text blockquote type="error">
              {agreementContent3}
            </Text>
          </Grid>
          <Grid sm={24}>
            <Input
              value={userAgreementContent3}
              onChange={(e) => setUserAgreementContent3(e.target.value)}
              placeholder="Type the above text here..."
              width="100%"
              id="typingRecorder3"
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
                  onClick={verifyTypingPattern}
                >
                  Check for verification
                </Button>
              )}
            </Grid>
          )}
          {typingScore && (
            <Grid>
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

function toArrayBuffer(buffer) {
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}

export default TypingDNA;
