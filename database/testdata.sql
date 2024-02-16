USE ffvgs;
INSERT INTO ffvgs.Programms
VALUES (
        1,
        "Fischen 1",
        "Das ist fischen 1"
    ),
    (
        2,
        "Fischen 2",
        "Das ist fischen 2"
    ),
    (
        3,
        "Fischen 3",
        "Das ist fischen 3"
    ),
    (
        4,
        "Fischen 4",
        "Das ist fischen 4"
    ),
    (
        5,
        "Fischen 5",
        "Das ist fischen 5"
    ),
    (
        6,
        "Fischen 6",
        "Das ist fischen 6"
    ),
    (
        7,
        "Fischen 7",
        "Das ist fischen 7"
    );

INSERT INTO Dates (date, programm_id)
VALUES (
        "2021-01-01",
        1
    ),
    (
        "2021-01-02",
        1
    ),
    (
        "2021-01-03",
        2
    ),
    (
        "2021-01-04",
        2
    ),
    (
        "2021-01-05",
        3
    ),
    (
        "2021-01-06",
        3
    ),
    (
        "2021-01-07",
        4
    ),
    (
        "2021-01-08",
        4
    ),
    (
        "2021-01-09",
        4
    ),
    (
        "2021-01-10",
        5
    ),
    (
        "2021-01-11",
        6
    ),
    (
        "2021-01-12",
        7
    ),
    (
        "2021-01-13",
        7
    );

INSERT INTO ffvgs.users (username, password)
VALUES ('admin', 'admin');