import * as React from 'react';

interface EmailTemplateProps {
    fullName: string;
    verificationCode: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({fullName, verificationCode}) => 
    (
        <div>
            <h1>Welcome, {fullName}!</h1>
            <p> Your ToolX verification code is: </p>
            <p className='text-2xl'>{verificationCode}</p>
        </div>
    );
