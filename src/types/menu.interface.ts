export interface MenuProps {
     _id?: string;
     createdAt?: string;
     updateAt?: string;
     path: string;
     title: string;
     links?: LinkProps[];
}

export interface LinkProps {
     name: string;
     path: string;
}
