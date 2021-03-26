import "./footer.css";
import { Grid, Link, Text } from "@geist-ui/react";
import { CustomUnderline } from "./customUnderline";

function Footer() {
  return (
    <Grid.Container justify="space-between" gap={3} className="site-footer">
      <Grid sm={24} md={12}>
        <Grid.Container>
          <Grid xs={24}>
            <Text h4>ABOUT ME</Text>
          </Grid>
          <Grid xs={24} md={16}>
            <Text span className="about-me ">
              A friendly neighborhood developer. I am a third year Computer
              Science Engineer from India. Previous experience in{" "}
              <CustomUnderline text="Full Stack Dev" /> (Primarily React, Node,
              GoLang, Python), <CustomUnderline text="DevOps Ninja 🥷" />,
              Cyber-security, NLP, and other misc. stuff
            </Text>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={24} md={6}>
        <Grid.Container justify="space-around">
          <Grid xs={24}>
            <Text h4 className="contact-me">
              CONTACT ME
            </Text>
          </Grid>
          <Grid xs={12} md={12}>
            <Text span>
              <Link
                className="linker"
                icon
                block
                href="https://github.com/sauravhiremath"
                rel="noreferrer"
                target="_blank"
              >
                Github
              </Link>
              <br />
              <Link
                className="linker"
                icon
                block
                href="https://www.linkedin.com/in/sauravmh/"
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </Link>
              <br />
              <Link
                className="linker"
                icon
                block
                href="https://twitter.com/sauravmh"
                rel="noreferrer"
                target="_blank"
              >
                Twitter
              </Link>
            </Text>
          </Grid>
          <Grid xs={12} md={12}>
            <Text span>
              <Link
                className="linker"
                icon
                block
                href="https://sauravmh.com/"
                rel="noreferrer"
                target="_blank"
              >
                Portfolio
              </Link>
              <br />
              <Link
                className="linker"
                icon
                block
                href="http://blog.sauravmh.com/"
                rel="noreferrer"
                target="_blank"
              >
                My Blog
              </Link>
              <br />
              <Link
                className="linker"
                icon
                block
                href="https://medium.com/@sauravmh"
                rel="noreferrer"
                target="_blank"
              >
                Medium
              </Link>
              <br />
              <Link
                className="linker"
                icon
                block
                href="http://dev.to/sauravmh"
                rel="noreferrer"
                target="_blank"
              >
                Dev.to
              </Link>
            </Text>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs={24}>
        <Grid.Container justify="center">
          <Grid>
            <Link
              icon
              block
              href="https://github.com/sauravhiremath/embed-and-share"
              rel="noreferrer"
              target="_blank"
            >
              © github/embed-and-share
            </Link>
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
}

export default Footer;
