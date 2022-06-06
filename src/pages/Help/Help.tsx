// React Imports
import React from "react";

// Component imports
import Header from "../../components/UI/Header/Header";

// Styles & Icon imports
import styles from "./Help.module.css";
import ArticleIcon from "@mui/icons-material/Article";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HelpIcon from "@mui/icons-material/Help";

const Help = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles["help-wrapper"]}>
      <Header className={styles["help-header"]} backLink="/" content="Help" />
      <div className={styles["help-content"]}>
        <h2>How can we help you?</h2>
        <div
          className={styles["help-card"]}
          onClick={() =>
            openInNewTab(
              "https://github.com/PeinZero/Parkour/blob/main/README.md"
            )
          }
        >
          <ArticleIcon />
          <h3>Read Documentation</h3>
        </div>

        <div className={styles["help-card"]}>
          <SupportAgentIcon />
          <h3>Customer Support</h3>
        </div>

        <div
          className={styles["help-card"]}
          onClick={() =>
            openInNewTab(
              "https://github.com/PeinZero/Parkour/blob/main/FAQs.md"
            )
          }
        >
          <HelpIcon />
          <h3>FAQs</h3>
        </div>
      </div>

      <div className={styles["help-footer"]}>
        <h3>Contact Us</h3>
        <div className={styles["email"]}>
          <EmailIcon />
          <p>abdullaharaheel@gmail.com</p>
        </div>
        <div className={styles["phone"]}>
          <PhoneIcon />
          <p>03172114418</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
