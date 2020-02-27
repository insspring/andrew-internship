export class User {
    constructor(name,email,password,avatar,subs,id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
        this.subscribes = subs ? [...subs] : [];
        this.id = id;
    }
    addSubscription(subId) {
        this.subscribes.push(subId);
    };
}

export class Book {
    constructor(name,description,author,authorId,bookCover,publicationDate,updateDate,users,id) {
        this.name = name;
        this.description = description;
        this.author = author;
        this.authorId = authorId;
        this.bookCover = bookCover;
        this.publicationDate = publicationDate;
        this.updateDate = updateDate ? updateDate : "";
        this.favorites = users ? [...users] : [];
        this.id = id;
    }
    addToFavorites(userId) {
        this.favorites.push(userId);
    };
}