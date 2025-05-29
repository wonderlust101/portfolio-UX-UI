type ImageOptions = {
    even?: boolean;
}

export type Image = {
    image: string;
    caption: string;
    options: ImageOptions;
};

export type Metadata = {
    header: string;
    content: string;
};