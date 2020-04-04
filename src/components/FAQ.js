import React from 'react'

function FAQ() {
    return (
        <div className='faq'>
            <div className='que'>Why covid19app.in has more positive count than MoH or any other sources?</div>
            <div className='ans'>
                MoHFW updates the data at a scheduled time. However, our sources update data based on state press bulletins, official handles and reliable news channels which could be more recent.
            </div>
            <p>For any query regarding this site contact us at:</p>
            <p><a href="mailto:support@covid19app.in?subject=Query">support@covid19app.in</a></p>
        </div>
    )
}

export default FAQ
