const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "abhi2002",
  database:"somnath",
});





// const category = (req, res) => {
//   pool.query("SELECT * FROM category", (err, result) => {
//     res.send(result.rows);
//   });
// };

// const product = (req, res) => {
//   pool.query("SELECT * FROM product", (err, result) => {
//     res.send(result.rows);
//   });
// };

// const single = (req, res) => {
//   const id = req.params.id;

//   pool.query("SELECT * FROM product WHERE id=$1", [id], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.send(result.rows);
//   });
// };

// const categoryproduct = (req, res) => {
//   const id = req.params.id;

//   pool.query(
//     "SELECT * FROM product WHERE categoryid=$1",
//     [id],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send(result.rows);
//     }
//   );
// };

// const cart = (req, res) => {
//   pool.query("SELECT * FROM addcart", (err, result) => {
//     res.send(result.rows);
//   });
// };

// const remove = (req, res) => {
//   const id = req.params.id;

//   pool.query("DELETE FROM addcart WHERE id=$1", [id], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.send("successful Delete");
//   });
// };

// const addcart = (req, res) => {
//   const { name, image, price, qty } = req.body;
//   pool.query(
//     "INSERT INTO addcart (name,image,price,qty) VALUES ($1,$2,$3,$4)",
//     [name, image, price, qty],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send("Add to cart");
//     }
//   );
// };

// const addorder = (req, res) => {
//   const {
//     customername,
//     email,
//     phone,
//     address,
//     productname,
//     quantity,
//     price,
//     status,
//   } = req.body;
//   pool.query(
//     "INSERT INTO orders (customername,email,phone,address,productname,quantity,price,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
//     [customername, email, phone, address, productname, quantity, price, status],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send("Order insert");
//     }
//   );
// };

// const getorder = (req, res) => {
//   pool.query("SELECT * FROM orders", (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.send(result.rows);
//   });
// };

// const deleteproduct = (req, res) => {
//   const id = req.params.id;

//   pool.query("DELETE FROM product WHERE id=$1", [id], (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.send("successful Delete");
//   });
// };

// const addproduct = (req, res) => {
//   const { name, price, description, categoryid, image } = req.body;
//   pool.query(
//     "INSERT INTO product (name,price,description,categoryid,image) VALUES($1,$2,$3,$4,$5)",
//     [name, price, description, categoryid, image],
//     (err) => {
//       if (err) {
//         throw err;
//       }
//       res.send("Record Insert");
//     }
//   );
// };

// const update = (req, res) => {
//   const { name, price, description, categoryid, image } = req.body;
//   const id = req.params.id;

//   pool.query(
//     "UPDATE product SET name=$1,price=$2,description=$3,categoryid=$4,image=$5  WHERE id=$6",
//     [name, price, description, categoryid, image, id],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send("Update Record");
//     }
//   );
// };

// const shiporder = (req, res) => {
//   const { ordernumber, shippingmethod, trackingnumber, deliverytime } =
//     req.body;

//   pool.query(
//     "INSERT INTO shiporder (ordernumber,shippingmethod,trackingnumber,deliverytime) VALUES ($1,$2,$3,$4)",
//     [ordernumber, shippingmethod, trackingnumber, deliverytime],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send("Insert Record");
//     }
//   );
// };

// const track = (req, res) => {
//   const id = req.params.id;

//   pool.query(
//     "SELECT * FROM shiporder WHERE ordernumber=$1",
//     [id],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send(result.rows);
//     }
//   );
// };

// const updateorder = (req, res) => {
//   const { status } = req.body;
//   const id = req.params.id;

//   pool.query(
//     "UPDATE orders SET status=$1  WHERE id=$2",
//     [status, id],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send("Update Record");
//     }
//   );
// };

// const gatereview = (req, res) => {
//   const { rating, review, productid, name } = req.body;
//   pool.query(
//     "INSERT INTO productrating (rating,review,productid,name) VALUES ($1,$2,$3,$4)",
//     [rating, review, productid, name],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send("Insert Record");
//     }
//   );
// };

// const takereview = (req, res) => {
//   const id = req.params.id;

//   pool.query(
//     "SELECT * FROM productrating WHERE productid=$1",
//     [id],
//     (err, result) => {
//       if (err) {
//         throw err;
//       }
//       res.send(result.rows);
//     }
//   );
// };

// const Login = (req, res) => {
//   const usernames = "abhi";
//   const passwords = "abhi1234";

//   const { username, password } = req.body;
//   if (username === usernames && password === passwords) {
//     jwt.sign(
//       { username },
//       process.env.PRIVATEKEY,
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) {
//           throw err;
//         }
//         res.send(true);
//       }
//     );
//   } else {
//     res.send("Wrong Username");
//   }
// };
// const abc = (authenticateToken,(req, res) => {
//     res.json({ message: "Protected resource accessed" });
//   });

// function authenticateToken(req, res, next) {
//   const token = req.query.token;

//   if (token == null) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// }

module.exports = {
};
