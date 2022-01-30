import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import React from "react";

const AboutIconLink = () => {
  return (
    <div className="about-link">
      <Link to={"/about"}>
        <FaQuestionCircle size="30" />
      </Link>
    </div>
  );
};

export default AboutIconLink;
