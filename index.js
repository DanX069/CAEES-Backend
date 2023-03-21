const AWS = require('aws-sdk');
const docClient =  new AWS.DynamoDB.DocumentClient({region : 'ap-south-1'});

exports.handler = (event, context, callback) => {
    // TODO implement
    console.log(event);
    const method = event.requestContext.httpMethod;
    const queryType = event.queryStringParameters.queryType;
    console.log(method);
    console.log(queryType);
    console.log('working!!!');
    if(method == "POST" && queryType == "addAdmin") addAdmin(event, callback);
        
    if(method == "POST" && queryType == "deleteAdmin") deleteAdmin(event, callback);
    
    if(method == "POST" && queryType == "getAdmin") getAdmin(event, callback);
    
    //if(method == "POST" && queryType == "updateAdmin") updateAdmin(event, callback);
    
    
        
    if(method == "POST" && queryType == "addUser") addUser(event, callback);
    
    if(method == "POST" && queryType == "deleteUser") deleteUser(event, callback);
    
    if(method == "POST" && queryType == "updateUser") updateUser(event, callback);
    
    if(method == "POST" && queryType == "getUser") getUser(event, callback);
    
    
    
    
    if(method == "POST" && queryType == "addExit") addExit(event, callback);
    
    if(method == "POST" && queryType == "deleteExit") deleteExit(event, callback);
    
    // if(method == "POST" && queryType == "updateUser") updateUser(event, callback);
    
    if(method == "POST" && queryType == "getExit") getExit(event, callback);
    
    
    
    if (method == "POST" && queryType == "addMovement") addMovement(event, callback);

    // if(method == "DELETE" && queryType == "deletemovementData") deletemovement(event, callback);
    
    // if(method == "POST" && queryType == "updatemovementData") updatemovement(event, callback);
    
    if(method == "POST" && queryType == "getMovement") getMovement(event, callback);

        
    //callback(null, {"statusCode":200, "body":JSON.stringify("Hello there!!!", null, 2)});

    
};

const addAdmin = (event, callback) => {

    let body = JSON.parse(event.body);
    console.log("body recieved: ", body);
    
   
    const params = {
        TableName: "smartex-admin-table",
        Item: {
            "gaurdID": body.gaurdID,
            "name": body.name
        }
    };

    console.log("trying to add a admin to table");
    docClient.put(params, function(err, data) {
        console.log("inside put");
        if (err) {
            console.error("Unable to add admin data. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, JSON.stringify(err, null, 2));
        }
        else {
            console.log("admin data added:", JSON.stringify(params.Item, null, 2));
            callback(null, {"statusCode":200, "body":JSON.stringify(params.Item, null, 2)});

        }
    });
};

const deleteAdmin = (event, callback) => {
    const body = JSON.parse(event.body);
    console.log("body is:", body);

    const params1 = {
        TableName: "smartex-admin-table",
        Key: {
            "gaurdID": body.ID,
            //"name": body.name
        }
    };

    console.log("deleting a row in admin data...");
    docClient.delete(params1, function(err, data) {
        if (err) {
            console.error("Unable to delete row in admin data. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, JSON.stringify(err, null, 2));
        }
        else {
            const queryType = event.queryStringParameters.queryType;
            console.log("Deleted :", JSON.stringify(data, null, 2));
            callback(null, {"statusCode":200, "body":JSON.stringify(data, null, 2)});

        }
    });
};

function getAdmin(event, callback){
    const body = JSON.parse(event.body);
    console.log("body recieved: ", body);

    
    let params = {
        TableName: "smartex-admin-table",
        Key: {
            "gaurdID": body.gaurdID,
            //"name": body.name
        }
    };
    
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, JSON.stringify(err, null, 2));
        }
        else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
             callback(null, {"statusCode":200, "body":JSON.stringify(data.Item, null, 2)});
        }
    });   
}
/*
function updateAdmin(event, callback) {
    
    const body = JSON.parse(event.body);
    console.log("body is:", body);
    let id = body.ID;
    //let name = body.name;
    console.log("id is: ", id);
    let params = {
        TableName: 'adminData',
        Key: {
            "ID": id,
            //"name": name
        },
        UpdateExpression: "set name = :name",
        ExpressionAttributeValues: {
            ":name": body.name
        },
        ReturnValues: "UPDATED_NEW"
    };
    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
             callback(null, {"statusCode":200, "body":JSON.stringify(data, null, 2)});
        }
    });
}
*/
const addUser = (event, callback) => {

    let body = JSON.parse(event.body);
    console.log("body recieved: ", body);
    
   
    const params = {
        TableName: "smartex-user-table",
        Item: {
            "rollno": body.rollno,
            "name": body.name,
            "address" : body.address,
            "degree": body.degree,
            "department" :body.department,
            "gender" : body.gender,
            "hallno" : body.hallno,
            "roomno" : body.roomno,
            "email": body.email
        }
    };

    console.log("trying to add a User to table");
    docClient.put(params, function(err, data) {
        console.log("inside put");
        if (err) {
            console.error("Unable to add User data. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, JSON.stringify(err, null, 2));
        }
        else {
            console.log("User data added:", JSON.stringify(params.Item, null, 2));
             callback(null, {"statusCode":200, "body":JSON.stringify(params.Item, null, 2)});

        }
    });
};

const deleteUser = (event, callback) => {
    const body = JSON.parse(event.body);
    console.log("body is:", body);

    const params1 = {
        TableName: "smartex-user-table",
        Key: {
            "rollno": body.rollno,
            //"email": body.email
        }
    };

    console.log("deleting a row in user data...");
    docClient.delete(params1, function(err, data) {
        if (err) {
            console.error("Unable to delete row in user data. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, JSON.stringify(err, null, 2));
        }
        else {
            const queryType = event.queryStringParameters.queryType;
            console.log("Deleted :", JSON.stringify(data, null, 2));
             callback(null, {"statusCode":200, "body":JSON.stringify(data, null, 2)});

        }
    });
};

function updateUser(event, callback) {
    /*
        params: {queryType = "updateUser"}
        body: {rollno, name, , address, degree, department, gender, hallno, roomno, email}
    */
    const body = JSON.parse(event.body);
    console.log("body is:", body);

    let rollno = body.rollno;
    let email = body.email;
    console.log("roll is: ", rollno, "email is: ", email);

    let params = {
        TableName: 'smartex-user-table',
        Key: {
            "rollno": rollno,
            // "email": email
        },
        UpdateExpression: "set address = :address, degree = :degree, department= :department, gender = :gender, hallno= :hallno, roomno= :roomno",
        ExpressionAttributeValues: {
            ":address": body.address,
            ":degree": body.degree,
            ":department": body.department,
            ":gender": body.gender,
            ":hallno": body.hallno,
            ":roomno": body.roomno,
        },
        ReturnValues: "UPDATED_NEW"
    };

    console.log("Updating the item...");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        }
        else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
             callback(null, {"statusCode":200, "body":JSON.stringify(data, null, 2)});
        }
    });
}


