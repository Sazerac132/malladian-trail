CREATE DATABASE IF NOT EXISTS malladrus;

CREATE TABLE tversion (
  version VARCHAR(16) NOT NULL
);

INSERT INTO tversion VALUES ('0.0.1');

CREATE TABLE tgame (
  id INT NOT NULL AUTO_INCREMENT,
  game_code INT NOT NULL UNIQUE,
  game_name VARCHAR(40) NOT NULL,
  codeword VARCHAR(24),
  PRIMARY KEY (id)
);

DELIMITER //

DROP FUNCTION IF EXISTS create_game//

CREATE FUNCTION create_game(n VARCHAR(40), cw VARCHAR(24))
RETURNS INT
READS SQL DATA

BEGIN

	SET @game_code = (SELECT FLOOR(RAND() * 900000 + 100000));

	WHILE EXISTS (SELECT game_code FROM tgame WHERE game_code = @game_code) DO
		SET @game_code = (SELECT FLOOR(RAND() * 900000 + 100000));
	END WHILE;
	
	INSERT INTO tgame (game_code, game_name, codeword) VALUES (@game_code, n, cw);
	RETURN @game_code;

END; //

DELIMITER ;