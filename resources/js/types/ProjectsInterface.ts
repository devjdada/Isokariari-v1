export interface ProjectsInterface {
    id: number;
    title: string;
    description: string;
    doc: string;
    image: string;
    link: any;
    location: string;
    complete?: string;
    slug: string;
    status: number;
    type: string;
    category: string;
    clientId: number;
    post_by: any;
    edit_by: any;
    created_at: string;
    updated_at: string;
    client: Client;
    images: Image[];
    more: More[];
}

export interface Client {
    id: number;
    name: string;
    position: string;
    company: string;
    link: any;
    content: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface Image {
    id: number;
    projectId: number;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface More {
    id: number;
    projectId: number;
    doc: string;
    image: string;
    position: string;
    created_at: string;
    updated_at: string;
}
