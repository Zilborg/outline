// @flow
import * as React from "react";

const URL_REGEX = new RegExp(
  "^https://gist.github.com/([a-zA-Z\\d]+)/(.*)$"
);

type Props = {|
  isSelected: boolean,
  attrs: {|
    href: string,
    matches: string[],
  |},
|};

class Gist extends React.Component<Props> {
  static ENABLED = [URL_REGEX];
  ref = React.createRef<HTMLIFrameElement>();

  get id() {
    const gistUrl = new URL(this.props.attrs.href);
    return gistUrl.pathname.split("/")[2];
  }

  componentDidMount() {
    this.updateIframeContent();
  }

  componentDidUpdate() {
    this.updateIframeContent();
  }

  updateIframeContent = () => {
    const iframe = this.ref.current;
    if (!iframe) return;
    const id = this.id;

    // $FlowFixMe
    let doc = iframe.document;
    if (iframe.contentDocument) {
      doc = iframe.contentDocument;
    } else if (iframe.contentWindow) {
      doc = iframe.contentWindow.document;
    }

    const gistLink = `https://gist.github.com/${id}.js`;
    const gistScript = `<script type="text/javascript" src="${gistLink}"></script>`;
    const styles =
      "<style>*{ font-size:12px; } body { margin: 0; } .gist .blob-wrapper.data { max-height:150px; overflow:auto; }</style>";
    const iframeHtml = `<html><head><base target="_parent">${styles}</head><body>${gistScript}</body></html>`;

    if (!doc) return;

    doc.open();
    doc.writeln(iframeHtml);
    doc.close();
  };

  render() {
    const id = this.id;

    return (
      <iframe
        className={this.props.isSelected ? "ProseMirror-selectednode" : ""}
        ref={this.ref}
        type="text/html"
        frameBorder="0"
        width="100%"
        height="200px"
        id={`gist-${id}`}
        title={`Github Gist (${id})`}
        onLoad={this.updateIframeContent}
      />
    );
  }
}

export default Gist;
