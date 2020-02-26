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