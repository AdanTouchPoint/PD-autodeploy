import Head from "next/head";
import {LinkedinShareButton,FacebookShareButton, TwitterShareButton,WhatsappShareButton } from "react-share";
import WhatsappIcon from "./icons/WhatsappIcon";
import FacebookIcon from "./icons/FacebookIcon";
import TwitterIcon from "./icons/TwitterIcon";
import LinkedinIcon from "./icons/LinkedinIcon";
import "./share.css";
import { useStateContext } from "../context/StateContext";
const Share = () => {
  const { typData, colors } = useStateContext();
  const shareUrl = typData.shareUrl?.text || 'Fill this in your dashboard';
  const shareMessage = typData.shareMessage?.text || 'Fill this in your dashboard';

  return (
    <div className="share-buttoneer" >
      <FacebookShareButton url={shareUrl} quote={shareMessage.replace(/"/g, '&quot;')} hashtag="#please fill" className="share-buttons">
      <FacebookIcon primaryColor={colors.backgroundColor} secundaryColor={colors.linkColor}  />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={shareMessage}className="share-buttons">
      <TwitterIcon primaryColor={colors.backgroundColor} secundaryColor={colors.linkColor} />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={shareMessage} className="share-buttons">
      <WhatsappIcon primaryColor={colors.backgroundColor} secundaryColor={colors.linkColor} />
      </WhatsappShareButton>
      <LinkedinShareButton url={shareUrl} title={shareMessage} className="share-buttons">
      <LinkedinIcon primaryColor={colors.backgroundColor} secundaryColor={colors.linkColor} />
      </LinkedinShareButton>
      <Head>
        {/* Script de Facebook */}
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0&appId={tu-app-id}" nonce="abcdefg" />
        {/* Script de Twitter */}
        <script async defer src="https://platform.twitter.com/widgets.js" />
        {/* Script de WhatsApp */}
        <script async defer src="https://cdn.jsdelivr.net/npm/@widgetbot/share-widget@1.1.0/whatsapp.js" />
      </Head>
    </div>
  );
};
export default Share;