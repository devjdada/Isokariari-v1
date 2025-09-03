export interface BlogProps {
    id: number;
    title: string;
    slug: string;
    content: string;
    description: string;
    status: number;
    image: string;
    author: string;
    category: string;
    post_by: string;
    edit_by: string;
    created_at: string;
    updated_at: string;
    images: Image[];
}

export interface Image {
    id: number;
    projectId: number;
    image: string;
    created_at: string;
    updated_at: string;
}
