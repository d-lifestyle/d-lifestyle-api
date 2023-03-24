export interface MenuProps {
     _id?: string;
     createdAt?: string;
     updateAt?: string;
     title: string;
     links: LinkProps[];
}

export interface LinkProps {
     name: string;
     path: string;
}
