exports.seed = function (knex, Promise) {
  return knex("accounts")
    .truncate()
    .then(function () {
      return knex("accounts").insert([
        { name: "account-01", budget: 4000.0 },
        { name: "account-02", budget: 206.75 },
        { name: "account-03", budget: 6789.0 },
        { name: "account-04", budget: 199.99 },
        { name: "account-05", budget: 22.34 },
        { name: "account-06", budget: 300.0 },
        { name: "account-07", budget: 7000.0 },
        { name: "account-08", budget: 78800.0 },
        { name: "account-09", budget: 3030.3 },
        { name: "account-10", budget: 19.56 },
        { name: "account-11", budget: 19.91 },
        { name: "account-12", budget: 7080.0 },
        { name: "account-13", budget: 1234.0 },
      ]);
    });
};

const express = require("express");
const db = require("../dbConfig");
// const { insert, where, del } = require("../dbConfig");
const router = express.Router();

// GET DATA
router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => res.status(200).json({ data: accounts }))
    .catch((err) => console.log(err));
});

//GET DATA BY ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where("id", id)
    .first()
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((err) => console.log("account with provided id does not exist"));
});

router.post("/", (req, res) => {
  const accountData = req.body;
  db("accounts")
    .insert(accountData)
    .then(res.status(201).json({ data: accountData }))
    .catch((err) => console.log("adding failed"));
});
//insert using knex
//db('users').insert({ account: '20', budget: 20000 });

//UPDATE REQUEST
router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then((count) => {
      if (count) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Could not update" });
    });
});
//update using knex
//db('users').where({ id: 20 })
//.update({account: '20', budget: 2503.12 });

//DELETE REQUEST
router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      res.status(200).json({ message: `${count} record(s) deleted` });
    })
    .catch(() => {
      res.status(500).json({ message: "Could not remove" });
    });
});

module.exports = router;
