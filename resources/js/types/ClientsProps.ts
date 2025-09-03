export interface ClientsProps {
    id: number;
    name: string;
    position?: string;
    company: string;
    link: any;
    content: string;
    image: string;
    created_at: string;
    updated_at: string;
    projects: Project[];
}

export interface Project {
    id: number;
    title: string;
    description: string;
    doc: string;
    image: string;
    link: any;
    location: string;
    complete: string;
    slug: string;
    status: number;
    type: string;
    category: string;
    clientId: number;
    post_by: string;
    edit_by: string;
    created_at: string;
    updated_at: string;
}
