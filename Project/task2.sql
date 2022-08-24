--    Даны таблицы:
--    Clients - клиенты
--    (
--    Id bigint, -- Id клиента
--    ClientName nvarchar(200) -- Наименование клиента
--    );
--    ClientContacts - контакты клиентов
--    (
--    Id bigint, -- Id контакта
--    ClientId bigint, -- Id клиента
--    ContactType nvarchar(255), -- тип контакта
--    ContactValue nvarchar(255) -- значение контакта
--    );
--    1. Написать запрос, который возвращает наименование клиентов и кол-во контактов
--    клиентов
--    2. Написать запрос, который возвращает список клиентов, у которых есть более 2 контактов


--- 1.1
SELECT c2.ClientName, d.ContactsCount
FROM (
	SELECT c.Id, count(cc.ContactValue) as ContactsCount
	FROM [Clients] c
	LEFT JOIN  ClientContacts cc on cc.ClientId = c.Id
	Group by c.Id
) d
JOIN [Clients] c2 on d.Id = c2.Id

-- 1.2
SELECT c2.ClientName
FROM (
	SELECT c.Id, count(cc.ContactValue) as ContactsCount
	FROM [Clients] c
	LEFT JOIN  ClientContacts cc on cc.ClientId = c.Id
	Group by c.Id
) d
JOIN [Clients] c2 on d.Id = c2.Id
WHERE d.ContactsCount > 2
