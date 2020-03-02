export class User {
    constructor({
                    name = "",
                    email = "",
                    password = "",
                    avatar = "",
                    subscribes = [],
                    id = null
                }={})
    {
        this.name = name;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.subscribes = [...subscribes];
        this.id = id;
    }
    addSubscription(subId) {
        this.subscribes.push(subId);
    };
}

export class Book {
    constructor({
                    name = "",
                    description = "",
                    author = "",
                    authorId = null,
                    bookCover = '',
                    publicationDate = '',
                    updateDate = '',
                    favorites = [],
                    rating = [],
                    id = null
                }={})
    {
        this.name = name.trim();
        this.description = description.trim();
        this.author = author;
        this.authorId = authorId;
        this.bookCover = bookCover;
        this.publicationDate = publicationDate.trim();
        this.updateDate = updateDate.trim();
        this.favorites = [...favorites];
        this.rating = [...rating];
        this.id = id;
    }
    addToFavorites(userId) {
        this.favorites.push(userId);
    };
    addRate(data) {
        this.rating.push(data)
    }
}

export class Comment {
    constructor({
                    bookId = null,
                    commentText = '',
                    commentAuthorName = '',
                    commentAuthorId = null,
                    commentAuthorAvatar = '',
                    publicationDate = '',
                    likes = []
                }={})
    {
        this.bookId = bookId;
        this.commentText = commentText.trim();
        this.commentAuthorName = commentAuthorName.trim();
        this.commentAuthorId = commentAuthorId;
        this.commentAuthorAvatar = commentAuthorAvatar;
        this.publicationDate = publicationDate.trim();
        this.likes = likes;
    }
    addLike(data) {
        this.likes.push(data)
    }
}