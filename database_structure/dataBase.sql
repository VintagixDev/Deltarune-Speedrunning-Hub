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



CREATE TABLE strats(
	stratID int NOT NULL AUTO_INCREMENT,
    stratName text NOT NULL,
    stratDescription text NOT NULL,
    stratVideo text,
    sectionID text NOT NULL,
    chapterID int NOT NULL,
    userID int NOT NULL,
    PRIMARY KEY (stratID),
	FOREIGN KEY (chapterID) REFERENCES chapter(chapterID),
    FOREIGN KEY (sectionID) REFERENCES sections(sectionID),
    FOREIGN KEY (userID) REFERENCES users(userID)
);

CREATE TABLE sections(
	sectionID int NOT NULL AUTO_INCREMENT,
    sectionName varchar(25) NOT NULL,
    sectionColor varchar(6) NOT NULL,
    sectionListPriority int not null,
    chapterID int not null,
    PRIMARY KEY(sectionID),
    FOREIGN KEY(chapterID) REFERENCES chapter(chapterID)

);
