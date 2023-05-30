export interface BlogCategoryProps {
     label: string;
     images: string;
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
}

export interface BlogProps {
     _id?: string;
     createdAt?: string;
     updatedAt?: string;
     label: string;
     images: string;
     body: string;
}
