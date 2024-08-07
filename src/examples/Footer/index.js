/**
=========================================================
* 9Trip Admin React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// 9Trip Admin React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

// 9Trip Admin React base styles
import typography from "assets/theme/base/typography";

// Custom styles for the Footer

function Footer({ company }) {
  const { href } = company;
  const { size } = typography;

  

  return (
    <SuiBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <SuiBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy;
        <Link href={href} target="_blank">
          <SuiTypography variant="button" fontWeight="medium">
          </SuiTypography>
        </Link>
        Coded By HungDv.
      </SuiBox>
      {/* <SuiBox component="ul" customClass={classes.footer_list}>
        {renderLinks()}
      </SuiBox> */}
    </SuiBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://bit.ly/3fKQZaL", name: "Creative Tim" },
  links: [
    { href: "https://appseed.us/product/node-js-react-soft-dashboard", name: "Product" },
    { href: "https://appseed.us/support", name: "Support" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
