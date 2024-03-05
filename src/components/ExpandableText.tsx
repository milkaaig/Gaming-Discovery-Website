import React, { useState } from "react";
interface props {
  children: string;
  maxChar?: number;
}

function ExpandableText({ children, maxChar = 100 }: props) {
  const [isExpanded, setExpanded] = useState(false);

  if (children.length <= maxChar) return <p>{children}</p>;
  const text = isExpanded ? children : children.substring(0, maxChar);

  return <p>
    {text} <button onClick={() => setExpanded(!isExpanded)}>{isExpanded? 'Less' : 'More'}</button>
  </p>;
}

export default ExpandableText;