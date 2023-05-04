export interface RegisterProps {
     email: string;
     password: string;
     isAdmin: boolean;
     firstName: string;
     lastName: string;
     contactInfo: ContactProps;
     aboutInfo: AboutProps;
}

export interface LoginProps {
     email: string;
     password: string;
}

export interface ContactProps {
     address: string;
     phone: string;
     email: string;
     instaLink?: string;
     fbLink?: string;
}

export interface AboutProps {
     aboutText: string;
     logo: string;
     slogan?: string;
     termsCondition: string;
     privacyPolicy: string;
     support: string;
}