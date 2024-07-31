interface Author {
    active: null | boolean;
    bio_long: string;
    bio_short: string;
    created: string;
    headshot: string;
    id: number;
    name: string;
    social_nw: {
        facebook: string;
        twitter: string;
    };
    staff: boolean;
}

interface Cover {
    caption: string;
    credit: string;
    credit_link: string;
    exif_caption: string;
    facebook: string;
    gif: string;
    large: string;
    lock: {
        article_id: number;
        article_section: string;
        created: string;
        id: number;
        last_used: string;
        owner_id: number;
        owner_name: string;
    };
    ratio: {
        facebook: { h: number; w: number };
        image: { h: number; w: number };
        large: { h: number; w: number };
        thumbnail: { h: number; w: number };
    };
    thumbnail: string;
    video: string;
}

export interface Article {
    article_permalink: string;
    authors: Author[];
    background_color: [number, number, number];
    cover: Cover;
    id: number;
    index: number;
    permalink: string;
    published: string;
    summary: string;
    title: string;
    topic: {
        created: null | string;
        id: number;
        slug: string;
        title: string;
    };
}
