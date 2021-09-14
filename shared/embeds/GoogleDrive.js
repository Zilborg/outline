// @flow
import * as React from "react";
import Frame from "./components/Frame";
import Image from "./components/Image";

const URL_REGEX = new RegExp("^https?://drive.google.com/drive/folders/(.*)$");

type Props = {|
  attrs: {|
    href: string,
    matches: string[],
  |},
|};

export default class GoogleDrive extends React.Component<Props> {
  static ENABLED = [URL_REGEX];

  render() {
    return (
      <Frame
        {...this.props}
        src={this.props.attrs.href
          .replace("drive/folders/", "/embeddedfolderview?id=")
          .replace("?usp=sharing","#grid")}
        icon={
          <Image
            src="/images/google-drive.png"
            alt="Google Drive Icon"
            width={16}
            height={16}
          />
        }
        title="Google Drive"
        canonicalUrl={this.props.attrs.href}
        border
      />
    );
  }
}
