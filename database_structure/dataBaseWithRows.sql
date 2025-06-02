CREATE TABLE users(
    userID int NOT NULL AUTO_INCREMENT,
    userDisplayName varchar(32) NOT NULL,
    userName varchar(32) NOT NULL,
    userProfilePicture text NOT NULL,
    userRole int NOT NULL,
    discordID text NOT NULL,
    session_token text NOT NULL,
    banned int,
    PRIMARY KEY(userID)
);



CREATE TABLE chapters(
    chapterID int NOT NULL AUTO_INCREMENT,
    chapterName varchar(25) NOT NULL,
    chapterImage text not null,
    chapterLink text not null,
    PRIMARY KEY(chapterID)
);

CREATE TABLE sections(
    sectionID int NOT NULL AUTO_INCREMENT,
    sectionName varchar(25) NOT NULL,
    sectionColor varchar(6) NOT NULL,
    sectionListPriority int not null,
    chapterID int not null,
    PRIMARY KEY(sectionID),
    FOREIGN KEY(chapterID) REFERENCES chapters(chapterID)

);

CREATE TABLE strats(
    stratID int NOT NULL AUTO_INCREMENT,
    stratName text NOT NULL,
    stratDescription text NOT NULL,
    stratVideo text,
    sectionID int NOT NULL,
    chapterID int NOT NULL,
    userID int NOT NULL,
    PRIMARY KEY (stratID),
    FOREIGN KEY (chapterID) REFERENCES chapters(chapterID),
    FOREIGN KEY (sectionID) REFERENCES sections(sectionID),
    FOREIGN KEY (userID) REFERENCES users(userID)
);

INSERT INTO chapters(chapterName, chapterImage, chapterLink) values
("All Chapters", "https://i.postimg.cc/qhMStqbC/all-chapters.png", "allchapters"), 
("Chapter 1", "https://i.postimg.cc/1V8dHTZm/chapter-1.png", "chapter1"), 
("Chapter 2", "https://i.postimg.cc/SjRHkXYB/chapter-2.png", "chapter2"), 
("Chapter 3", "https://i.postimg.cc/5Y7G8JTK/no-chapter.png", "chapter3"), 
("Chapter 4", "https://i.postimg.cc/5Y7G8JTK/no-chapter.png", "chapter4");


INSERT INTO sections(sectionName, sectionColor, sectionListPriority, chapterID) values
("Global - AC", "f2ba00", 1, 1),
("Global - Ch1", "f2ba00", 1, 2),
("Global - Ch2", "f2ba00", 1, 3),
("Global - Ch3", "f2ba00", 1, 4),
("Global - Ch4", "f2ba00", 1, 5),
("Castle Town", "004266", 2, 2),
("Field of Hopes and Dreams", "d400d4", 3, 2),
("Checkerboard", "d40000", 4, 2),
("Forest", "cf004f", 5, 2),
("Castle", "858585", 6, 2),
("King", "626082", 7, 2),
("Cyber Field", "008521", 2, 3),
("Cyber City", "008383", 3, 3),
("City Heights", "5da5c2", 4, 3),
("Mansion", "f00018", 5, 3),
("Acid Tunnel", "00ed57", 6, 3),
("Queen + Giga Queen", "34a3ed", 7, 3)