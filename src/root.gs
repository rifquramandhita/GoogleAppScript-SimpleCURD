let table;
let response;

const doGet = (req) => {
  table = req.parameter.table;
  switch (table) {
    case "user":
      response = doGetUser(req);
      break;
    //add another table
  }
  return ContentService.createTextOutput(JSON.stringify(response));
};

const doPost = (request = {}) => {
  const { parameter, postData: { contents, type } = {} } = request;
  if (type === "application/json") {
    table = parameter.table;
    switch (table) {
      case "user":
        response = doPostUser(request);
        break;
      //add another table
    }
  } else {
    response = "Access denied";
  }
  return ContentService.createTextOutput(JSON.stringify(response));
};

const getSheet = () => {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(table);
};
