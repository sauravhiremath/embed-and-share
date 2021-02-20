import { Grid, Link } from "@geist-ui/react";

function Footer() {
  return (
    <Grid.Container justify="center">
      <Grid sm={24} justify="center">
        <Link
          color
          block
          href="https://github.com/sauravhiremath/embed-and-share"
          icon
        >
          © https://github.com/sauravhiremath/embed-and-share
        </Link>
      </Grid>
    </Grid.Container>
  );
}

export default Footer;
