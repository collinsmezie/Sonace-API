export declare class PostsService {
    private readonly bucketName;
    uploadPost(file: Express.Multer.File): Promise<string>;
}
