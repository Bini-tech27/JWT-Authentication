const { Entity, PrimaryGeneratedColumn, Column, ManyToOne } = require('typeorm');
const User = require('./User');

@Entity()
class Blog {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    title;

    @Column()
    content;

    @ManyToOne(() => User, (user) => user.blogs)
    user;
}

module.exports = Blog;