function getUser(event, callback) {
    console.log("Getting the user.....");
    /*
        params: {queryType = "getUser", rollno}
    */
    const body = JSON.parse(event.body);
    console.log(body);
    let params = {
        TableName: 'smartex-user-table',
        Key: {
            "rollno": body.rollno,
            //"email": body.email
        }
    };


    docClient.get(params, function(error, response) {
        if (error) {
            console.log('Unable to fetch data', JSON.stringify(error, null, 2));
            callback(null, JSON.stringify(error, null, 2));
        }
        else {
            console.log('fetched the user', JSON.stringify(response, null, 2));
            // console.log(response.Item);
            callback(null, {"statusCode":200, 
            "headers":{
                "Access-Control-Allow-Origin":"*",
                //"Access-Control-Allow-Credentials":true,
            },"body":JSON.stringify(response.Item, null, 2)});
        }
    });
}

const addExit = async (event, callback) => {
    console.log("Getting the user.....");
    /*
        params: {queryType = "getUser", rollno}
    */
    const body = JSON.parse(event.body);
    console.log(body);
    let params = {
        TableName: 'smartex-user-table',
        Key: {
            "rollno": body.rollno,
            //"email": body.email
        }
    };

    let student =  await docClient.get(params).promise();
    student = student.Item;
    // await docClient.get(params, function(error, response) {
    //     if (error) {
    //         console.log('Unable to fetch data', JSON.stringify(error, null, 2));
    //         callback(null, JSON.stringify(error, null, 2));
    //     }
    //     else {
    //         console.log('fetched the user', JSON.stringify(response, null, 2));
    //         console.log(response.Item);
    //         student = response.Item;
    //         console.log(student);
    //         // callback(null, {"statusCode":200, "body":JSON.stringify(response.Item, null, 2)});
    //     }
    // });
    
    
    
    
    console.log(student);
    let studentParams = {
        TableName: 'smartex-exit-table',
        Item: {
            "rollno": body.rollno,
            "name": student.name,
            "address" : student.address,
            "hallno" : student.hallno,
            "roomno" : student.roomno,
            "email": student.email,
            "placeOfVisit" : body.placeOfVisit ? body.placeOfVisit : "IITK Main Gate",
            "date":body.date,
            "time":body.time,
            "gaurdID":body.gaurdID
        }
    };

    console.log("trying to add a User to table");
    docClient.put(studentParams, function(err, data) {
        console.log("inside put");
        if (err) {
            console.error("Unable to add exit User data. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, JSON.stringify(err, null, 2));
        }
        else {
            console.log("User exit data added:", JSON.stringify(studentParams.Item, null, 2));
             callback(null, {"statusCode":200, "body":JSON.stringify(studentParams.Item, null, 2)});

        }
    });
    
}


function getExit(event, callback) {
    console.log("Getting the Exit.....");
    /*
        params: {queryType = "getExit", rollno}
    */
    const body = JSON.parse(event.body);
    console.log(body);
    let params = {
        TableName: 'smartex-exit-table',
        Key: {
            "rollno": body.rollno,
            //"email": body.email
        }
    };


    docClient.get(params, function(error, response) {
        if (error) {
            console.log('Unable to fetch data', JSON.stringify(error, null, 2));
            callback(null, JSON.stringify(error, null, 2));
        }
        else {
            console.log('fetched the exit-user', JSON.stringify(response, null, 2));
            callback(null, {"statusCode":200, "body":JSON.stringify(response.Item, null, 2)});
        }
    });
}

const deleteExit = (event, callback) => {
    const body = JSON.parse(event.body);
    console.log("body is:", body);

    const params1 = {
        TableName: "smartex-exit-table",
        Key: {
            "rollno": body.rollno,
            //"email": body.email
        }
    };

    console.log("deleting a row in user data...");
    docClient.delete(params1, function(err, data) {
        if (err) {
            console.error("Unable to delete row in user data. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, JSON.stringify(err, null, 2));
        }
        else {
            //const queryType = event.queryStringParameters.queryType;
            console.log("Deleted :", JSON.stringify(data, null, 2));
             callback(null, {"statusCode":200, "body":JSON.stringify(data, null, 2)});

        }
    });
};


const addMovement = async (event, callback) => {
    console.log("Getting the user.....");
    /*
        params: {queryType = "getUser", rollno}
    */
    const body = JSON.parse(event.body);
    console.log(body);
    let params = {
        TableName: 'smartex-exit-table',
        Key: {
            "rollno": body.rollno,
            //"email": body.email
        }
    };

    let student =  await docClient.get(params).promise();
    student = student.Item;
    
    const params1 = {
        TableName: "smartex-exit-table",
        Key: {
            "rollno": body.rollno,
            //"email": body.email
        }
    };

    console.log("deleting a row in user data...");
    await docClient.delete(params1, function(err, data) {
        if (err) {
            console.error("Unable to delete row in user data. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, JSON.stringify(err, null, 2));
        }
        else {
            //const queryType = event.queryStringParameters.queryType;
            console.log("Deleted :", JSON.stringify(data, null, 2));
             callback(null, {"statusCode":200, "body":JSON.stringify(data, null, 2)});

        }
    });
    
    
    console.log(student);
    let studentParams = {
        TableName: 'smartex-movement-table',
        Item: {
            "rollno": body.rollno,
            "time":student.date+"_"+student.time,
            "name": student.name,
            "address" : student.address,
            "hallno" : student.hallno,
            "roomno" : student.roomno,
            "email": student.email,
            "placeOfVisit" : student.placeOfVisit ? body.placeOfVisit : "IITK Main Gate",
            "exitDate":student.date,
            "exitTime":student.time,
            "exitGaurdID":student.gaurdID,
            "entryDate":body.date,
            "entryTime":body.time,
            "entryGaurdID":body.gaurdID
        }
    };

    console.log("trying to add a User to table");
    docClient.put(studentParams, function(err, data) {
        console.log("inside put");
        if (err) {
            console.error("Unable to add movemnt of  User. Error JSON:", JSON.stringify(err, null, 2));
            callback(null, JSON.stringify(err, null, 2));
        }
        else {
            console.log("movemnt of  User added:", JSON.stringify(studentParams.Item, null, 2));
             callback(null, {"statusCode":200, "body":JSON.stringify(studentParams.Item, null, 2)});

        }
    });
    
}


function getMovement(event, callback) {
    console.log("Getting the Exit.....");
    /*
        params: {queryType = "getExit", rollno}
    */
    const body = JSON.parse(event.body);
    console.log(body);
    let params = {
        TableName: 'smartex-movement-table',
        Key: {
            "rollno": body.rollno,
            "time": body.date+"_"+body.time
        }
    };


    docClient.get(params, function(error, response) {
        if (error) {
            console.log('Unable to fetch data', JSON.stringify(error, null, 2));
            callback(null, JSON.stringify(error, null, 2));
        }
        else {
            console.log('fetched the exit-user', JSON.stringify(response, null, 2));
            callback(null, {"statusCode":200, "body":JSON.stringify(response.Item, null, 2)});
        }
    });
}































// const addmovementData = (event, callback) => {
//     console.log("Getting the user.....");
//     /*
//         params: {queryType = "getUser", rollno, email}
//     */
//     const body = JSON.parse(event.body);
//     console.log(body);
//     let params = {
//         TableName: 'userData',
//         Key: {
//             "rollno": body.rollno,
//             "name": body.name,
//             }
//     };


//     docClient.get(params, function(error, response) {
//         if (error) {
//             console.log('Unable to fetch data', JSON.stringify(error, null, 2));
//             callback(null, JSON.stringify(error, null, 2));
//         }
//         else {
//             console.log('fetched the user', JSON.stringify(response, null, 2));
//             callback(null, {"statusCode":200, "body":JSON.stringify(response.Item, null, 2)});
//         }
//     });
//     const params1 = {
//         TableName: "movementData",
//         Item: {
//             "rollno": body.rollno,
//             "name": body.name,
//             "address" : body.address,
//             "degree": body.degree,
//             "department" :body.department,
//             "gender" : body.gender,
//             "hallno" : body.hallno,
//             "roomno" : body.roomno,
//             "email": body.email
//         }
//     };

//     console.log("trying to add a movementData to table");
//     docClient.put(params, function(err, data) {
//         console.log("inside put");
//         if (err) {
//             console.error("Unable to add movement data. Error JSON:", JSON.stringify(err, null, 2));
//             callback(null, JSON.stringify(err, null, 2));
//         }
//         else {
//             console.log("movement data added:", JSON.stringify(params.Item, null, 2));
//              callback(null, {"statusCode":200, "body":JSON.stringify(params.Item, null, 2)});

//         }
//     });

// };


// const deletemovementData = (event, callback) => {
//     const body = JSON.parse(event.body);
//     console.log("body is:", body);

//     const params1 = {
//         TableName: "movementData",
//         Key: {
//             "rollno": body.rollno,
//             "email": body.email
//         }
//     };

//     console.log("deleting a row in movement data...");
//     docClient.delete(params1, function(err, data) {
//         if (err) {
//             console.error("Unable to delete row in movement data. Error JSON:", JSON.stringify(err, null, 2));
//             callback(null, JSON.stringify(err, null, 2));
//         }
//         else {
//             const queryType = event.queryStringParameters.queryType;
//             console.log("Deleted :", JSON.stringify(data, null, 2));
//              callback(null, {"statusCode":200, "body":JSON.stringify(data, null, 2)});

//         }
//     });
// };

// function updatemovementData(event, callback) {
//     /*
//         params: {queryType = "updateUser"}
//         body: {rollno, name, , address, degree, department, gender, hallno, roomno, email}
//     */
//     const body = JSON.parse(event.body);
//     console.log("body is:", body);

//     let rollno = body.rollno;
//     let email = body.email;
//     console.log("roll is: ", rollno, "email is: ", email);

//     let params = {
//         TableName: 'movementData',
//         Key: {
//             "rollno": rollno,
//             "email": email
//         },
//         UpdateExpression: "set address = :address, degree = :degree, department= :department, gender = :gender, hallno= :hallno, roomno= :roomno",
//         ExpressionAttributeValues: {
//             ":address": body.address,
//             ":degree": body.degree,
//             ":department": body.department,
//             ":gender": body.gender,
//             ":hallno": body.hallno,
//             ":roomno": body.roomno,
//         },
//         ReturnValues: "UPDATED_NEW"
//     };

//     console.log("Updating the item...");
//     docClient.update(params, function(err, data) {
//         if (err) {
//             console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
//         }
//         else {
//             console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
//              callback(null, {"statusCode":200, "body":JSON.stringify(data, null, 2)});
//         }
//     });
// }


// function getmovementData(event, callback) {
//     console.log("Getting the movementData.....");
//     /*
//         params: {queryType = "getUser", rollno, email}
//     */
//     const body = JSON.parse(event.body);
//     console.log(body);
//     let params = {
//         TableName: 'movementData',
//         Key: {
//             "rollno": body.rollno,
//             "email": body.email
//         }
//     };


//     docClient.get(params, function(error, response) {
//         if (error) {
//             console.log('Unable to fetch data', JSON.stringify(error, null, 2));
//             callback(null, JSON.stringify(error, null, 2));
//         }
//         else {
//             console.log('fetched the movementData', JSON.stringify(response, null, 2));
//             callback(null, {"statusCode":200, "body":JSON.stringify(response.Item, null, 2)});
//         }
//     });
// }
