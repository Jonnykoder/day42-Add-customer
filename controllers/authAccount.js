const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');
const {
    hash
} = require('bcrypt');
const {
    request
} = require('express');


// .env variables must be uppercase
// Create database Connection
const db = mysql2.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

// Validate Database Connection
db.connect((err) => {
    if (err) {
        console.log(`Error: ${err}`);
    } else {
        console.log(`Database Connected!`);
    }
});

// adding new customer
exports.register = (request, response) => {
    // Destructuring variables
    const {
        first_name,
        last_name,
        mobile_number,
        email,
        house_number,
        street_name,
        barangay,
        city,
        province,
        detailed_address
    } = request.body;

    //Validating if there is an existing records
    db.query(`SELECT * FROM customer WHERE email=?`,
        [email],
        (err, result) => {
            if (err) {
                console.log(err);
            } else if (result.length > 0) {
                return response.render('addingcustomer', {
                    message: 'email already exist!'
                })
            } else {
                db.query(
                    `INSERT INTO customer SET ?`, {
                        first_name,
                        last_name,
                        mobile_number,
                        email,
                        house_number,
                        street_name,
                        barangay,
                        city,
                        province,
                        detailed_address

                    }, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // response.render('list', {  message: 'Customer Added!'});
                            db.query(
                                `SELECT * FROM customer WHERE email=?`,[email],
                                (err,result) => {
                                    // console.log(result);
                                  if(err) console.log(err);
                                  else db.query(
                                      `SELECT * FROM customer`,(err,result) =>{
                                          response.render('list',{user: result})
                                      }
                                  )

                                  
                                }
                            );
                           
                        }
                    }
                );
            }
        }
    )

}



//  login function
exports.login = (request, response) => {
    //the username and password is 'admin'
    const user_name = process.env.USERNAME;
    const pass_word = process.env.PASSWORD;
    const {
        username,
        password
    } = request.body;
    if (username == user_name || password == pass_word) {
        response.status(202).render('addingcustomer');
        console.log('login success.');
    } else if (username != user_name || password != pass_word) {
        return response.status(401).render('index', {
            message: 'Invalid username or password!'
        });
    }
}


exports.update_form = (request, response) => {
    const email = request.params.email //body involves form 
    db.query(
        `SELECT * FROM customer WHERE email=?`, [email],
        (err, results) => {
            response.render('updateform', {
                title: 'Edit User',
                user: results[0]
            })
        }
    )
}


//Saving update
exports.update_save = (request, response) => {
    // Destructuring
    const {
        first_name,
        last_name,
        email
    } = request.body;
    db.query(
        `UPDATE customer SET first_name = ?, last_name = ? WHERE email=?`,
        [first_name, last_name, email],
        (err) => {
            if (err) return console.log(err.message);
            db.query(`SELECT * FROM customer; `, (err, result) => {
                response.render('list', {
                    user: result,
                    title: "List of users",
                    // alertMsg: `User with email: ${email}, has been updated.`
                })
            })
        }
    );
}

//Delete Record
exports.delete_user = (request, response) => {
    // Destructuring
    const email = request.params.email;

    db.query(
        `DELETE FROM customer WHERE email=?`,
        [email], (error) => {
            if (error) return console.log(error.message);
            db.query('SELECT * FROM customer; ',
                (err, result) => {
                    response.render('list', {
                        user: result,
                        title: "list of users",
                        alertMsg: `User with email: ${email}, has been deleted.`

                    })
                })
        }
    );
}