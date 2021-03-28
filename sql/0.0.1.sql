CREATE DATABASE IF NOT EXISTS malladrus;

CREATE TABLE tversion (
  version VARCHAR(16) NOT NULL
);

INSERT INTO tversion VALUES ('0.0.1');

CREATE TABLE tgame (
  id INT NOT NULL AUTO_INCREMENT,
  game_code INT NOT NULL UNIQUE,
  PRIMARY KEY (id)
);

DELIMITER //

DROP FUNCTION IF EXISTS get_unique_game_code//

CREATE FUNCTION get_unique_game_code()
RETURNS INT
READS SQL DATA

BEGIN

	SET @game_code = (SELECT FLOOR(RAND() * 900000 + 100000));

	WHILE EXISTS (SELECT game_code FROM tgame WHERE game_code = @game_code) DO
		SET @game_code = (SELECT FLOOR(RAND() * 900000 + 100000));
	END WHILE;
	
	RETURN @game_code;
END; //

DELIMITER ;
