export class PostResponseDto {
    postId: string;
    postText: string;
    postType: string;
    longitude: string;
    latitude: string;
    locationName: string;
    markerImage: string;
    postUrls: string[];
    createdAt: Date;
    createdBy: string;
    textBackgroundColor: number;
    user: {
      userId: string;
      username: string;
      profileName: string;
      profileImage: string;
    };  
  }
  