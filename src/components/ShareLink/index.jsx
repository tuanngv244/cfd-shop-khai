import {
  TwitterShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  PinterestShareButton,
} from "react-share";

const ShareLink = ({ path, type, title, children }) => {
  switch (type) {
    case "twitter":
      return (
        <TwitterShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </TwitterShareButton>
      );
    case "instagram":
      return (
        <InstapaperShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </InstapaperShareButton>
      );
    case "facebook":
      return (
        <FacebookShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </FacebookShareButton>
      );
    case "pinterest":
      return (
        <PinterestShareButton url={path}>
          <a href="#" className="social-icon" title={title} target="_blank">
            {children}
          </a>
        </PinterestShareButton>
      );

    default:
      break;
  }
};

export default ShareLink;
