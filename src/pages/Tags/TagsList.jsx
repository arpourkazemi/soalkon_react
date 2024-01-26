import React from "react";
import { Link } from "react-router-dom";

const TagsList = ({ tag }) => {
  return (
    <div className="tag">
      <Link to={`/questionsoftag/${tag.name}`}>
        <h5>{tag.name}</h5>
      </Link>
      <p> این تگ در تاریخ فلان توسط فلانی ساخته شده است</p>
    </div>
  );
};

export default TagsList;
