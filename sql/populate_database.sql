INSERT INTO Users (userId, username, password, name, surnames)
    VALUES
	(1, 'labetica31','pbkdf2:sha256:150000$lr3IDhwA$39ca15dd006093fcb9dbc1755ceb5e9d2db7f2fbaf65243e1389259b46ec3245', 'Blanca', 'Gonzalez Daria'),
	(2, 'sevillano78','pbkdf2:sha256:150000$UEnnhg0e$07d97fff772639f8b8c42a7d768ef66ca7380bcaba90a899ca435e00dff44818', 'Marco', 'Gracian Sainz');
-- The passwords are the same as the username

INSERT INTO Lists (listId, name, userId)
    VALUES
	(1, "Tuesday 27th of october 2010s list", 1),
	(2, "My List for today", 2);

INSERT INTO Items (itemId, name, quantity, purchased, listId)
    VALUES
	(1, 'Tomates', 2, true, 1),
	(2, 'Pepino', 1, true, 1),
	(3, 'Azucar', 2, true, 1),
	(4, 'Yogur', 3, true, 1),
	(5, 'Leche', 2, true, 1),
	(6, 'Magdalenas', 1, true, 1),
	(7, 'Lechuga', 2, true, 2),
	(8, 'Tortitas', 1, true, 2),
	(9, 'Carne picada', 2, true, 2),
	(10, 'Mayonesa', 1, true, 2),
	(11, 'Queso', 2, true, 2),
	(12, 'Salsa picante', 1, false, 2);