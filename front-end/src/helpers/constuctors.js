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
        this.id = id;
    }
    addToFavorites(userId) {
        this.favorites.push(userId);
    };
}