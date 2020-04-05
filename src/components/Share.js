import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
} from 'react-share';

function Share() {
    const url = 'https://www.covid19app.in';
    const title = `COVID-19 Tracker for India.\nAll the necessary information is available.\nCheck it now.\nFetch all live details here with frequent updates.\n\n`;
    // const shareIma;
    const size = '1.5rem';

    return (
        <div className='share'>
            <FacebookShareButton quote={title} url={url}>
                <FacebookIcon size={size} />
            </FacebookShareButton>

            <TwitterShareButton title={title} url={url}>
                <TwitterIcon size={size} />
            </TwitterShareButton>

            <WhatsappShareButton title={title} url={url}>
                <WhatsappIcon size={size} />
            </WhatsappShareButton>

            <LinkedinShareButton title={title} url={url}>
                <LinkedinIcon size={size} />
            </LinkedinShareButton>
        </div>
    );
}

export default Share;
