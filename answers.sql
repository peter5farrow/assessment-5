--1
SELECT email
FROM customers
ORDER BY email;


--2
SELECT id
FROM orders
WHERE customer_id =
(
	SELECT id
	FROM customers
	WHERE fname = 'Elizabeth' AND lname = 'Crocker'
);


--3
SELECT SUM(num_cupcakes)
FROM orders
WHERE processed = false;


--4
SELECT cupcakes.name, total_orders.num_cupcakes AS total_ordered
FROM cupcakes
LEFT JOIN (
    SELECT cupcake_id, SUM(num_cupcakes) AS num_cupcakes
    FROM orders
    GROUP BY cupcake_id
) AS total_orders
ON cupcakes.id = total_orders.cupcake_id
ORDER BY cupcakes.name;


--5
SELECT customers.email, total_orders.num_cupcakes AS total_ordered
FROM customers
LEFT JOIN (
    SELECT customer_id, SUM(num_cupcakes) AS num_cupcakes
    FROM orders
    GROUP BY customer_id
) AS total_orders
ON customers.id = total_orders.customer_id
ORDER BY total_ordered DESC;


--6
SELECT fname, lname, email
FROM customers
WHERE id = (
SELECT customer_id
FROM orders
WHERE processed = true
AND cupcake_id = 5
LIMIT 1
);