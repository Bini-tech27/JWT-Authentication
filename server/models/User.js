const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    username;

    @Column()
    email;

    @Column()
    password;
}

module.exports = User;
