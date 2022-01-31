export interface MediaPathProps {
    path: string;
}

export class MediaPath {
    private constructor(
        readonly path: string,
    ) {
        this.path = path;
    }

    static create(props: MediaPathProps): MediaPath {
        return new MediaPath(props.path);
    }
}
