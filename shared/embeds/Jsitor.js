// @flow
import * as React from "react";
import Frame from "./components/Frame";

const URL_REGEX = new RegExp("^https://jsitor.com(/embed)?/(?<codeID>.*)$");

type Props = {|
  attrs: {|
    href: string,
    matches: string[],
  |},
|};

export default class Jsitor extends React.Component<Props> {
  static ENABLED = [URL_REGEX];
  
  render() {
    const { matches } = this.props.attrs;
    const { codeID } = matches.groups;


    return <Frame {
      ...this.props}
      src={`https://jsitor.com/embed/${codeID}`}
      title="Jsitor Embed"
    />;
  }
}
