export interface Page {
    id: number;
    page_title: string;
    page_slug: string;
    page_contents: string;
    page_image?: string;
    page_more?: string;
}

export interface MorePage {
    doc: string;
    image: string;
    position: string;
    id: number;
}

export interface Images {
    id: number;
    image: string;
    position: string;
}
