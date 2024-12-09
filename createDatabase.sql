CREATE database quotesDatabase;

CREATE TABLE Author (
    authorID INT IDENTITY(1,1) PRIMARY KEY,
    fName VARCHAR(20),
    lName VARCHAR(20)
);

CREATE TABLE Book (
    bookID INT IDENTITY(1,1) PRIMARY KEY,
    authorID INT,
    bookName VARCHAR(60),
    yearPublished INT,
    CONSTRAINT FK_Book_Author FOREIGN KEY (authorID) REFERENCES Author(authorID)
);

CREATE TABLE Quote (
    quoteID INT IDENTITY(1,1) PRIMARY KEY,
    bookID INT,
    quote VARCHAR(1500),
    CONSTRAINT FK_Quote_Book FOREIGN KEY (bookID) REFERENCES Book(bookID)
);


INSERT INTO Authors VALUES ('Albert', 'Camus');
INSERT INTO Authors VALUES ('Franz', 'Kafka');
INSERT INTO Authors VALUES ('Fyodor', 'Dostoevsky');
INSERT INTO Authors VALUES ('Ernest', 'Hemingway');
INSERT INTO Authors VALUES ('Victor', 'Hugo');
INSERT INTO Authors VALUES ('George', 'Orwell');
INSERT INTO Authors VALUES ('Kurt', 'Vonnegut');
INSERT INTO Authors VALUES ('Osamu', 'Dazai');
INSERT INTO Authors VALUES ('Sylvia', 'Plath');
INSERT INTO Authors VALUES ('Leo', 'Tolstoy');
INSERT INTO Authors VALUES ('Carl', 'Jung');
INSERT INTO Authors VALUES ('Friedrich', 'Nietzsche');
INSERT INTO Authors VALUES ('Immanuel', 'Kant');

INSERT INTO Books VALUES ('1', 'The Stranger', '1942');
INSERT INTO Books VALUES ('1', 'The Myth of Sisyphus', '1942');
INSERT INTO Books VALUES ('1', 'The Plague', '1947');
INSERT INTO Books VALUES ('1', 'The Rebel', '1956');

INSERT INTO Books VALUES ('2', 'The Metamorphosis', '1915');
INSERT INTO Books VALUES ('2', 'The Letter to His Father', '1919');
INSERT INTO Books VALUES ('2', 'Franz Kafka''s Diraries', '1915');
INSERT INTO Books VALUES ('2', 'Letter to Max Brod', '1917');

INSERT INTO Books VALUES ('9', 'The Bell Jar', '1963');
INSERT INTO Books VALUES ('9', 'The Collected Poems', '1981');

INSERT INTO quotes VALUES ('10', 'I usually solve problems by letting them devour me.');
INSERT INTO quotes VALUES ('5', 'How about if I sleep a little bit longer and forget all this nonsense');
INSERT INTO quotes VALUES ('1', 'Should I kill myself, or have a cup of coffee?');
INSERT INTO quotes VALUES ('2', 'This universe henceforth without a master seems to him neither sterile nor futile. Each atom of that stone, each mineral flake of that night filled mountain, in itself forms a world. The struggle itself toward the heights is enough to fill a man''s heart. One must imagine Sisyphus happy.');
INSERT INTO quotes VALUES ('2', 'What is called a reason for living is also an excellent reason for dying.');
INSERT INTO quotes VALUES ('8', 'I saw myself sitting in the crotch of this fig tree, starving to death, just because I couldn''t make up my mind which of the figs I would choose. I wanted each and every one of them, but choosing one meant losing all the rest, and, as I sat there, unable to decide, the figs began to wrinkle and go black, and, one by one, they plopped to the ground at my feet.');


