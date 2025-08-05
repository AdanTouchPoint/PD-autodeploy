'use client'
import Link from "next/link";
import EmailIcon from "./icons/EmailIcon";
import TweetIcon from "./icons/TweetIcon";
import CallIcon from "./icons/CallIcon";
import { useStateContext } from "../context/StateContext";
const MobileButtons = ({ mps, emailFunction, tweetFunction })=>{
  const { colors } = useStateContext();

    return(
        <div className="mobile-btns-cont">
                {
                    mps.email? (
                        <EmailIcon
                        primaryColor={colors.backgroundColor}
                        secundaryColor={colors.linkColor}
                        emailFunction={emailFunction}
                        />
                    ) :
                    (<p className="list-notweeter-text">No Email</p>)
                }

                {
                    mps.twitter && mps.clientId?.plan !== "basic" ? 
                    (
                        <TweetIcon
                        primaryColor={colors.backgroundColor}
                        secundaryColor={colors.linkColor}
                        tweetFunction={tweetFunction}
                        />
                    ):
                    (<p className="list-notweeter-text">No Tweeter</p>)
                }

                {
                    mps.phone && mps.clientId?.plan !== "basic" ?
                    (

                        <Link
                            target="_blank"
                            href={`tel:${mps.phone}`}
                        >
                            <CallIcon
                                primaryColor={colors.backgroundColor}
                                secundaryColor={colors.linkColor}

                            />
                        
                        </Link>

                    ):
                    (
                        <p className="list-notweeter-text">No Phone</p>
                    )
                }

        </div>
        
    )
}



export default MobileButtons;
