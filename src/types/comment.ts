export interface Comment{ 
    id_comment: number;
    id_movies: number;
    id_account: number; 
    content: string;
    rating: number;
    created_at: Date;
    updated_at: Date;

}

export interface SumaryCommentAndStart{ 
    average_rating: number,
    total_comments: number,
}