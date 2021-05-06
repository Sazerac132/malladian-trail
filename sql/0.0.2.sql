CREATE TABLE tinventory (
  id INT NOT NULL AUTO_INCREMENT,
  game_id INT NOT NULL,
  item VARCHAR(40) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(game_id, item)
);

CREATE OR REPLACE VIEW vo_inventory AS (
  SELECT
  	ga.id,
  	ga.game_code,
  	ga.game_name,
  	inv.item,
  	inv.quantity
  FROM tgame ga
  RIGHT JOIN tinventory inv
  ON inv.game_id = ga.game_code
);

CREATE TABLE tlog (
  id INT NOT NULL AUTO_INCREMENT,
  game_id INT NOT NULL,
  char_id INT,
  char_action VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

CREATE OR REPLACE VIEW vo_log AS (
  SELECT
  	lo.id,
    ga.id AS 'game_id',
    ga.game_code,
    ga.game_name,
    ch.id AS 'char_id',
    ch.char_name,
    lo.char_action
  FROM tgame ga
  RIGHT JOIN tlog lo
  ON lo.game_id = ga.id
  LEFT JOIN tcharacter ch
  ON ch.id = lo.char_id
);

UPDATE tversion SET version = '0.0.2';
