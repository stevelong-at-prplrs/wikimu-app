import * as React from "react";

export const MarkdownRenderer = ({cleanHTML}) => <div dangerouslySetInnerHTML={{__html: cleanHTML}} />;
